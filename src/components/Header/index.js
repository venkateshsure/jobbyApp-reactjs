import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="head-main-con">
      <ul className="header-con">
        <Link to="/">
          <li className="para">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-website-logo"
            />
          </li>
        </Link>
        <ul className="header-link-con">
          <Link className="nav-item" to="/">
            <li className="para">Home</li>
          </Link>
          <Link className="nav-item" to="/jobs">
            <li className="para">Jobs</li>
          </Link>
        </ul>

        <button className="header-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)
