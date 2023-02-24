// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = item

  return (
    <li className="repo-item">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="repo-heading">{name}</h1>
      <div className="count-container">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="count-txt">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="count-txt">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="count-txt">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
