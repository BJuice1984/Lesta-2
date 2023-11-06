import { FC } from 'react'

type ModalOverlayType = {
  isModalOpen: boolean
}

const ModalOverlay: FC<ModalOverlayType> = (isModalOpen) => {
  return <div className={`modal ${isModalOpen ? 'modalOpened' : ''}`}></div>
}

export default ModalOverlay
