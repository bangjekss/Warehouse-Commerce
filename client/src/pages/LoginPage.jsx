import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { accentColor, primaryColor, surfaceColor } from "../helpers";
import { loginAction } from "../redux/actions";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import {
	ButtonAccent,
	ButtonSurface,
	InputForm,
	InputGroupIcon,
	InputToolTip,
} from "../components";

const LoginPage = () => {
	const dispatch = useDispatch();
	const { isLoading, isLogin, roleId } = useSelector(
		(state) => state.authReducer
	);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLoginBtn = () => {
		if (user === "" || password === "") {
			return Swal.fire({
				icon: "warning",
				title: "Ooopss..",
				text: "Make sure all fields are filled in correctly",
			});
		}
		const payload = {
			user,
			password,
		};
		dispatch(loginAction(payload));
	};

	if (isLogin && roleId === 1) return <Redirect to="/admin/dashboard" />;
	if (isLogin && roleId === 2) return <Redirect to="/" />;

	return (
		<div
			style={{
				display: "flex",
				minHeight: "100vh",
				backgroundColor: primaryColor,
				justifyContent: "center",
				alignItems: "center",
				zIndex: 2,
				order: 2,
			}}
		>
			<div
				style={{
					width: "40%",
					display: "flex",
					flexDirection: "column",
					borderRadius: "20px",
					boxShadow: "0 0 5px 1px rgba(0,0,0,0.5)",
				}}
			>
				<div
					style={{
						backgroundColor: surfaceColor,
						borderRadius: 20,
						justifyContent: "center",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingBlock: 30,
					}}
				>
					<div>
						<Link to="/">
							<img
								src="https://i.imgur.com/dbtNOT2.png"
								alt="file_err"
								width="450"
							/>
						</Link>
					</div>
				</div>
				<div
					style={{
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						paddingInline: 50,
						paddingBlock: 30,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div>
						<Form>
							<div>
								<InputForm
									autoComplete="off"
									label="Email or Username"
									placeholder="username/email/phone"
									onChange={(e) => setUser(e.target.value)}
									mb={15}
								/>
							</div>
							<div>
								<InputGroupIcon
									mb={15}
									isPassword={true}
									showPassword={showPassword}
									label="Password"
									onChange={(e) => setPassword(e.target.value)}
									iconOnClick={() => setShowPassword(!showPassword)}
									placeholder="password"
									type={showPassword ? "text" : "password"}
									icon_first="bi bi-eye-slash"
									icon_second="bi bi-eye"
								/>
							</div>
							<div className="d-flex justify-content-center mt-5">
								<div className="px-2" style={{ width: "40%" }}>
									<ButtonSurface
										disabled={isLoading}
										text="Login"
										onClick={handleLoginBtn}
									/>
								</div>
								<div className="px-2" style={{ width: "40%" }}>
									<Link to="/register">
										<ButtonAccent text="Sign Up" />
									</Link>
								</div>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
