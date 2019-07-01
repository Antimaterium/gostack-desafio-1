const express = require("express");
const server = express();
const projects = [];
let totalRequests = 0;

function logger(req, res, next) {
  console.log(`Number of requests ${totalRequests++}`);
  next();
}

function checkIfProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id === Number(id));
  if (!project) {
    return res.status.json({ error: "Project not found" });
  }
  next();
}

server.use(express.json());
server.use("/", logger);
server.use("project/:id", checkIfProjectExists);

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
