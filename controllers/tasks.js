import { tasks } from "../models/tasks.js"
import { v4 as uuidv4 } from 'uuid';

export const allTasks = (req, res) => {
  return res.status(200).json(tasks)
}

export const getTask = (req, res) => {
  const task = tasks.find( t => t.id === req.params.id)

  if(!task) {
    return res.status(404).json({"error": "Task not found"})
  }

  return res.status(200).json(task)
}

export const createTask = (req, res) => {
  const { title, completed } = req.body

  if(typeof title !== "string" || title.trim() === ""){
    return res.status(400).json({ error: "title is required" });
  }

  if (completed !== undefined && typeof completed !== "boolean"){
    // si tiene valor y no es boolean, salta el error (puede no tener valor)
    return res.status(400).json({ error: "completed is not boolean" });
  }

  const newTask = {
      id: uuidv4(), // Genera un UUID
      title, 
      completed: completed ?? false
    };

  tasks.push(newTask)
  return res.status(201).json({ success: true, data: newTask });
}

export const updateTask = (req, res) => {
  // validacion de req.body
  const { title, completed } = req.body

  if (title === undefined && completed === undefined) {
    return res.status(400).json({ error: "No data to update" });
  }
  
  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ error: "title is not a string" });
  }
  
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed is not a boolean" });
  }
  
  // validacion de req.params.id
  const task = tasks.find( t => t.id === req.params.id );
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // si hay valor actualiza, sino no
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  // devuelvo la tarea actualizada
  return res.status(200).json(task);
}

export const deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1)[0]; // elimina y devuelve el objeto eliminado

  return res.status(200).json(deletedTask);
}