import {Link} from 'react-router-dom'

import {IoLocationOutline} from 'react-icons/io5'
import {FaShoppingBag, FaRegStar} from 'react-icons/fa'

import './index.css'

const GetJobDetails = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <Link className="list-container" to={`/jobs/${id}`}>
      <li className="get-job-details-li-con">
        <div className="get-job-details-logo-text-con">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="get-job-details-title-rating">
            <h1>{title}</h1>
            <FaRegStar className="star-con" />
            <p>{rating}</p>
          </div>
        </div>
        <div className="location-employment-con">
          <div className="location">
            <IoLocationOutline />
            <p>{location}</p>
          </div>
          <div className="location">
            <FaShoppingBag />
            <p>{employmentType}</p>
          </div>

          <div className="location">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <div className="hor-con">
          <hr className="hor" />
        </div>
        <div className="jobDescription-con">
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default GetJobDetails
