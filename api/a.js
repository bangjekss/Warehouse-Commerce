const moment = require("moment");
const pify = require("pify");
const { user } = require("./models");

// let arr = [
// 	{ qty: 2, stock: 2 },
// 	{ qty: 2, stock: 3 },
// 	{ qty: 2, stock: 1 },
// ];

// // Buat gagal transaksi
// const res = arr.find((val) => {
// 	return val.qty > val.stock;
// });

// if (res) {
// 	console.log("true");
// }

// // Kalo stock kurang?
// // Kalo stock kurang waktu sesudah get?

// let a = "kocak banget";
// let b = a.replace(" ", "%20");
// console.log(b);

// let c = {};
// if (Object.keys(c).length !== 0) {
// 	console.log(c);
// } else {
// 	console.log("ea");
// }

// const eaea = moment().add({ days: 2 }); // with object literal
// const b = eaea;
// console.log(b);
const x = () => {
	try {
		const username = "bangjekssasfd";
		const email = "razak9098@gmail.com";
		const password = "Lolipop9098_";
		var verifier = require("email-verify");
		verifier.verify(email, async (err, info) => {
			if (!info.success) {
				console.log("email did not exist");
				return console.log(info);
			}
			if (info.success) {
				console.log(info);
				try {
					const getUserByUsername = await user.findAll();
					if (getUserByUsername.length !== 0) {
						console.log("exist");
						return "email exist";
					}
				} catch (err) {
					console.log(err);
				}
			}
		});
		// const emailRegex = /^[\w-\.]+(@[\w-\.]+\.)+[\w-\.]{2,4}$/;
		// const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;
		// if (!email.match(emailRegex))
		// 	return { status: "Success", message: "Unvalid email" };
		// if (!password.match(passwordRegex))
		// 	return { status: "Success", message: "Unvalid password" };

		// const a = ["a"];
		// if (a.length === 1) return 100;
		// const getUserByEmail = await user.findAll({
		// 	where: { email, role_id: 2 },
		// });
		// if (getUserByEmail.length !== 0)
		// 	return { status: "Success", message: "Email already exists" };

		// // next();
		// return 0;
	} catch (err) {}
};
console.log(x());

// try {

// } catch (err) {
// 	// next(err);
// 	console.log(err);
// }
