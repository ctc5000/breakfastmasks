import { FC, useEffect, useState } from 'react'

interface RecordButtonProps {
  isRecording: boolean
  onClick: () => void
}

const RecordButton: FC<RecordButtonProps> = ({
  isRecording = false,
  onClick,
}) => {
  const [progress, setProgress] = useState(0)

  const size = 80
  const strokeWidth = 20
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    let interval = 0
    if (isRecording) {
      const startTime = Date.now()
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / 40000) * 100, 100)
        setProgress(newProgress)
        if (newProgress >= 100) {
          clearInterval(interval)
        }
      }, 1000)
    } else {
      setProgress(0)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRecording])

  console.log(progress)

  return (
    <div
      className="absolute bottom-12 -translate-x-1/2 left-1/2"
      onClick={onClick}
    >
      <div className="relative w-20 h-20 flex items-center justify-center cursor-pointer">
        <svg
          width={size}
          height={size}
          className="absolute top-0 left-0"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {isRecording && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#E92984"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              className="progress-ring"
            />
          )}
        </svg>
        <style>{`
        .progress-ring {
          animation: progress-animation 40s linear forwards;
        }

        @keyframes progress-animation {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      </div>
    </div>
  )
}

export default RecordButton
