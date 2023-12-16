import './index.css'

const SalaryRange = props => {
  const {each, onSelectSalaryRange, isChecked} = props
  const {salaryRangeId, label} = each

  const onChangeSalary = event => {
    onSelectSalaryRange(event.target.id)
  }

  return (
    <li className="list-type-of-employ">
      <input
        onClick={onChangeSalary}
        type="radio"
        name="salaryRange"
        id={salaryRangeId}
        checked={isChecked}
      />
      <label className="label-text" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
