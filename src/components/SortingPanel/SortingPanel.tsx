import { convertLevel } from '../../utils/helpers'

interface SortingPanelInterface {
  selectedLevels: number[]
  toggleLevelFilter: (level: number) => void
  sortByNation: boolean
  toggleSortByNation: () => void
  sortByType: boolean
  toggleSortByType: () => void
}

function SortingPanel({
  selectedLevels,
  toggleLevelFilter,
  sortByNation,
  toggleSortByNation,
  sortByType,
  toggleSortByType,
}: SortingPanelInterface) {
  const minLevel = 1
  const maxLevel = 10

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
      <label>
        <input
          type='checkbox'
          checked={sortByNation}
          onChange={toggleSortByNation}
        />
        Сортировать по нации
      </label>
      <label>
        <input
          type='checkbox'
          checked={sortByType}
          onChange={toggleSortByType}
        />
        Сортировать по типу
      </label>
    </div>
  )
}

export default SortingPanel
