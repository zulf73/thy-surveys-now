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

function json_from_survey_text_file(file_path, qn){
    var data = fs.readFileSync( file_path, 'utf8' );
    var lines = data.split("\n");
    var n = lines.length;
    var j = 0;
    var out = "\{ \"name\" : \"" + qn + "\",  \"value\" :[ ";
    lines.forEach( (line) => {
	if (line) {
	    var v = line.split(':')
	    var w = String(v[1]).replace("\"",""); // kill the quotes
	    var inc_out  = " \{ \"question\" : \"" + w + "\" ,";
	    inc_out = inc_out + " \"answers\" : [";
	    inc_out = inc_out + "  \{ \"type\" : \"1\", \"content\": \"1\" \},";
	    inc_out = inc_out + "  \{ \"type\" : \"2\", \"content\": \"2\" \},";
	    inc_out = inc_out + "  \{ \"type\" : \"3\", \"content\": \"3\" \},";
	    inc_out = inc_out + "  \{ \"type\" : \"4\", \"content\": \"4\" \},";
	    inc_out = inc_out + "  \{ \"type\" : \"5\", \"content\": \"5\" \} ] \} ";
	    j = j + 1;
	    if (j < n-1){
		inc_out = inc_out + ',';
	    }
	    out = out + inc_out;
	}
    });
    out = out + " ] \}";
    return(out);
}

var postRoutes = Picker.filter(function(req, res) {
   // here you could be a bit more specific in which
   // post request you are looking for, e.g. check the req.url
   if (req.method == "POST") {
       const form = new formidable.IncomingForm(); 
       form.parse(req, function(err, fields, files){
	   console.log(fields);
	   console.log(files);
	   var file_path = files['myFile']['path'];
	   var file_name = files['myFile']['name'];
	   console.log(file_path);
	   console.log(file_name);
	   var json_file_text = json_from_survey_text_file(
	       file_path, file_name);
	   var json_obj = JSON.parse(json_file_text);
	   Surveys.insert( json_obj );
       });
       
   }
   return true;
});


