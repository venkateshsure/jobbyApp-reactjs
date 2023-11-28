import './index.css'

const TypeOfEmployment = props => {
  const {each, selectedEmployment} = props
  const {employmentTypeId, label} = each

  const selectedCheckbox = event => {
    selectedEmployment(event.target.id)
  }
  return (
    <li className="list-type-of-employ">
      <input onClick={selectedCheckbox} type="checkbox" id={employmentTypeId} />
      <label className="label-text" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default TypeOfEmployment
