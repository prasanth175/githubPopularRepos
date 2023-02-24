// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {item, onGet, activeId} = props
  const {language, id} = item

  const onSelect = () => {
    onGet(id)
  }

  const className = activeId === id ? 'filter-btn selected' : 'filter-btn'

  return (
    <li className="filter-item">
      <button className={className} onClick={onSelect} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
