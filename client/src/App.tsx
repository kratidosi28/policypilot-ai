import { useState, useEffect } from 'react'
import './App.css'

type HealthResponse = {
  success: boolean,
  message: string
}

function App() {
  const [statusMessage, setStatusMessage] = useState('Checking backend connection...')
  useEffect(() => {
    async function checkServerHealth(){
      try{
        const response = await fetch('http://localhost:5000/health')
        const data: HealthResponse = await response.json() //converts the JSON response into a JavaScript object.
        setStatusMessage(data.message)
      }
      catch {
        setStatusMessage('Unable to connect to the backend server')
      }
    }
    checkServerHealth()
  }, [])
  return (
    //<main> is a semantic HTML container for the main content of the page.
    <main>
     <h1>Policy Pilot AI</h1> 
     <p>Internal HR & IT Support Copilot</p>
     <p>{statusMessage}</p>
    </main>
  )
}

export default App
