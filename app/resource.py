import yadm
import pymongo


client = pymongo.MongoClient('localhost', 27017)
db = yadm.database.Database(client, 'admin_panel')


class Users(yadm.Document):
    __collection__ = 'users'

    fierst_name = yadm.fields.simple.StringField()
    last_name = yadm.fields.simple.StringField()
    age = yadm.fields.simple.IntegerField()

