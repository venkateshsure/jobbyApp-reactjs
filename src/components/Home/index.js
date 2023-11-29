import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-con">
      <div className="home-text-con">
        <h1 className="home-head">Find The Job That Fits Your Life</h1>
        <p className="home-para">Millions of people are searching for jobs.</p>

        <Link to="/jobs">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
