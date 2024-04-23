from fastapi import APIRouter, Depends
from models.testimonials import TestimonialIn, TestimonialOut
from queries.testimonials_queries import TestimonialRepository

router = APIRouter()


@router.post("/testimonials", response_model=TestimonialOut)
def create_testimonial(
    testimonial: TestimonialIn,
    repo: TestimonialRepository = Depends()
):
    return repo.create(testimonial)
