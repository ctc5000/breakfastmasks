import { FC } from 'react'
import { cn } from '../utils/helpers'

interface ButtonProps {
  label: string
  isBold?: boolean
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ label, isBold = true, onClick }) => {
  return (
    <button
      className={cn(
        'text-white bg-[#FF1994] rounded-full ',
        isBold
          ? 'font-bold font-montserrat w-max bottom-8 px-16 py-3 absolute left-1/2 -translate-x-1/2'
          : 'font-normal w-fit py-1 px-4'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
