import { Router } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import  routerServices from './routes/routerServices'
const multipart = require('connect-multiparty')
const fileUpload = require('express-fileupload')

class GeneralRouter {
  public router:Router
  private routerServices:routerServices|any
  private multipartMiddleware:any

  constructor() {
    this.router = Router()
    this.config()
    this.routes()
  }
  routes(){
    this.routerServices.router()
  }
  config(){
    this.router.use(bodyParser.json());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(morgan('dev'))
    this.router.use(fileUpload())
    this.router.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }))
    this.routerServices = new routerServices(this.router)
  }
}
const GeneralRouters =  new GeneralRouter
export default GeneralRouters.router