from pydantic import BaseModel


class PetIn(BaseModel):
    id: int
    pet_name: str
    image_url: str
    for_sale: bool
    price: int
    owner_id: int


class PetOut(BaseModel):
    pet_name: str
    image_url: str
    for_sale: bool
    price: int
    owner_id: int
