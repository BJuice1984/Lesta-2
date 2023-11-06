import { useEffect, useState } from 'react'
import { CardType, Vehicle } from '../../types'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Modal from '../Modal/Modal'
import ModalDescription from '../ModalDescription/ModalDescription'

function Card({ vehicle }: CardType) {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const controls = useAnimation()

  const backgroundStyle = {
    backgroundImage: `url(${vehicle.nation.icons.large})`,
  }

  const openModal = () => {
    setIsDescriptionModalOpen(true)
    controls.start('open')
  }

  const closeModal = () => {
    setIsDescriptionModalOpen(false)
    controls.start('closed')
  }

  return (
    <article className='card'>
      <h2 className='card__title' onClick={openModal}>
        <img
          className={'card__pic-flag'}
          src={vehicle.nation.icons.small}
          alt='Картинка. Флаг'
        ></img>
        <img
          className='card__pic-class'
          src={vehicle.type.icons.default}
          alt='Картинка. Иконка тип корабля'
        ></img>
        {vehicle.title}
      </h2>
      <div className='card__container' style={backgroundStyle}>
        <img
          className={'card__pic'}
          src={vehicle.icons.large}
          alt='Картинка. Корабль'
        ></img>
      </div>
      <AnimatePresence>
        {isDescriptionModalOpen && (
          <Modal
            component={<ModalDescription vehicle={vehicle} />}
            handleClose={closeModal}
          />
        )}
      </AnimatePresence>
    </article>
  )
}

export default Card
