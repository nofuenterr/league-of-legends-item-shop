import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'

import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}

export default App
