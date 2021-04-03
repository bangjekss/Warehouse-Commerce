import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
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
import {
	LoginPage,
	NotFoundPage,
	RegisterPage,
	AdminDashboard,
	AdminProductPage,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { keepLoginAction } from "./redux/actions";
import { ProfileAdminPage, AdminTransactionPage } from "./pages/admin";
import { AdminSidebar, Header } from "./components";

const App = () => {
	const dispatch = useDispatch();
	const { roleId } = useSelector((state) => state.authReducer);

	useEffect(() => {
		dispatch(keepLoginAction());
	}, []);

	return (
		<div>
			<Route path="/" exact component={ProductPage} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/forget-password" component={ForgetPasswordPage} />
			<Route path="/change-password" component={ChangePasswordPage} />
			<Route path="/redirect" component={RedirectPage} />
			<Route path="/email-verification" component={EmailRedirectPage} />
			<Route path="/products" component={ProductPage} />
			<Route path="/cart" component={CartPage} />
			<Route path="/detail" component={DetailProductPage} />
			<Route path="/profile" component={ProfilePage} />
			<Route path="/checkout" component={CheckoutPage} />
			<div>
				<Header />
				<div className="d-flex">
					<div>
						<Route component={AdminSidebar} />
					</div>
					<div style={{ width: "100%" }}>
						<Route path="/admin/dashboard" component={AdminDashboard} />
						<Route path="/admin/products" component={AdminProductPage} />
						<Route
							path="/admin/transactions"
							component={AdminTransactionPage}
						/>
						<Route path="/admin/profile" component={ProfileAdminPage} />
					</div>
				</div>
			</div>
			{/* <>
				</>
				<>
				</>
				<Route path="/404" component={NotFoundPage} />
			</> */}
		</div>
	);
};

export default App;
