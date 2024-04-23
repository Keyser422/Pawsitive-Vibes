from pydantic import BaseModel


class TestimonialIn(BaseModel):
    rating: int
    name: str
    description: str


class TestimonialOut(BaseModel):
    id: int
    rating: int
    name: str
    description: str
