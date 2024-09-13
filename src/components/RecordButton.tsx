import { FC } from 'react'
import { cn } from '../utils/helpers'

interface RecordButtonProps {
  isRecording: boolean
  onClick: () => void
}

const RecordButton: FC<RecordButtonProps> = ({
  isRecording = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'absolute bottom-12 rounded-full w-20 h-20 -translate-x-1/2 left-1/2',
        isRecording
          ? 'bg-[#E92984]'
          : 'border-[20px] border-white border-opacity-80 box-border'
      )}
      onClick={onClick}
    ></div>
  )
}

export default RecordButton
