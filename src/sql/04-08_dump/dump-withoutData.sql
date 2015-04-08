-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.6.17 - MySQL Community Server (GPL)
-- Serveur OS:                   Win64
-- HeidiSQL Version:             9.1.0.4939
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Export de la structure de la base pour octo
DROP DATABASE IF EXISTS `octo`;
CREATE DATABASE IF NOT EXISTS `octo` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `octo`;


-- Export de la structure de table octo. carte
DROP TABLE IF EXISTS `carte`;
CREATE TABLE IF NOT EXISTS `carte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text NOT NULL,
  `echelle_temps_haut` tinyint(4) NOT NULL,
  `echelle_temps_bas` tinyint(4) NOT NULL,
  `duree` int(11) NOT NULL,
  `debut_annee` int(11) NOT NULL,
  `fin_annee` int(11) NOT NULL,
  `idU` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


-- Export de la structure de vue octo. checkcount
DROP VIEW IF EXISTS `checkcount`;
-- Création d'une table temporaire pour palier aux erreurs de dépendances de VIEW
CREATE TABLE `checkcount` (
	`nom` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`NB_LIEN` BIGINT(21) NOT NULL,
	`NB_PAGE` BIGINT(21) NOT NULL,
	`NB_STATUS` BIGINT(21) NOT NULL
) ENGINE=MyISAM;


-- Export de la structure de table octo. evenement
DROP TABLE IF EXISTS `evenement`;
CREATE TABLE IF NOT EXISTS `evenement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` varchar(12) NOT NULL DEFAULT '0',
  `end` varchar(12) NOT NULL DEFAULT '0',
  `titre` varchar(255) NOT NULL DEFAULT '0',
  `theme` varchar(12) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


-- Export de la structure de table octo. lien
DROP TABLE IF EXISTS `lien`;
CREATE TABLE IF NOT EXISTS `lien` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `idPage` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


-- Export de la structure de vue octo. pagescompletes
DROP VIEW IF EXISTS `pagescompletes`;
-- Création d'une table temporaire pour palier aux erreurs de dépendances de VIEW
CREATE TABLE `pagescompletes` (
	`nom` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`titre` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`url` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`lon` DOUBLE NULL,
	`lat` DOUBLE NULL,
	`accepte` TINYINT(1) NULL,
	`contraint` TINYINT(1) NOT NULL,
	`nb_langue` TINYINT(3) UNSIGNED NULL,
	`nb_visite` INT(11) NULL,
	`longueur` INT(11) UNSIGNED NULL,
	`debut_annee` SMALLINT(6) NULL,
	`debut_mois` TINYINT(3) UNSIGNED NULL,
	`debut_jour` TINYINT(3) UNSIGNED NULL,
	`fin_annee` SMALLINT(6) NULL,
	`fin_mois` TINYINT(3) UNSIGNED NULL,
	`fin_jour` TINYINT(3) UNSIGNED NULL,
	`date_MAJ` DATETIME NULL,
	`distance_portail` INT(11) NULL,
	`type_infobox` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;


-- Export de la structure de table octo. portail
DROP TABLE IF EXISTS `portail`;
CREATE TABLE IF NOT EXISTS `portail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lien` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


-- Export de la structure de procédure octo. RAZ_ARTICLE
DROP PROCEDURE IF EXISTS `RAZ_ARTICLE`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `RAZ_ARTICLE`()
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


-- Export de la structure de table octo. utilisateurs
DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL DEFAULT '0',
  `mdp` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- L'exportation de données n'était pas sélectionnée.


-- Export de la structure de vue octo. checkcount
DROP VIEW IF EXISTS `checkcount`;
-- Suppression de la table temporaire et création finale de la structure d'une vue
DROP TABLE IF EXISTS `checkcount`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `checkcount` AS SELECT portail.nom, count(lien.id) AS NB_LIEN, count(page.id) AS NB_PAGE, count(status.date_MAJ) AS NB_STATUS
FROM lien, page, status, portail 
WHERE lien.idPage = page.id AND 
lien.id = status.idLien AND
status.idPortail = portail.id
GROUP BY portail.id ;


-- Export de la structure de vue octo. pagescompletes
DROP VIEW IF EXISTS `pagescompletes`;
-- Suppression de la table temporaire et création finale de la structure d'une vue
DROP TABLE IF EXISTS `pagescompletes`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `pagescompletes` AS SELECT portail.nom, lien.titre, lien.url, page.lon, page.lat, status.accepte, status.contraint, page.nb_langue, 
page.nb_visite, page.longueur, page.debut_annee, page.debut_mois, 
page.debut_jour, page.fin_annee, page.fin_mois, page.fin_jour, 
page.date_MAJ, page.distance_portail, page.type_infobox
FROM lien, page, status, portail 
WHERE lien.idPage = page.id AND 
lien.id = status.idLien AND
status.idPortail = portail.id ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
