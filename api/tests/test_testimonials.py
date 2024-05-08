from fastapi.testclient import TestClient
from main import app
from queries.testimonials_queries import TestimonialRepository

client = TestClient(app)


class EmptyTestimonialQueries:
    def get_all(self):
        return []


def test_get_all_testimonials():
    # ARRAGNE
    app.dependency_overrides[TestimonialRepository] = EmptyTestimonialQueries

    # ACT
    response = client.get("/api/testimonials")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': 'Testimonials not found.'}
