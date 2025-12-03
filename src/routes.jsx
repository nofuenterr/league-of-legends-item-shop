import App from './routes/App/App'

import {
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
  >
  </Route>
)

export default routes