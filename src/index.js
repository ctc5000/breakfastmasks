import * as deepar from 'deepar'
import Carousel from './carousel.js'

// Log the version. Just in case.
console.log('Deepar version: ' + deepar.version)
;(async function () {
  window.effect = null

  const previewElement = document.getElementById('ar-screen')

  const accessoriesButton = document.getElementById('accessories')
  const backgroundButton = document.getElementById('background')
  const musicButton = document.getElementById('music')
  const heroesButton = document.getElementById('heroes')
  const flakesButton = document.getElementById('flakes')
  const closeButton = document.getElementById('close')
  const downloadButton = document.getElementById('download')

  const accessoriesThumbs = document.getElementById('accessories-thumbs')
  const backgroundThumbs = document.getElementById('background-thumbs')
  const flakesThumbs = document.getElementById('flakes-thumbs')

  const rogSheki = document.getElementById('rog-sheki')
  const hairGlasses = document.getElementById('hair-glasses')
  const chocolate = document.getElementById('chocolate')
  const mixHlopya = document.getElementById('mix-hlopya')
  const ringHlopya = document.getElementById('ring-hlopya')
  const chocolateHlopya = document.getElementById('chocolate-hlopya')

  const refreshButton = document.getElementById('refresh')

  const handleMenuClick = (event) => {
    const id = event.currentTarget.id
    const thumbs = [accessoriesThumbs, backgroundThumbs, flakesThumbs]

    const toggleVisibility = (elements, id) => {
      elements.forEach((element) => {
        if (element.id === id) {
          element.classList.add('flex')
          element.classList.remove('hidden')
        } else {
          element.classList.add('hidden')
          element.classList.remove('flex')
        }
      })
    }

    switch (id) {
      case 'accessories':
        toggleVisibility(thumbs, 'accessories-thumbs')
        break
      case 'background':
        toggleVisibility(thumbs, 'background-thumbs')
        break
      case 'music':
        toggleVisibility(thumbs, 'music-thumbs')
        break
      case 'heroes':
        toggleVisibility(thumbs, 'heroes-thumbs')
        break
      case 'flakes':
        toggleVisibility(thumbs, 'flakes-thumbs')
        break
    }
  }

  accessoriesButton.addEventListener('click', handleMenuClick)
  backgroundButton.addEventListener('click', handleMenuClick)
  musicButton.addEventListener('click', handleMenuClick)
  heroesButton.addEventListener('click', handleMenuClick)
  flakesButton.addEventListener('click', handleMenuClick)

  // trigger loading progress bar animation
  const loadingProgressBar = document.getElementById('loading-progress-bar')
  loadingProgressBar.style.width = '100%'

  const effectList = [
    'effects/Rog_sheki.deepar',
    'effects/Ring_hlopya.deepar',
    'effects/Mix_hlopya.deepar',
    'effects/Hair_glasses.deepar',
    'effects/Chocolate.deepar',
    'effects/Chocolate_hlopya.deepar',
  ]

  let deepAR = null

  try {
    deepAR = await deepar.initialize({
      licenseKey:
        'dd7a868a7487f284d9b509595330ddad14b2b128fb76cedd512c168388cc85bdad52a505a289d5e8',
      previewElement,
      effect: null,
      rootPath: './deepar-resources',
      additionalOptions: {
        cameraConfig: {
          // facingMode: 'environment'  // uncomment this line to use the rear camera
        },
      },
    })
  } catch (error) {
    console.error(error)
    document.getElementById('loading-screen').style.display = 'none'
    document.getElementById('permission-denied-screen').style.display = 'block'
    return
  }

  document.getElementById('loading-screen').style.display = 'none'
  document.getElementById('ar-screen').style.display = 'block'

  const startEffect = async (effect, slot) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    const activeEffect = effectList.find((item) => item === effect)
    console.log(loadingSpinner)

    loadingSpinner.style.display = 'block'
    if (window.effect !== activeEffect) {
      await deepAR.switchEffect(activeEffect, { slot: slot })
      window.effect = activeEffect
    }
    loadingSpinner.style.display = 'none'
  }

  rogSheki.addEventListener('click', () =>
    startEffect('effects/Rog_sheki.deepar', 'accessories')
  )
  hairGlasses.addEventListener('click', () =>
    startEffect('effects/Hair_glasses.deepar', 'accessories')
  )
  ringHlopya.addEventListener('click', () =>
    startEffect('effects/Ring_hlopya.deepar', 'flakes')
  )
  mixHlopya.addEventListener('click', () =>
    startEffect('effects/Mix_hlopya.deepar', 'flakes')
  )
  chocolateHlopya.addEventListener('click', () =>
    startEffect('effects/Chocolate_hlopya.deepar', 'flakes')
  )
  chocolate.addEventListener('click', () =>
    startEffect('effects/Chocolate.deepar', 'background')
  )
  refreshButton.addEventListener('click', async () => {
    await Promise.all([
      deepAR.clearEffect('accessories'),
      deepAR.clearEffect('background'),
      deepAR.clearEffect('music'),
      deepAR.clearEffect('heroes'),
      deepAR.clearEffect('flakes'),
    ])
  })

  // window.effect = effectList[0]

  // const glassesCarousel = new Carousel('carousel')
  // glassesCarousel.onChange = async (value) => {
  //   const loadingSpinner = document.getElementById('loading-spinner')

  //   if (window.effect !== effectList[value]) {
  //     loadingSpinner.style.display = 'block'
  //     await deepAR.switchEffect(effectList[value])
  //     window.effect = effectList[value]
  //   }
  //   loadingSpinner.style.display = 'none'
  // }
})()
