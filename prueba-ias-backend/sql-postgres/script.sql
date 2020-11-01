CREATE SCHEMA `vass_talem` ;


CREATE TABLE `vass_latam`.`roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idRoles`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE);

CREATE TABLE `roles` (
  `idRoles` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idRoles`),
  UNIQUE KEY `Nombre_UNIQUE` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `vass_latam`.`roles`(`Nombre`) VALUES ('Admin');
INSERT INTO `vass_latam`.`roles`(`Nombre`) VALUES ('operacion');


CREATE TABLE `vass_latam`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `NombreUsuario` VARCHAR(45) NOT NULL,
  `ApellidosUsuario` VARCHAR(45) NOT NULL,
  `Loguinusuario` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(500) NOT NULL,
  `IdRoles` INT NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `idRoles_idx` (`IdRoles` ASC) VISIBLE,
  CONSTRAINT `idRoles`
    FOREIGN KEY (`IdRoles`)
    REFERENCES `vass_latam`.`roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);