import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, RouterStateSnapshot } from '@angular/router';
import {Observable,of, from } from 'rxjs';
import { SeviciosTecnicoService } from '../../servicios/sevicios-tecnico.service'

@Component({
  selector: 'app-reporte-servicio',
  templateUrl: './reporte-servicio.component.html',
  styleUrls: ['./reporte-servicio.component.css']
})
export class ReporteServicioComponent implements OnInit {

	formReporte:FormGroup
	formCalculos:FormGroup
	submit:boolean = false
	appEstado: Observable<any>

	exitosoRegistro:boolean = false
	errorRegistro:boolean = false
	msgRegistro:string = ''
	msgRegistrop:string = ''
	buttom:boolean = false
	validar:any
	dataSelectTecnico:any = []
	listHoras:boolean = false
	listHora:any = []

  IdentificacionTecnico:string = ''
  semanaTecnico:number = 0

  constructor(
  	private formBuilder: FormBuilder,
  	private router: Router,
  	private seviciosTecnicoService:SeviciosTecnicoService
  	) { 

  	this.formCalculos = this.formBuilder.group({
      identificacion: ['', Validators.required],
      numeroSemana: new FormControl('', Validators.compose(
        [Validators.required, Validators.pattern('^[0-9]+$')]))
    });

  	this.formReporte = this.formBuilder.group({
      IdentificacionTecnico: ['', Validators.required],
      IdentificacionServicio: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required]
    });
  }

  ngOnInit() {
  	
  	this.obtenerTecnico()
  }

  obtenerTecnico() {
  	this.seviciosTecnicoService.obtenerTecnico('services/tecnico/').subscribe((data:any) => {
  		
   		this.dataSelectTecnico = data.rows
   		console.log(this.dataSelectTecnico,'data')
   	})
  }

  get fl() {
    return this.formCalculos.controls;
  }

  get f() {
    return this.formReporte.controls;
  }

  calcularHoras (event){
  	this.exitosoRegistro = false
  	this.buttom = true
	  this.errorRegistro = false
	  this.msgRegistro = ''
	  this.msgRegistrop = ''

    this.IdentificacionTecnico = ''
    this.semanaTecnico = 0
    this.listHoras = false
    this.listHora = []
    this.listHora.length = 0;
  	if (this.formCalculos.invalid) {
  		this.submit = true;
  		this.buttom = false
  		return;
  	}else{
  		let numerosemana:any = parseInt(this.formCalculos.value.numeroSemana)
  		if(numerosemana > 53) {
  			this.buttom = false
  			this.errorRegistro = true
  			this.msgRegistro = 'Ingrese un numero de semana menor.'
  			this.msgRegistrop = 'Ingrese un numero de semana menor.'
  			return;
  		} 
  		console.log(this.formCalculos.value,'pp')
  		let identificacion = this.formCalculos.value.identificacion
      let Semana:any = this.formCalculos.value.numeroSemana

      this.IdentificacionTecnico = this.formCalculos.value.identificacion
      this.semanaTecnico = this.formCalculos.value.numeroSemana
  	  
      this.seviciosTecnicoService.calcularHoras(`services/reportes/${identificacion}/${Semana}`).subscribe((data:any) => {
  			console.log(data)
  			if(data.msg == 400) {

  				// this.buttom = false
  				// this.errorRegistro = true
  				// this.msgRegistro = 'Todos los campos son obligatorios.'
  				// this.msgRegistrop = 'Todos los campos son obligatorios.'
  			}else if(data.status == 500){
  				this.buttom = false
  				this.errorRegistro = true
  				this.msgRegistro = 'Error en autenticación'
  				this.msgRegistrop = 'intente mas tarde con el registro.'
  			}else {

          this.formCalculos.reset()
          this.listHora = []
          this.listHora.length = 0;
  				this.listHora = data.rows[0]
  				this.listHoras = true

  				this.exitosoRegistro = true
  				this.buttom = false
				  this.errorRegistro = false
				  this.msgRegistro = 'El calculo se genero con respeto a sus dias trabajados y las reglas de negocio.'
				  this.msgRegistrop = 'El calculo se genero con respeto a sus dias trabajados y las reglas de negocio.'

				  setTimeout(()=> {
				  	this.msgRegistro = ''
						this.msgRegistrop = ''
						this.exitosoRegistro = false
						//this.listHoras = false
				  },4600)
  			}

  		})
  	}
  }

  getValue(key){
  	let keyCustom:any = key.split("_")
  	let newKey:any = keyCustom[1] +' ' + keyCustom[2]
    console.log(keyCustom, newKey)
    return newKey
    //return Object.values(key);
  }

  registrarReporte(event){

  	this.buttom = true
  	this.exitosoRegistro = false
	  this.errorRegistro = false
	  this.msgRegistro = ''
	  this.msgRegistrop = ''

    this.IdentificacionTecnico = ''
    this.semanaTecnico = 0
    this.listHoras = false
    this.listHora = []
    this.listHora.length = 0;
	  
  	if (this.formReporte.invalid) {
  		this.buttom = false
  		this.submit = true;
  		return;
  	}else{
  		let jsonData:any = {
  			"IdentificacionTecnico" : this.formReporte.value.IdentificacionTecnico,
				"IdentificacionServicio" : this.formReporte.value.IdentificacionServicio,
				"FechaInicio" : this.formReporte.value.FechaInicio.replace('T',' '),
				"FechaFin" : this.formReporte.value.FechaFin.replace('T',' ')
  		}

  		let inicio:any = new Date(jsonData.FechaInicio);
      let final:any= new Date(jsonData.FechaFin);
  		if (final <= inicio) {
  			this.buttom = false
  			this.errorRegistro = true
  			this.msgRegistro = 'La fecha fin tiene que ser mayor que la inicio'
  			this.msgRegistrop = 'La fecha fin tiene que ser mayor que la inicio.'
  			return;
  		}
  		this.seviciosTecnicoService.registrarServicio('services/reportes/',jsonData).subscribe((data:any) => {
  			console.log(data)
        
  			if(data.msg == 'existe') {

  				this.buttom = false
  				this.errorRegistro = true
  				this.msgRegistro = 'El registro de este reporte ya existe.'
  				this.msgRegistrop = 'El registro de este reporte ya existe.'
  			}else if(data.status == 500){
  				this.buttom = false
  				this.errorRegistro = true
  				this.msgRegistro = 'Intente mas tarde crear el registro del reporte.'
  				this.msgRegistrop = 'Intente mas tarde crear el registro del reporte.'
  			}else {
  				this.exitosoRegistro = true
  				this.buttom = false
				  this.errorRegistro = false
				  this.msgRegistro = 'El registro del reporte se creo con exitoso.'
				  this.msgRegistrop = 'El registro del reporte se creo con exitoso.'

				  this.formReporte.reset()
				  setTimeout(()=> {
				  	this.msgRegistro = ''
						this.msgRegistrop = ''
						this.exitosoRegistro = false
				  },3600)
  			}
  		})
  	}
  }


  limpiarVariables(event) {
  	this.listHoras = false
    this.buttom = false
    this.exitosoRegistro = false
    this.errorRegistro = false
    this.msgRegistro = ''
    this.msgRegistrop = ''
    this.formCalculos.reset()
    this.formReporte.reset()

    this.IdentificacionTecnico = ''
    this.semanaTecnico = 0
    this.listHoras = false
    this.listHora = []
  }

}

