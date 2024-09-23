declare module '@ffmpeg/ffmpeg' {
  export function createFFmpeg(options?: any): any
  export function fetchFile(data: any): Promise<Uint8Array>
}
