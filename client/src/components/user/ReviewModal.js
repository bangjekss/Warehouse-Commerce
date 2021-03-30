import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { apiUrl } from "../../helpers";
import { useDispatch } from "react-redux";
import { kirimReview } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		// border: "2px solid #000",
		boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
		// padding: theme.spacing(2, 4, 3),
		padding: "0 36px 36px 36px",
	},
}));

const ReviewModal = ({ review, toggle, data, selected }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [text, setText] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		setOpen(review);
	}, [review]);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={toggle}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<div
							style={{
								fontSize: "24px",
								fontWeight: "bold",
								margin: "27px 0 15px 0",
							}}
						>
							{data[selected]
								? data[selected].review
									? "Review anda"
									: "Tulis Review"
								: null}
						</div>
						<div>
							<textarea
								rows="4"
								cols="50"
								placeholder="Tuliskan review anda"
								// disabled={true}
								style={{
									padding: "12px",
								}}
								onChange={(e) => setText(e.target.value)}
								disabled={data[selected] ? data[selected].review : null}
								value={data[selected] ? data[selected].review : ""}
							></textarea>
							{data[selected] ? (
								data[selected].review ? (
									<div
										style={{
											margin: "11px 0 0 0",
										}}
									>
										Anda telah memberikan review, Terima kasih!
									</div>
								) : null
							) : null}
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								margin: "18px 0 0 0",
							}}
						>
							<button
								style={{
									margin: "0 12px 0 0",
								}}
								disabled={data[selected] ? data[selected].review : null}
								onClick={() => {
									dispatch(
										kirimReview({
											review: text,
											transactionId: data[selected].transactionId,
										})
									);
									toggle();
									setText("");
								}}
							>
								Submit
							</button>
							<button onClick={() => toggle()}>Close</button>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default ReviewModal;
