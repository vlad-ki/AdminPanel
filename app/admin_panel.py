import bottle
import yadm

from bson.objectid import ObjectId
from resource import db, Users

bottle.debug(True)

TEMPLATES_PATH = 'static/templates/'


@bottle.route('/')
def home():
    qs = db(Users).find()
    table_data = [yadm.serialize.to_mongo(i) for i in qs]
    field_names = list(Users.__fields__.keys())

    return bottle.jinja2_template(''.join((TEMPLATES_PATH, 'index.jinja2')),
                                  FieldNames=field_names,
                                  tableData=table_data,)


@bottle.route('/edit/<id>')
def edit(id):
    qs = db(Users).find({'_id': ObjectId(id)})
    table_data = yadm.serialize.to_mongo(qs[0])
    return bottle.jinja2_template(''.join((TEMPLATES_PATH, 'edit.jinja2')),
                                  note=table_data)


@bottle.post('/edit/<id>')
def edit():
    user_for_edit = Users()
    user_for_edit._id = ObjectId(id)
    user_for_edit.fierst_name = bottle.requests.forms.get('fierst_name')
    user_for_edit.last_name = bottle.requests.forms.get('last_name')
    user_for_edit.age = bottle.requests.forms.get('age')
    db(Users).update_one(user_for_edit)

    bottle.redirect('/')




if __name__ == '__main__':
    bottle.run(host='localhost', port=8080, reloader=True)
