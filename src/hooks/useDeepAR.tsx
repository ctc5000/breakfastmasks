import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react'
import { initializeDeepAR } from '../../deepARConfig'

const DeepARContext = createContext(null)

export const useDeepAR = () => {
  return useContext(DeepARContext)
}

export const DeepARProvider = ({ children }: { children: ReactNode }) => {
  const [deepARInstance, setDeepARInstance] = useState<any>(null)
  const deepARRef = useRef(null)

  useEffect(() => {
    const initDeepAR = async () => {
      if (deepARRef.current) {
        const instance = await initializeDeepAR(deepARRef.current)
        setDeepARInstance(instance)
      }
    }

    initDeepAR()

    // return () => {
    //   stopDeepAR();
    //   destroyDeepAR();
    // };
  }, [])

  return (
    <DeepARContext.Provider value={deepARInstance}>
      <div ref={deepARRef} className="w-svw h-svh">
        {children}
      </div>
    </DeepARContext.Provider>
  )
}
