export const VideoAudioMerger = (
  videoBlob: Blob | MediaSource,
  audioUrl: RequestInfo | URL
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(videoBlob)
      video.muted = true // Отключаем звук, чтобы избежать эха
      await video.play()

      const videoStream = (video as any).captureStream()

      const audioContext = new AudioContext()

      const response = await fetch(audioUrl)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer

      const destination = audioContext.createMediaStreamDestination()
      source.connect(destination)
      source.start()

      const audioStream = destination.stream

      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ])

      const mediaRecorder = new MediaRecorder(combinedStream)
      const chunks: BlobPart[] | undefined = []

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const combinedBlob = new Blob(chunks, { type: 'video/webm' })
        const combinedVideoUrl = URL.createObjectURL(combinedBlob)

        const downloadLink = document.createElement('a')
        downloadLink.href = combinedVideoUrl
        downloadLink.download = 'combined_video.webm'

        resolve(downloadLink)
      }

      mediaRecorder.start()

      const duration = Math.max(video.duration, audioBuffer.duration) * 1000
      setTimeout(() => {
        mediaRecorder.stop()
      }, duration)
    } catch (error) {
      reject(error)
    }
  })
}
