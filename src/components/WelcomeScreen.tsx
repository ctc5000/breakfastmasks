import { FC } from 'react'
import Button from './Button'

interface WelcomeScreenProps {
  onClick: () => void
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ onClick }) => {
  return (
    <div className="w-svw h-svh relative">
      <img className="w-full h-full" src="/images/welcome.png" />
      <Button label="Включить магию!" onClick={onClick} />
    </div>
  )
}

export default WelcomeScreen
