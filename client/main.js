import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Surveys from '/imports/api/Surveys';
import Todos from '/imports/api/Todos';
import './main.html';

Template.body.helpers({
    surveys() {
        var data = Todos.find({});
	console.log(data);
	return data;
      },
});
