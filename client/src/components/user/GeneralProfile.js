import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../redux/actions";

const GeneralProfile = ({ name, username, email, phone }) => {
	const [fullNameInput, setFullNameInput] = useState("");
	const [usernameInput, setUsernameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [phoneInput, setPhoneInput] = useState("");

	const [edit, setEdit] = useState(false);

	const dispatch = useDispatch();

	const { id } = useSelector((state) => state.authReducer);

	useEffect(() => {
		setFullNameInput(name);
	}, [name]);

	useEffect(() => {
		setUsernameInput(username);
	}, [username]);

	useEffect(() => {
		setEmailInput(email);
	}, [email]);

	useEffect(() => {
		setPhoneInput(phone);
	}, [phone]);

	if (edit) {
		return (
			<>
				<div
					style={{
						fontSize: "36px",
						fontWeight: "bold",
					}}
				>
					General
				</div>
				<div style={{ margin: "8px 0 0 0" }}>
					<div
						style={{
							margin: "0 0 5px 0",
						}}
					>
						Nama Lengkap
					</div>
					<input
						value={fullNameInput}
						onChange={(e) => setFullNameInput(e.target.value)}
					/>
					<div
						style={{
							margin: "5px 0 5px 0",
						}}
					>
						Username
					</div>
					<input
						value={usernameInput}
						onChange={(e) => setUsernameInput(e.target.value)}
					/>
					<div
						style={{
							margin: "5px 0 5px 0",
						}}
					>
						Email
					</div>
					<input
						value={emailInput}
						disabled={true}
						// onChange={(e) => setEmailInput(e.target.value)}
					/>
					<div
						style={{
							margin: "5px 0 5px 0",
						}}
					>
						Nomor HP
					</div>
					<input
						value={phoneInput}
						onChange={(e) => setPhoneInput(e.target.value)}
					/>
				</div>
				<button
					style={{
						margin: "12px 0 0 0",
					}}
					onClick={() => {
						setEdit(!edit);
						dispatch(
							editProfile({
								fullName: fullNameInput,
								username: usernameInput,
								email: emailInput,
								phone: phoneInput,
								userId: id,
							})
						);
					}}
				>
					Save
				</button>
			</>
		);
	}

	return (
		<>
			<div
				style={{
					fontSize: "36px",
					fontWeight: "bold",
				}}
			>
				General
			</div>
			<div style={{ margin: "8px 0 0 0" }}>
				<div
					style={{
						margin: "0 0 5px 0",
					}}
				>
					Nama Lengkap
				</div>
				<input
					value={fullNameInput}
					disabled={true}
					onChange={(e) => setFullNameInput(e.target.value)}
				/>
				<div
					style={{
						margin: "5px 0 5px 0",
					}}
				>
					Username
				</div>
				<input value={usernameInput} disabled={true} />
				<div
					style={{
						margin: "5px 0 5px 0",
					}}
				>
					Email
				</div>
				<input value={emailInput} disabled={true} />
				<div
					style={{
						margin: "5px 0 5px 0",
					}}
				>
					Nomor HP
				</div>
				<input value={phoneInput} disabled={true} />
			</div>
			<button
				style={{
					margin: "12px 0 0 0",
				}}
				onClick={() => setEdit(!edit)}
			>
				Edit
			</button>
		</>
	);
};

export default GeneralProfile;
