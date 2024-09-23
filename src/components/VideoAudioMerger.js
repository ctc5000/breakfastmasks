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

      // Чтение видео файла
      const videoData = await fetchFile(videoBlob)

      // Загрузка и чтение аудио файла
      const response = await fetch(audioUrl)
      const audioArrayBuffer = await response.arrayBuffer()
      const audioData = new Uint8Array(audioArrayBuffer)

      // Запись файлов во внутреннюю файловую систему ffmpeg
      ffmpeg.FS('writeFile', 'inputVideo.webm', videoData)
      ffmpeg.FS('writeFile', 'inputAudio.mp3', audioData)

      // Объединение видео и аудио в MP4 файл
      await ffmpeg.run(
        '-i',
        'inputVideo.webm',
        '-i',
        'inputAudio.mp3',
        '-c:v',
        'copy',
        '-c:a',
        'aac',
        '-strict',
        'experimental',
        '-shortest',
        'output.mp4'
      )

      // Чтение результата
      const data = ffmpeg.FS('readFile', 'output.mp4')

      // Создание Blob и URL для MP4 файла
      const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' })
      const mp4Url = URL.createObjectURL(mp4Blob)

      // Создание ссылки для скачивания
      const downloadLink = document.createElement('a')
      downloadLink.href = mp4Url
      downloadLink.download = 'my-breakfast-mask.mp4'

      resolve(downloadLink)
    } catch (error) {
      reject(error)
    }
  })
}
