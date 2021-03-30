import React, { useEffect } from "react";
import { accentColor, primaryColor, surfaceColor } from "../../helpers";
import { ResponsiveLine } from "@nivo/line";
import { useDispatch, useSelector } from "react-redux";
import { LoaderPage } from "../../components";
import { Redirect } from "react-router-dom";

const HomeAdminPage = ({ current }) => {
	const {
		totalProfit,
		totalClient,
		totalOrder,
		dailyReport,
		weeklyReport,
		monthlyReport,
		anualReport,
	} = useSelector((state) => state.adminReducer.dashboard);
	const { isLoading, isLogin } = useSelector((state) => state.authReducer);

	if (!isLogin) return <Redirect to="/login" />;
	if (isLoading) return <LoaderPage />;

	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: primaryColor,
				paddingBlock: 20,
				paddingInline: 30,
				// display: current === 0 ? "block" : "none",
			}}
		>
			<div
				className="d-flex justify-content-between"
				style={{ marginBottom: 20 }}
			>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						width: "32.5%",
						boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-cart3"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Orders
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{totalOrder ? totalOrder.toLocaleString() : 0}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						width: "32.5%",
						boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-people"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Client
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{totalClient ? totalClient.toLocaleString() : 0}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						width: "32.5%",
						boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-wallet2"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Profit
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{totalProfit ? totalProfit.toLocaleString() : 0} IDR
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					height: 400,
				}}
			>
				<div
					style={{
						width: "65%",
						backgroundColor: "white",
						borderRadius: 10,
						boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
					}}
				>
					<ResponsiveLine
						data={anualReport}
						margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
						xScale={{ type: "point" }}
						yScale={{
							type: "linear",
							min: 0,
							max: "auto",
							stacked: true,
							reverse: false,
						}}
						min={-1000}
						// yFormat=" >-.0f"
						curve="catmullRom"
						colors={{ scheme: "dark2" }}
						lineWidth={5}
						enableArea={true}
						areaBaselineValue={10}
						areaBlendMode="multiply"
						areaOpacity={0.5}
						axisTop={null}
						axisLeft={{
							orient: "left",
							tickSize: 0,
							tickPadding: 20,
							tickRotation: 0,
							legend: "order",
							legendOffset: -60,
							legendPosition: "middle",
						}}
						axisRight={null}
						pointSize={20}
						pointColor={{ theme: "background" }}
						pointBorderWidth={3}
						pointBorderColor={{ from: "color", modifier: [] }}
						pointLabelYOffset={-12}
						enableGridX={false}
						enableGridY={false}
						useMesh={true}
						enableSlices="x"
						animate={false}
						enableCrosshair={false}
						isInteractive={true}
						legends={[
							{
								anchor: "top-right",
								direction: "column",
								justify: true,
								translateX: 50,
								translateY: 0,
								itemsSpacing: 0,
								itemDirection: "left-to-right",
								itemWidth: 50,
								itemHeight: 18,
								itemOpacity: 0.75,
								symbolSize: 20,
								symbolShape: "circle",
								symbolBorderColor: "rgba(0, 0, 0, .5)",
								effects: [
									{
										on: "hover",
										style: {
											itemBackground: "rgba(0, 0, 0, .03)",
											itemOpacity: 1,
										},
									},
								],
							},
						]}
					/>
				</div>
				<div
					style={{
						width: "34%",
						height: "100%",
						backgroundColor: surfaceColor,
						borderRadius: 10,
						boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
						padding: 20,
					}}
				>
					<div
						className="d-flex justify-content-between align-items-center"
						style={{
							backgroundColor: primaryColor,
							borderRadius: 10,
							marginBottom: 5,
							padding: 10,
						}}
					>
						<div>
							<div>Today</div>
							<div>
								{dailyReport.range ? (
									<div style={{ fontSize: 10, color: "gray" }}>
										{dailyReport.range.to_dayname}, {dailyReport.range.to_date}{" "}
										{dailyReport.range.to_monthname} {dailyReport.range.to_year}
									</div>
								) : null}
							</div>
						</div>
						<div>
							<div>Earn</div>
							<div>
								{dailyReport.profit ? dailyReport.profit.toLocaleString() : 0}{" "}
								IDR
							</div>
						</div>
					</div>
					<div
						className="d-flex justify-content-between align-items-center"
						style={{
							backgroundColor: primaryColor,
							borderRadius: 10,
							marginBottom: 5,
							padding: 10,
						}}
					>
						<div>
							<div>Weekly</div>
							<div>
								{weeklyReport.range ? (
									weeklyReport.range.from_monthname !==
									weeklyReport.range.to_monthname ? (
										<div style={{ fontSize: 10, color: "gray" }}>
											{weeklyReport.range.from_date}{" "}
											{weeklyReport.range.from_monthname} -{" "}
											{weeklyReport.range.to_date}{" "}
											{weeklyReport.range.to_monthname}{" "}
											{weeklyReport.range.to_year}
										</div>
									) : (
										<div style={{ fontSize: 10, color: "gray" }}>
											{weeklyReport.range.from_date} -{" "}
											{weeklyReport.range.to_date}{" "}
											{weeklyReport.range.to_monthname}{" "}
											{weeklyReport.range.to_year}
										</div>
									)
								) : null}
							</div>
						</div>
						<div>
							<div>Earning</div>
							<div className="d-flex justify-content-end">
								<div>
									{weeklyReport.profit
										? weeklyReport.profit.toLocaleString()
										: 0}{" "}
									IDR
								</div>
							</div>
						</div>
					</div>
					<div>
						{monthlyReport.range ? (
							<div
								className="d-flex justify-content-between align-items-center"
								style={{
									backgroundColor: primaryColor,
									borderRadius: 10,
									marginBottom: 5,
									padding: 10,
								}}
							>
								<div>
									<div>Monthly</div>
									<div>{monthlyReport.range.to_monthname}</div>
								</div>
								<div>
									<div>Earn</div>
									<div>
										{monthlyReport.profit
											? monthlyReport.profit.toLocaleString()
											: null}{" "}
										IDR
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeAdminPage;
