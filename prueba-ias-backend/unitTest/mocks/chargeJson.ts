import fs from 'fs';

export function chargeJsonRequest(nameJson: string) {
	let obj = fs.readFileSync(`${__dirname}/request/${nameJson}.json`).toString();
	obj = JSON.parse(obj);
	return obj;
}

export function chargeJsonResponse(nameJson: string) {
    let obj = fs.readFileSync(`${__dirname}/responses/${nameJson}.json`).toString();
    obj = JSON.parse(obj);
    return obj;
}