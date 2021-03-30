import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoaderPage } from "../../components";
import { emailVerificationSuccessAction } from "../../redux/actions";

const EmailRedirectPage = (props) => {
	const dispatch = useDispatch();
	const { isLogin, roleId } = useSelector((state) => state.authReducer);
	const verify = new URLSearchParams(props.location.search).get("verify");
	const emailQuery = new URLSearchParams(props.location.search).get("email");
	const usernameQuery = new URLSearchParams(props.location.search).get(
		"username"
	);
	const localEmail = localStorage.getItem("email");
	const localUsername = localStorage.getItem("username");

	useEffect(() => {
		if (props.location.search) {
			if (
				verify &&
				emailQuery === localEmail &&
				usernameQuery === localUsername
			) {
				dispatch(emailVerificationSuccessAction(verify));
			}
		}
	}, []);

	if (isLogin && roleId === 2) return <Redirect to="/products" />;

	return <LoaderPage />;
};

export default EmailRedirectPage;
