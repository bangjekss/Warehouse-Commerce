import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl_user, primaryColor, surfaceColor } from "../helpers";
import { authRegisterAction } from "../redux/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
	ButtonPrimary,
	ButtonSurface,
	InputForm,
	InputGroupIcon,
	InputSelect,
	InputToolTip,
} from "../components";

const RegisterPage = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.authReducer);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [securityQuestion, setSecurityQuestion] = useState([]);
	const [securityAnswer, setSecurityAnswer] = useState("");
	const [securityQuestionId, setSecurityQuestionId] = useState(1);
	const [policyCheck, setPolicyCheck] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidCPassword, setIsValidCPassword] = useState(true);

	useEffect(async () => {
		const response = await axios.get(`${apiUrl_user}/get-security-question`);
		setSecurityQuestion(response.data);
	}, []);

	useEffect(() => {
		if (email.length > 0) checkEmail(email);
		if (password.length > 0) checkPassword(password);
		if (cpassword.length > 0) checkCPassword(cpassword);
		if (email.length === 0) setIsValidEmail(true);
		if (password.length === 0) setIsValidPassword(true);
		if (cpassword.length === 0) setIsValidCPassword(true);
	}, [email, password, cpassword]);

	const emailRegex = /^[\w\-\.]+(@[\w\-\.]+\.)+[\w\-\.]{2,4}$/;
	const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;

	const handleRegisterBtn = () => {
		if (
			username === "" ||
			password === "" ||
			email === "" ||
			securityAnswer === "" ||
			!policyCheck
		) {
			return Swal.fire({
				icon: "warning",
				title: "Ooopss..",
				text: "Make sure all fields are filled in correctly",
			});
		}

		if (cpassword !== password)
			return Swal.fire({
				icon: "warning",
				title: "Ooopss..",
				text: "Password doesn't match'",
			});

		const payload = {
			username,
			email,
			password,
			security_answer: securityAnswer,
			security_question_id: securityQuestionId,
		};

		dispatch(authRegisterAction(payload));
	};

	const checkEmail = (str) => {
		if (str.match(emailRegex)) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
		}
	};

	const checkPassword = (str) => {
		if (str.match(passwordRegex)) {
			setIsValidPassword(true);
		} else {
			setIsValidPassword(false);
		}
	};

	const checkCPassword = (str) => {
		if (str === password) {
			setIsValidCPassword(true);
		} else {
			setIsValidCPassword(false);
		}
	};

	return (
		<div>
			<div
				style={{
					minHeight: "100vh",
					backgroundColor: "rgba(244, 246, 255,0.5)",
					justifyContent: "center",
					display: "flex",
					alignItems: "center",
				}}
			>
				<div
					style={{
						width: "60%",
						display: "flex",
						borderRadius: "20px",
						boxShadow: "0 0 5px 1px rgba(0,0,0,0.5)",
					}}
				>
					<div
						style={{
							backgroundColor: surfaceColor,
							width: "40%",
							borderTopLeftRadius: 20,
							borderBottomLeftRadius: 20,
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "center",
							position: "relative",
							zIndex: 2,
							boxShadow: "2px 0 10px 1px rgba(0,0,0,0.3)",
						}}
					>
						<div className="mb-5">
							<Link to="/">
								<img
									src="https://i.imgur.com/69bOytv.png"
									alt="file_err"
									width="auto"
									height="300"
								/>
							</Link>
						</div>
						<div>
							<Link to="/login">
								<ButtonPrimary text="I have an Account" px={50} py={50} />
							</Link>
						</div>
					</div>
					<div
						style={{
							backgroundColor: primaryColor,
							width: "60%",
							borderTopRightRadius: 20,
							borderBottomRightRadius: 20,
							paddingInline: 50,
							paddingBlock: 30,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div className="d-flex justify-content-center pb-4">
							<div
								style={{
									fontSize: "1.5em",
									fontWeight: "bold",
									textTransform: "uppercase",
								}}
							>
								create account
							</div>
						</div>
						<div>
							<Form onSubmit={handleRegisterBtn}>
								<div>
									<InputForm
										label="Username"
										onChange={(e) => setUsername(e.target.value)}
										placeholder="username"
										mb={15}
									/>
								</div>
								<div>
									<InputForm
										autoComplete="off"
										id="email"
										type="email"
										label="Email"
										placeholder="email@gmail.com"
										onChange={(e) => setEmail(e.target.value)}
										mb={15}
									/>
									<InputToolTip
										when={!isValidEmail}
										target="email"
										title="Please enter a valid email address"
									/>
								</div>
								<div className="d-flex justify-content-between">
									<div style={{ width: "49%" }}>
										<InputGroupIcon
											mb={15}
											isPassword={true}
											showPassword={showPassword}
											iconOnClick={() => setShowPassword(!showPassword)}
											onChange={(e) => setPassword(e.target.value)}
											label="Password"
											id="password"
											placeholder="password"
											when={!isValidPassword}
											type={showPassword ? "text" : "password"}
											icon_first="bi bi-eye-slash"
											icon_second="bi bi-eye"
										/>
										<InputToolTip
											when={!isValidPassword}
											target="password"
											title="Unvalid Password"
											text="Password must be 8-16 characters and at least
														contain an uppercase letter, a numbers, special
														character"
										/>
									</div>
									<div style={{ width: "49%" }}>
										<InputGroupIcon
											mb={15}
											isPassword={true}
											showPassword={showCPassword}
											iconOnClick={() => setShowCPassword(!showCPassword)}
											onChange={(e) => setCPassword(e.target.value)}
											label="Confirm Password"
											id="cpassword"
											placeholder="re-type"
											when={!isValidCPassword}
											type={showCPassword ? "text" : "password"}
											icon_first="bi bi-eye-slash"
											icon_second="bi bi-eye"
										/>
										<InputToolTip
											when={!isValidCPassword}
											target="cpassword"
											title="Password does not match"
										/>
									</div>
								</div>
								<FormGroup>
									<Label>Security Question</Label>
									<div className="d-flex justify-content-between">
										<div style={{ width: "68%" }}>
											<InputSelect
												options={securityQuestion}
												defaultValue={{
													label: "Siapa nama hewan peliharaan pertama Anda?",
													value: 1,
												}}
												onChange={(e) => setSecurityQuestionId(e.value)}
											/>
										</div>
										<div style={{ width: "30%" }}>
											<InputForm
												placeholder="answer"
												onChange={(e) => setSecurityAnswer(e.target.value)}
											/>
										</div>
									</div>
								</FormGroup>
								<div style={{ paddingInline: 20 }}>
									<Input
										type="checkbox"
										onChange={() => setPolicyCheck(!policyCheck)}
										style={{ cursor: "pointer" }}
									/>
									<div>
										I agree to the{" "}
										<a href="#" target="_blank">
											Terms and Conditions
										</a>
									</div>
								</div>
								<div>
									<ButtonSurface
										disabled={isLoading}
										onClick={handleRegisterBtn}
										mt={15}
										text="Sign Up"
									/>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
