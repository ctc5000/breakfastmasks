import * as FFmpeg from '@ffmpeg/ffmpeg'

const { createFFmpeg, fetchFile } = FFmpeg

const ffmpeg = createFFmpeg({ log: true })

export const VideoAudioMerger = (videoBlob, audioUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Инициализация ffmpeg
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
      }

      // Установка логгера
      ffmpeg.setLogger(({ type, message }) => {
        console.log(`[${type}] ${message}`)
      })

      // Чтение видео файла
      const videoData = await fetchFile(videoBlob)

      // Определение формата видео
      const videoType = videoBlob.type
      let videoExtension = ''
      if (videoType === 'video/mp4') {
        videoExtension = 'mp4'
      } else if (videoType === 'video/webm') {
        videoExtension = 'webm'
      } else {
        throw new Error('Unsupported video format')
      }

      const videoFileName = `inputVideo.${videoExtension}`
      ffmpeg.FS('writeFile', videoFileName, videoData)

      const outputFileName = 'my-breakfast-mask.mp4'

      if (audioUrl) {
        // Если аудио URL предоставлен
        // Загрузка и чтение аудио файла
        const response = await fetch(audioUrl)

        if (!response.ok) {
          throw new Error(`Failed to fetch audio file: ${response.statusText}`)
        }

        const audioArrayBuffer = await response.arrayBuffer()
        const audioData = new Uint8Array(audioArrayBuffer)

        ffmpeg.FS('writeFile', 'inputAudio.mp3', audioData)

        // Объединение видео и аудио в MP4 файл
        await ffmpeg.run(
          '-i',
          videoFileName,
          '-i',
          'inputAudio.mp3',
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          '-strict',
          'experimental',
          '-shortest',
          outputFileName
        )
      } else {
        // Если аудио URL не предоставлен
        // Конвертация видео в MP4 без аудио
        await ffmpeg.run(
          '-i',
          videoFileName,
          '-c:v',
          'copy',
          '-an',
          outputFileName
        )
      }

      // Чтение результата
      const data = ffmpeg.FS('readFile', outputFileName)

      // Создание Blob и URL для MP4 файла
      const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' })
      const mp4Url = URL.createObjectURL(mp4Blob)

      // Создание ссылки для скачивания
      const downloadLink = document.createElement('a')
      downloadLink.href = mp4Url
      downloadLink.download = outputFileName

      resolve(downloadLink)
    } catch (error) {
      console.error('Error in VideoAudioMerger:', error)
      reject(error)
    }
  })
}
