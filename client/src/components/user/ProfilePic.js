import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../helpers";
import { uploadProfilePic } from "../../redux/actions";

const ProfilePic = ({ imagepath, noProfilePic, userId }) => {
	const [image, setImage] = useState({});

	const uploadImage = (e) => {
		console.log(e.target.files[0]);

		if (e.target.files[0]) {
			setImage({
				imageFile: e.target.files[0],
				imageName: e.target.files[0].name,
			});
		}
	};

	const dispatch = useDispatch();

	useEffect(() => {
		if (userId) {
			dispatch(uploadProfilePic({ image, userId }));
		}
	}, [image]);

	return (
		<>
			<div
				style={{
					margin: "14px 0 12px 0",
				}}
			>
				<img
					src={!imagepath ? noProfilePic : `${apiUrl}${imagepath}`}
					style={{
						height: "200px",
						width: "200px",
						borderRadius: "100px",
						objectFit: "cover",
						border: "1px black solid",
					}}
				></img>
			</div>
			<input
				type="file"
				onChange={(e) => uploadImage(e)}
				style={{
					display: "none",
				}}
				id="changePicture"
			/>
			<label
				for="changePicture"
				style={{
					backgroundColor: "white",
					height: "30px",
					width: "200px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					border: "1px solid black",
				}}
			>
				Change Profile Picture
			</label>
		</>
	);
};

export default ProfilePic;
