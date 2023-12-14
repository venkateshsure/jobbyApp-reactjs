import {FaShoppingBag, FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {each} = props

  return (
    <li className="similar-job-item">
      <div className="logo-title-location-container">
        <div className="logo-title-container">
          <img
            src={each.similarJobsCompanyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-heading">{each.similarJobsTitle}</h1>
            <div className="rating-container">
              <FaRegStar className="rating-icon" />

              <p className="rating-heading">{each.similarJobsRating}</p>
            </div>
          </div>
        </div>

        <h1 className="description-heading">Description</h1>
        <p className="description-text">{each.similarJobsJobDescription}</p>

        <div className="location-employee-container">
          <div className="location-container">
            <IoLocationOutline className="location-icon" />
            <p className="location-heading">{each.similarJobsLocation}</p>
          </div>
          <div className="employee-type-container">
            <FaShoppingBag className="breif-case-icon" />
            <p className="employee-type-heading">
              {each.similarJobsEmploymentType}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
