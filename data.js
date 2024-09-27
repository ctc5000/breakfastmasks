import { FcCancel } from 'react-icons/fc'

const data = {
  menu: [
    {
      label: 'Аксессуары',
      icon: '/icons/accessoires',
      slot: 'accessoires',
      thumbs: [
        {
          effect: '/effects/Rog_sheki.deepar',
          icon: '/thumbs/rog_sheki.png',
        },
        {
          effect: '/effects/Hair_glasses.deepar',
          icon: '/thumbs/hair_glasses.png',
        },
        {
          effect: '/effects/Cap.deepar',
          icon: '/thumbs/cap.png',
        },
      ],
    },
    {
      label: 'Фон',
      icon: '/icons/background',
      slot: 'background',
      thumbs: [
        {
          effect: '/effects/Unicorn_bg.deepar',
          icon: '/thumbs/unicorn_bg.png',
        },
        {
          effect: '/effects/Choco_bg.deepar',
          icon: '/thumbs/choco_bg.png',
        },
        {
          effect: '/effects/Rainbow_bg.deepar',
          icon: '/thumbs/rainbow_bg.png',
        },
      ],
    },
    {
      label: 'Музыка',
      icon: '/icons/music',
      slot: 'music',
      thumbs: [
        {
          effect: '/music/chocozavr_music.mp3',
          icon: '/thumbs/chocozavr_music.png',
        },
        {
          effect: '/music/unicorn_music.mp3',
          icon: '/thumbs/unicorn_music.png',
        },
      ],
    },
    {
      label: 'Герои',
      icon: '/icons/heroes',
      slot: 'heroes',
      thumbs: [
        {
          effect: '/effects/Groom.deepar',
          icon: '/thumbs/groom.png',
        },
        {
          effect: '/effects/Unicorn.deepar',
          icon: '/thumbs/unicorn.png',
        },
        {
          effect: '/effects/Baddy.deepar',
          icon: '/thumbs/baddy.png',
        },
      ],
    },
    {
      label: 'Хлопья',
      icon: '/icons/flakes',
      slot: 'flakes',
      thumbs: [
        {
          effect: '/effects/Mix_hlopya.deepar',
          icon: '/thumbs/mix_hlopya.png',
        },
        {
          effect: '/effects/Ring_hlopya.deepar',
          icon: '/thumbs/ring_hlopya.png',
        },
        {
          effect: '/effects/Chocolate_hlopya.deepar',
          icon: '/thumbs/chocolate_hlopya.png',
        },
      ],
    },
  ],

  tutorial: [
    {
      step: 1,
      text: 'Чтобы начать, просто выбери любой из чудо-эффектов на панели слева',
      image: '/images/unicorn-tutorial.png',
    },
    {
      step: 2,
      text: 'Для того, чтобы снять свой ритуал нажми на кружок с задержкой',
      image: '/images/baddy-tutorial.png',
    },
    // {
    //   step: 3,
    //   text: 'Чтобы сохранить видео, нажми на кнопку «скачать»',
    //   image: '/images/groom-tutorial.png',
    // },
    {
      step: 3,
      text: 'Загрузи видео в галерею ритуалов и получи почетную грамоту повелителя завтраков и возможность выиграть инстакамеру',
      image: '/images/unicorn-tutorial.png',
    },
  ],
}

export default data
