import { ChangeEvent, useState } from 'react'
import { IProduct } from 'shared'
import Button from './components/form/Button'
import Input from './components/form/Input'
// import IProduct from '@shared/interfaces/IPoduct.ts'

function App(): JSX.Element {
  const formInputsInitialValue = {
    id: '',
    name: '',
    brand: '',
    model: '',
    year: '',
    code: '',
    price: ''
  }
  const [formState, setFormState] = useState<{ loading: boolean; error: string }>({
    loading: false,
    error: ''
  })
  const [formInputs, setFormInputs] = useState<IProduct>(formInputsInitialValue)

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    endpoint: string
  ): Promise<void> => {
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

  const clearInputs = (): void => {
    setFormInputs(formInputsInitialValue)
  }

  const totalLength =
    `${formInputs.name} ${formInputs.model} ${formInputs.brand} ${formInputs.year} ${formInputs.code}`
      .length

  return (
    <main>
      <h1 className="ts">Automation</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          field="id"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="ex 1234"
        />
        <Input
          field="name"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="name"
        />
        <Input
          field="brand"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="brand"
        />
        <Input
          field="model"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="model"
        />
        <Input
          field="year"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="year"
        />
        <Input
          field="code"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="ex 123938949233"
        />
        <Input
          field="price"
          formInputs={formInputs}
          onInputChange={onInputChange}
          placeholder="price"
        />

        <small className="ts">current title length: {totalLength}</small>
        {formState.error.length > 0 && <small className="err">{formState.error}</small>}
        <Button
          formState={formState}
          onSubmit={onSubmit}
          totalLength={totalLength}
          endpoint="/api/first-step"
        >
          First Step
        </Button>
        <Button
          formState={formState}
          onSubmit={onSubmit}
          totalLength={totalLength}
          endpoint="/api/second-step"
        >
          Second Step
        </Button>
        <Button
          formState={formState}
          onSubmit={onSubmit}
          totalLength={totalLength}
          endpoint="/api/third-step"
        >
          Third Step
        </Button>
        <Button
          formState={formState}
          onSubmit={onSubmit}
          totalLength={totalLength}
          endpoint="/api/fourth-step"
        >
          Fourth Step
        </Button>
        <button onClick={clearInputs}>limpar inputs</button>
      </div>
      <footer>
        <small>by @vitosdeveloper</small>
      </footer>
    </main>
  )
}

export default App
