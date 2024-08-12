import { ChangeEvent, memo } from 'react'
import { IProduct } from 'shared'

type Props = {
  onInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void
  formInputs: IProduct
  placeholder: string
  field: string
}

const Input = ({ onInputChange, formInputs, placeholder, field }: Props): JSX.Element => {
  return (
    <input
      onChange={onInputChange}
      type="text"
      value={formInputs[field]}
      name={field}
      placeholder={placeholder}
    />
  )
}

export default memo(Input)
