import express from 'express';
import routesLoader from "./routesLoader";

export default async ({ expressApp }: { expressApp: express.Application }) => {
    /*** se carga la base de datos*/
    //Container.get(DatabaseConnection);
    /*** Se cargan todas las rutas*/
    return routesLoader({ app: expressApp });
};