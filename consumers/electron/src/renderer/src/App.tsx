import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [data, setData] = useState<string>('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await fetch('http://localhost:3000/')
      const json = await res.json()

      if (!('message' in json)) return
      console.log(json)
      setData(json.message as string)
    }

    fetchData()
  }, [])
  console.log(data)

  return (
    <>
      <h1 className="ts">Orkon</h1>
      <h1 className="ts">{data.length ? data : 'Loading...'}</h1>
    </>
  )
}

export default App
