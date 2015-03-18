-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.6.15-log - MySQL Community Server (GPL)
-- Serveur OS:                   Win32
-- HeidiSQL Version:             9.1.0.4920
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

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
/*!40000 ALTER TABLE `lien` DISABLE KEYS */;
INSERT INTO `lien` (`id`, `url`, `titre`, `idPage`) VALUES
	(1, 'http://fr.wikipedia.org/wiki/Bataille_de_Corbione', 'Bataille de Corbione', 8449414),
	(2, 'http://fr.wikipedia.org/wiki/Bataille_de_CtÃ©siphon_(363)', 'Bataille de CtÃ©siphon (363)', 3019915),
	(3, 'http://fr.wikipedia.org/wiki/Bataille_de_Dyrrachium_(48_av._J.-C.)', 'Bataille de Dyrrachium (48 av. J.-C.)', 732581),
	(4, 'http://fr.wikipedia.org/wiki/Bataille_de_Verdun_(1916)', 'Bataille de Verdun (1916)', 49111),
	(5, 'http://fr.wikipedia.org/wiki/Bataille_de_la_Porte_Colline', 'Bataille de la Porte Colline', 2895689),
	(6, 'http://fr.wikipedia.org/wiki/SiÃ¨ge_d\'AlÃ©sia', 'SiÃ¨ge d\'AlÃ©sia', 56637);
/*!40000 ALTER TABLE `lien` ENABLE KEYS */;


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
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` (`id`, `lon`, `lat`, `type_infobox`, `nb_langue`, `nb_visite`, `longueur`, `debut_annee`, `debut_mois`, `debut_jour`, `fin_annee`, `fin_mois`, `fin_jour`, `date_MAJ`, `distance_portail`, `id_portail`) VALUES
	(8449414, 0, 0, '0', 6, 0, 8022, -446, 0, 0, -446, 0, 0, '2015-03-18 12:31:09', 2, 1),
	(3019915, 44.5833, 33.1, '0', 10, 0, 5801, 363, 0, 0, 363, 0, 0, '2015-03-18 12:31:09', 2, 1),
	(732581, 0, 0, '0', 18, 0, 4209, -48, 7, 10, -48, 7, 10, '2015-03-18 12:31:09', 2, 1),
	(49111, 5.38842, 49.1608, '0', 53, 0, 65825, 1916, 2, 21, 1916, 12, 19, '2015-03-18 12:31:09', 2, 1),
	(2895689, 0, 0, '0', 11, 0, 3098, -82, 11, 0, -82, 11, 0, '2015-03-18 12:31:09', 2, 1),
	(56637, 4.50028, 47.5372, '0', 37, 0, 82410, -52, 0, 0, -52, 0, 0, '2015-03-18 12:31:09', 2, 1);
/*!40000 ALTER TABLE `page` ENABLE KEYS */;


-- Export de la structure de vue octo. pagescompletes
DROP VIEW IF EXISTS `pagescompletes`;
-- Création d'une table temporaire pour palier aux erreurs de dépendances de VIEW
CREATE TABLE `pagescompletes` 
) ENGINE=MyISAM;


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
/*!40000 ALTER TABLE `portail` DISABLE KEYS */;
INSERT INTO `portail` (`id`, `nom`, `date_MAJ`, `lien`) VALUES
	(1, 'toto', '2015-03-18 12:22:58', 'http://machin.truc');
/*!40000 ALTER TABLE `portail` ENABLE KEYS */;


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
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`idPortail`, `idLien`, `accepte`, `contraint`, `date_MAJ`) VALUES
	(1, 1, 1, 0, '2015-03-18 12:31:09'),
	(1, 2, 1, 0, '2015-03-18 12:31:09'),
	(1, 3, 1, 0, '2015-03-18 12:31:09'),
	(1, 4, 1, 0, '2015-03-18 12:31:09'),
	(1, 5, 1, 0, '2015-03-18 12:31:09'),
	(1, 6, 1, 0, '2015-03-18 12:31:09');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;


-- Export de la structure de vue octo. pagescompletes
DROP VIEW IF EXISTS `pagescompletes`;
-- Suppression de la table temporaire et création finale de la structure d'une vue
DROP TABLE IF EXISTS `pagescompletes`;
CREATE DEFINER=`root`@`localhost` VIEW `pagescompletes` AS SELECT lien.titre, lien.url, page.lon, page.lat, status.accepte, status.contraint, page.nb_langue, 
page.nb_visite, page.longueur, page.debut_annee, page.debut_mois, 
page.debut_jour, page.fin_annee, page.fin_mois, page.fin_jour, 
page.date_MAJ, page.importance, page.distance_portail
FROM lien, page, status
WHERE lien.idPage = page.id AND 
lien.id = status.idLien ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
