import express from 'express'

const app = express()
const PORT = 5000

app.get("/", (req, res) => {
    res.send("Backend Running")
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})