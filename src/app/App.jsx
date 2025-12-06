import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import useItems from '../util/useItems'
import { Outlet, useLoaderData, Form, useNavigate, useSubmit } from 'react-router-dom'

function App() {
  const { data, error, loading } = useItems()
  const { query, totalQty } = useLoaderData()
  const navigate = useNavigate()
  const submit = useSubmit()

  return (
    <>
      <Header totalQty={totalQty} >
        <Form method='post' role='search'>
          <input 
            type='search' 
            id='search'
            name='search'
            placeholder='Search item...'
            value={query}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
            onClick={() => {
              navigate('/shop')
            }}
          />
        </Form>
      </Header>
      <Main>
        <Outlet context={{ data, error, loading, query }} />
      </Main>
      <Footer />
    </>
  )
}

export default App
