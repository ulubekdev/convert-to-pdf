const express = require("express");
const fs = require("fs");
const path = require("path");

const { PDFNet } = require("@pdftron/pdfnet-node");
const mimeType = require("./modules/mimeType");

const filesPath = "./files";

const app = express();

app.get("/files", (req, res) => {
	const inputPath = path.resolve(__dirname, filesPath);
	fs.readdir(inputPath, function (err, files) {
		if (err) {
			return console.log("Unable to scan directory: " + err);
		}
		res.setHeader("Content-type", mimeType[".json"]);
		res.end(JSON.stringify(files));
	});
});

app.get("/files/:filename", (req, res) => {
	const inputPath = path.resolve(__dirname, filesPath, req.params.filename);
	fs.readFile(inputPath, function (err, data) {
		if (err) {
			res.statusCode = 500;
			res.end(`Error getting the file: ${err}.`);
		} else {
			const ext = path.parse(inputPath).ext;
			res.setHeader("Content-type", mimeType[ext] || "text/plain");
			res.end(data);
		}
	});
});

app.get("/convert/:filename", (req, res) => {
	let filename = req.params.filename;
	let ext = path.parse(filename).ext;

	if (ext === ".pdf") {
		return res.status(500).send({
			message: "File already PDF",
			data: null,
		});
	}

	const inputPath = path.resolve(__dirname, filesPath, filename);
	const outputPath = path.resolve(__dirname, filesPath, `${filename}.pdf`);

	const main = async () => {
		const pdfdoc = await PDFNet.PDFDoc.create();
		await pdfdoc.initSecurityHandler();
		await PDFNet.Convert.toPdf(pdfdoc, inputPath);
		pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
	};

	PDFNetEndpoint(main, outputPath, res);
});

const PDFNetEndpoint = (main, pathname, res) => {
	PDFNet.runWithCleanup(main, process.env.PDFTRONKEY) // you can add the key to PDFNet.runWithCleanup(main, process.env.PDFTRONKEY)
		.then(() => {
			PDFNet.shutdown();
			fs.readFile(pathname, (err, data) => {
				if (err) {
					res.statusCode = 500;
					res.end(`Error getting the file: ${err}.`);
				} else {
					const ext = path.parse(pathname).ext;
					res.setHeader("Content-type", mimeType[ext] || "text/plain");
					res.end(data);
				}
			});
		})
		.catch((error) => {
			res.statusCode = 500;
			res.end(error);
		});
};

module.exports = app;
