import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onErrorMsg = value => {
    this.setState({errorMsg: value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({userId: '', pin: '', errorMsg: ''})
      this.onSuccessView(data.jwt_token)
    } else {
      this.onErrorMsg(data.error_msg)
    }
  }

  getInput1 = event => {
    this.setState({userId: event.target.value})
  }

  getInput2 = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container1">
        <div className="login-container2">
          <div className="login-img-container">
            <img
              className="login-img1"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form onSubmit={this.onSubmitForm} className="login-container3">
            <h1>Welcome Back!</h1>
            <label className="login-label1" htmlFor="input1">
              User ID
            </label>
            <input
              onChange={this.getInput1}
              value={userId}
              className="login-input1"
              placeholder="Enter User ID"
              type="text"
              id="input1"
            />
            <label className="login-label1" htmlFor="input2">
              PIN
            </label>
            <input
              onChange={this.getInput2}
              value={pin}
              className="login-input1"
              placeholder="Enter PIN"
              type="password"
              id="input2"
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            <p className="login-error">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
