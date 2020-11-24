import { Mongo } from 'meteor/mongo';
const JSON = require('dirty-json');
const fs = require('fs');

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

// SurveyCollection is a specialization of Collection
// that has specific knowledge of what to do with
// file contents.  We don't want to spread this knowledge
// outside this class.

class SurveyCollection extends Mongo.Collection {

    insert( files ){
	//console.log(fields);
	console.log(files);
	var file_path = files['myFile']['path'];
	var file_name = files['myFile']['name'];
	console.log(file_path);
	console.log(file_name);
	var json_file_text = json_from_survey_text_file(
	    file_path, file_name);
	var json_obj = JSON.parse(json_file_text);
	return super.insert( json_obj );
    }
};

export default SurveyCollection;
