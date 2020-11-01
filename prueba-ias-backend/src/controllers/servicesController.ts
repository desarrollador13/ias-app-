import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import { ServicesDAO } from '../DAO/ServicesDAO'
import requests from 'request-promise'
const multipart= require('connect-multiparty')
const fs= require('fs');
const getStream = require('get-stream')
import moment from 'moment'
const colog = require('colog')


export default class ServicesController {
	resValidacionArc:Array<any>|any
	constructor(
		@Inject private servicesDAO: ServicesDAO,
	) {
		this.resValidacionArc= []
	}
 /** **/
 	async guardarDatos(requets:object|any):Promise<any> {
 		
		let res:any
		try{
			const {IdentificacionTecnico, IdentificacionServicio , FechaInicio , FechaFin } = requets.body

			if(!IdentificacionTecnico  && !IdentificacionServicio && !FechaInicio  && 
				 !FechaFin ){
				return {status: 400, msg: 'bad request' }
			}

			if(IdentificacionTecnico == '' && IdentificacionServicio == '' && FechaInicio == '' && 
				 FechaFin  == '' ){
				return {status: 400, msg: 'los campos no pueden estar vacios' }
			}

			let resVa:any = await this.servicesDAO.validarServico(FechaInicio,FechaFin,IdentificacionTecnico)
			if(resVa.msg == 'existe'){
				return resVa
			}
			if(resVa.msg == 'error_server'){
				return resVa
			}

			let resVaSer:any = await this.servicesDAO.validarServicoCreado(IdentificacionServicio)

			if(resVaSer.msg == 'existe'){
				return resVaSer
			}
			if(resVaSer.msg == 'error_server'){
				return resVaSer
			}

			res = await this.servicesDAO.guardarDatos(requets.body)
			if(res.status == 500){
				return res
			}
			if(res.status == 400){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
		
	}

 	async consultarRepotes(req:object|any): Promise<any> {
 		let res:any
 		console.log(req.params)
 		let {identificacion, numeroSemana} = req.params
 		try{
 			let sumHorasNormales:number|any = 0
 			let sumHorasNocturnas:number|any = 0
 			let sumHorasDominicales:number|any = 0
 			let sumNormalesExtra:number|any = 0
 			let sumNocturnasExtra:number|any = 0
 			let sumDominicalesExtra:number|any = 0

 			let sumMinNormales:number|any = 0
 			let sumMinNocturnas:number|any = 0
 			let sumMinDominicales:number|any = 0
 			let sumMinNormalesExtra:number|any = 0
 			let sumMinNocturnasExtra:number|any = 0
 			let sumMimDominicalesExtra:number|any = 0

 			let horasNormales:Array<any>|any  = ['07:00','20:00','L','S']
 			let horasNocturnas:Array<any>|any = ['20:00','07:00','L','S']
 			let horasDomicales:Array<any>|any = ['07:00','20:00','D']
 			let horasNormalesExtras:Array<any>|any = ['07:00','20:00','D']
 			let horasNocturnasExtras:number|any = 0
 			let horasDominicalesExtras:number|any = 0
 			if(!identificacion  && !numeroSemana) {
 				return {status: 400, msg: 'bad request' }
 			}

 			let fechaSemana:any = this.getDateOfWeek(numeroSemana)

 			res = await this.servicesDAO.validarDatos(identificacion, numeroSemana, fechaSemana)
 			console.log(res)
 			if(res.msg == 'no_existe'){
 				console.log('aqui no existe')
				return {
					status:200,
					msg: "Exitoso",
					rows : [{
						"sum_Horas_Normales": sumHorasNormales,
						"sum_Horas_Nocturnas": sumHorasNocturnas,
						"sum_Horas_Dominicales": sumHorasDominicales,
						"sum_Normales_Extra": sumNormalesExtra,
						"sum_Nocturnas_Extra": sumNocturnasExtra,
						"sum_Dominicales_Extra": sumDominicalesExtra
					}]
				}
			}
			if(res.msg == 'error_server'){
				console.log('error_server')
				return {
					status:200,
					msg: "Exitoso",
					rows : [{
						"sum_Horas_Normales": sumHorasNormales,
						"sum_Horas_Nocturnas": sumHorasNocturnas,
						"sum_Horas_Dominicales": sumHorasDominicales,
						"sum_Normales_Extra": sumNormalesExtra,
						"sum_Nocturnas_Extra": sumNocturnasExtra,
						"sum_Dominicales_Extra": sumDominicalesExtra
					}]
				}
			}

			for(let i = 0; i < res.rows.length; i++) {

				let fechaI = res.rows[i].FechaInicio.split(' ')[0]
				let fechaF = res.rows[i].FechaFin.split(' ')[0]
				let horaI = res.rows[i].FechaInicio.split(' ')[1]
				let horaS = res.rows[i].FechaFin.split(' ')[1]
				let convHoraI:any = horaI.split(':')[0]
				let convHoraF:any = horaS.split(':')[0]
				let compHoraI:any = 7
				let compHoraF:any = 20

				let validarFI=  await this.obtenerDia(fechaI)
				if( validarFI == 'Lunes' || validarFI == 'Martes' || validarFI == 'Miercoles' ||
					  validarFI == 'Jueves' || validarFI == 'Viernes' || validarFI == 'Sabado') {
					if(horaI >= '20:00' && horaS <= '07:00'){
						if(sumHorasNocturnas > 48) {
							//HORAS NOCTURNAS EXTRAS
							if( sumNocturnasExtra == 0 ) {
								let diffExtra:any = sumHorasNocturnas - 48
								sumHorasNocturnas = 48
								sumNocturnasExtra+= diffExtra
							}else {
								let diff:any = await this.calcularHora(res.rows[i].FechaInicio, res.rows[i].FechaFin)
								sumNormalesExtra+= diff[0]
							}							
						//HORAS NOCTURNAS NORMALES
						}else {
							let diff:any = await this.calcularHora(res.rows[i].FechaInicio, res.rows[i].FechaFin)
							sumHorasNocturnas+= diff[0]
						}
					}else if(horaI >= '07:00' && horaS <= '20:00') {
						//HORAS DIURNAS NORMALES OPERACIONES CORRESPODIENTES PARA EL CALCULO DE  LAS HORAS
						if(sumHorasNormales > 48) {
							if( sumNormalesExtra == 0 ) {
								let diffExtra:any = sumHorasNormales - 48
								sumHorasNormales = 48
								sumNormalesExtra+= diffExtra
							}else {
								let diff:any = await this.calcularHora(res.rows[i].FechaInicio, res.rows[i].FechaFin)
								sumNormalesExtra+= diff[1]
							}							
						}else{
							let diff:any = await this.calcularHora(res.rows[i].FechaInicio, res.rows[i].FechaFin)
							sumHorasNormales+= diff[1]
						}
						//HORAS NOCTURNAS OPERACIONES CORRESPODIENTES PARA EL CALCULO DE  LAS HORAS
					}
					//CALOCULAR LAS HORAS DOMINICALES TRABAJADAS 
				}else if(validarFI == 'Domingo' || validarFI == undefined  || validarFI == 'undefined'){
					//HORARIO DIURNO DOMINICAL DEL TECNICO
					if(horaI >= '07:00' && horaS <= '20:00') {
						let diff:any = await this.calcularHora(res.rows[i].FechaInicio, res.rows[i].FechaFin)
						sumHorasDominicales+= diff[1]

					}else if(horaI >= '20:00' && horaS <= '07:00'){
						let diff:any = await this.calcularHora(res.rows[i].FechaInicio, res.rows[i].FechaFin)
						sumHorasDominicales+= diff[1]
					}
				}

			}
			// console.log(sumHorasNormales,'sumHorasNormales', sumHorasNocturnas,'sumHorasNocturnas',
			// 	sumHorasDominicales,'sumHorasDominicales',sumNormalesExtra,'sumNormalesExtra',sumNocturnasExtra,'sumNocturnasExtra')


			return {
				status:200,
				msg: "Exitoso",
				rows : [{
					"sum_Horas_Normales": sumHorasNormales,
					"sum_Horas_Nocturnas": sumHorasNocturnas,
					"sum_Horas_Dominicales": sumHorasDominicales,
					"sum_Normales_Extra": sumNormalesExtra,
					"sum_Nocturnas_Extra": sumNocturnasExtra,
					"sum_Dominicales_Extra": sumDominicalesExtra
				}]
			}
 		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
 	}

 	getDateOfWeek(weekNumber:number|any) { 
 		let fechaAct:any = new Date()
 		let year:any = fechaAct.getFullYear()
 		let date:any = new Date(year, 0, 1+((weekNumber-1)*7))
 		let fecha:any = moment(date).format("YYYY-MM-DD")
 		return fecha; 
	}

	secondsToString(seconds:any ) {
	  let hour:any = Math.floor(seconds / 3600)
	  hour = (hour < 10)? '0' + hour : hour;
	  let minute:any = Math.floor((seconds / 60) % 60)
	  minute = (minute < 10)? '0' + minute : minute;
	  return hour + ':' + minute;
	}
// var segundos = 4926;
// console.log(secondsToString(segundos));

 	calcularHora(fechaInicio:string|any, fechaFin:string|any) {

 		let fechaIni:any = moment(fechaInicio, "YYYY-MM-DD HH:mm:ss");
 		let fechaFi:any =  moment(fechaFin, "YYYY-MM-DD HH:mm:ss");

 		let diffTime:any = moment(fechaFi).diff(fechaIni)
 		let duration:any = moment.duration(diffTime);
 		let hrs:any = duration.hours()
    let mins:any = duration.minutes()
    let hrmins:any = hrs +''+ mins
 		
 		let diff = fechaFi.diff(fechaIni, 'h'); // Diff in hours
 		console.log('diff-->>>',diff,'diff',hrs,'min',mins,'hrmins->',hrmins)
		return [diff,hrs,mins]
 	}

 	obtenerDia(fechaDia:string|any){
		let days = ['Lunes','Martes','Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
		let fecha = fechaDia.split('-').reverse()
		let aa= fecha[2]
		let mm= fecha[1]
		let dd= fecha[0]
		let fechaCalcular=  mm +'/' + dd + '/'  + aa
		let d = new Date(fechaCalcular); //Miércoles
		return days[d.getUTCDay()-1]
 	}

 	async obtenerTecnico():Promise<any> {
 		let res:any
		try{
			res = await this.servicesDAO.obtenerTecnico()
			if(res.status == 500){
				return res
			}
			if(res.status == 204){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
 	}

}
