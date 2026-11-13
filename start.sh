#!/usr/bin/env bash
# Start / stop the pet clinic (brownfield backend :8080 + frontend :5173).
# Usage: ./start.sh [--bg] | stop | status | --help
set -u
cd "$(dirname "$0")" || exit 1
ROOT="$(pwd)"
RUN="$ROOT/.run"
BE_PORT=8080
FE_PORT=5173
TIMEOUT=180

usage() {
  cat <<'EOF'
Usage:
  ./start.sh          start backend + frontend in the foreground (Ctrl+C stops both)
  ./start.sh --bg     start both in the background, return once both answer
  ./start.sh stop     stop the apps started by this script
  ./start.sh status   show what runs
  ./start.sh --help   this help
Logs: .run/backend.log, .run/frontend.log
EOF
}

alive() { [ -n "${1:-}" ] && kill -0 "$1" 2>/dev/null; }
pid_of() { [ -f "$RUN/$1.pid" ] && cat "$RUN/$1.pid" || true; }

port_holder() { lsof -nP -iTCP:"$1" -sTCP:LISTEN 2>/dev/null; }

# children of a pid (recursive), one per line
descendants() {
  local p
  for p in $(pgrep -P "$1" 2>/dev/null); do
    echo "$p"
    descendants "$p"
  done
}

stop_one() {
  local name="$1" pid port="$2" kids
  pid="$(pid_of "$name")"
  if [ -n "$pid" ] && alive "$pid"; then
    kids="$(descendants "$pid")"
    pkill -TERM -P "$pid" 2>/dev/null
    kill "$pid" 2>/dev/null
    local i
    for i in $(seq 1 15); do
      alive "$pid" || [ -z "$(port_holder "$port")" ] && break
      sleep 1
    done
    # kill only what is still listening on the port AND descends from the recorded pid
    local holder
    for holder in $(lsof -nP -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null); do
      if [ "$holder" = "$pid" ] || echo "$kids" | grep -qx "$holder"; then
        kill -9 "$holder" 2>/dev/null
      fi
    done
    alive "$pid" && kill -9 "$pid" 2>/dev/null
  fi
  rm -f "$RUN/$name.pid"
}

stop_all() {
  stop_one frontend "$FE_PORT"
  stop_one backend "$BE_PORT"
}

status() {
  local any=0 name pid port
  for spec in "backend:$BE_PORT" "frontend:$FE_PORT"; do
    name="${spec%%:*}"; port="${spec##*:}"
    pid="$(pid_of "$name")"
    if [ -n "$pid" ] && alive "$pid"; then
      echo "$name: running (pid $pid, port $port)"; any=1
    else
      echo "$name: not running"
    fi
  done
  return $((1 - any))
}

http_ok() { [ "$(curl -s -o /dev/null -w '%{http_code}' "$1" 2>/dev/null)" = "200" ]; }

start() {
  mkdir -p "$RUN"
  local port
  for port in "$BE_PORT" "$FE_PORT"; do
    if [ -n "$(port_holder "$port")" ]; then
      echo "Port $port is already in use:" >&2
      port_holder "$port" >&2
      echo "Not killing anything. Stop it yourself (or run ./start.sh stop if it is ours)." >&2
      exit 1
    fi
  done

  (cd brownfield-backend && nohup ./mvnw spring-boot:run >"$RUN/backend.log" 2>&1 & echo $! >"$RUN/backend.pid")

  (
    cd brownfield-frontend || exit 1
    if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
      echo "Installing frontend dependencies (npm ci)..."
      npm ci >"$RUN/frontend-install.log" 2>&1 || { echo "npm ci failed, see .run/frontend-install.log" >&2; exit 1; }
    fi
    nohup npm run dev >"$RUN/frontend.log" 2>&1 &
    echo $! >"$RUN/frontend.pid"
  ) || { stop_all; exit 1; }

  echo "Waiting for both apps (up to ${TIMEOUT}s)..."
  local waited=0
  until http_ok "http://localhost:$BE_PORT/v3/api-docs" && http_ok "http://localhost:$FE_PORT"; do
    sleep 2; waited=$((waited + 2))
    if [ "$waited" -ge "$TIMEOUT" ]; then
      echo "Timeout after ${TIMEOUT}s." >&2
      http_ok "http://localhost:$BE_PORT/v3/api-docs" || { echo "--- backend.log (last 30)" >&2; tail -30 "$RUN/backend.log" >&2; }
      http_ok "http://localhost:$FE_PORT" || { echo "--- frontend.log (last 30)" >&2; tail -30 "$RUN/frontend.log" >&2; }
      stop_all
      exit 1
    fi
  done

  cat <<EOF

Pet clinic is up.
  Frontend: http://localhost:$FE_PORT
  Swagger:  http://localhost:$BE_PORT/swagger-ui/index.html
  Logs:     $RUN/backend.log, $RUN/frontend.log
EOF
}

case "${1:-}" in
  --help|-h) usage ;;
  stop) stop_all; echo "Stopped." ;;
  status) status ;;
  --bg)
    start
    echo "  Stop:     ./start.sh stop"
    ;;
  "")
    start
    echo "  Stop:     Ctrl+C (or ./start.sh stop from another terminal)"
    trap 'echo; stop_all; exit 0' INT TERM
    while alive "$(pid_of backend)" && alive "$(pid_of frontend)"; do sleep 2; done
    echo "An app exited, stopping the other." >&2
    stop_all
    exit 1
    ;;
  *) usage; exit 2 ;;
esac
