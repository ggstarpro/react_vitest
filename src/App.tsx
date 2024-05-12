import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextInput from '@/input/TextInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TextInput />
    </>
  )
}

export default App
