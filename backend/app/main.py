from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import reports

app = FastAPI(title="CityPulse PNG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reports.router, prefix="/reports")

@app.get("/")
def root():
    return {"status": "CityPulse backend running"}
