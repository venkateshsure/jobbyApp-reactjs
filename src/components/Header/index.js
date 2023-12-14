import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-con">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-bar-mobile-icons-con">
            <li>
              <Link to="/">
                <AiFillHome className="nav-item-mobile-link" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsFillBriefcaseFill className="nav-item-mobile-link" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
                aria-label="Logout"
              >
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-bar-large-con">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>
          </ul>

          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
