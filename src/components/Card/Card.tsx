import { Vehicle } from '../../types'

type CardType = {
  vehicle: Vehicle
}

function Card({ vehicle }: CardType) {
  return (
    <article className='card'>
      <h2 className='card__title'>{vehicle.title}</h2>
      <p className='card__description'>{vehicle.description}</p>
    </article>
  )
}

export default Card
