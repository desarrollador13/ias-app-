import { Request, Response, NextFunction, Router } from 'express'
import ServicesController from '../../controllers/servicesController'
import { Container } from "typescript-ioc";
import MigratedatabaseController from '../../controllers/MigratedatabaseController' 
const multipart = require('connect-multiparty')
const fs = require('fs');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

export default class routerServices {
  public app:Router
  multipartMiddleware:any
  upload:any
  type:any
  constructor(router: Router) {
    this.app = router
    this.multipartMiddleware = multipart() 
  }

  router(): void {

    this.app.get(
      '/services/prueba/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        setTimeout(() => {
          let appRes:any = {
            status: 200,
            msg: 'ok'
          } 
          res.status(200).json(appRes)
        },500)
      }
    )

    this.app.get(
      '/services/tecnico/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController);
        let responseModel = await servicesController.obtenerTecnico();
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel);
      }
    )

    this.app.post(
      '/services/reportes/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController);
        let responseModel = await servicesController.guardarDatos(req);
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel);
      }
    )

   this.app.get(
      '/services/reportes/:identificacion/:numeroSemana',
      async (req: Request, res: Response, next: NextFunction) => {
          const servicesController:ServicesController = Container.get(ServicesController);
          let responseModel = await servicesController.consultarRepotes(req);
          res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/migrate/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const migratedatabaseController: MigratedatabaseController = Container.get(MigratedatabaseController);
          let responseModel = await migratedatabaseController.migracion();
          res.status(200).json(responseModel);
        } catch (error) {
          console.log(error)
        }
      }
    )

    this.app.get(
      '/services/migrate/docker/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const migratedatabaseController: MigratedatabaseController = Container.get(MigratedatabaseController);
          let responseModel = await migratedatabaseController.migracionDocker();
          res.status(200).json(responseModel);
        } catch (error) {
          console.log(error)
        }
      }
    )

  }
}