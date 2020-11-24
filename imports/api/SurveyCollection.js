import { Mongo } from 'meteor/mongo';
const JSON = require('dirty-json');


class SurveyCollection extends Mongo.Collection {
    insert( json_obj ){
	return Mongo.Collection.prototype.insert( json_obj );
    }
};

export default SurveyCollection;
