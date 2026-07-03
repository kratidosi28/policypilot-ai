import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.get('/health', (_req, res) => {
res.status(200).json({
success: true,
message: 'PolicyPilot AI server is running',
})
})

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`)
})
