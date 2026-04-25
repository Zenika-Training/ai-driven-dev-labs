from httpx import AsyncClient


class TestVet:
    async def test_find_all_returns_seeded_vets(self, client: AsyncClient):
        # given seeded vets in the database

        # when
        response = await client.get("/api/v1/vet")

        # then
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        assert data[0]["name"] == "James Carter"
        assert data[1]["name"] == "Helen Leary"

    async def test_find_by_id_returns_vet(self, client: AsyncClient):
        # given vet with id 1 exists

        # when
        response = await client.get("/api/v1/vet/1")

        # then
        assert response.status_code == 200
        assert response.json()["name"] == "James Carter"

    async def test_find_by_id_returns_404_when_not_found(self, client: AsyncClient):
        # given no vet with id 999

        # when
        response = await client.get("/api/v1/vet/999")

        # then
        assert response.status_code == 404

    async def test_find_by_name_returns_vet(self, client: AsyncClient):
        # given vet named Helen Leary exists

        # when
        response = await client.get("/api/v1/vet/name/Helen Leary")

        # then
        assert response.status_code == 200
        assert response.json()["specialty"] == "Radiology"
