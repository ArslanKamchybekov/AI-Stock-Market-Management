from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserModel(BaseModel):
    username: str = Field(..., max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    first_name: str = Field(..., max_length=50)
    last_name: str = Field(..., max_length=50)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
