-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.6.15-log - MySQL Community Server (GPL)
-- Serveur OS:                   Win32
-- HeidiSQL Version:             9.1.0.4920
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=`NO_AUTO_VALUE_ON_ZERO` */;

-- Export de la structure de la base pour octo
DROP DATABASE IF EXISTS `octo`;
CREATE DATABASE IF NOT EXISTS `octo` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `octo`;


-- Export de la structure de table octo. lien
DROP TABLE IF EXISTS `lien`;
CREATE TABLE IF NOT EXISTS `lien` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `idPage` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Export de données de la table octo.lien : 6 rows
DELETE FROM `lien`;

-- Export de la structure de table octo. page
DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL,
  `lon` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `type_infobox` varchar(50) DEFAULT NULL,
  `nb_langue` tinyint(3) unsigned DEFAULT NULL,
  `nb_visite` int(11) DEFAULT NULL,
  `longueur` int(11) unsigned DEFAULT NULL,
  `debut_annee` smallint(6) DEFAULT NULL,
  `debut_mois` tinyint(3) unsigned DEFAULT NULL,
  `debut_jour` tinyint(3) unsigned DEFAULT NULL,
  `fin_annee` smallint(6) DEFAULT NULL,
  `fin_mois` tinyint(3) unsigned DEFAULT NULL,
  `fin_jour` tinyint(3) unsigned DEFAULT NULL,
  `date_MAJ` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `distance_portail` int(11) DEFAULT NULL,
  `id_portail` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Export de données de la table octo.page : 6 rows
DELETE FROM `page`;


-- Export de la structure de table octo. portail
DROP TABLE IF EXISTS `portail`;
CREATE TABLE IF NOT EXISTS `portail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lien` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Export de données de la table octo.portail : 1 rows
DELETE FROM `portail`;


-- Export de la structure de procédure octo. RAZ_BASE
DROP PROCEDURE IF EXISTS `RAZ_BASE`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `RAZ_BASE`()
BEGIN
	
	TRUNCATE TABLE lien;
	TRUNCATE TABLE page;
	TRUNCATE TABLE status;
	
	
END//
DELIMITER ;


-- Export de la structure de table octo. status
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `idPortail` int(11) NOT NULL,
  `idLien` int(11) NOT NULL,
  `accepte` tinyint(1) DEFAULT NULL,
  `contraint` tinyint(1) NOT NULL,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPortail`,`idLien`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Export de données de la table octo.status : 6 rows
DELETE FROM `status`;


-- Export de la structure de vue octo. pagescompletes
DROP VIEW IF EXISTS `pagescompletes`;
-- Suppression de la table temporaire et création finale de la structure d`une vue
DROP TABLE IF EXISTS `pagescompletes`;
CREATE DEFINER=`root`@`localhost` VIEW `pagescompletes` AS SELECT lien.titre, lien.url, page.lon, page.lat, status.accepte, status.contraint, page.nb_langue, 
page.nb_visite, page.longueur, page.debut_annee, page.debut_mois, 
page.debut_jour, page.fin_annee, page.fin_mois, page.fin_jour, 
page.date_MAJ, page.distance_portail, page.type_infobox
FROM lien, page, status
WHERE lien.idPage = page.id AND 
lien.id = status.idLien ;
