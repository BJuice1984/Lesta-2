import { useQuery } from '@apollo/client'
import { SHIPS_QUERY } from '../../graphql/queries/shipsQuery'
import Card from '../Card/Card'
import { Vehicle } from '../../types'
import usePagination from '../../hooks/usePagination'

function App() {
  const { handleLoadMore, numberOfShips } = usePagination()

  const { loading, error, data } = useQuery(SHIPS_QUERY)

  const vehicles = data?.vehicles || []

  const slice = vehicles.slice(0, numberOfShips)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)
  return (
    <div className='page'>
      <div className='page__container'>
        {slice.map(
          (slice: Vehicle, index: number): React.ReactNode => (
            <Card key={index} vehicle={slice} />
          )
        )}
      </div>
      <button type='button' onClick={handleLoadMore} aria-label='Показать ещё'>
        Ещё
      </button>
    </div>
  )
}

export default App
