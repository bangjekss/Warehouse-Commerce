import React, { useEffect, useState } from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { apiUrl } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { approveBukti, rejectBukti } from "../../redux/actions";

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

const ProcessTransactionModal = ({
	process,
	toggle,
	data,
	clickLoad,
	closeModal,
}) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		setOpen(process);
	}, [process]);

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
						<div>
							<div>
								<div
									style={{
										fontSize: "24px",
										fontWeight: "bold",
										margin: "27px 0 15px 0",
									}}
								>
									Bukti Pembayaran
								</div>
								<div></div>
								<img
									style={{
										height: "500px",
									}}
									src={data ? `${apiUrl}${data.billImagepath}` : null}
									alt="Bukti Transaksi"
								></img>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-evenly",
									margin: "36px 0 0 0",
								}}
							>
								<button
									onClick={() => {
										dispatch(
											approveBukti({
												transactionId: data.transactionId,
												clickLoad,
											})
										);
										closeModal();
									}}
								>
									Valid
								</button>
								<button
									onClick={() => {
										dispatch(
											rejectBukti({
												transactionId: data.transactionId,
												clickLoad,
											})
										);
										closeModal();
									}}
								>
									Invalid
								</button>
								<button onClick={() => closeModal()}>Close</button>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default ProcessTransactionModal;
