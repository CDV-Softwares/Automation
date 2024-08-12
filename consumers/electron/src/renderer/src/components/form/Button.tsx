import { memo, PropsWithChildren } from 'react'

type Props = {
  formState: {
    loading: boolean
    error: string
  }
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, endpoint: string) => Promise<void>
  totalLength: number
  endpoint: string
}

const Button = ({
  formState,
  totalLength,
  onSubmit,
  endpoint,
  children
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <button
      className="ts"
      style={{ padding: '.25rem' }}
      disabled={formState.loading || totalLength > 60}
      onClick={(e) => onSubmit(e, endpoint)}
    >
      {formState.loading ? 'Loading' : children}
    </button>
  )
}

export default memo(Button)
