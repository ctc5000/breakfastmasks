import { FC } from 'react'

interface MenuItemProps {
  label: string
  icon: string
  isActive?: boolean
  onClick: () => void
}

const MenuItem: FC<MenuItemProps> = ({ label, icon, isActive, onClick }) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-1 mb-3"
      onClick={handleClick}
    >
      <div className="bg-white bg-opacity-40 rounded p-1">
        <div className="w-full h-full">
          <img
            src={isActive ? `${icon}-active.svg` : `${icon}.svg`}
            className="w-[30px] h-[30px]"
          />
        </div>
      </div>
      <p className="text-white text-[9px]">{label}</p>
    </div>
  )
}

export default MenuItem
