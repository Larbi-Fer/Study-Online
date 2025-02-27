import './style.css'

type InputProps = {
    label: string,
    suffix?: React.ReactNode
} & React.HTMLProps<HTMLInputElement>

const Input = ({ label, type, id, suffix, dir, ...props } : InputProps) => {
  return (
    <div className="text-field">
      <label htmlFor={ id ?? '' }>{label}</label>
      <input dir='ltr' type={type} id={ id ?? '' } {...props} />
      {suffix ? <div className='input-suffix'>{suffix}</div> : ''}
    </div>
  )
}

export default Input