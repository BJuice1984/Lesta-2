import { Vehicle } from '../../types'

type CardType = {
  vehicle: Vehicle
}

function Card({ vehicle }: CardType) {
  const cardStyle = {
    backgroundColor: vehicle.nation.color,
  }

  const backgroundStyle = {
    backgroundImage: `url(${vehicle.nation.icons.large})`,
  }

  return (
    <article className='card' style={cardStyle}>
      <h2 className='card__title'>
        <img
          className='card__pic'
          src={vehicle.type.icons.default}
          alt='Картинка. Иконка тип корабля'
        ></img>{' '}
        {vehicle.title} <span className='card__span'>{vehicle.type.title}</span>
      </h2>
      <p className='card__description'>{vehicle.description}</p>
      <div className='card__container' style={backgroundStyle}>
        <div className='card__vignette'></div>
        <img
          className={'card__pic'}
          src={vehicle.icons.large}
          alt='Картинка. Корабль'
        ></img>
      </div>
      <p className='card__description'>level: {vehicle.level}</p>
      <p className='card__description'>nation: {vehicle.nation.title}</p>
    </article>
  )
}

export default Card
