import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryRange from '../SalaryRange'

import GetJobDetails from '../GetJobDetails'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    jobStatus: apiStatus.initial,
    jobs: [],
    jobsEmploymentType: [],
    salary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobStatus: apiStatus.inProgress})
    const token = Cookies.get('jwt_token')
    const {jobsEmploymentType, salary, searchInput} = this.state
    console.log(jobsEmploymentType)

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${jobsEmploymentType.join(
      ',',
    )}&minimum_package=${salary}&search=${searchInput}`

    const jobsOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const jobsResponse = await fetch(jobsApiUrl, jobsOption)

    if (jobsResponse.ok === true) {
      const jobsData = await jobsResponse.json()
      const fetchedJobs = jobsData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({jobStatus: apiStatus.success, jobs: fetchedJobs})
    } else {
      this.setState({jobStatus: apiStatus.failure})
    }
  }

  onSelectSalaryRange = value => {
    this.setState({salary: value}, this.getJobDetails)
  }

  onSearchInput = event => this.setState({searchInput: event.target.value})

  onSearchEnter = event => {
    console.log(event.key)
    /* if (event.key === 'Enter') {
      this.getJobDetails()
    } */ // event.key is used for "onKeyDown" event listener
  }

  clickSearchIcon = event => {
    console.log(event)
    if (event.type === 'click') {
      // event.type is used for "onClick" event listener for elements
      this.getJobDetails()
    }
  }

  selectedEmployment = value => {
    const {jobsEmploymentType} = this.state
    const index = jobsEmploymentType.indexOf(value)
    if (index !== -1) {
      jobsEmploymentType.splice(index, 1)
    } else {
      jobsEmploymentType.push(value)
    }
    this.setState({jobsEmploymentType}, this.getJobDetails)
  }

  onRenderJobsSuccess = () => {
    const {jobs, searchInput} = this.state
    return (
      <div className="success-con">
        <div className="search-input-con">
          <input
            placeholder="search"
            type="search"
            onChange={this.onSearchInput}
            className="search-input"
            value={searchInput}
            onKeyDown={this.onSearchEnter}
          />

          <BsSearch onClick={this.clickSearchIcon} className="search-icon" />
        </div>
        <ul className="get-job-details-ul-con">
          {jobs.length === 0 ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="no-jobs"
              />
              <h1 className="no-jobs-heading">No Jobs Found</h1>
              <p className="no-jobs-heading">
                We could not find any jobs. Try other filters
              </p>
            </>
          ) : (
            jobs.map(each => <GetJobDetails each={each} key={each.id} />)
          )}
        </ul>
      </div>
    )
  }

  onRenderJobsLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width={50} />
    </div>
  )

  onRenderJobsFailure = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-logo"
      />
      <h1 className="failure-head">OOps! something went wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.getJobDetails}
        type="button"
        className="failure-retry-button"
      >
        Retry
      </button>
    </div>
  )

  onRenderJobDetails = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case apiStatus.success:
        return this.onRenderJobsSuccess()
      case apiStatus.failure:
        return this.onRenderJobsFailure()
      case apiStatus.inProgress:
        return this.onRenderJobsLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-header-con">
          <div className="head-con">
            <div className="jobs-con">
              <div className="jobs-header-con">
                <ProfileDetails />

                <div className="hor-con">
                  <hr className="hor" />
                </div>

                <ul className="ul-jobs">
                  <h1 className="para">Type of Employment</h1>
                  {employmentTypesList.map(each => (
                    <TypeOfEmployment
                      selectedEmployment={this.selectedEmployment}
                      each={each}
                      key={each.employmentTypeId}
                    />
                  ))}
                </ul>

                <div className="hor-con">
                  <hr className="hor" />
                </div>
                <ul className="ul-jobs">
                  <h1 className="para">Salary Range</h1>
                  {salaryRangesList.map(each => (
                    <SalaryRange
                      onSelectSalaryRange={this.onSelectSalaryRange}
                      each={each}
                      key={each.salaryRangeId}
                    />
                  ))}
                </ul>
              </div>
            </div>

            <div className="job-details-head-con">
              {this.onRenderJobDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
