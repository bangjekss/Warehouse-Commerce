import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	DetailTransactionModal,
	ProcessTransactionModal,
} from "../../components/admin";
import { getAllTransaction, kirimBarang } from "../../redux/actions";
import { apiUrl } from "../../helpers";

const AdminTransaction = () => {
	const [clickLoad, setClickLoad] = useState(0);

	const [process, setProcess] = useState(false);
	const [showDetail, setShowDetail] = useState(false);

	const [selectedTransaction, setSelectedTransaction] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTransaction({ clickLoad }));
	}, [dispatch, clickLoad]);

	const onClickShowDetail = (index) => {
		setShowDetail(!showDetail);
		setSelectedTransaction(index);
	};

	const onClickProcess = (index) => {
		setProcess(!process);
		setSelectedTransaction(index);
	};

	const closeModal = () => {
		setProcess(!process);
	};

	const { transactionData } = useSelector((state) => state.adminReducer);

	const anotherButton = (status, transactionId, stockData, index) => {
		if (status === "Pending")
			return (
				<button
					style={{
						margin: "0 24px 0 0",
					}}
					onClick={() => {
						onClickProcess(index);
					}}
				>
					Lihat Bukti
				</button>
			);

		if (status === "In Process")
			return (
				<button
					style={{
						margin: "0 24px 0 0",
					}}
					onClick={() => {
						dispatch(kirimBarang({ transactionId, stockData, clickLoad }));
					}}
				>
					Kirim Barang
				</button>
			);
	};

	// return <div></div>;

	return (
		<>
			<div>
				<div
					style={{
						padding: "0 24px",
					}}
				>
					<div
						style={{
							display: "flex",
							textAlign: "center",
						}}
					>
						<div
							style={{
								// backgroundColor: "red",
								width: "140px",
								margin: "18px 0 0 0",
							}}
						>
							Transaction Id
						</div>
						<div
							style={{
								// backgroundColor: "blue",
								width: "180px",
								margin: "18px 0 0 0",
							}}
						>
							Date
						</div>
						<div
							style={{
								// backgroundColor: "red",
								width: "170px",
								margin: "18px 0 0 0",
							}}
						>
							Invoice Number
						</div>
						<div
							style={{
								// backgroundColor: "blue",
								width: "180px",
								margin: "18px 0 0 0",
							}}
						>
							Status
						</div>
						<div
							style={{
								// backgroundColor: "blue",
								width: "140px",
								margin: "18px 0 0 0",
							}}
						>
							Total
						</div>
					</div>
				</div>
				{transactionData.map((val, i) => {
					return (
						<div
							style={{
								backgroundColor: "white",
								boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
								// borderRadius: "12.5px",
								padding: "18px 24px",
								margin: "18px 0 0 0",
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									textAlign: "center",
								}}
							>
								<div
									style={{
										// backgroundColor: "blue",
										width: "140px",
									}}
								>
									{val.transactionId}
								</div>
								<div
									style={{
										// backgroundColor: "red",
										width: "180px",
									}}
								>
									{val.date.split("T")[0]}
								</div>
								<div
									style={{
										// backgroundColor: "blue",
										width: "170px",
									}}
								>
									{val.invoice.code}
								</div>
								<div
									style={{
										// backgroundColor: "red",
										width: "180px",
									}}
								>
									{val.orderStatus}
								</div>
								<div
									style={{
										// backgroundColor: "blue",
										width: "140px",
										margin: "0 24px 0 0",
									}}
								>
									Rp{val.amount.toLocaleString()}
								</div>
								<button
									style={{
										margin: "0 24px 0 0",
									}}
									onClick={() => onClickShowDetail(i)}
								>
									Detail
								</button>
								{anotherButton(
									val.orderStatus,
									val.transactionId,
									val.stockGateway,
									i
								)}
							</div>
						</div>
					);
				})}
				<DetailTransactionModal
					showDetail={showDetail}
					data={transactionData}
					selected={selectedTransaction}
					toggle={onClickShowDetail}
					closeModal={closeModal}
				/>
				<ProcessTransactionModal
					process={process}
					data={transactionData[selectedTransaction]}
					clickLoad={clickLoad}
					toggle={onClickProcess}
					closeModal={closeModal}
					// selected={selectedTransaction}
				/>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "24px 0 0 0",
				}}
			>
				<button onClick={() => setClickLoad(clickLoad + 1)}>Load More</button>
			</div>
		</>
	);
};

export default AdminTransaction;
