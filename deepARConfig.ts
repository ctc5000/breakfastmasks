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
          '621e86d3887f1c0af3f25004dc2e72e4dc6a71a34412ce84add4f80da28bdce0224c0a4c6a511563',
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

export const startVideoRecording = async () => {
  if (deepARInstance) {
    await deepARInstance.startVideoRecording()
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
