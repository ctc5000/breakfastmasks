import { FC } from 'react'

const LoadingSpinner: FC = () => {
  return (
    <div className="lds-ring" id="loading-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoadingSpinner
