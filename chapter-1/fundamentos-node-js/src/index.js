const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    "Curso 1",
    "Curso 2"
]

app.get("/courses", (request, response) => {
    return response.json(courses);
});

app.post("/courses", (request, response) => {
    const newCourse = request.body;
    courses.push(newCourse.name);
    return response.json(courses);
});

app.put("/courses/:id", (request, response) => {
    const params = request.params;
    return response.json(courses);
});

app.patch("/courses/:id", (request, response) => {
    return response.json(courses);
});

app.delete("/courses/:id", (request, response) => {
    const { id } = request.params;
    return response.json(courses);
});


app.listen(3333);