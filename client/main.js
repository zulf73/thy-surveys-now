import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Surveys from '/imports/api/Surveys';
//import ViewSurveys from '/imports/api/ViewSurveys';
import './main.html';

Template.body.helpers({
    surveys() {
        return Surveys.find({}).fetch();
      },
});
