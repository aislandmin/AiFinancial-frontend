import Header from "../common/header";
import Footer from "../common/footer";
import LoginWindow from "../common/login-window";
import { useEffect, useState } from "react";
import { getSessionUserIno } from "../common/local-storage";
import { Switch, Route } from "react-router-dom";
import ProductsList from "./components/products-list";
import TransactionsList from "./components/transactions-list";

function Products() {
  const [username, setUsername] = useState("");
  const sessionUsername = getSessionUserIno();
  console.log("enter Products ");

  useEffect(() => {
    if (sessionUsername !== "") {
      console.log("Products useEffect sessionUsername: ", sessionUsername);
      setUsername(sessionUsername);
    }
  }, [sessionUsername]);

  return (
    <>
      <Header curUsername={username} />
      {username === "" && <LoginWindow setCurUsername={setUsername} />}
      <div>
        <Switch>
          <Route path="/products/list">
            <ProductsList />
          </Route>
          <Route path="/products/transaction">
            <TransactionsList />
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default Products;
