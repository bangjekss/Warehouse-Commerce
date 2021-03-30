import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
	authRegisteredCheck,
	authSecurityAnswerCheck,
	authChangePasswordEmailRequest,
} from "../../redux/actions/authActions";

const ForgetPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [answer, setAnswer] = useState("");

	const dispatch = useDispatch();
	const {
		changePermitted,
		securityQuestion,
		isLoading,
		errorMessage,
		id,
		isLogin,
	} = useSelector((state) => state.authReducer);

	const emailLogin = useSelector((state) => state.authReducer.email);

	if (changePermitted) {
		return <Redirect to="/change-password" />;
	}

	const emailCheck = () => {
		return (
			<>
				<div style={{ margin: "8px 0 18px 0" }}>Masukkan email anda</div>
				<input
					type="text"
					id="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					style={{ margin: "0 0 10px 0" }}
				/>
				<div style={{ textAlign: "center" }}>{errorMessage}</div>
				<button
					onClick={() => dispatch(authRegisteredCheck({ email }))}
					style={{ margin: "12px 0 0 0" }}
				>
					Confirm
				</button>
			</>
		);
	};

	const securityAnswerCheck = () => {
		return (
			<>
				<div style={{ margin: "8px 0 0px 0" }}>Security Question:</div>
				<div style={{ margin: "0 0 18px 0" }}>{securityQuestion}</div>
				<input
					type="text"
					id="securityAnswer"
					placeholder="Jawaban Anda"
					onChange={(e) => setAnswer(e.target.value)}
					style={{ margin: "0px 0 14px 0" }}
				/>
				<div style={{ margin: "0 0 12px 0" }}>{errorMessage}</div>
				<button
					onClick={() => {
						if (email) {
							return dispatch(
								authSecurityAnswerCheck({
									email,
									answer,
								})
							);
						}
						return dispatch(
							authSecurityAnswerCheck({
								email: emailLogin,
								answer,
							})
						);
					}}
					style={{ margin: "0 0 18px 0" }}
				>
					Confirm
				</button>
				<div>
					Lupa jawabannya? Klik&nbsp;
					<span
						onClick={() => {
							dispatch(authChangePasswordEmailRequest({ email }));
						}}
						style={{ fontWeight: "bold", cursor: "pointer" }}
					>
						disini
					</span>
				</div>
				<div
					style={{
						textAlign: "center",
					}}
				>
					{isLoading ? "Mengirim link ganti password ke email anda..." : null}
				</div>
			</>
		);
	};

	return (
		<div style={styles.style1}>
			<div style={styles.style2}>
				<div
					style={{
						fontSize: "24px",
						fontWeight: "bold",
					}}
				>
					Forget Password
				</div>
				<>{!id ? emailCheck() : securityAnswerCheck()}</>
			</div>
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
		height: "400px",
		width: "350px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
};

export default ForgetPasswordPage;
