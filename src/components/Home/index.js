import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  console.log('kavya')

  const removeToken = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <nav className="home-nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button onClick={removeToken} className="home-btn" type="button">
          Logout
        </button>
      </nav>
      <div className="home-container2">
        <h1 className="home-h1">Your Flexibility, Our Excellence</h1>
        <img
          className="home-img2"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
