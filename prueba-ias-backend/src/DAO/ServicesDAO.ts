import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc";

export class ServicesDAO {

	constructor(
		@Inject private databaseConnection: Conection
	) { }

	/**
	@router 
    **/
	public async guardarDatos(requets:object|any):Promise<any> {
		const {IdentificacionTecnico, IdentificacionServicio , FechaInicio , FechaFin} = requets
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  let result:any  
			result=await connection.query(`INSERT INTO public."Servicio"("IdentificacionTecnico", "IdentificacionServicio", "FechaInicio", "FechaFin")
																		 VALUES($1, $2, $3, $4) RETURNING "Id", "IdentificacionTecnico","FechaInicio", "FechaFin", "IdentificacionServicio"`,
																		 [IdentificacionTecnico, IdentificacionServicio , FechaInicio , FechaFin ])
			if(result.rowCount > 0 ){
				data = { 'status' :200, 'rows' : result.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async validarServico(FechaInicio:string|any, FechaFin:string|any, IdentificacionTecnico:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Id", "IdentificacionServicio", "FechaInicio", "FechaFin"
																								FROM public."Servicio"
																								WHERE "FechaInicio" = '${FechaInicio}' AND  "FechaFin" = '${FechaFin}' 
																								AND  "IdentificacionTecnico" = '${IdentificacionTecnico}';`);
			if(query.rowCount > 0 ){
				data = {'status':200, 'rows': query.rows, msg:'existe'} 
			}else{
				data = {'status':200, 'rows': [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async validarServicoCreado(IdebtificacionServicio:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Id", "IdentificacionServicio", "FechaInicio", "FechaFin"
																								FROM public."Servicio"
																								WHERE "IdentificacionServicio" = '${IdebtificacionServicio}';`);
			if(query.rowCount > 0 ){
				data = {'status':200, 'rows': query.rows, msg:'existe'} 
			}else{
				data = {'status':200, 'rows': [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async validarDatos(identificacion:string|any, numeroSemana:string|any, fechaSemana:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Id", "IdentificacionServicio", "FechaInicio", "FechaFin", 
																								"IdentificacionTecnico"
																								FROM public."Servicio"
																								WHERE "IdentificacionTecnico" = '${identificacion}' AND 
																								( SELECT extract(week from '${fechaSemana}'::date)
																								FROM public."Servicio"
																								 WHERE "IdentificacionTecnico" = '${identificacion}' LIMIT 1) = '${numeroSemana}';`);
			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'ok'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async listarSchema():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT table_schema, table_name
														FROM information_schema.tables
														ORDER BY table_name;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async obtenerTecnico():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Id", "Nombres", "Identificacion" FROM public."Tecnico";`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :204, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async listarBases():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT datname FROM pg_database;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async createColumsTable(colums:string, type:string):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`ALTER TABLE public."Campanas" 
																								ADD COLUMN "${colums}" ${type};`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async consultaCampos(colums:string):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  const query:any = await connection.query(`SELECT DISTINCT 
																								    a.attnum as Id,
																								    a.attname as Nom_Colum
																								FROM pg_attribute a 
																								JOIN pg_class pgc ON pgc.oid = a.attrelid
																								LEFT JOIN pg_index i ON 
																								    (pgc.oid = i.indrelid AND i.indkey[0] = a.attnum)
																								LEFT JOIN pg_description com on 
																								    (pgc.oid = com.objoid AND a.attnum = com.objsubid)
																								LEFT JOIN pg_attrdef def ON 
																								    (a.attrelid = def.adrelid AND a.attnum = def.adnum)
																								WHERE a.attnum > 0 AND pgc.oid = a.attrelid
																								AND pg_table_is_visible(pgc.oid)
																								AND NOT a.attisdropped
																								AND pgc.relname = 'Campanas'  -- Nombre de la tabla
																								AND  a.attname like '%${colums}%'
																								ORDER BY a.attname;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}
}