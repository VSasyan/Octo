-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.6.17 - MySQL Community Server (GPL)
-- Serveur OS:                   Win64
-- HeidiSQL Version:             9.1.0.4928
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Export de la structure de la base pour octo
CREATE DATABASE IF NOT EXISTS `octo` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `octo`;


-- Export de la structure de vue octo. checkcount
-- Création d'une table temporaire pour palier aux erreurs de dépendances de VIEW
CREATE TABLE `checkcount` (
	`nom` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`NB_LIEN` BIGINT(21) NOT NULL,
	`NB_PAGE` BIGINT(21) NOT NULL,
	`NB_STATUS` BIGINT(21) NOT NULL
) ENGINE=MyISAM;


-- Export de la structure de vue octo. checkcount
-- Suppression de la table temporaire et création finale de la structure d'une vue
DROP TABLE IF EXISTS `checkcount`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `checkcount` AS SELECT portail.nom, count(lien.id) AS NB_LIEN, count(page.id) AS NB_PAGE, count(status.date_MAJ) AS NB_STATUS
FROM lien, page, status, portail 
WHERE lien.idPage = page.id AND 
lien.id = status.idLien AND
status.idPortail = portail.id
GROUP BY portail.id ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
