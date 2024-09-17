import { useState } from 'react'
import ARScreen from './components/ArScreen'
import { DeepARProvider } from './hooks/useDeepAR'
import WelcomeScreen from './components/WelcomeScreen'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  return (
    <>
      {isStarted ? (
        <DeepARProvider>
          <ARScreen />
        </DeepARProvider>
      ) : (
        <WelcomeScreen onClick={() => setIsStarted(true)} />
      )}
    </>
  )
}

export default App
