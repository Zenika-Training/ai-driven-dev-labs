from httpx import AsyncClient


class TestVisit:
    async def test_find_all_returns_seeded_visits(self, client: AsyncClient):
        # given seeded visits in the database

        # when
        response = await client.get("/api/v1/visit")

        # then
        assert response.status_code == 200
        assert len(response.json()) == 2

    async def test_find_by_id_returns_visit_with_pet_and_vet(self, client: AsyncClient):
        # given visit with id 1 exists

        # when
        response = await client.get("/api/v1/visit/1")

        # then
        assert response.status_code == 200
        data = response.json()
        assert data["summary"] == "Annual checkup"
        assert data["pet"]["name"] == "Leo"
        assert data["vet"]["name"] == "James Carter"

    async def test_find_by_id_returns_404_when_not_found(self, client: AsyncClient):
        # given no visit with id 999

        # when
        response = await client.get("/api/v1/visit/999")

        # then
        assert response.status_code == 404

    async def test_find_by_pet_id_returns_visits_for_pet(self, client: AsyncClient):
        # given pet 1 has one visit

        # when
        response = await client.get("/api/v1/visit/pet/1")

        # then
        assert response.status_code == 200
        assert len(response.json()) == 1
        assert response.json()[0]["pet"]["name"] == "Leo"
