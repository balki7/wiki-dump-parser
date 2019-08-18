let fileName = __dirname + '/trwiki-20190801-pages-articles.xml';

const node_xml_stream = require('node-xml-stream');
const parser = new node_xml_stream();
const fs = require('fs');
const uuidv1 = require('uuid/v1');;

// temporary variables to construct final object
let t_name;

// callback contains the name of the node and any attributes associated
parser.on('opentag', function(name, attrs) {
    t_name = name;
});

// callback contains the name of the node.
parser.on('closetag', function(name) {
    if(name === 'text') {
        console.log("***************");
    }
});

// callback contains the text within the node.
parser.on('text', function(text) {
    if(t_name === 'text') {
        fs.appendFile(__dirname + '/output/sample_text.txt', text, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
});

// callback to do something after stream has finished
parser.on('finish', function() {
    console.log("All File Finished");
});

let stream = fs.createReadStream(fileName, 'UTF-8');
stream.pipe(parser);