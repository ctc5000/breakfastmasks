import { FC } from 'react'

interface WelcomeScreenProps {
  onClick: () => void
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ onClick }) => {
  return (
    <div className="w-svw h-svh relative">
      <img className="w-full h-full" src="/images/welcome.png" />
      <button
        className="absolute left-1/2 -translate-x-1/2 text-white font-bold bg-[#FF1994] rounded-full bottom-8 px-16 py-3 w-max"
        onClick={onClick}
      >
        Включить магию!
      </button>
    </div>
  )
}

export default WelcomeScreen
