let express = require('express');
let bodyParser = require('body-parser'); 

let fs = require('fs');
let app = express();

// File to write to (Data1)
let write_to_file = `./json/data1`;

app.use(bodyParser.json());

// Route for the api
app.post('/ingest-api', (request, response) => {
  // console.log(request, response);
  console.log('POST /ingest-api', request.body)
  // Assume the body always contains data of the form {"experienceID": <number>}
  let { experienceID } = request.body;

  // Check if experienceID is a number
  if (!isNaN(experienceID)) {

    fs.appendFile(write_to_file, JSON.stringify(experienceID) + `\n`, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })

  }
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(`Wrote ${experienceID} to data1`);
})

const port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)