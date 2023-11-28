import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {FaShoppingBag, FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'

import Header from '../Header'
import Skills from '../Skills'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {status: apiStatus.initial, similarJobs: [], jobDetails: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, option)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const fetchedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        location: data.job_details.location,
        jobDescription: data.job_details.job_description,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
      }

      console.log(fetchedJobDetails)

      const fetchedSimilarJobs = data.similar_jobs.map(each => ({
        similarJobsCompanyLogoUrl: each.company_logo_url,
        similarJobsEmploymentType: each.employment_type,
        similarJobsId: each.id,
        similarJobsLocation: each.location,
        similarJobsJobDescription: each.job_description,
        similarJobsRating: each.rating,
        similarJobsTitle: each.title,
      }))

      console.log(fetchedSimilarJobs)
      this.setState({
        status: apiStatus.success,
        similarJobs: fetchedSimilarJobs,
        jobDetails: fetchedJobDetails,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      location,
      jobDescription,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-details-main-con">
        <div className="render-success-header-con">
          <div className="job-item-fir-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-logo"
            />
            <div className="job-details-sec-con">
              <p className="job-details-title-con">{title}</p>
              <div className="job-details-thi-con">
                <div className="job-details-star-logo">
                  <FaRegStar />
                </div>
                <p className="job-details-title-con">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-employment-con">
            <div className="job-details-employment-fir-con">
              <div className="job-details-location">
                <IoLocationOutline />
                <p className="description">{location}</p>
              </div>
              <div className="job-details-internship">
                <FaShoppingBag />
                <p className="description">{employmentType}</p>
              </div>
            </div>

            <div className="job-details-package">
              <p className="description">{packagePerAnnum}</p>
            </div>
          </div>
          <div className="job-details-hr-con">
            <hr />
          </div>
          <div className="job-details-description-con">
            <div className="job-details-description">
              <h1 className="description">Description</h1>
              <a
                className="job-details-anchor"
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer noreferrer"
                alt="similar job company logo"
              >
                Visit
              </a>
            </div>
            <p className="job-description-content">{jobDescription}</p>
          </div>
          <div className="skill-head-con">
            <h1 className="description">Skills</h1>
            <ul className="skill-con">
              {skills.map(each => (
                <Skills each={each} key={each.name} />
              ))}
            </ul>
          </div>
          <div className="life-at-company-head-con">
            <h1 className="description">Life at Company</h1>

            <div className="life-at-company-con">
              <p className="life-at-company-para">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.image_url}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-con">
          <h1 className="description">Similar Jobs</h1>
          <ul className="similar-jobs-head-con">
            {similarJobs.map(each => (
              <li className="similar-jobs-each-main-con">
                <div className="each-similar-jobs-con">
                  <img
                    src={each.similarJobsCompanyLogoUrl}
                    alt="similar job company logo"
                    className="job-item-logo"
                  />
                  <div className="job-details-sec-con">
                    <h1 className="job-details-title-con">
                      {each.similarJobsTitle}
                    </h1>
                    <div className="job-details-thi-con">
                      <div className="job-details-star-logo">
                        <FaRegStar />
                      </div>
                      <p className="job-details-title-con">
                        {each.similarJobsRating}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="similar-jobs-description-con">
                  <h1 className="description">Description</h1>
                  <p className="description">
                    {each.similarJobsJobDescription}
                  </p>
                </div>
                <div className="similar-jobs-loc-int-con">
                  <div className="similar-jobs-location">
                    <IoLocationOutline />
                    <p className="description">{each.similarJobsLocation}</p>
                  </div>
                  <div className="similar-jobs-internship">
                    <FaShoppingBag />
                    <p className="description">
                      {each.similarJobsEmploymentType}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-logo"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
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

  renderJobItemDetails = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderSuccess()
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-con">
          {this.renderJobItemDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
