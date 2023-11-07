import usePagination from '../../hooks/usePagination'
import Cards from '../Cards/Cards'
import { useQuery } from '@apollo/client'
import { SHIPS_QUERY } from '../../graphql/queries/shipsQuery'
import SortingPanel from '../SortingPanel/SortingPanel'
import { useState } from 'react'
import { Vehicle } from '../../types'

type compareShipsType = (a: Vehicle, b: Vehicle) => number

function App() {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([])
  const [sortByNation, setSortByNation] = useState(false)
  const [sortByType, setSortByType] = useState(false)

  const toggleLevelFilter = (level: number) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(
        selectedLevels.filter((selectedLevel) => selectedLevel !== level)
      )
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }
  const toggleSortByNation = () => setSortByNation(!sortByNation)
  const toggleSortByType = () => setSortByType(!sortByType)
  const { handleLoadMore, numberOfShips } = usePagination()
  const { loading, error, data } = useQuery(SHIPS_QUERY)

  const vehicles = data?.vehicles || []

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)
  const compareShips: compareShipsType[] = [
    (a: Vehicle, b: Vehicle) => {
      if (selectedLevels.length > 0) {
        if (
          selectedLevels.includes(a.level) &&
          selectedLevels.includes(b.level)
        ) {
          return a.level - b.level
        } else if (selectedLevels.includes(a.level)) {
          return -1
        } else if (selectedLevels.includes(b.level)) {
          return 1
        }
      }
      return 0
    },
    (a: Vehicle, b: Vehicle) =>
      sortByNation ? a.nation.title.localeCompare(b.nation.title) : 0,
    (a: Vehicle, b: Vehicle) =>
      sortByType ? a.type.title.localeCompare(b.type.title) : 0,
  ]

  function sortVehicles(vehicles: Vehicle[], compareShips: compareShipsType[]) {
    return vehicles.slice().sort((a: Vehicle, b: Vehicle) => {
      for (const compareFn of compareShips) {
        const result = compareFn(a, b)
        if (result !== 0) {
          return result
        }
      }
      return 0
    })
  }

  const sortedVehicles = sortVehicles(vehicles, compareShips)

  const slice = sortedVehicles.slice(0, numberOfShips)

  return (
    <div className='page'>
      <div className='page__container'>
        <SortingPanel
          selectedLevels={selectedLevels}
          toggleLevelFilter={toggleLevelFilter}
          sortByNation={sortByNation}
          toggleSortByNation={toggleSortByNation}
          sortByType={sortByType}
          toggleSortByType={toggleSortByType}
        />
        <Cards slice={slice} />
        <button
          className='page__button'
          type='button'
          onClick={handleLoadMore}
          aria-label='Показать ещё'
        >
          Ещё
        </button>
      </div>
    </div>
  )
}

export default App
