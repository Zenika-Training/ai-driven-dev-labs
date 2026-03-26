from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise import Tortoise

from src.models.pet import Pet
from src.routers.pet_router import router as pet_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await Tortoise.init(
        db_url="sqlite://:memory:",
        modules={"models": ["src.models.pet"]},
        _enable_global_fallback=True,
    )
    await Tortoise.generate_schemas()

    await Pet.create(name="Buddy", owner_name="Alice")
    await Pet.create(name="Whiskers", owner_name="Bob")
    await Pet.create(name="Max", owner_name="Alice")

    yield
    await Tortoise.close_connections()


app = FastAPI(title="Petclinic", version="0.1.0", lifespan=lifespan)

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


app.include_router(pet_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
