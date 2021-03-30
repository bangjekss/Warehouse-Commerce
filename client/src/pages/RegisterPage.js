import React, { useEffect, useState } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl_user, primaryColor, surfaceColor } from "../helpers";
import { authRegisterAction } from "../redux/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core";
import { InputToolTip } from "../components";

const RegisterPage = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.authReducer);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [name, setName] = useState("");
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
	}, [email, password, cpassword]);

	const emailRegex = /^[\w\-\.]+(@[\w\-\.]+\.)+[\w\-\.]{2,4}$/;
	const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;

	const handleRegisterBtn = () => {
		if (
			username === "" ||
			password === "" ||
			email === "" ||
			name === "" ||
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
			full_name: name,
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
							justifyContent: "center",
							display: "flex",
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
								<Button
									style={{ backgroundColor: primaryColor, borderWidth: 0 }}
								>
									<div style={{ color: "black" }}>Have an account</div>
								</Button>
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
								<FormGroup>
									<Label>Full Name</Label>
									<Input
										className={styles.inputForm}
										type="text"
										placeholder="your name"
										onChange={(e) => setName(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Security Question</Label>
									<div className="d-flex justify-content-between">
										<div style={{ width: "68%" }}>
											<Select
												styles={selectStyles}
												options={securityQuestion}
												defaultValue={{
													label: "Siapa nama hewan peliharaan pertama Anda?",
													value: 1,
												}}
												onChange={(e) => setSecurityQuestionId(e.value)}
											/>
										</div>
										<div style={{ width: "30%" }}>
											<Input
												className={styles.inputForm}
												type="text"
												placeholder="anwser"
												onChange={(e) => setSecurityAnswer(e.target.value)}
											/>
										</div>
									</div>
								</FormGroup>
								<FormGroup>
									<Label>Username</Label>
									<Input
										className={styles.inputForm}
										type="text"
										placeholder="username"
										onChange={(e) => setUsername(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Email</Label>
									<Input
										autoComplete="off"
										id="email"
										className={styles.inputForm}
										type="email"
										placeholder="email@gmail.com"
										onChange={(e) => setEmail(e.target.value)}
									/>
									<InputToolTip
										when={!isValidEmail}
										target="email"
										title="Please enter a valid email address"
									/>
								</FormGroup>
								<div className="d-flex justify-content-between">
									<FormGroup style={{ width: "49%" }}>
										<Label>Password</Label>
										<InputGroup className={styles.inputGroupForm}>
											<Input
												autoComplete="off"
												id="password"
												type={showPassword ? "text" : "password"}
												placeholder="password"
												className={styles.inputInGroupForm}
												onChange={(e) => setPassword(e.target.value)}
											/>
											<InputToolTip
												when={!isValidPassword}
												target="password"
												title="Unvalid Password"
												text="Password must be 8-16 characters and at least
														contain an uppercase letter, a numbers, special
														character"
											/>
											<InputGroupAddon addonType="prepend">
												<InputGroupText
													onClick={() => setShowPassword(!showPassword)}
													style={{
														borderRadius: 10,
														borderWidth: 0,
														cursor: "pointer",
													}}
												>
													{showPassword ? (
														<i className="bi bi-eye-slash"></i>
													) : (
														<i className="bi bi-eye"></i>
													)}
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<FormGroup style={{ width: "49%" }}>
										<Label>Confirm Password</Label>
										<InputGroup className={styles.inputGroupForm}>
											<Input
												autoComplete="off"
												id="cpassword"
												type={showCPassword ? "text" : "password"}
												placeholder="re-type"
												className={styles.inputInGroupForm}
												onChange={(e) => setCPassword(e.target.value)}
											/>
											<InputToolTip
												when={!isValidCPassword}
												target="cpassword"
												title="Password doesn't match"
											/>
											<InputGroupAddon addonType="prepend">
												<InputGroupText
													onClick={() => setShowCPassword(!showCPassword)}
													style={{
														borderRadius: 10,
														borderWidth: 0,
														cursor: "pointer",
													}}
												>
													{showCPassword ? (
														<i className="bi bi-eye-slash"></i>
													) : (
														<i className="bi bi-eye"></i>
													)}
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
								</div>
								<div style={{ paddingInline: 20 }}>
									<Label>
										<Input
											type="checkbox"
											onChange={() => setPolicyCheck(!policyCheck)}
										/>
										<div>
											I agree to the
											<a href="#" target="_blank">
												Terms and Conditions
											</a>
										</div>
									</Label>
								</div>
								<div className="d-flex justify-content-center mt-3">
									<Button
										disabled={isLoading}
										onClick={handleRegisterBtn}
										style={{
											backgroundColor: surfaceColor,
											borderWidth: 0,
											width: "100%",
											paddingBlock: 10,
											borderRadius: 10,
										}}
									>
										{isLoading ? (
											<Loader
												type="ThreeDots"
												color="white"
												height="auto"
												width={50}
											/>
										) : (
											<div>Sign Up</div>
										)}
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const useStyles = makeStyles({
	inputForm: {
		borderRadius: 10,
		paddingInline: 20,
		paddingBlock: 25,
		borderWidth: 0,
		backgroundColor: primaryColor,
		boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.15)",
	},
	inputGroupForm: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: primaryColor,
		boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.15)",
	},
	inputInGroupForm: {
		borderRadius: 10,
		paddingInline: 20,
		paddingBlock: 25,
		borderWidth: 0,
		backgroundColor: primaryColor,
		// boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.15)",
	},
});

const selectStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: "1px dotted pink",
		color: state.isSelected ? "white" : "black",
		padding: 10,
	}),
	control: () => ({
		borderRadius: 10,
		paddingInline: 10,
		paddingBlock: 7,
		borderWidth: 0,
		backgroundColor: primaryColor,
		boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.15)",
		display: "flex",
	}),
};

export default RegisterPage;
