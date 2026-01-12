from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Report(BaseModel):
    id: int
    type: str
    description: str
    status: str
    latitude: float | None = None
    longitude: float | None = None

# TEMP in-memory store (will be DB later)
REPORTS: List[Report] = [
    Report(
        id=1,
        type="Pothole",
        description="Large pothole near Boroko market",
        status="Pending",
        latitude=-9.4438,
        longitude=147.1803
    )
]

@router.get("/", response_model=List[Report])
def get_reports():
    return REPORTS

@router.post("/", response_model=Report)
def create_report(report: Report):
    REPORTS.append(report)
    return report
