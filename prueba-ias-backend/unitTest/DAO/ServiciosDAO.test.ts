import {Container, Scope} from 'typescript-ioc';
import  DatabaseConnection from '../../src/loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { ServicesDAO }  from '../../src/DAO/ServicesDAO';
import { chargeJsonResponse } from '../mocks/chargeJson';


test('validar validarServico no devuelve datos prueba1', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:any = Container.get(DatabaseConnection);
  
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let objectModel = chargeJsonResponse('validarusuario');
  database.setProcedureResponse(objectModel, true);
  let FechaInicio:string = '2020-10-19 07:00'
  let FechaFin = '2020-10-19 07:00'
  let IdentificacionTecnico = '12929292929'
  let dataResponse:any = await servicesDAO.validarServico(FechaInicio,FechaFin,IdentificacionTecnico);
  expect(dataResponse.rows.length == 0).toBe(true);
});


test('validar validarDatos no devuelve datos prueba2', async () => {
  let obj:any = []
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:any = Container.get(DatabaseConnection);
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let objectModel = chargeJsonResponse('validarusuario');
  database.setProcedureResponse(objectModel, true);
  let identificacion:any = '12222222222222'
  let numeroSemana:any = 34
  let dataResponse:any = await servicesDAO.validarDatos(identificacion, numeroSemana);
  expect(dataResponse.rows.length == 0).toBe(true);
});