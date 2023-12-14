import {Link} from 'react-router-dom'

import {IoLocationOutline} from 'react-icons/io5'
import {FaRegStar} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'

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
    <Link className="link-item" to={`/jobs/${id}`}>
      <li className="job-item">
        <div className="logo-title-loc-con">
          <div className="logo-title-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-con">
              <h1 className="title-heading">{title}</h1>
              <div className="rating-con">
                <FaRegStar className="rating-icon" />
                <p className="rating-heading">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-con">
            <div className="location-employee-con">
              <div className="location-con">
                <IoLocationOutline className="location-icon" />
                <p className="location-heading">{location}</p>
              </div>
              <div className="employee-type-con">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="employee-type-heading">{employmentType}</p>
              </div>
            </div>

            <p className="package-heading">{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="line" />

        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default GetJobDetails
