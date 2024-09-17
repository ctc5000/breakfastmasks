import { FC, useRef, useState } from 'react'
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

    // if (slot === 'music') {
    //   setTrack(effect)
    //   return
    // }

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
      setIsRecording(false)
      const blobData = await finishVideoRecording()
      const videoBlob = new Blob([blobData], { type: 'video/mp4' })
      const url = URL.createObjectURL(videoBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'video.mp4'
      a.click()
    } else {
      setIsRecording(true)
      await startVideoRecording()
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
    // audioRef.current && audioRef.current.pause()
  }

  // useEffect(() => {
  //   if (!track) return

  //   audioRef.current && audioRef.current.play()
  //   setIsLoading(false)
  // }, [track])

  return (
    <div className="relative">
      <div className="fixed inset-0 w-svw h-svh">
        <div className="absolute top-10 left-6 flex flex-col items-center">
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
                    tutorialStep < 4
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
                {step.step > 2 && (
                  <div className="absolute bottom-5 left-6">
                    <MenuItem
                      label="Скачать"
                      icon="/icons/download"
                      onClick={() => {}}
                    />
                  </div>
                )}
              </div>
            ))
        ) : (
          <>
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2">
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
            <div className="absolute bottom-5 left-6">
              <MenuItem
                label="Скачать"
                icon="/icons/download"
                onClick={() => {}}
              />
            </div>
            <RecordButton
              onClick={handleRecordClick}
              isRecording={isRecording}
            />
            <audio ref={audioRef} src={track} />
            {isLoading && <LoadingSpinner />}
          </>
        )}
      </div>
    </div>
  )
}

export default ARScreen
