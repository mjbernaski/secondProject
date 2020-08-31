
const http = require('http');

const server = http.createServer( (req,res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify(['English','Math','Art', 'Gym']))
        res.end();
    }

});


server.listen(3000); 

console.log('Listening on port 3000')