import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {FaShoppingBag, FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

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
    console.log(skills)

    return (
      <>
        <div className="job-item-container">
          <div className="first-part-container">
            <div className="img-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="star-rating-container">
                  <FaRegStar className="star-icon" />

                  <p className="rating-text">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-job-type-container">
                <div className="location-icon-location-container">
                  <IoLocationOutline className="location-icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="employment-type-icon-employment-type-container">
                  <FaShoppingBag />
                  <p className="job-type">{employmentType}</p>
                </div>
              </div>

              <div className="package-container">
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr className="item-hr-line" />
          <div className="second-part-container">
            <div className="description-visit-container">
              <h1 className="description-job-heading">Description</h1>
              <a
                className="visit-anchor"
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                alt="similar job company logo"
              >
                Visit
                <BiLinkExternal />
              </a>
            </div>
            <p className="description-para">{jobDescription}</p>
          </div>
          <h1>Skills</h1>

          <ul className="ul-job-details-container">
            {skills.map(each => (
              <li className="lli-job-details-container" key={each.name}>
                <img
                  src={each.image_url}
                  className="skill-img"
                  alt={each.name}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>

          <div className="company-life-img-container">
            <div className="life-heading-para-container">
              <h1>Life at Company</h1>

              <p>{lifeAtCompany.description}</p>
            </div>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-ul-container">
          {similarJobs.map(each => (
            <SimilarJobs
              key={each.id}
              each={each}
              employmentType={employmentType}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoading = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div className="btn-container-failure">
        <button
          onClick={this.getJobDetails}
          type="button"
          className="failure-job-details-btn"
        >
          Retry
        </button>
      </div>
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
        <div className="job-details-view-container">
          {this.renderJobItemDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails

/*  

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
*/
