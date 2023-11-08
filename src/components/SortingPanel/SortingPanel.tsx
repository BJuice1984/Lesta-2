import { useQuery } from '@apollo/client'
import { convertLevel } from '../../utils/helpers'
import { NATIONS_AND_TYPES_QUERY } from '../../graphql/queries/nationQuery'

interface SortingPanelInterface {
  selectedLevels: number[]
  toggleLevelFilter: (level: number) => void
  selectedNation: string[]
  toggleNationFilter: (nation: string) => void
  selectedType: string[]
  toggleTypeFilter: (type: string) => void
}

function SortingPanel({
  selectedLevels,
  toggleLevelFilter,
  selectedNation,
  toggleNationFilter,
  selectedType,
  toggleTypeFilter,
}: SortingPanelInterface) {
  const minLevel = 1
  const maxLevel = 10

  const { loading, error, data } = useQuery(NATIONS_AND_TYPES_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const nations = data.nations
  const types = data.vehicleTypes
  console.log('🚀 ~ file: SortingPanel.tsx:33 ~ types:', types)

  const renderTypeInputs = () => {
    const typeInputs = []
    for (let type = 0; type < types.length; type++) {
      typeInputs.push(
        <label className='sortingPanel__label' key={type}>
          <input
            className='sortingPanel__input'
            type='checkbox'
            checked={selectedType.includes(types[type].icons.default)}
            onChange={() => toggleTypeFilter(types[type].icons.default)}
          />
          <img
            className={'card__pic-flag'}
            src={types[type].icons.default}
            alt='Картинка. Тип корабля'
          ></img>
        </label>
      )
    }
    return typeInputs
  }

  const renderNationInputs = () => {
    const nationInputs = []
    for (let nation = 0; nation < nations.length; nation++) {
      nationInputs.push(
        <label className='sortingPanel__label' key={nation}>
          <input
            className='sortingPanel__input'
            type='checkbox'
            checked={selectedNation.includes(nations[nation].icons.small)}
            onChange={() => toggleNationFilter(nations[nation].icons.small)}
          />
          <img
            className={'card__pic-flag'}
            src={nations[nation].icons.small}
            alt='Картинка. Флаг'
          ></img>
        </label>
      )
    }
    return nationInputs
  }

  const renderLevelInputs = () => {
    const levelInputs = []
    for (let level = minLevel; level <= maxLevel; level++) {
      levelInputs.push(
        <label className='sortingPanel__label' key={level}>
          <input
            className='sortingPanel__input'
            type='checkbox'
            checked={selectedLevels.includes(level)}
            onChange={() => toggleLevelFilter(level)}
          />
          {convertLevel(level)}
        </label>
      )
    }
    return levelInputs
  }

  return (
    <div className='sortingPanel'>
      <div className='sortingPanel__container'>
        <p className='sortingPanel__container-title'>Уровни</p>
        <div className='sortingPanel__container-inputs'>
          {renderLevelInputs()}
        </div>
      </div>
      <div className='sortingPanel__container'>
        <p className='sortingPanel__container-title'>Нации</p>
        <div className='sortingPanel__container-inputs'>
          {renderNationInputs()}
        </div>
      </div>
      <div className='sortingPanel__container'>
        <p className='sortingPanel__container-title'>Типы</p>
        <div className='sortingPanel__container-inputs sortingPanel__container-inputs_type_types'>
          {renderTypeInputs()}
        </div>
      </div>
      {/* <label>
        <input
          type='checkbox'
          checked={sortByNation}
          onChange={toggleSortByNation}
        />
        Сортировать по нации
      </label> */}
      {/* <label>
        <input
          type='checkbox'
          checked={sortByType}
          onChange={toggleSortByType}
        />
        Сортировать по типу
      </label> */}
    </div>
  )
}

export default SortingPanel
