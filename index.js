const $button = document.querySelector('#play')
const $stop = document.querySelector('#stop')

$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: { ideal: 30 } },
  })
  const mediarecorder = new MediaRecorder(media, {
    mimeType: 'video/webm;codecs=vp8,opus',
    // mimeType: 'video/mp4; codecs="avc1.424028, mp4a.40.2"',
  })
  mediarecorder.start()

  const [video] = media.getVideoTracks()
  video.addEventListener('ended', () => {
    mediarecorder.stop()
  })

  mediarecorder.addEventListener('dataavailable', e => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(e.data)
    link.download = 'captura.webm' // mp4
    link.click()
  })

  $stop.addEventListener('click', () => {
    mediarecorder.stop()
  })
})
