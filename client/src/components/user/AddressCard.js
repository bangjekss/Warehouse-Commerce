import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addAddress,
	deleteAddress,
	editAddress,
	getKecamatan,
	getKelurahan,
	getKota,
	getProvinsi,
	resetData,
} from "../../redux/actions";
import { RESET_DAERAH_INITIAL_STATE } from "../../redux/types";

const AddressCard = () => {
	const [edit, setEdit] = useState(null);
	const [showAddress, setShowAddress] = useState(null);

	const [addressLabel, setAddressLabel] = useState("");
	const [selectedProvinsi, setSelectedProvinsi] = useState("");
	const [selectedKota, setSelectedKota] = useState("");
	const [selectedKecamatan, setSelectedKecamatan] = useState("");
	const [selectedKelurahan, setSelectedKelurahan] = useState("");
	const [alamatLengkap, setAlamatLengkap] = useState("");
	const [kodePos, setKodePos] = useState("");
	const [phoneNum, setPhoneNum] = useState("");

	const { provinsi, kota, kecamatan, kelurahan } = useSelector(
		(state) => state.daerahReducer
	);

	const { isFinished, address, id } = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProvinsi());
	}, [dispatch, edit]);

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

	if (!address) {
		return <div></div>;
	}

	return (
		<div>
			{address.map((val, i) => {
				if (val.id === edit) {
					const defaultProvinsi = val.provinsi;

					return (
						<>
							<div
								style={{
									fontWeight: "bold",
									margin: "6px 0 0 0",
								}}
							>
								<input
									value={addressLabel}
									style={{
										margin: "0 0 12px 0",
									}}
									onChange={(e) => setAddressLabel(e.target.value)}
								/>
							</div>
							<div
								style={{
									border: "solid 1px black",
									padding: "0 0 0 24px",
								}}
							>
								<div
									style={{
										margin: "0 0 12px 0",
									}}
								>
									<div
										style={{
											margin: "18px 0 6px 0",
										}}
									>
										Provinsi
									</div>
									<select onChange={(e) => setSelectedProvinsi(e.target.value)}>
										<option>Pilih Provinsi</option>
										{provinsi.map((val) => {
											return <option>{val.nama}</option>;
										})}
									</select>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kota
									</div>
									<select
										disabled={!selectedProvinsi ? true : false}
										onChange={(e) => setSelectedKota(e.target.value)}
									>
										<option>Pilih Kota</option>
										{kota.map((val) => {
											return <option>{val.nama}</option>;
										})}
									</select>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kecamatan
									</div>
									<select
										disabled={!selectedKota ? true : false}
										onChange={(e) => setSelectedKecamatan(e.target.value)}
									>
										<option>Pilih Kecamatan</option>
										{kecamatan.map((val) => {
											return <option>{val.nama}</option>;
										})}
									</select>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kelurahan
									</div>
									<select
										disabled={!selectedKecamatan ? true : false}
										onChange={(e) => setSelectedKelurahan(e.target.value)}
									>
										<option>Pilih Kelurahan</option>
										{kelurahan.map((val) => {
											return <option>{val.nama}</option>;
										})}
									</select>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Alamat Lengkap
									</div>
									<textarea
										rows="4"
										cols="50"
										value={alamatLengkap}
										onChange={(e) => setAlamatLengkap(e.target.value)}
									></textarea>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kode Pos
									</div>
									<input
										value={kodePos}
										onChange={(e) => setKodePos(e.target.value)}
										type="number"
									/>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Nomor Hp
									</div>
									<input
										value={phoneNum}
										onChange={(e) => setPhoneNum(e.target.value)}
										type="number"
									/>
								</div>
								<div
									style={{
										margin: "0 0 24px 0",
									}}
								>
									<button
										disabled={
											!selectedProvinsi ||
											!selectedKota ||
											!selectedKecamatan ||
											!selectedKelurahan ||
											!alamatLengkap ||
											!kodePos ||
											!phoneNum
												? true
												: false
										}
										onClick={() => {
											setEdit(null);
											dispatch(
												editAddress({
													id: val.id,
													label: addressLabel,
													provinsi: selectedProvinsi,
													kota: selectedKota,
													kecamatan: selectedKecamatan,
													kelurahan: selectedKelurahan,
													alamatLengkap,
													kodePos,
													userId: id,
													phone: phoneNum,
												})
											);
											setAddressLabel("");
											setSelectedProvinsi("");
											setSelectedKota("");
											setSelectedKecamatan("");
											setSelectedKelurahan("");
											setPhoneNum("");
											dispatch({ type: RESET_DAERAH_INITIAL_STATE });
										}}
									>
										Save
									</button>
									<button
										onClick={() => {
											setEdit(null);
											setAddressLabel("");
											setSelectedProvinsi("");
											setSelectedKota("");
											setSelectedKecamatan("");
											setSelectedKelurahan("");
											setPhoneNum("");
											dispatch({ type: RESET_DAERAH_INITIAL_STATE });
										}}
									>
										Cancel
									</button>
								</div>
							</div>
						</>
					);
				}

				return (
					<>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								// backgroundColor: "red",
								margin: "0 0 24px 0",
							}}
						>
							<div style={{ fontSize: "24px" }}>{`${i + 1}. ${val.label}`}</div>
							<button
								style={{
									margin: "0 24px 0px 24px",
								}}
								onClick={() => {
									if (isFinished) {
										if (!showAddress || showAddress !== val.id) {
											return setShowAddress(val.id);
										}

										return setShowAddress(null);
									}
								}}
							>
								{!showAddress || showAddress !== val.id ? "Show" : "Hide"}
							</button>
							<button
								style={{
									margin: "0 0 0px 0",
								}}
								onClick={() => dispatch(deleteAddress({ id: val.id }))}
							>
								Delete
							</button>
						</div>
						{showAddress === val.id ? (
							<div
								style={{
									border: "solid 1px black",
									padding: "0 24px",
									margin: "0 0 24px 0",
								}}
							>
								<div>
									<div
										style={{
											margin: "18px 0 6px 0",
										}}
									>
										Provinsi
									</div>
									<input value={val.provinsi} disabled={true} />
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kota
									</div>
									<input value={val.kota} disabled={true} />
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kecamatan
									</div>
									<input value={val.kecamatan} disabled={true} />
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kelurahan
									</div>
									<input value={val.kelurahan} disabled={true} />
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Alamat Lengkap
									</div>
									<textarea
										rows="4"
										cols="50"
										value={val.alamat_lengkap}
										disabled={true}
									></textarea>
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Kode Pos
									</div>
									<input value={val.kode_pos} disabled={true} type="number" />
									<div
										style={{
											margin: "5px 0 6px 0",
										}}
									>
										Nomor Hp
									</div>
									<input value={val.phone} disabled={true} type="number" />
								</div>
								<button
									style={{
										margin: "12px 0 24px 0",
									}}
									onClick={() => {
										setEdit(val.id);

										if (
											alamatLengkap === val.alamat_lengkap ||
											alamatLengkap === ""
										) {
											setAlamatLengkap(val.alamat_lengkap);
										}
										if (kodePos === val.kode_pos || kodePos === "") {
											setKodePos(val.kode_pos);
										}
										if (addressLabel === val.label || addressLabel === "") {
											setAddressLabel(val.label);
										}
										if (phoneNum === val.phone || phoneNum === "") {
											setPhoneNum(val.phone);
										}
									}}
								>
									Edit
								</button>
							</div>
						) : null}
					</>
				);
			})}
		</div>
	);
};

export default AddressCard;
