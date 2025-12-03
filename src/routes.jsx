import App from './routes/App/App'
import Home from './routes/Main/Home';
import Shop from './routes/Main/Shop';
import Cart from './routes/Main/Cart';
import ErrorPage from './error-page';

import {
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const routes = createRoutesFromElements(
  <Route
    path='/'
    element={<App />}
    errorElement={<ErrorPage />}
  >
    <Route errorElement={<ErrorPage />}>
      <Route index={true} element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/cart' element={<Cart />} />
    </Route>
  </Route>
)

export default routes