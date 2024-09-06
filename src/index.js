import * as deepar from 'deepar'

// Log the version. Just in case.
console.log('Deepar version: ' + deepar.version)

const categories = [
  'accessories',
  // 'background', 'music',
  // 'heroes',
  'flakes',
]

;(async function () {
  window.effect = null

  const previewElement = document.getElementById('ar-screen')

  const accessoriesButton = document.getElementById('accessories')
  // const backgroundButton = document.getElementById('background')
  // const musicButton = document.getElementById('music')
  const heroesButton = document.getElementById('heroes')
  const flakesButton = document.getElementById('flakes')

  const rogSheki = document.getElementById('rog-sheki')
  const hairGlasses = document.getElementById('hair-glasses')
  const chocolate = document.getElementById('chocolate')
  const mixHlopya = document.getElementById('mix-hlopya')
  const ringHlopya = document.getElementById('ring-hlopya')
  const chocolateHlopya = document.getElementById('chocolate-hlopya')
  const baddy = document.getElementById('baddy')
  const groom = document.getElementById('groom')
  const unicorn = document.getElementById('unicorn')

  const thumbs = [
    rogSheki,
    hairGlasses,
    chocolate,
    mixHlopya,
    ringHlopya,
    chocolateHlopya,
    // baddy,
    // groom,
    // unicorn,
  ]

  const refreshButton = document.getElementById('refresh')
  const closeButton = document.getElementById('close')
  const downloadButton = document.getElementById('download')

  const handleMenuClick = (event) => {
    const menuId = event.currentTarget.id
    const allMenus = document.querySelectorAll('[id*="-thumbs"]')
    const shownMenu = document.querySelector(`#${menuId}-thumbs`)

    allMenus.forEach((menu) => {
      if (menu !== shownMenu) {
        menu.classList.add('hidden')
        menu.classList.remove('flex')
      } else {
        menu.classList.remove('hidden')
        menu.classList.add('flex')
      }
    })
  }

  accessoriesButton.addEventListener('click', handleMenuClick)
  // backgroundButton.addEventListener('click', handleMenuClick)
  // musicButton.addEventListener('click', handleMenuClick)
  // heroesButton.addEventListener('click', handleMenuClick)
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

  const startEffect = async (event, effect, slot) => {
    const activeButton = event.currentTarget

    thumbs.forEach((thumb) => {
      if (thumb === activeButton) {
        thumb.style.borderStyle = 'solid'
        thumb.style.borderWidth = '1px'
        thumb.style.borderColor = '#E92984'
      } else {
        thumb.style.borderStyle = 'none'
      }
    })

    if (window.effect !== effect) {
      const loadingSpinner = document.getElementById('loading-spinner')
      loadingSpinner.style.display = 'block'
      await deepAR.switchEffect(effect, { slot: slot })
      window.effect = effect
      loadingSpinner.style.display = 'none'
    }
  }

  rogSheki.addEventListener('click', (e) =>
    startEffect(e, 'effects/Rog_sheki.deepar', 'accessories')
  )
  hairGlasses.addEventListener('click', (e) =>
    startEffect(e, 'effects/Hair_glasses.deepar', 'accessories')
  )
  ringHlopya.addEventListener('click', (e) =>
    startEffect(e, 'effects/Ring_hlopya.deepar', 'flakes')
  )
  mixHlopya.addEventListener('click', (e) =>
    startEffect(e, 'effects/Mix_hlopya.deepar', 'flakes')
  )
  chocolateHlopya.addEventListener('click', (e) =>
    startEffect(e, 'effects/Chocolate_hlopya.deepar', 'flakes')
  )
  chocolate.addEventListener('click', (e) =>
    startEffect(e, 'effects/Chocolate.deepar', 'background')
  )
  // baddy.addEventListener('click', (e) =>
  //   startEffect(e, 'effects/Baddy.deepar', 'heroes')
  // )
  // groom.addEventListener('click', (e) =>
  //   startEffect(e, 'effects/Groom.deepar', 'heroes')
  // )
  // unicorn.addEventListener('click', (e) =>
  //   startEffect(e, 'effects/Unicorn.deepar', 'heroes')
  // )
  refreshButton.addEventListener('click', async () => {
    await Promise.all(categories.map((slot) => deepAR.clearEffect(slot)))
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
