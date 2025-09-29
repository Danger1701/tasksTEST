import express from 'express'
import tasksRoutes from "./routes/tasks.js";

const app = express()
const port = 3000
app.use(express.json())

app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({msg: `server on port ${port}`})
})

// server ON
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})