import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addAddress,
	getKecamatan,
	getKelurahan,
	getKota,
	getProvinsi,
} from "../../redux/actions";
import { RESET_DAERAH_INITIAL_STATE } from "../../redux/types";

const NewAddress = ({ id, provinsi, kota, kecamatan, kelurahan }) => {
	const [addressLabel, setAddressLabel] = useState("");
	const [selectedProvinsi, setSelectedProvinsi] = useState("");
	const [selectedKota, setSelectedKota] = useState("");
	const [selectedKecamatan, setSelectedKecamatan] = useState("");
	const [selectedKelurahan, setSelectedKelurahan] = useState("");
	const [kodePos, setKodePos] = useState("");
	const [alamatLengkap, setAlamatLengkap] = useState("");
	const [phoneNum, setPhoneNum] = useState("");

	const [addNew, setAddNew] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProvinsi());
	}, [dispatch, addNew]);

	useEffect(() => {
		const findProvinsi = provinsi.find((val) => {
			return val.nama === selectedProvinsi;
		});
		if (findProvinsi) {
			dispatch(getKota({ provinsiId: findProvinsi.id }));
		}
	}, [selectedProvinsi]);

	useEffect(() => {
		const findKota = kota.find((val) => {
			return val.nama === selectedKota;
		});
		if (findKota) {
			dispatch(getKecamatan({ kotaId: findKota.id }));
		}
	}, [selectedKota]);

	useEffect(() => {
		const findKecamatan = kecamatan.find((val) => {
			return val.nama === selectedKecamatan;
		});
		if (findKecamatan) {
			dispatch(getKelurahan({ kecamatanId: findKecamatan.id }));
		}
	}, [selectedKecamatan]);

	return (
		<>
			<button
				style={{
					margin: "0 0 12px 0",
				}}
				onClick={() => {
					setAddNew(!addNew);

					setAddressLabel("");
					setSelectedProvinsi("");
					setSelectedKota("");
					setSelectedKecamatan("");
					setSelectedKelurahan("");
					setKodePos("");
					setAlamatLengkap("");
				}}
			>
				{!addNew ? "New Address" : "Cancel"}
			</button>
			{addNew ? (
				<div
					style={{
						border: "solid 1px black",
						padding: "0 24px",
						margin: "0 0 24px 0",
					}}
				>
					<div
						style={{
							margin: "16px 0 12px 0",
						}}
					>
						<div
							style={{
								margin: "0 0 7px 0",
							}}
						>
							Nama Address
						</div>
						<input
							placeholder={"Nama"}
							value={addressLabel}
							onChange={(e) => setAddressLabel(e.target.value)}
						/>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Provinsi
						</div>
						<select onChange={(e) => setSelectedProvinsi(e.target.value)}>
							<option>Pilih Provinsi</option>
							{provinsi.map((val) => {
								return (
									<>
										<option>{val.nama}</option>
									</>
								);
							})}
						</select>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Kota
						</div>
						<select
							disabled={!selectedProvinsi ? true : false}
							onChange={(e) => setSelectedKota(e.target.value)}
						>
							<option selected>Pilih Kota</option>
							{kota.map((val) => {
								return (
									<>
										<option>{val.nama}</option>
									</>
								);
							})}
						</select>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Kecamatan
						</div>
						<select
							disabled={!selectedKota ? true : false}
							onChange={(e) => setSelectedKecamatan(e.target.value)}
						>
							<option selected>Pilih Kecamatan</option>
							{kecamatan.map((val) => {
								return (
									<>
										<option>{val.nama}</option>
									</>
								);
							})}
						</select>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Kelurahan
						</div>
						<select
							disabled={!selectedKecamatan ? true : false}
							onChange={(e) => setSelectedKelurahan(e.target.value)}
						>
							<option selected>Pilih Kelurahan</option>
							{kelurahan.map((val) => {
								return (
									<>
										<option>{val.nama}</option>
									</>
								);
							})}
						</select>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Alamat Lengkap
						</div>
						<textarea
							rows="4"
							cols="50"
							value={alamatLengkap}
							placeholder={"Alamat Lengkap"}
							onChange={(e) => setAlamatLengkap(e.target.value)}
						></textarea>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Kode Pos
						</div>
						<input
							value={kodePos}
							onChange={(e) => setKodePos(e.target.value)}
							placeholder={"Kode Pos"}
							type="number"
						/>
						<div
							style={{
								margin: "6px 0 5px 0",
							}}
						>
							Nomor Hp
						</div>
						<input
							value={phoneNum}
							onChange={(e) => setPhoneNum(e.target.value)}
							placeholder={"Nomor Hp"}
							type="number"
						/>
					</div>
					<button
						style={{
							margin: "0 0 24px 0",
						}}
						disabled={
							!selectedProvinsi ||
							!selectedKota ||
							!selectedKecamatan ||
							!selectedKelurahan ||
							!alamatLengkap ||
							!kodePos
								? true
								: false
						}
						onClick={async () => {
							dispatch(
								addAddress({
									label: addressLabel,
									provinsi: selectedProvinsi,
									kota: selectedKota,
									kecamatan: selectedKecamatan,
									kelurahan: selectedKelurahan,
									kodePos,
									alamatLengkap,
									userId: id,
									phone: phoneNum,
								})
							);

							setAddressLabel("");
							setSelectedProvinsi("");
							setSelectedKota("");
							setSelectedKecamatan("");
							setSelectedKelurahan("");
							setKodePos("");
							setAlamatLengkap("");
							setPhoneNum("");

							dispatch({ type: RESET_DAERAH_INITIAL_STATE });

							setAddNew(!addNew);
						}}
					>
						Add new address
					</button>
				</div>
			) : null}
		</>
	);
};

export default NewAddress;
