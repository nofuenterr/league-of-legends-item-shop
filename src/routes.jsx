import App from './routes/App/App'
import Home from './routes/Main/Home';
import Shop from './routes/Main/Shop';
import SelectedItem from './routes/Main/SelectedItem';
import { action as selectedItemAction } from './routes/Main/SelectedItemAction'
import Cart from './routes/Main/Cart';
import { loader as cartLoader } from './routes/Main/CartLoader'
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
      <Route path='/shop/:itemId' element={<SelectedItem />} action={selectedItemAction} />
      <Route path='/cart' element={<Cart />} loader={cartLoader} />
    </Route>
  </Route>
)

export default routes
