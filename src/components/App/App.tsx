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
  const [selectedNation, setSelectedNation] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])

  const toggleLevelFilter = (level: number) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(
        selectedLevels.filter((selectedLevel) => selectedLevel !== level)
      )
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  const toggleNationFilter = (nation: string) => {
    if (selectedNation.includes(nation)) {
      setSelectedNation(
        selectedNation.filter((selectedNation) => selectedNation !== nation)
      )
    } else {
      setSelectedNation([...selectedNation, nation])
    }
  }

  const toggleTypeFilter = (type: string) => {
    if (selectedType.includes(type)) {
      setSelectedType(
        selectedType.filter((selectedType) => selectedType !== type)
      )
    } else {
      setSelectedType([...selectedType, type])
    }
  }

  const { handleLoadMore, numberOfShips } = usePagination()
  const { loading, error, data } = useQuery(SHIPS_QUERY)

  const vehicles = data?.vehicles || []

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

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
    (a: Vehicle, b: Vehicle) => {
      if (selectedNation.length > 0) {
        const aNation = a.nation.icons.small
        const bNation = b.nation.icons.small
        if (
          selectedNation.includes(aNation) &&
          selectedNation.includes(bNation)
        ) {
          return aNation.localeCompare(bNation)
        } else if (selectedNation.includes(aNation)) {
          return -1
        } else if (selectedNation.includes(bNation)) {
          return 1
        }
      }
      return 0
    },
    (a: Vehicle, b: Vehicle) => {
      if (selectedType.length > 0) {
        const aType = a.type.icons.default
        const bType = b.type.icons.default
        if (selectedType.includes(aType) && selectedType.includes(bType)) {
          return aType.localeCompare(bType)
        } else if (selectedType.includes(aType)) {
          return -1
        } else if (selectedType.includes(bType)) {
          return 1
        }
      }
      return 0
    },
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
          selectedNation={selectedNation}
          toggleNationFilter={toggleNationFilter}
          selectedType={selectedType}
          toggleTypeFilter={toggleTypeFilter}
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
