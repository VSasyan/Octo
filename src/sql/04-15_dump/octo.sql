SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE IF NOT EXISTS `octo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `octo`;

DELIMITER $$
DROP PROCEDURE IF EXISTS `importance_portail`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `importance_portail`(IN `idPo` INT)
BEGIN
	
	DECLARE maxLon INTEGER;
	DECLARE maxLan INTEGER;
	
	SELECT languesMax(idPo), longueurMax(idPo) INTO maxLan, maxLon;
	
	SELECT portail.id, portail.nom, lien.idPage, lien.titre, 
	importance(page.longueur, page.nb_langue, page.distance_portail, maxLon, maxLan) AS importance,
	page.nb_langue, page.nb_visite, page.longueur,page.distance_portail
	FROM page, portail, lien, status
	WHERE portail.id=status.idPortail AND status.idLien=lien.id AND lien.idPage=page.id AND portail.id=idPo
	ORDER BY importance DESC;
	
END$$

DROP PROCEDURE IF EXISTS `RAZ_ARTICLE`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RAZ_ARTICLE`()
BEGIN
	
	TRUNCATE TABLE lien;
	TRUNCATE TABLE page;
	TRUNCATE TABLE status;
	
	
END$$

DROP PROCEDURE IF EXISTS `RAZ_CARTE`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RAZ_CARTE`()
BEGIN
	TRUNCATE TABLE carte;
	TRUNCATE TABLE evenement;
END$$

DROP FUNCTION IF EXISTS `importance`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `importance`(`longueur` INT, `nb_langues` INT, `distance_portail` INT, `longueurMax` INT, `languesMax` INT) RETURNS float
BEGIN

RETURN (SELECT longueur * nb_langues / (distance_portail * languesMax * longueurMax));


END$$

DROP FUNCTION IF EXISTS `languesMax`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `languesMax`(`idPo` INT) RETURNS int(11)
BEGIN
	
	RETURN (SELECT max(pagescompletes.nb_langue)
	FROM pagescompletes
	WHERE pagescompletes.idPortail=idPo and
	pagescompletes.lon<>0 and
	pagescompletes.lat<>0);
END$$

DROP FUNCTION IF EXISTS `longueurMax`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `longueurMax`(`idPor` INT) RETURNS int(11)
BEGIN

	RETURN (SELECT max(pagescompletes.longueur)
	FROM pagescompletes
	WHERE pagescompletes.idPortail=idPor and
	pagescompletes.lon<>0 and
	pagescompletes.lat<>0);



END$$

DELIMITER ;

DROP TABLE IF EXISTS `carte`;
CREATE TABLE IF NOT EXISTS `carte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `titre` varchar(255) NOT NULL,
  `idPortail` int(11) NOT NULL,
  `description` text,
  `echelle_temps_haut` tinyint(4) DEFAULT NULL,
  `echelle_temps_bas` tinyint(4) DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `debut_annee` int(11) DEFAULT NULL,
  `fin_annee` int(11) DEFAULT NULL,
  `idUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
DROP VIEW IF EXISTS `carteevenement`;
CREATE TABLE IF NOT EXISTS `carteevenement` (
`login` varchar(50)
,`titre` varchar(255)
);DROP VIEW IF EXISTS `checkcount`;
CREATE TABLE IF NOT EXISTS `checkcount` (
`nom` varchar(255)
,`NB_LIEN` bigint(21)
,`NB_PAGE` bigint(21)
,`NB_STATUS` bigint(21)
);
DROP TABLE IF EXISTS `evenement`;
CREATE TABLE IF NOT EXISTS `evenement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` varchar(12) NOT NULL DEFAULT '0',
  `end` varchar(12) NOT NULL DEFAULT '0',
  `titre` varchar(255) NOT NULL DEFAULT '0',
  `theme` varchar(12) NOT NULL DEFAULT '0',
  `idCarte` int(11) NOT NULL,
  `idPage` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `lien`;
CREATE TABLE IF NOT EXISTS `lien` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `idPage` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
DROP VIEW IF EXISTS `pageimportance`;
CREATE TABLE IF NOT EXISTS `pageimportance` (
`id` int(10) unsigned
,`nom` varchar(255)
,`idPage` int(11)
,`titre` varchar(255)
,`importance` float
,`nb_langue` tinyint(3) unsigned
,`nb_visite` int(11)
,`longueur` int(11) unsigned
,`distance_portail` int(11)
);DROP VIEW IF EXISTS `pagescompletes`;
CREATE TABLE IF NOT EXISTS `pagescompletes` (
`idPortail` int(10) unsigned
,`nom` varchar(255)
,`titre` varchar(255)
,`url` varchar(255)
,`idPage` int(11)
,`lon` double
,`lat` double
,`accepte` tinyint(1)
,`contraint` tinyint(1)
,`nb_langue` tinyint(3) unsigned
,`nb_visite` int(11)
,`longueur` int(11) unsigned
,`debut_annee` smallint(6)
,`debut_mois` tinyint(3) unsigned
,`debut_jour` tinyint(3) unsigned
,`fin_annee` smallint(6)
,`fin_mois` tinyint(3) unsigned
,`fin_jour` tinyint(3) unsigned
,`date_MAJ` datetime
,`distance_portail` int(11)
,`type_infobox` varchar(50)
);
DROP TABLE IF EXISTS `portail`;
CREATE TABLE IF NOT EXISTS `portail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lien` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
DROP VIEW IF EXISTS `portailmax`;
CREATE TABLE IF NOT EXISTS `portailmax` (
`id` int(10) unsigned
,`nom` varchar(255)
,`date_MAJ` datetime
,`lien` varchar(255)
,`languesMax` int(11)
,`longueurMax` int(11)
);
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `idPortail` int(11) NOT NULL,
  `idLien` int(11) NOT NULL,
  `accepte` tinyint(1) DEFAULT NULL,
  `contraint` tinyint(1) NOT NULL,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPortail`,`idLien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id` int(10) unsigned NOT NULL DEFAULT '0',
  `nom` varchar(255) NOT NULL,
  `date_MAJ` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lien` varchar(255) NOT NULL,
  `languesMax` int(11) DEFAULT NULL,
  `longueurMax` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
DROP VIEW IF EXISTS `usersrole`;
CREATE TABLE IF NOT EXISTS `usersrole` (
`id` int(11)
,`login` varchar(50)
,`role` int(11)
,`type` varchar(50)
);
DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL DEFAULT '0',
  `mdp` varchar(255) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
DROP TABLE IF EXISTS `carteevenement`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `carteevenement` AS select `utilisateur`.`login` AS `login`,`carte`.`titre` AS `titre` from (`utilisateur` join `carte`) where (`utilisateur`.`id` = `carte`.`idUtilisateur`);
DROP TABLE IF EXISTS `checkcount`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `checkcount` AS select `portail`.`nom` AS `nom`,count(`lien`.`id`) AS `NB_LIEN`,count(`page`.`id`) AS `NB_PAGE`,count(`status`.`date_MAJ`) AS `NB_STATUS` from (((`lien` join `page`) join `status`) join `portail`) where ((`lien`.`idPage` = `page`.`id`) and (`lien`.`id` = `status`.`idLien`) and (`status`.`idPortail` = `portail`.`id`)) group by `portail`.`id`;
DROP TABLE IF EXISTS `pageimportance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pageimportance` AS select `portailmax`.`id` AS `id`,`portailmax`.`nom` AS `nom`,`lien`.`idPage` AS `idPage`,`lien`.`titre` AS `titre`,`importance`(`page`.`longueur`,`page`.`nb_langue`,`page`.`distance_portail`,`portailmax`.`longueurMax`,`portailmax`.`languesMax`) AS `importance`,`page`.`nb_langue` AS `nb_langue`,`page`.`nb_visite` AS `nb_visite`,`page`.`longueur` AS `longueur`,`page`.`distance_portail` AS `distance_portail` from ((`page` join `portailmax`) join `lien`) where ((`portailmax`.`id` = `page`.`id_portail`) and (`lien`.`idPage` = `page`.`id`)) order by `importance`(`page`.`longueur`,`page`.`nb_langue`,`page`.`distance_portail`,`portailmax`.`longueurMax`,`portailmax`.`languesMax`) desc;
DROP TABLE IF EXISTS `pagescompletes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pagescompletes` AS select `portail`.`id` AS `idPortail`,`portail`.`nom` AS `nom`,`lien`.`titre` AS `titre`,`lien`.`url` AS `url`,`lien`.`idPage` AS `idPage`,`page`.`lon` AS `lon`,`page`.`lat` AS `lat`,`status`.`accepte` AS `accepte`,`status`.`contraint` AS `contraint`,`page`.`nb_langue` AS `nb_langue`,`page`.`nb_visite` AS `nb_visite`,`page`.`longueur` AS `longueur`,`page`.`debut_annee` AS `debut_annee`,`page`.`debut_mois` AS `debut_mois`,`page`.`debut_jour` AS `debut_jour`,`page`.`fin_annee` AS `fin_annee`,`page`.`fin_mois` AS `fin_mois`,`page`.`fin_jour` AS `fin_jour`,`page`.`date_MAJ` AS `date_MAJ`,`page`.`distance_portail` AS `distance_portail`,`page`.`type_infobox` AS `type_infobox` from (((`lien` join `page`) join `status`) join `portail`) where ((`lien`.`idPage` = `page`.`id`) and (`lien`.`id` = `status`.`idLien`) and (`status`.`idPortail` = `portail`.`id`));
DROP TABLE IF EXISTS `portailmax`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `portailmax` AS select `portail`.`id` AS `id`,`portail`.`nom` AS `nom`,`portail`.`date_MAJ` AS `date_MAJ`,`portail`.`lien` AS `lien`,`languesMax`(`portail`.`id`) AS `languesMax`,`longueurMax`(`portail`.`id`) AS `longueurMax` from `portail`;
DROP TABLE IF EXISTS `usersrole`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usersrole` AS select `utilisateur`.`id` AS `id`,`utilisateur`.`login` AS `login`,`utilisateur`.`role` AS `role`,`role`.`type` AS `type` from (`utilisateur` join `role`) where (`utilisateur`.`role` = `role`.`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
