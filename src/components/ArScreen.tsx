import { FC, useEffect, useRef, useState } from 'react'
// @ts-ignore
import data from '../../data.js'
import MenuItem from './MenuItem.js'
import Thumb from './Thumb.js'
import {
  finishVideoRecording,
  startVideoRecording,
  switchEffect,
  clearEffect,
} from '../../deepARConfig.js'
import LoadingSpinner from './LoadingSpinner.js'
import RecordButton from './RecordButton.js'
import ResetButton from './ResetButton.js'
import Tutorial from './Tutorial.js'

// @ts-ignore
import { VideoAudioMerger } from './VideoAudioMerger.js'
import { cn } from '../utils/helpers.js'

interface ARScreenProps {}

const ARScreen: FC<ARScreenProps> = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isTutorialOpen, setIsTutorialOpen] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('')
  const [slot, setSlot] = useState('')
  const [allSlots, setAllSlots] = useState<string[]>([])
  const [activeThumbs, setActiveThumbs] = useState([])
  const [activeEffect, setActiveEffect] = useState('')
  const [track, setTrack] = useState('')
  const [isMicOpen, setIsMicOpen] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const handleMenuClick = (label: string) => {
    setActiveMenuItem(label)

    const slot = data.menu.find(
      (menuItem: { label: string }) => menuItem.label === label
    ).slot

    const thumbs = data.menu.find(
      (menuItem: { label: string }) => menuItem.label === label
    ).thumbs

    if (!thumbs) return

    setSlot(slot)
    setActiveThumbs(thumbs)
  }

  const handleThumbClick = async (effect: string, slot: string) => {
    setIsLoading(true)

    if (slot === 'music') {
      setTrack(effect)
      return
    }

    setActiveEffect(effect)

    try {
      await switchEffect(effect, slot)
      setAllSlots([...allSlots, slot])
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to switch effect:', error)
    }
  }

  const handleRecordClick = async () => {
    if (isRecording) {
      setIsLoading(true)
      setIsRecording(false)

      if (!track) {
        const blobData = await finishVideoRecording()
        const videoBlob = new Blob([blobData], { type: 'video/mp4' })
        const downloadLink = document.createElement('a')
        downloadLink.href = URL.createObjectURL(videoBlob)
        downloadLink.download = 'my-breakfast-mask.mp4'
        downloadLink.click()
        setIsLoading(false)
        setCountdown(null)
        return
      }

      const blobData = await finishVideoRecording()
      const videoBlob = new Blob([blobData], { type: 'video/mp4' })
      const videoAndAudio: any = await VideoAudioMerger(videoBlob, track)

      audioRef.current && audioRef.current.pause()
      setTrack('')

      videoAndAudio.click()
      setIsLoading(false)
      window.parent.postMessage({ type: 'video_downloaded' }, '*')
      setCountdown(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setCountdown(3)
    }
  }

  const handleReset = async () => {
    setIsLoading(true)
    await Promise.all(allSlots.map((slot: string) => clearEffect(slot)))
    setAllSlots([])
    setActiveEffect('')
    setTrack('')
    setActiveMenuItem('')
    setActiveThumbs([])
    setSlot('')
    setIsLoading(false)
    setIsRecording(false)
    setCountdown(null)
    audioRef.current && audioRef.current.pause()
  }

  useEffect(() => {
    if (!track) {
      setIsMicOpen(true)
      return
    }

    setIsMicOpen(false)
    audioRef.current && audioRef.current.play()
    setIsLoading(false)
  }, [track])

  useEffect(() => {
    let timer = 0
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) =>
          prevCountdown ? prevCountdown - 1 : null
        )
      }, 1000)
    } else if (countdown === 0) {
      const startRecording = async () => {
        setIsRecording(true)
        await startVideoRecording(isMicOpen)
      }
      audioRef.current && audioRef.current.play()
      startRecording()
    }
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div className="relative">
      <div className="fixed inset-0 w-svw h-svh">
        <div
          className={cn(
            'top-10 left-6 flex flex-col items-center',
            isRecording ? 'hidden' : 'absolute'
          )}
        >
          <ResetButton onClick={handleReset} />
          {data.menu.map((menuItem: { label: string; icon: string }) => (
            <MenuItem
              {...menuItem}
              isActive={menuItem.label === activeMenuItem}
              onClick={() => handleMenuClick(menuItem.label)}
              key={menuItem.label}
            />
          ))}
        </div>
        {isTutorialOpen ? (
          data.tutorial
            .filter((step: { step: number }) => step.step === tutorialStep)
            .map((step: any) => (
              <div key={step.step}>
                <Tutorial
                  {...step}
                  onClickNext={() => {
                    tutorialStep < 3
                      ? setTutorialStep(tutorialStep + 1)
                      : setIsTutorialOpen(false)
                  }}
                  onClickSkip={() => {
                    setIsTutorialOpen(false)
                  }}
                />
                {step.step === 2 && (
                  <RecordButton
                    onClick={handleRecordClick}
                    isRecording={isRecording}
                  />
                )}
              </div>
            ))
        ) : (
          <>
            <div
              className={cn(
                'bottom-40 left-1/2 -translate-x-1/2',
                isRecording ? 'hidden' : 'absolute'
              )}
            >
              <div className="gap-2 flex justify-center">
                {activeThumbs.length > 0 &&
                  activeThumbs.map((thumb: any) => (
                    <Thumb
                      {...thumb}
                      isActive={thumb.effect === activeEffect}
                      onClick={() => handleThumbClick(thumb.effect, slot)}
                      key={thumb.effect}
                    />
                  ))}
              </div>
            </div>
            <RecordButton
              onClick={handleRecordClick}
              isRecording={isRecording}
            />
            <audio ref={audioRef} src={track} />
            {isLoading && <LoadingSpinner />}
          </>
        )}
        {countdown !== null && countdown > 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-white text-9xl">{countdown}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default ARScreen
