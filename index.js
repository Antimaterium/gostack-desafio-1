const express = require("express");
const server = express();
const projects = [];

server.use(express.json());

server.post("/project", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(project);
});

server.get("/project", (req, res) => {
  return res.json(projects);
});

server.delete("/project/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => project.id === Number(id));
  projects.splice(projectIndex, 1);
  return res.send();
});

server.put("/project/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === Number(id));
  project.title = title;
  return res.json(project);
});

server.listen(3000);
