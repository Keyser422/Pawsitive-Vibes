"""
Pydantic Models for Users.
"""
from pydantic import BaseModel
from typing import Optional


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """
    id: int
    username: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[int]
    bio: Optional[str]


class UserInUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[int]
    bio: Optional[str]


class UserOut(BaseModel):
    """
    Represents a user, with the password not included
    """
    id: int
    username: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[int]
    bio: Optional[str]


class UserNew(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    bio: Optional[str]
