import pg from "pg";
import sinon from "sinon";
import { expect } from "chai";
import { ServicesDAO }  from '../../src/DAO/ServicesDAO';
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/loaders/databaseLoader';
const colog = require('colog')

describe("ref 001 servicesDAO Consultas db", () => {

	afterEach(() => {
		sinon.restore();
	});
	
	it("prueba 003 validarCiudad", async () => {
		const mPool = { query: sinon.stub().resolves({"rows": [], "status": 204}) };
		const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
		const { ServicesDAO } = require("../../src/DAO/ServicesDAO");
		const db:ServicesDAO = Container.get(ServicesDAO);
		const actual = await db.obtenerTecnico();
		expect(actual).to.be.eql({"rows": [], "status": 204});
		sinon.assert.calledOnce(poolStub);
		sinon.assert.calledOnce(mPool.query);
	});

	it("prueba 004 validarUsuarioToken", async () => {
		const mPool = { query: sinon.stub().resolves({ status: 200, rows: [], msg: 'no_existe' }) };
		const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
		const { ServicesDAO } = require("../../src/DAO/ServicesDAO");
		const db:ServicesDAO = Container.get(ServicesDAO);
		let identificacion:string = '12282882882'
    let numeroSemana:string = '34'
		const actual = await db.validarDatos(identificacion,numeroSemana);
		expect(actual).to.be.eql({ status: 200, rows: [], msg: 'no_existe' });
		sinon.assert.calledOnce(poolStub);
		sinon.assert.calledOnce(mPool.query);
	});

});