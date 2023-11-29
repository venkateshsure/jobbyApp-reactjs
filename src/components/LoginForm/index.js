import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', errorMessage: '', showSubmitError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          placeholder="Username"
          className="input-text"
          id="username"
          type="text"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          placeholder="Password"
          className="input-text"
          id="password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    // console.log(this.props)
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMessage: data.error_msg, showSubmitError: true})
    }
  }

  render() {
    const {showSubmitError, errorMessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      console.log(token)
      return <Redirect to="/" />
    }

    return (
      <div className="con">
        <form className="form-con" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <div className="input-con">{this.renderUsername()}</div>
          <div className="input-con">{this.renderPassword()}</div>

          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="invalid-para">{errorMessage}*</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
