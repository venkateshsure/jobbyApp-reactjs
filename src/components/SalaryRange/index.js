import './index.css'

const SalaryRange = props => {
  const {each, onSelectSalaryRange} = props
  const {salaryRangeId, label} = each

  const onChangeSalary = event => {
    onSelectSalaryRange(event.target.id)
  }

  return (
    <li className="list-type-of-employ">
      <input onClick={onChangeSalary} type="radio" id={salaryRangeId} />
      <label className="label-text" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
