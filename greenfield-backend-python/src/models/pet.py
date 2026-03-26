from tortoise import fields
from tortoise.models import Model


class Pet(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    owner_name = fields.CharField(max_length=100)

    class Meta:
        table = "pet"
