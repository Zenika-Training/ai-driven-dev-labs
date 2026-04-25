from httpx import AsyncClient


class TestPet:
    async def test_find_all_returns_seeded_pets(self, client: AsyncClient):
        # given seeded pets in the database

        # when
        response = await client.get("/api/v1/pet")

        # then
        assert response.status_code == 200
        assert len(response.json()) == 2

    async def test_find_by_id_returns_pet(self, client: AsyncClient):
        # given pet with id 1 exists

        # when
        response = await client.get("/api/v1/pet/1")

        # then
        assert response.status_code == 200
        assert response.json()["name"] == "Leo"

    async def test_find_by_id_returns_404_when_not_found(self, client: AsyncClient):
        # given no pet with id 999

        # when
        response = await client.get("/api/v1/pet/999")

        # then
        assert response.status_code == 404

    async def test_save_creates_new_pet(self, client: AsyncClient):
        # given
        payload = {"name": "Buddy", "owner_name": "John Smith"}

        # when
        response = await client.post("/api/v1/pet", json=payload)

        # then
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Buddy"
        assert data["ownerName"] == "John Smith"

    async def test_save_rejects_duplicate_pet_name_per_owner(self, client: AsyncClient):
        # given Leo already belongs to George Franklin

        # when
        response = await client.post("/api/v1/pet", json={"name": "Leo", "owner_name": "George Franklin"})

        # then
        assert response.status_code == 422

    async def test_delete_removes_pet(self, client: AsyncClient):
        # given pet with id 1 exists

        # when
        response = await client.delete("/api/v1/pet/1")

        # then
        assert response.status_code == 204
        assert (await client.get("/api/v1/pet/1")).status_code == 404
