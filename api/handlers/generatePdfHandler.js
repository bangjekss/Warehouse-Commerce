const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const generatePdfHandler = async (templateName, data, filename) => {
	try {
		const filepath = path.resolve(
			process.cwd(),
			__dirname,
			"../resources/mail",
			`${templateName}.handlebars`
		);
		const html = await fs.readFileSync(filepath, "utf-8");
		const template = handlebars.compile(html)(data);
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(template);
		await page.emulateMedia("screen");
		await page.pdf({
			format: "A4",
			path: path.resolve("public/invoices/", `${filename}.pdf`),
			printBackground: true,
		});
		await browser.close();
	} catch (err) {
		console.log(err);
	}
};

module.exports = { generatePdfHandler };
