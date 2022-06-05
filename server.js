const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;

  function pageContentType(pages,contentType){
    fs.readFile(pages, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType})
      res.write(data)
      res.end()
    })
  };

  switch(page){
    case '/':
      pageContentType('index.html', 'text/html');
      break;
    case '/css/style.css':
      pageContentType('css/style.css', 'text/css')
      break;
    case '/js/main.js':
      pageContentType('js/main.js','text/javascript' )
      break;
    case '/api':
      const objToJson = {
        flopResult: Math.ceil(Math.random()*2) === 1 ? 'Heads' : 'Tails'
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(objToJson.flopResult));
      break;
    default:
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





