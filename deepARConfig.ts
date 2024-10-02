import * as deepar from 'deepar'

let deepARInstance: any = null
let isInitializing = false
let effect: string | null = null

export const initializeDeepAR = async (previewElement: HTMLElement) => {
  if (deepARInstance) return deepARInstance

  if (!isInitializing) {
    isInitializing = true
    try {
      deepARInstance = await deepar.initialize({
        licenseKey:
          'cb81542892e547b486a3c9a1bb57cc7867c69dee2c52e7e21715770df8b2ebbd1c87c948267be5a6',
        previewElement,
      })
      isInitializing = false
      return deepARInstance
    } catch (error) {
      console.error('Failed to initialize DeepAR:', error)
      isInitializing = false
      return
    }
  }
}

export const switchEffect = async (effectPath: string, slot: string) => {
  if (deepARInstance && effect !== effectPath) {
    await deepARInstance.switchEffect(effectPath, { slot: slot })
    effect = effectPath
  } else {
    console.error('DeepAR is not initialized')
  }
}

export const startVideoRecording = async (recordAudio = false) => {
  console.log('recordAudio', recordAudio)

  if (deepARInstance) {
    await deepARInstance.startVideoRecording({ recordAudio })
  }
}

export const finishVideoRecording = async () => {
  if (deepARInstance) {
    const video = await deepARInstance.finishVideoRecording()
    return video
  }
}

export const clearEffect = async (slot: string) => {
  if (deepARInstance) {
    try {
      await deepARInstance.clearEffect(slot)
    } catch (error) {
      console.error('Failed to clear effect:', error)
    }
  }
}
