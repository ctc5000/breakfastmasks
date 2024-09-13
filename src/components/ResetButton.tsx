import { FC } from 'react'

interface ResetButtonProps {
  onClick: () => void
}

const ResetButton: FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <img
      className="mb-8 w-[33px] h-[27px]"
      src="icons/refresh.svg"
      onClick={onClick}
    />
  )
}

export default ResetButton
