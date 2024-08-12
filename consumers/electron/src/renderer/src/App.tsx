import { ChangeEvent, useState } from 'react'
import { IProduct } from 'shared'
// import IProduct from '@shared/interfaces/IPoduct.ts'

function App(): JSX.Element {
  const [formState, setFormState] = useState<{ loading: boolean; error: string }>({
    loading: false,
    error: ''
  })
  const [formInputs, setFormInputs] = useState<IProduct>({
    id: '',
    name: '',
    brand: '',
    model: '',
    year: '',
    code: '',
    price: ''
  })

  const onSubmit = async (e, endpoint: string): Promise<void> => {
    e.preventDefault()
    try {
      setFormState({ error: '', loading: true })
      const res = await fetch(import.meta.env.VITE_SERVER_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message)
    } catch (err) {
      setFormState((p) => ({ ...p, error: err instanceof Error ? err.message : 'Error on submit' }))
    } finally {
      setFormState((p) => ({ ...p, loading: false }))
    }
  }

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target
    setFormInputs((p) => ({ ...p, [name]: value }))
  }

  const totalLengh =
    `${formInputs.name} ${formInputs.model} ${formInputs.brand} ${formInputs.year} ${formInputs.code}`
      .length

  return (
    <main>
      <h1 className="ts">Automation</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input onChange={onInputChange} type="text" name="id" placeholder="ex 1234" />
        <input onChange={onInputChange} type="text" name="name" placeholder="name" />
        <input onChange={onInputChange} type="text" name="brand" placeholder="brand" />
        <input onChange={onInputChange} type="text" name="model" placeholder="model" />
        <input onChange={onInputChange} type="text" name="year" placeholder="year" />
        <input onChange={onInputChange} type="text" name="code" placeholder="ex 123938949233" />
        <input onChange={onInputChange} type="text" name="price" placeholder="price" />
        <small className="ts">current title length: {totalLengh}</small>
        {formState.error.length > 0 && <small className="err">{formState.error}</small>}
        <button
          className="ts"
          style={{ padding: '.5rem' }}
          disabled={formState.loading || totalLengh > 60}
          onClick={(e) => onSubmit(e, '/api/first-step')}
        >
          {formState.loading ? 'Loading' : 'First Step'}
        </button>

        <button
          className="ts"
          style={{ padding: '.5rem' }}
          disabled={formState.loading || totalLengh > 60}
          onClick={(e) => onSubmit(e, '/api/second-step')}
        >
          {formState.loading ? 'Loading' : 'Second Step'}
        </button>

        <button
          className="ts"
          style={{ padding: '.5rem' }}
          disabled={formState.loading || totalLengh > 60}
          onClick={(e) => onSubmit(e, '/api/third-step')}
        >
          {formState.loading ? 'Loading' : 'Third Step'}
        </button>

        <button
          className="ts"
          style={{ padding: '.5rem' }}
          disabled={formState.loading || totalLengh > 60}
          onClick={(e) => onSubmit(e, '/api/fourth-step')}
        >
          {formState.loading ? 'Loading' : 'Fourth Step'}
        </button>
      </form>
      <footer>
        <small>by @vitosdeveloper</small>
      </footer>
    </main>
  )
}

export default App
