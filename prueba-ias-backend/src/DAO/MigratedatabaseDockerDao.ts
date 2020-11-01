//import Conection from '../loaders/databaseLoader'
//import { Inject } from "typescript-ioc";
import { Pool, Client }  from 'pg'
const colog = require('colog')

export class MigratedatabaseDockerDao {
	private hostDocker:string|any
	private hostDockerD:string|any
	constructor(
		//@Inject private databaseConnection: Conection
		
	) { 
		this.hostDocker=`postgresql://postgres:admin@database_prueba`
		this.hostDockerD=`postgresql://postgres:admin@database_prueba/app`
	}
	/**
	@router 
    **/
   	async migracion():Promise<object|any> {
   		let resval:object|any = {}
   		let resdb:object|any = {}
   		let restab:object|any = {}
   		let resins:object|any = {}

   		resval= await this.eliminardatabase()
   		console.log('resval',resval)
   		if(resval.code==201){
   			return resval
   		}

   		//ESTE METODO NO SE EJECUTA
   		resval= await this.validarcreateDataBase()
   		// console.log('resval',resval)
   		// if(resval.code==201){
   		// 	return resval
   		//}

   		resdb= await this.createDataBase()
   		console.log('resdb',resdb)
   		if(resdb.code==500){
   	    	return resdb
   		}
 		 
 		 //setTimeout(async () => {
 		 	restab=await this.createTables()
   		console.log('resdb',restab)
   		if(restab.code==500){
   			return restab
   		}
 		 //},1000)
   		
   		//setTimeout(async () => {
   		resins=await this.insertTable()
   		console.log('resdb',resins)
   		return resins
	   	//},1900)
    }

    async eliminardatabase():Promise<object|any>{
    	const connectionString = this.hostDocker //this.hostDocker
			const pool = new Pool({
			  connectionString: connectionString,
			})
			try{
				colog.success('***************************************')
				colog.success('************DROP DATABASE************')
				colog.success('***************************************')
				let res:object|any={}
				let des:object|any={}

				des = await pool.query(`SELECT	pg_terminate_backend (pid)
										FROM	pg_stat_activity
										WHERE	pg_stat_activity.datname = 'app';`)

				colog.success('***********desconet data base**************')
				console.log(des.rows)
				colog.success('***********desconet data base**************')

				res = await pool.query(`DROP DATABASE IF EXISTS app;`)
				colog.success('***********DROP data base***********')
				console.log(res.rows)
				colog.success('***********DROP data base***********')
				if(res.rowCount == null){
					return {code: 200, msg:'ok_sig'}
				}else{
					return {code: 201, msg:'migrate database ya fue generado'}
				}
			}catch(error){
				console.log(error,'error DROP database')
				return {code: 500, msg:'migrate database ya se realizo'}
			}
    }

    async validarcreateDataBase ():Promise<object|any> {
    	const connectionString = this.hostDocker //this.hostDocker
			const pool = new Pool({
			  connectionString: connectionString,
			})
			try{
				let res:object|any={}
				res = await pool.query(`SELECT datname FROM pg_database WHERE datname='app';`)
				colog.success('----------SELECT data base--------------')
				console.log(res.rows)
				colog.success('-----------SELECT data base-------------')
				if(res.rowCount == 0){
					return {code: 200, msg:'ok_sig'}
				}else{
					return {code: 201, msg:'migrate database ya fue generado'}
				}
			}catch(error){
				console.log(error,'error migrar')
				return {code: 500, msg:'migrate database ya se realizo'}
			}	 
    }

    async createDataBase ():Promise<object|any> {
	    colog.success('***************************************')
			colog.success('************CREATE DATABASE************')
			colog.success('***************************************')
			const connectionString =  this.hostDocker //this.hostDocker
			const pool = new Pool({
			  connectionString: connectionString,
			})
			let res:object|any={}
			try{
				res = await pool.query(`CREATE DATABASE app
								    WITH 
								    OWNER = postgres
								    ENCODING = 'UTF8'
								    TABLESPACE = pg_default
								    CONNECTION LIMIT = -1;`)
				colog.success('----------create data base--------------')
				console.log(res.rows)
				colog.success('-----------create data base-------------')
				pool.end() 
				if(res.rowCount == null || res.rowCount == 'null'){
					return {code: 200, msg:'migrate database Exitoso'}
				}else{
					return {code: 200, msg:'migrate database ya se realizo'}
				} 
			}catch(error){
				colog.success(error,'error migrar')
				return res={code:500, msg:'migrate database ya se realizo'}
			}
		
	}

