const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    
    let flip = Math.ceil(Math.random()*2) === 1 ? 'Heads' : 'Tails' 

      if(flip == 'Heads'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "Heads",
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "Tails"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
  
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
