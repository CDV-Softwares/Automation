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
    code: ''
  })

  const onSubmit = async (e): Promise<void> => {
    e.preventDefault()
    try {
      console.log(import.meta.env.VITE_SERVER_URL)

      setFormState({ error: '', loading: true })
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/new-product', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      console.log(json)
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

  return (
    <main>
      <h1 className="ts">Automation</h1>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input onChange={onInputChange} type="text" name="id" placeholder="id" />
        <input onChange={onInputChange} type="text" name="name" placeholder="name" />
        <input onChange={onInputChange} type="text" name="brand" placeholder="brand" />
        <input onChange={onInputChange} type="text" name="model" placeholder="model" />
        <input onChange={onInputChange} type="text" name="year" placeholder="year" />
        <input onChange={onInputChange} type="text" name="code" placeholder="barcode" />
        <button className="ts" style={{ padding: '.5rem' }} disabled={formState.loading}>
          {formState.loading ? 'Loading' : 'Start'}
        </button>
      </form>
      <footer>
        <small>by @vitosdeveloper</small>
      </footer>
    </main>
  )
}

export default App
