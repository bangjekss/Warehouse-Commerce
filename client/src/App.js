import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Sidebar } from "./components/admin";
import {
  ProductPage,
  ChangePasswordPage,
  ForgetPasswordPage,
  RedirectPage,
  CartPage,
  DetailProductPage,
  EmailRedirectPage,
  CheckoutPage,
  ProfilePage,
} from "./pages/user";
import { LoginPage, NotFoundPage, RegisterPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { keepLoginAction } from "./redux/actions";
import {
  Dashboard,
  ProductAdminPage,
  ProfileAdminPage,
  AdminTransactionPage,
} from "./pages/admin";

const App = () => {
  const dispatch = useDispatch();
  const { roleId } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(keepLoginAction());
  }, []);

  return (
    <div>
      <>
        <Header />
        <Route path="/" exact component={ProductPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forget-password" component={ForgetPasswordPage} />
        <Route path="/change-password" component={ChangePasswordPage} />
        <Route path="/redirect" component={RedirectPage} />
        <Route path="/email-verification" component={EmailRedirectPage} />
        {roleId === 1 ? (
          <>
            <div className="d-flex">
              <div>
                <Route component={Sidebar} />
              </div>
              <div style={{ width: "100%" }}>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/products" component={ProductAdminPage} />
                <Route
                  path="/admin/transactions"
                  component={AdminTransactionPage}
                />
                <Route path="/admin/profile" component={ProfileAdminPage} />
              </div>
            </div>
          </>
        ) : (
          <>
            <Route path="/products" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/detail" component={DetailProductPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/checkout" component={CheckoutPage} />
          </>
        )}
        <Route path="/404" component={NotFoundPage} />
      </>
    </div>
  );
};

export default App;
