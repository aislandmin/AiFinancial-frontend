import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/home/home";
import Products from "./views/products/products";

export default function App() {
  return (
      <Router>
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
  );
}
