import ARScreen from './components/arScreen'
import { DeepARProvider } from './hooks/useDeepAR'

function App() {
  return (
    <DeepARProvider>
      <ARScreen />
    </DeepARProvider>
  )
}

export default App
