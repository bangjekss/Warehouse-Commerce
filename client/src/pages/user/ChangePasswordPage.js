import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { InputToolTip } from "../../components";
import { authChangePassword } from "../../redux/actions/authActions";

const ChangePasswordPage = (props) => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidCPassword, setIsValidCPassword] = useState(true);

	const { isLoading, id, errorMessage } = useSelector(
		(state) => state.authReducer
	);

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	setMessage(errorMessage);
	// }, [errorMessage]);

	useEffect(() => {
		if (newPassword.length > 0) checkPassword(newPassword);
		if (confirmPassword.length > 0) checkCPassword(confirmPassword);
	}, [newPassword, confirmPassword]);

	const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;
	let token;

	const checkPassword = (str) => {
		if (str.match(passwordRegex)) {
			setIsValidPassword(true);
		} else {
			setIsValidPassword(false);
		}
	};

	const checkCPassword = (str) => {
		if (str === newPassword) {
			setIsValidCPassword(true);
		} else {
			setIsValidCPassword(false);
		}
	};

	if (props.location.search) {
		token = new URLSearchParams(props.location.search).get("token");
	}

	if (!id) {
		return <Redirect to="/login" />;
	}

	const renderMain = () => {
		return (
			<>
				<div
					style={{ margin: "0 0 10px 0", fontWeight: "bold", fontSize: "24px" }}
				>
					Masukkan Password Baru
				</div>
				<div style={{ margin: "0 0 18px 0" }}>
					Minimal 8 huruf, 1 simbol, 1 angka, dan 1 huruf besar
				</div>
				<div>
					<input
						type={showPassword1 ? "text" : "password"}
						id="newPassword"
						placeholder="New Password"
						onChange={(e) => setNewPassword(e.target.value)}
						style={{ margin: "0 0 12px 0" }}
					/>
					<InputToolTip
						when={!isValidPassword}
						target="newPassword"
						title="Unvalid Password"
						text="Password must be 8-16 characters and at least
									contain an uppercase letter, a numbers, special
									character"
					/>
					<button onClick={() => setShowPassword1(!showPassword1)}>
						{showPassword1 ? (
							<i className="bi bi-eye-slash"></i>
						) : (
							<i className="bi bi-eye"></i>
						)}
					</button>
				</div>
				<div>
					<input
						type={showPassword2 ? "text" : "password"}
						id="confirmNewPassword"
						placeholder="Confirm New Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<InputToolTip
						when={!isValidCPassword}
						target="confirmNewPassword"
						title="Password doesn't match"
					/>
					<button onClick={() => setShowPassword2(!showPassword2)}>
						{showPassword2 ? (
							<i className="bi bi-eye-slash"></i>
						) : (
							<i className="bi bi-eye"></i>
						)}
					</button>
				</div>
				<div style={{ margin: "18px 0 18px 0" }}>{message}</div>
				<button
					disabled={isLoading}
					onClick={() => {
						if (newPassword !== confirmPassword) {
							return setMessage(
								"Pastikan password dan confirm password yang anda masukkan sama"
							);
						}

						if (token) {
							return dispatch(
								authChangePassword({
									newPassword,
									token,
								})
							);
						}

						dispatch(
							authChangePassword({
								newPassword,
								id,
							})
						);
					}}
				>
					{isLoading ? "Loading" : "Confirm"}
				</button>
			</>
		);
	};

	return (
		<div style={styles.style1}>
			<div style={styles.style2}>{renderMain()}</div>
		</div>
	);
};

const styles = {
	style1: {
		height: "600px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	style2: {
		backgroundColor: "white",
		boxShadow: "2.5px 2.5px 10px rgba(0,0,0,0.2)",
		textAlign: "center",
		height: "400px",
		width: "432px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: "24px",
	},
};

export default ChangePasswordPage;
