from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from petclinic.database import Base, SessionLocal, engine
from petclinic.invoice.router import router as invoice_router
from petclinic.pet.router import router as pet_router
from petclinic.seed import seed
from petclinic.vet.router import router as vet_router
from petclinic.visit.router import router as visit_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed(db)
    yield


app = FastAPI(title="petclinic", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=1800,
)

app.include_router(pet_router)
app.include_router(vet_router)
app.include_router(visit_router)
app.include_router(invoice_router)
