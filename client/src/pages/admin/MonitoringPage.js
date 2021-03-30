import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import { LoaderPage } from "../../components";
import { accentColor, primaryColor } from "../../helpers";
import { monitoringAction } from "../../redux/actions";

const MonitoringPage = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const { isLoading, monitoring } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		dispatch(monitoringAction());
	}, []);

	if (isLoading) return <LoaderPage />;

	const renderTable = () => {
		return monitoring.map((value, index) => {
			return (
				<tr key={value.id} className="">
					<th>{index + 1}</th>
					<td>{value.category.category}</td>

					<td>
						{value.inventories[0].stock === 0 ||
						value.inventories[1].stock === 0 ||
						value.inventories[2].stock === 0 ? (
							<div className="d-flex align-items-center">
								<i
									class="bi bi-exclamation-diamond-fill"
									style={{ color: "orange" }}
								></i>
								<div className="mx-2">{value.name}</div>
								<i
									class="bi bi-exclamation-diamond-fill"
									style={{ color: "orange" }}
								></i>
							</div>
						) : (
							<div>
								<div>{value.name}</div>
							</div>
						)}
					</td>
					<td style={{ textAlign: "center" }}>
						{value.inventories[0].stock === 0 ? (
							<Button className={styles.primaryBtn}>
								<div className={styles.primaryBtnChild}>migrate</div>
							</Button>
						) : (
							<div>{value.inventories[0].stock.toLocaleString()}</div>
						)}
					</td>
					<td style={{ textAlign: "center" }}>
						{value.inventories[1].stock === 0 ? (
							<Button className={styles.primaryBtn}>
								<div className={styles.primaryBtnChild}>migrate</div>
							</Button>
						) : (
							<div>{value.inventories[1].stock.toLocaleString()}</div>
						)}
					</td>
					<td style={{ textAlign: "center" }}>
						{value.inventories[2].stock === 0 ? (
							<Button className={styles.primaryBtn} style={{ padding: 5 }}>
								<div
									className={styles.primaryBtnChild}
									style={{ fontSize: 10 }}
								>
									Out of stock
								</div>
							</Button>
						) : (
							<div>{value.inventories[2].stock.toLocaleString()}</div>
						)}
					</td>
				</tr>
			);
		});
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: primaryColor,
				paddingBlock: 50,
				paddingInline: 50,
			}}
		>
			<Table hover responsive striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Category</th>
						<th>Name</th>
						<th style={{ textAlign: "center" }}>BDG</th>
						<th style={{ textAlign: "center" }}>BSD</th>
						<th style={{ textAlign: "center" }}>JKT</th>
					</tr>
				</thead>
				<tbody>{renderTable()}</tbody>
			</Table>
		</div>
	);
};

const useStyles = makeStyles({
	divider: {
		height: 1,
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.3)",
		marginBlock: 15,
	},
	smallText: {
		fontSize: 13,
	},
	whiteBtn: {
		backgroundColor: primaryColor,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.1)",
	},
	whiteBtn2: {
		paddingBlock: 10,
		backgroundColor: primaryColor,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.1)",
	},
	primaryBtn: {
		paddingBlock: 10,
		backgroundColor: accentColor,
		borderWidth: 0,
		// borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.2)",
	},
	whiteBtnChildChangeAddress: {
		textTransform: "",
		color: "black",
		fontSize: 13,
		fontWeight: 600,
	},
	whiteBtnChild: {
		textTransform: "",
		color: "black",
		fontSize: 14,
		fontWeight: 600,
	},
	primaryBtnChild: {
		textTransform: "",
		color: "black",
		fontSize: 14,
		fontWeight: 600,
	},
});

export default MonitoringPage;
