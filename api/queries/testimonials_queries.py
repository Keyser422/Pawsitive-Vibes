from pydantic import BaseModel
from models.testimonials import TestimonialIn, TestimonialOut
from queries.pool import pool

class TestimonialRepository:
    def create(self, testimonial: TestimonialIn) -> TestimonialOut:
        #connect the database
        with pool.connection() as conn:
            #get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # run or INSERT statement
                result = db.execute(
                    """"
                    INSERT INTO testimonials
                        (rating, name, description)
                    VALUES
                        (%s, %s, %s);
                    RETURNING id;
                    """,
                    [
                        testimonial.rating,
                        testimonial.name,
                        testimonial.description
                    ]
                )
                id = result.fetchone()[0]
                # return new data
                old_data = testimonial.dict()
                return TestimonialOut(id=id, **old_data)
