from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# In-memory storage (replace with DB later)
USERS = [
    {"id": 1, "name": "Alice", "points": 50, "badges": ["First Report"]},
    {"id": 2, "name": "Bob", "points": 30, "badges": []},
]

class User(BaseModel):
    id: int
    name: str
    points: int
    badges: List[str] = []

@router.get("/users", response_model=List[User])
def get_users():
    return USERS

@router.post("/users/{user_id}/points")
def add_points(user_id: int, points: int):
    for u in USERS:
        if u["id"] == user_id:
            u["points"] += points
            return u
    return {"error": "User not found"}

@router.post("/users/{user_id}/badge")
def add_badge(user_id: int, badge: str):
    for u in USERS:
        if u["id"] == user_id:
            if badge not in u["badges"]:
                u["badges"].append(badge)
            return u
    return {"error": "User not found"}
