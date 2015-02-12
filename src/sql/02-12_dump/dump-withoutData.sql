-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.6.15-log - MySQL Community Server (GPL)
-- Serveur OS:                   Win32
-- HeidiSQL Version:             9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Export de la structure de la base pour octo
DROP DATABASE IF EXISTS `octo`;
CREATE DATABASE IF NOT EXISTS `octo` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `octo`;


-- Export de la structure de table octo. page
DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `long` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `nb_langue` tinyint(3) unsigned DEFAULT NULL,
  `nb_visite` int(11) DEFAULT NULL,
  `longueur` int(11) unsigned DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `date_maj` datetime DEFAULT NULL,
  `debut_annee` smallint(6) DEFAULT NULL,
  `debut_mois` tinyint(3) unsigned DEFAULT NULL,
  `debut_jours` tinyint(3) unsigned DEFAULT NULL,
  `fin_annee` smallint(6) DEFAULT NULL,
  `fin_mois` tinyint(3) unsigned DEFAULT NULL,
  `fin_jours` tinyint(3) unsigned DEFAULT NULL,
  `importance` int(11) DEFAULT NULL,
  `distance_portail` int(11) DEFAULT NULL,
  `id_portail` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- L'exportation de données n'été pas sélectionné.


-- Export de la structure de table octo. portail
DROP TABLE IF EXISTS `portail`;
CREATE TABLE IF NOT EXISTS `portail` (
  `id` int(10) unsigned NOT NULL,
  `nom` varchar(255) NOT NULL,
  `date_MAJ` datetime NOT NULL,
  `lien` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- L'exportation de données n'été pas sélectionné.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
