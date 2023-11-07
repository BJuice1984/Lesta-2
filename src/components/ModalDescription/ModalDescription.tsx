import { CardType } from '../../types'
import { motion } from 'framer-motion'
import { convertLevel } from '../../utils/helpers'

function ModalDescription({ vehicle }: CardType) {
  const popupVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -50 },
  }

  const cardStyle = {
    backgroundColor: vehicle.nation.color,
  }

  return (
    <motion.div
      initial='closed'
      animate='open'
      exit='closed'
      variants={popupVariants}
    >
      <section className='modalDescription'>
        <h2 className='modalDescription__title'>
          {' '}
          <img
            className={'modalDescription__pic-flag'}
            src={vehicle.nation.icons.small}
            alt='Картинка. Флаг'
          ></img>
          {vehicle.title}
        </h2>
        <span className='modalDescription__subtitle'>
          type: {vehicle.type.title}
        </span>
        <span className='modalDescription__subtitle'>
          level: {convertLevel(vehicle.level)}
        </span>
        <span className='modalDescription__subtitle'>
          nation: {vehicle.nation.title}
        </span>
        <p className='modalDescription__description'>{vehicle.description}</p>
        <img
          className={'modalDescription__pic'}
          src={vehicle.icons.large}
          alt='Картинка. Корабль'
        ></img>
      </section>
    </motion.div>
  )
}

export default ModalDescription
