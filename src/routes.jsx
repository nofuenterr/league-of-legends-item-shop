import App from './routes/App/App'
import { loader as appLoader } from './routes/App/AppLoader'
import Home from './routes/Main/Home';
import Shop from './routes/Main/Shop';
import { action as shopAction } from './routes/Main/ShopAction'
import SelectedItem from './routes/Main/SelectedItem';
import { action as selectedItemAction } from './routes/Main/SelectedItemAction'
import Cart from './routes/Main/Cart';
import { loader as cartLoader } from './routes/Main/CartLoader'
import { action as cartAction } from './routes/Main/CartAction'
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
    loader={appLoader}
  >
    <Route errorElement={<ErrorPage />}>
      <Route index={true} element={<Home />} />
      <Route path='/shop' element={<Shop />} action={shopAction} />
      <Route path='/shop/:itemId' element={<SelectedItem />} action={selectedItemAction} />
      <Route path='/cart' element={<Cart />} loader={cartLoader} action={cartAction} />
    </Route>
  </Route>
)

export default routes
