from pymongo import MongoClient
from bson.objectid import ObjectId


class NoteResource(BaseResource):
    collection_name = 'notes'
    model = Note

class Note():
    def __init__(self, _id=None, user_id=None, date=None,
                 odometr=None, type_to_do=None, info=None):

        self._id = ObjectId(_id) if _id else None
        self.date = date
        self.odometr = odometr
        self.type_to_do = type_to_do
        self.info = info
        self.user_id = user_id


class BaseResource:
    collection_name = None
    model = None

    def __init__(self, db):
        self.db = db
        self.collection = self._get_collection(self.db)

    def save(self, document):
        if document.get('_id'):
            self.collection.update_one(
                {'_id': document.pop('_id')},
                {
                    '$set': document
                }
            )

        else:
            document.pop('_id')
            self.collection.insert(document)

    def list(self):
        list_of_notes = []
        for note in self.collection.find():
            list_of_notes.append(note)
        return list_of_notes

    def find_one(self, document):
        return self.collection.find_one(document['_id'])

    def remove(self, document):
        document = {'_id': document._id}
        result = self.collection.delete_one(document)
        return result.deleted_count if result.deleted_count == 1 else None

    @classmethod
    def _get_collection(cls, db):
        return getattr(db, cls.collection_name)

