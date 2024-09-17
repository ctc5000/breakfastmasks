import { FC } from 'react'
import TutorialHint from './TutorialHint'

type stepType = 1 | 2 | 3 | 4

interface TutorialProps {
  step: stepType
  text: string
  image: string
  onClickNext: () => void
  onClickSkip: () => void
}

const Tutorial: FC<TutorialProps> = ({
  step,
  text,
  image,
  onClickNext,
  onClickSkip,
}) => {
  const hintClassName = {
    1: 'bottom-[71px] left-[20px]',
    2: 'bottom-[89px] left-[26px]',
    3: 'bottom-[89px] left-[26px]',
    4: 'bottom-[79px] left-[26px]',
  }

  return (
    <div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <button
          className="bg-white w-max bg-opacity-30 rounded-full px-[18px] py-1 text-white text-[11px]"
          onClick={onClickSkip}
        >
          Пропустить обучение
        </button>
      </div>
      <TutorialHint
        text={text}
        onClick={onClickNext}
        classNames={hintClassName[step as stepType]}
      />
      {step === 2 && (
        <img
          src="/images/arrow-right.png"
          className="absolute bottom-[53px] left-[74px]"
        />
      )}
      {step === 3 && (
        <img
          src="/images/arrow-left.png"
          className="absolute bottom-[60px] left-[74px]"
        />
      )}
      <img src={image} className="absolute bottom-0 right-0" />
    </div>
  )
}

export default Tutorial
