import './index.css'

const Skills = props => {
  const {each} = props
  return (
    <li className="each-skill-con">
      <img
        src={each.image_url}
        alt={each.name}
        className="job-details-skill-logo"
      />
      <p className="skill-para">{each.name}</p>
    </li>
  )
}

export default Skills
