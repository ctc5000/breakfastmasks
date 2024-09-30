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
          'eefa0a43fe9aced7cca6c61806e056f16a9d0317c8f64214db312ad09ddf4afcf8822e59dca667d7',
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