	async createTables():Promise<object|any> {
		const connectionString = this.hostDockerD  //`postgresql://postgres:admin@localhost/ban_colombia` //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let resc:object|any={}
		let resu:object|any={}

		let rese:object|any={}
		let resd:object|any={}

		let rest:object|any={}
		let resf:object|any={}
		let resg:object|any={}
		
		let tabl:object|any={}
		
		try{
			colog.success('***************************************')
				let tabl2=await pool.query(`SELECT table_schema, table_name
									FROM information_schema.tables
									where table_schema = 'public'
									ORDER BY table_name;`)
			colog.success('---------ROWS TABLE VALIDACION SIN EXISTE LA TABLA RT---------------')
			console.log(tabl2.rows)
			colog.success('***************************************')
			colog.success('************CREATE TABLE***************')

			resc=await pool.query(`-- SEQUENCE: public.Tecnico_Id_seq
															-- DROP SEQUENCE public."Tecnico_Id_seq";
															CREATE SEQUENCE public."Tecnico_Id_seq"
															    INCREMENT 1
															    START 1
															    MINVALUE 1
															    MAXVALUE 9223372036854775807
															    CACHE 1;
															ALTER SEQUENCE public."Tecnico_Id_seq"
															    OWNER TO postgres;`)
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(resc.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')

			resu=await pool.query(`-- Table: public.Tecnico
															-- DROP TABLE public."Tecnico";
															CREATE TABLE public."Tecnico"
															(
															    "Id" integer NOT NULL DEFAULT nextval('"Tecnico_Id_seq"'::regclass),
															    "Nombres" text COLLATE pg_catalog."default" NOT NULL,
															    "Identificacion" text COLLATE pg_catalog."default" NOT NULL,
															    CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("Id")
															)
															WITH (
															    OIDS = FALSE
															)
															TABLESPACE pg_default;
															ALTER TABLE public."Tecnico"
															    OWNER to postgres;`)
			colog.success('----------CREATE TABLE base--------------')
			//console.log(resu.rows)
			colog.success('-----------CREATE TABLE base-------------')

			rese=await pool.query(`-- SEQUENCE: public.Servicio_Id_seq
															-- DROP SEQUENCE public."Servicio_Id_seq";
															CREATE SEQUENCE public."Servicio_Id_seq"
															    INCREMENT 1
															    START 1
															    MINVALUE 1
															    MAXVALUE 9223372036854775807
															    CACHE 1;
															ALTER SEQUENCE public."Servicio_Id_seq"
															    OWNER TO postgres;
															`)
			
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(rese.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')

			resd=await pool.query(`-- Table: public.Servicio
															-- DROP TABLE public."Servicio";
															CREATE TABLE public."Servicio"
															(
															    "Id" integer NOT NULL DEFAULT nextval('"Servicio_Id_seq"'::regclass),
															    "IdentificacionServicio" text COLLATE pg_catalog."default" NOT NULL,
															    "FechaInicio" text COLLATE pg_catalog."default" NOT NULL,
															    "FechaFin" text COLLATE pg_catalog."default" NOT NULL,
															    "IdentificacionTecnico" text COLLATE pg_catalog."default" NOT NULL,
															    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("Id")
															)
															WITH (
															    OIDS = FALSE
															)
															TABLESPACE pg_default;
															ALTER TABLE public."Servicio"
															    OWNER to postgres;
															`)

			colog.success('----------CREATE TABLE base--------------')
			//console.log(resf.rows)
			colog.success('-----------CREATE TABLE base-------------')

			//colog.success('%c Oh my heavens! ', 'color: #bada55','more text');
			let tabl1=await pool.query(`SELECT table_schema, table_name
									FROM information_schema.tables
									where table_schema = 'public'
									ORDER BY table_name;`)
			colog.success('---------ROWS TABLE---------------')
			console.log(tabl1.rows)
			pool.end()
			return {code: 200, msg:'migrate tablas exitosas'}
		}catch(error){
			console.log(error,'oooooo')
			return {code: 500, msg:'migrate tabla ya se ejecuto'}
		
		}
	}

	async  insertTable():Promise<object|any> {

		const connectionString =  this.hostDockerD //`postgresql://postgres:admin@localhost/ban_colombia`//this.hostdatabase //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let resIu1:object|any={}
		let resIu2:object|any={}
		let resIu3:object|any={}
		let resIu4:object|any={}
		let resIu5:object|any={}
		let resIu6:object|any={}
		let resIu7:object|any={}
		let prue:object|any={}
		try{
			colog.success('***************************************')
			colog.success('************INSERT TABLE***************')
			colog.success('***************************************')
			let arrayIns1:Array<any>=[]
			let arrayIns2:Array<any>=[]
			let arrayIns3:Array<any>=[]
			let arrayIns4:Array<any>=[]
			let arrayIns5:Array<any>=[]
			arrayIns1=[
				`INSERT INTO public."Tecnico"("Nombres", "Identificacion") VALUES ('Jonathan', '1109845095');`,
				`INSERT INTO public."Tecnico"("Nombres", "Identificacion") VALUES ('Jonathan David', '1109845096');`,
				`INSERT INTO public."Tecnico"("Nombres", "Identificacion") VALUES ('Carolina Lopez', '10982827273');`
			]

			arrayIns2=[
				`INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
					VALUES ('10', '2020-10-19 07:00', '2020-10-19 20:00', '1109845095');`,

				`INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
				 VALUES ('11', '2020-10-20 07:00', '2020-10-20 20:00', '1109845095');`,

				 `INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
				 VALUES ('12', '2020-10-21 07:00', '2020-10-21 17:00', '1109845095');`,

				 `INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
				 VALUES ('13', '2020-10-22 21:00', '2020-10-23 06:00', '1109845095');`,

				`INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
				 VALUES ('14', '2020-10-23 07:00', '2020-10-23 17:00', '1109845095');`,

				 `INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
				 VALUES ('15', '2020-10-23 21:00', '2020-10-24 06:00', '1109845095');`,


				 `INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
				 VALUES ('16', '2020-10-25 09:00', '2020-10-25 15:00', '1109845095');`
			]

			for(let x in arrayIns1){
				//console.log(arrayIns1[x],`insert ${x}`)
				resIu1=await pool.query(`${arrayIns1[x]}`)
			}
			for(let x in arrayIns2){
				//console.log(arrayIns2[x],`insert ${x}`)
				resIu2=await pool.query(`${arrayIns2[x]}`)
			}

			//let prue1=await pool.query(`SELECT *  FROM public."usuarios";`)

			colog.success('************ROWS INSERT TABLES*************')

			//console.log(prue1.rows)

			return {code:200, msg:'migrate exitoso'}
			pool.end()	
		}catch(error){
			console.log(error,'error migrar')
			return {code:500, msg:'migrate error tablas'}
		}
	}
}