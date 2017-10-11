#!/usr/bin/env node
const skygear = require('skygear');
const fs = require('fs');
const program =require('commander');
const path = require('path');
const parse = require('csv-parse');

program
	.arguments('<file>')
	.option('-e, --endpoint <endpoint>', 'Skygear endpoint')
	.option('-k, --apikey <apikey>', 'Skygear API Key')
	.option('-t, --table <table>', 'Desired Table Name to upload')
	.action(function(file) {
		skygear.config({
			'endPoint': program.endpoint,
			'apiKey': program.apikey
		}).then(() => {
			console.log('Connected Skygear');
			handleFile(file);
		}, (error) => {
			console.log('Error when connecting with skygear. Error:' + error);
		});
 	})
   .parse(process.argv);


function handleFile(file) {
	const fileExtension = path.extname(file);
		if (fileExtension === ".json") {
			uploadJSONFileToSkygear(file);
		}else if (fileExtension === ".csv") {
			convertCSVFileToSKYRecord(file);
		}else {
			console.log("Skygear Data Importer only supports JSON or CSV files.")
		}
}

function uploadJSONFileToSkygear(file) {
	// TODO
}

function convertCSVFileToSKYRecord(file) {
	console.log("Converting");
	const NewRecord = skygear.Record.extend(program.table);
	fs.readFile(file, (err, fileData) => {
		parse(fileData, {columns: true, trim: true}, (err, rows) => {
			var recordToBeUploaded = rows.map((r) => {
				return new NewRecord(r);
			});
			uploadRecords(recordToBeUploaded);
		});
	});
}

function uploadRecords(records) {
	signUpImporterUser().then(() => {
		skygear.publicDB.save(records, {atomic: true}).then((result) => {
			console.log(result);
			process.exit(1);
		}).catch((error) => {
			console.log(error);
		});
	}).catch((error) => {
		console.error(error);
	});
}

function signUpImporterUser() {
	return new Promise((resolve, reject) => {
		skygear.auth.signupWithUsername('skygear-data-importer', 'skygear-data-import-secret-password').then((user) => {
			resolve()
		}, (error) => {
			if (error.error.code === skygear.ErrorCodes.Duplicated) {
				loginImporterUser().then(() => {
					console.log('Logged in');
					resolve();
				}).catch((error) => {
					console.error(error);
					reject(error);
				})
			} else {
				reject(error);
			}
		});
	});
}

function loginImporterUser() {
	return new Promise((resolve, reject) => {
		skygear.auth.loginWithUsername('skygear-data-importer', 'skygear-data-import-secret-password').then((user) => {
			resolve(user);
		}, (error) => {
			reject(error);
		})
	})
}
