## Proyecto IAS

Projecto desarrollado Angular 8, NodeJs, Express, Typescript, Jest.io, typescript-ioc, Github
Docker Base de datos Postgresql

## Pasos Proyecto

1. git clone repositorio un unico proyecto frontend, Backend, base de datos

2. Docker tener en el equipo

3. ubicar en el docker-compose.yml
4. arrastar ruta ya seha terminal, git bash o cmd

5. una vez este ubicado ejecutar  descarga imagenes nodejs, angular 8, postgresql, y instala dependencias
   del projecto docker-compose build

6. una vez termine de ejecutar el build ejecutamos docker-compose up  
   carga el servidor en angular en http://localhost:4200/ y en nodejs http://localhost:3001/api/v1/services/prueba/

7. para crear las tablas ejecutamos el siguiente recurso http://localhost:3001/api/v1/services/migrate/docker/
   lo podemos ejecutar en el navegador o en postman
   respuesta servicio
   {
    "code": 200,
    "msg": "migrate exitoso",
    "rows": []
   }

8. Pruebas unitarias desarrolladas con jest.io para el backend las pruebas se ejecutan con el comando 
	npm run test