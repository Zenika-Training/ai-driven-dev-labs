from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.petclinic.database import engine, Base, async_session_factory
from src.petclinic.data_init import seed_data
from .vet.vet_router import router as vet_router
from .pet.pet_router import router as pet_router
from .visit.visit_router import router as visit_router
from .invoice.invoice_router import router as invoice_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with async_session_factory() as session:
        await seed_data(session)
    yield


app = FastAPI(title="Petclinic", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(vet_router)
app.include_router(pet_router)
app.include_router(visit_router)
app.include_router(invoice_router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


def start():
    import uvicorn
    uvicorn.run("src.petclinic.app:app", host="0.0.0.0", port=8080, reload=True)


if __name__ == "__main__":
    start()
