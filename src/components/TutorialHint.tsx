import { FC } from 'react'
import { cn } from '../utils/helpers'
import Button from './Button'

interface TutorialHintProps {
  text: string
  classNames?: string
  onClick: () => void
}

const TutorialHint: FC<TutorialHintProps> = ({
  text,
  classNames = '',
  onClick,
}) => {
  return (
    <div className={cn('absolute w-[140px]', classNames)}>
      <div className="bg-white rounded-lg pt-3 px-2 pb-5 text-center">
        <p className="text-[#FF1994] text-[10px] pb-4">{text}</p>
        <Button label="OK!" onClick={onClick} isBold={false} />
      </div>
    </div>
  )
}

export default TutorialHint
