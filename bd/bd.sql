-- MySQL Script generated by MySQL Workbench
-- Sun Dec  3 02:16:45 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SecondLibrary
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SecondLibrary` DEFAULT CHARACTER SET utf8 ;
USE `SecondLibrary` ;

-- -----------------------------------------------------
-- Table `SecondLibrary`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Chat` (
  `idChat` INT NOT NULL AUTO_INCREMENT,
  `fechaDeCreacion` DATE NULL,
  PRIMARY KEY (`idChat`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SecondLibrary`.`Tipo_Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Tipo_Usuario` (
  `idTipo_Usuario` INT NOT NULL AUTO_INCREMENT,
  `tipoDeUsuario` VARCHAR(45) NULL,
  PRIMARY KEY (`idTipo_Usuario`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Estado_usuario`(
  `idEstado_usuario` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NULL,
  PRIMARY KEY (`idEstado_usuario`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `SecondLibrary`.`Comerciante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Estado_usuario_idEstado_usuario` INT NOT NULL,
  `Tipo_Usuario_idTipo_Usuario` INT NOT NULL,
  `nombreUsuario` VARCHAR(45) NULL,
  `contrasena` VARCHAR(100) NULL,
  `nombre` VARCHAR(45) NULL,
  `apellidoPaterno` VARCHAR(45) NULL,
  `apellidoMaterno` VARCHAR(45) NULL,
  `matricula` VARCHAR(45) NULL,
  `correo` VARCHAR(45) NULL,
  PRIMARY KEY (`idUsuario`, `Tipo_Usuario_idTipo_Usuario`, `Estado_usuario_idEstado_usuario`),
  CONSTRAINT `fk_Comerciante_Tipo_Usuario1`
    FOREIGN KEY (`Tipo_Usuario_idTipo_Usuario`)
    REFERENCES `SecondLibrary`.`Tipo_Usuario` (`idTipo_Usuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comerciante_Estado_usuario1`
    FOREIGN KEY (`Estado_usuario_idEstado_usuario`)
    REFERENCES `SecondLibrary`.`Estado_usuario` (`idEstado_usuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SecondLibrary`.`Mensaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Mensaje` (
  `idMensaje` INT NOT NULL AUTO_INCREMENT,
  `Chat_idChat` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `contenidoMensaje` VARCHAR(200) NULL,
  `marcaDeTiempo` DATE NULL,
  PRIMARY KEY (`idMensaje`, `Chat_idChat`, `Usuario_idUsuario`),
  CONSTRAINT `fk_Mensaje_Chat1`
    FOREIGN KEY (`Chat_idChat`)
    REFERENCES `SecondLibrary`.`Chat` (`idChat`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensaje_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SecondLibrary`.`Comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Comentario` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `Comerciante_idComerciante` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `titulo` VARCHAR(50) NULL,
  `calificacion` FLOAT NOT NULL,
  `descripcion` VARCHAR(300) NULL,
  PRIMARY KEY (`idComentario`, `Comerciante_idComerciante`, `Usuario_idUsuario`),
  CONSTRAINT `fk_Comentario_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_Comerciante1`
    FOREIGN KEY (`Comerciante_idComerciante`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Oferta_Intercambio` (
  `idOferta_Intercambio` INT NOT NULL AUTO_INCREMENT,
  `Comerciante_idComerciante` INT NOT NULL,
  `isbnComerciante` VARCHAR(20) NOT NULL,
  `estadoIntercambio` VARCHAR(45) NOT NULL,
  `estadoLibro` VARCHAR(300) NOT NULL,
  `fechaDeCreacion` DATE NULL,
  PRIMARY KEY (`idOferta_Intercambio`, `Comerciante_idComerciante`),
    FOREIGN KEY (`Comerciante_idComerciante`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SecondLibrary`.`Intercambio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Intercambio` (
  `idIntercambio` INT NOT NULL AUTO_INCREMENT,
  `Oferta_Intercambio_idOferta_Intercambio` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `isbnUsuario` VARCHAR(20) NOT NULL,
  `fechaDeFinalizacion` DATE NOT NULL,
  PRIMARY KEY (`idIntercambio`, `Usuario_idUsuario`, `Oferta_Intercambio_idOferta_Intercambio`),
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Intercambio_Oferta_Intercambio1`
    FOREIGN KEY (`Oferta_Intercambio_idOferta_Intercambio`)
    REFERENCES `SecondLibrary`.`Oferta_Intercambio` (`idOferta_Intercambio`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Intercambio_Usuario1`
  FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SecondLibrary`.`Comerciante_Con_Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SecondLibrary`.`Usuario_Con_Chat` (
  `Chat_idChat` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`Chat_idChat`, `Usuario_idUsuario`),
  CONSTRAINT `fk_Chat_has_Usuario_Chat1`
    FOREIGN KEY (`Chat_idChat`)
    REFERENCES `SecondLibrary`.`Chat` (`idChat`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chat_has_Usuario_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `SecondLibrary`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `SecondLibrary`.`Tipo_Usuario` (`tipoDeUsuario`) 
VALUES ('Administrador');
INSERT INTO `SecondLibrary`.`Tipo_Usuario` (`tipoDeUsuario`)
VALUES ('Comerciante');

INSERT INTO `SecondLibrary`.`Estado_usuario` (`estado`)
VALUES ('no_aprobado'); 

INSERT INTO `SecondLibrary`.`Estado_usuario` (`estado`)
VALUES ('aprobado');

INSERT INTO `SecondLibrary`.`Estado_usuario` (`estado`)
VALUES ('bloqueado');