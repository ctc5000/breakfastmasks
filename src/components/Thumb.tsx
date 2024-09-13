import { FC } from 'react'

import { cn } from '../utils/helpers'

interface ThumbProps {
  effect: string
  icon: string
  isActive?: boolean
  onClick: (effect: string) => void
}

const Thumb: FC<ThumbProps> = ({ effect, icon, isActive, onClick }) => {
  const handleClick = () => {
    onClick(effect)
  }

  return (
    <div
      className={cn(
        'bg-white bg-opacity-40 rounded w-[35px] h-[35px] p-1 flex justify-center items-center',
        isActive && 'border border-[#E92984]'
      )}
      onClick={handleClick}
    >
      <img src={icon} />
    </div>
  )
}

export default Thumb
