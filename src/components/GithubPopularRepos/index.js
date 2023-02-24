import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusCheck = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
  initial: 'INITIAL',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    li: [],
    status: statusCheck.initial,
  }

  onGet = uniq => this.setState({activeId: uniq}, this.getData)

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({status: statusCheck.progress})

    const {activeId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }
    const data = await fetch(githubReposApiUrl, options)
    const response = await data.json()

    const updatedList = response.popular_repos.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))

    if (data.status === 200) {
      this.setState({li: updatedList, status: statusCheck.success})
    } else {
      this.setState({status: statusCheck.failure})
    }
  }

  renderSuccess = () => {
    const {li} = this.state

    return (
      <ul className="repo-container">
        {li.map(each => (
          <RepositoryItem item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1 className="failure-txt">Something Went Wrong</h1>
    </div>
  )

  renderProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderStatus = status => {
    switch (status) {
      case statusCheck.success:
        console.log('rendered')
        return this.renderSuccess()
      case statusCheck.failure:
        return this.renderFailure()
      case statusCheck.progress:
        return this.renderProgress()

      default:
        return null
    }
  }

  render() {
    const {status, activeId} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="filter-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              item={eachItem}
              key={eachItem.id}
              onGet={this.onGet}
              activeId={activeId}
            />
          ))}
        </ul>

        {this.renderStatus(status)}
      </div>
    )
  }
}

export default GithubPopularRepos
