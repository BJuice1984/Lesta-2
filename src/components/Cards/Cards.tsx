import { Vehicle } from '../../types'
import Card from '../Card/Card'

type SliceType = {
  slice: Vehicle[]
}

function Cards({ slice }: SliceType) {
  return (
    <section className='cards'>
      {slice.map(
        (slice: Vehicle, index: number): React.ReactNode => (
          <Card key={index} vehicle={slice} />
        )
      )}
    </section>
  )
}

export default Cards
