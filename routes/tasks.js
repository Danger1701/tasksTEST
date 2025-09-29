import express from "express";
const router = express.Router();
import { allTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.js";

// Rutas
router.get("/", allTasks);          // Obtener todas las tareas
router.get("/:id", getTask);           // Obtener una tarea por id
router.post("/", createTask);          // Crear una tarea
router.put("/:id", updateTask);        // Actualizar una tarea
router.delete("/:id", deleteTask);     // Eliminar una tarea

export default router;