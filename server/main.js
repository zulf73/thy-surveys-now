import { Meteor } from 'meteor/meteor';
import Surveys from '/imports/api/Surveys';
import { Picker } from 'meteor/meteorhacks:picker';
import formidable from 'formidable';
const fs = require('fs');

Meteor.startup(() => {
    // code to run on server at startup

    if (Meteor.isServer) {
	Meteor.publish('surveys0', function () {
	    return Surveys.find().cursor;
	});
    } else {
	Meteor.subscribe('surveys0');
    }
});

var postRoutes = Picker.filter(function(req, res) {
   // here you could be a bit more specific in which
   // post request you are looking for, e.g. check the req.url
    var survey_insert = Meteor.bindEnvironment( (files) => {
	Surveys.insert( files );
    });

   if (req.method == "POST") {

	   const form = new formidable.IncomingForm(); 
	   form.parse(req, function(err, fields, files){
	       // We don't want knowledge of Questionnaire
	       // specific processing. Formidable 'files'
	       // constains low level file information
	       survey_insert( files );
       });
   }
   return true;
});


