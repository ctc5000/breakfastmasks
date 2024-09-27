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
          'd9a1320dd024a826b93b51432c8975b617a436a9ffad7a5af58f4c21e842dda7d2eb0d1ea19f5269',
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
