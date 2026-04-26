from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Petclinic", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


def start():
    import uvicorn
    uvicorn.run("src.main.app:app", host="0.0.0.0", port=8080, reload=True)


if __name__ == "__main__":
    start()
