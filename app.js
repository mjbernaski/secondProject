
const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json()) // adding a piece of middleware

const courses = [
    {id: 1, name: 'course1'},
   {id: 2, name: 'course2'}, 
    {id: 3, name: 'course3'}
]

function dateString() {
let date_ob = new Date();
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let date = ("0" + date_ob.getDate()).slice(-2);
let year = date_ob.getFullYear();
return month+date+year
}

// get

app.get('/', (req, res) => {
    res.send('Hello World!!! at ' + dateString() )
}); 

app.get('/api/courses', (req, res) => {
    res.send(courses)});

app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body)
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return; 
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (!course) res.status(404).send('Course not found')
    res.send(course);
})


// ?sortBy=name is an optional query string parameter 

// PORT environment variable 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port # ${port}`))  // called a template string

