import App from './App/App'
import { loader as appLoader } from './app/appLoader'
import { action as appAction } from './app/appAction'
import Home from './routes/HomeRoute';
import Shop from './routes/shop_route/ShopRoute';
import { loader as shopLoader } from './routes/shop_route/shopRouteLoader'
import { action as shopAction } from './routes/shop_route/shopRouteAction'
import Product from './routes/item_route/ItemRoute';
import { action as productAction } from './routes/item_route/itemRouteAction'
import Cart from './routes/cart_route/CartRoute';
import { loader as cartLoader } from './routes/cart_route/cartRouteLoader'
import { action as cartAction } from './routes/cart_route/cartRouteAction'
import Error from './routes/ErrorRoute';

import {
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const routes = createRoutesFromElements(
  <Route
    path='/'
    element={<App />}
    errorElement={<Error />}
    loader={appLoader}
    action={appAction}
  >
    <Route errorElement={<Error />}>
      <Route 
        index={true} 
        element={<Home />}
      />
      <Route 
        path='/shop' 
        element={<Shop />}
        loader={shopLoader}
        action={shopAction}
      />
      <Route
        path='/shop/:itemId'
        element={<Product />}
        action={productAction}
      />
      <Route
        path='/cart'
        element={<Cart />}
        loader={cartLoader}
        action={cartAction}
      />
    </Route>
  </Route>
)

export default routes
