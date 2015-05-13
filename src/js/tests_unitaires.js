/**
	Fonctions pour effectuer les tests unitaires.
**/

var dir = '';
var data = {
	tests : [
		{
			titre : 'Recupérer article JSON',
			code : "recuperer_article_JSON([], 1, 1, false, 'articles_json.json');",
			commentaire : 'Tester le fonctionnement de recuperer_article_JSON() sur plusieurs exemples.'
		},
		{
			titre : 'Recupérer article JSON',
			code : "recuperer_portail_HTML('', '', 'portails_premiere_guerre_mondiale.html');",
			commentaire : 'Tester le fonctionnement de recuperer_portail_HTML() sur la première page du portail de la Première Guerre Mondiale.'
		},
	],
	attendu : '[[{"id":8449414,"titre":"Bataille de Corbione","lon":0,"lat":0,"nb_langue":7,"longueur":8022,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Corbione","date_maj":"2015-04-11 09:02:40","debut_annee":446,"debut_mois":0,"debut_jour":0,"fin_annee":446,"fin_mois":0,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":1,"portail_id":1},{"id":3019915,"titre":"Bataille de Ctésiphon (363)","lon":44.5833,"lat":33.1,"nb_langue":11,"longueur":5801,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Ct%C3%A9siphon_(363)","date_maj":"2015-04-11 08:59:09","debut_annee":363,"debut_mois":0,"debut_jour":0,"fin_annee":363,"fin_mois":0,"fin_jour":0,"type_infobox":"conflit militaire","distance_Portail":1,"portail_id":1},{"id":732581,"titre":"Bataille de Dyrrachium (48 av. J.-C.)","lon":0,"lat":0,"nb_langue":19,"longueur":4208,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Dyrrachium_(48_av._J.-C.)","date_maj":"2015-04-11 09:08:58","debut_annee":48,"debut_mois":7,"debut_jour":10,"fin_annee":48,"fin_mois":7,"fin_jour":10,"type_infobox":"Conflit militaire","distance_Portail":1,"portail_id":1},{"id":49111,"titre":"Bataille de Verdun (1916)","lon":5.38842,"lat":49.1608,"nb_langue":54,"longueur":66780,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Verdun_(1916)","date_maj":"2015-04-13 05:45:50","debut_annee":1916,"debut_mois":2,"debut_jour":21,"fin_annee":1916,"fin_mois":12,"fin_jour":19,"type_infobox":"Conflit militaire","distance_Portail":1,"portail_id":1},{"id":2895689,"titre":"Bataille de la Porte Colline","lon":0,"lat":0,"nb_langue":12,"longueur":3098,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_la_Porte_Colline","date_maj":"2015-04-11 09:00:37","debut_annee":82,"debut_mois":11,"debut_jour":0,"fin_annee":82,"fin_mois":11,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":1,"portail_id":1},{"id":56637,"titre":"Siège d\'Alésia","lon":4.50028,"lat":47.5372,"nb_langue":38,"longueur":82632,"lien":"http://fr.wikipedia.org/wiki/Si%C3%A8ge_d%27Al%C3%A9sia","date_maj":"2015-04-11 08:55:07","debut_annee":-52,"debut_mois":0,"debut_jour":0,"fin_annee":-52,"fin_mois":0,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":1,"portail_id":1}],{"a":[{"url":"/wiki/10_cm_K_14","titre":"10 cm K 14"},{"url":"/wiki/102e_r%C3%A9giment_d%27infanterie_territoriale","titre":"102e régiment d\'infanterie territoriale"},{"url":"/wiki/103e_r%C3%A9giment_d%27infanterie_territoriale","titre":"103e régiment d\'infanterie territoriale"},{"url":"/wiki/104e_r%C3%A9giment_d%27infanterie_territoriale","titre":"104e régiment d\'infanterie territoriale"},{"url":"/wiki/105e_r%C3%A9giment_d%27infanterie_territoriale","titre":"105e régiment d\'infanterie territoriale"},{"url":"/wiki/106e_r%C3%A9giment_d%27infanterie_territoriale","titre":"106e régiment d\'infanterie territoriale"},{"url":"/wiki/107e_r%C3%A9giment_d%27infanterie_(Allemagne)","titre":"107e régiment d\'infanterie (Allemagne)"},{"url":"/wiki/107e_r%C3%A9giment_d%27infanterie_territoriale","titre":"107e régiment d\'infanterie territoriale"},{"url":"/wiki/108e_r%C3%A9giment_d%27infanterie_territoriale","titre":"108e régiment d\'infanterie territoriale"},{"url":"/wiki/108e_r%C3%A9giment_de_tirailleurs_tunisiens","titre":"108e régiment de tirailleurs tunisiens"},{"url":"/wiki/109e_r%C3%A9giment_d%27infanterie_territoriale","titre":"109e régiment d\'infanterie territoriale"},{"url":"/wiki/10e_division_d%27infanterie_(Empire_allemand)","titre":"10e division d\'infanterie (Empire allemand)"},{"url":"/wiki/10e_r%C3%A9giment_d%27infanterie_coloniale","titre":"10e régiment d\'infanterie coloniale"},{"url":"/wiki/110e_r%C3%A9giment_d%27infanterie_territoriale","titre":"110e régiment d\'infanterie territoriale"},{"url":"/wiki/112e_r%C3%A9giment_d%27infanterie_territoriale","titre":"112e régiment d\'infanterie territoriale"},{"url":"/wiki/113e_r%C3%A9giment_d%27infanterie_territoriale","titre":"113e régiment d\'infanterie territoriale"},{"url":"/wiki/114e_r%C3%A9giment_d%27infanterie_territoriale","titre":"114e régiment d\'infanterie territoriale"},{"url":"/wiki/116e_r%C3%A9giment_d%27infanterie_territoriale","titre":"116e régiment d\'infanterie territoriale"},{"url":"/wiki/117e_r%C3%A9giment_d%27infanterie_territoriale","titre":"117e régiment d\'infanterie territoriale"},{"url":"/wiki/118e_r%C3%A9giment_d%27infanterie_territoriale","titre":"118e régiment d\'infanterie territoriale"},{"url":"/wiki/119e_r%C3%A9giment_d%27infanterie_territoriale","titre":"119e régiment d\'infanterie territoriale"},{"url":"/wiki/11e_division_d%27infanterie_(Empire_allemand)","titre":"11e division d\'infanterie (Empire allemand)"},{"url":"/wiki/11e_r%C3%A9giment_d%27infanterie_territoriale","titre":"11e régiment d\'infanterie territoriale"},{"url":"/wiki/11e_r%C3%A9giment_de_chasseurs_%C3%A0_cheval","titre":"11e régiment de chasseurs à cheval"},{"url":"/wiki/120e_r%C3%A9giment_d%27infanterie_territoriale","titre":"120e régiment d\'infanterie territoriale"},{"url":"/wiki/122e_r%C3%A9giment_d%27infanterie_territoriale","titre":"122e régiment d\'infanterie territoriale"},{"url":"/wiki/124e_r%C3%A9giment_d%27infanterie_territoriale","titre":"124e régiment d\'infanterie territoriale"},{"url":"/wiki/125e_r%C3%A9giment_d%27infanterie_territoriale","titre":"125e régiment d\'infanterie territoriale"},{"url":"/wiki/127e_r%C3%A9giment_d%27infanterie_territoriale","titre":"127e régiment d\'infanterie territoriale"},{"url":"/wiki/128e_r%C3%A9giment_d%27infanterie_territoriale","titre":"128e régiment d\'infanterie territoriale"},{"url":"/wiki/129e_r%C3%A9giment_d%27infanterie_territoriale","titre":"129e régiment d\'infanterie territoriale"},{"url":"/wiki/12e_division_d%27infanterie_(Empire_allemand)","titre":"12e division d\'infanterie (Empire allemand)"},{"url":"/wiki/12e_r%C3%A9giment_d%27infanterie","titre":"12e régiment d\'infanterie"},{"url":"/wiki/12e_r%C3%A9giment_d%27infanterie_coloniale","titre":"12e régiment d\'infanterie coloniale"},{"url":"/wiki/12e_r%C3%A9giment_de_tirailleurs_tunisiens","titre":"12e régiment de tirailleurs tunisiens"},{"url":"/wiki/131e_r%C3%A9giment_d%27infanterie_territoriale","titre":"131e régiment d\'infanterie territoriale"},{"url":"/wiki/132e_r%C3%A9giment_d%27infanterie_territoriale","titre":"132e régiment d\'infanterie territoriale"},{"url":"/wiki/133e_r%C3%A9giment_d%27infanterie_territoriale","titre":"133e régiment d\'infanterie territoriale"},{"url":"/wiki/134e_r%C3%A9giment_d%27infanterie_territoriale","titre":"134e régiment d\'infanterie territoriale"},{"url":"/wiki/135e_r%C3%A9giment_d%27infanterie_territoriale","titre":"135e régiment d\'infanterie territoriale"},{"url":"/wiki/137e_r%C3%A9giment_d%27infanterie_territoriale","titre":"137e régiment d\'infanterie territoriale"},{"url":"/wiki/138e_r%C3%A9giment_d%27infanterie_territoriale","titre":"138e régiment d\'infanterie territoriale"},{"url":"/wiki/13e_division_d%27infanterie_(Empire_allemand)","titre":"13e division d\'infanterie (Empire allemand)"},{"url":"/wiki/13e_r%C3%A9giment_d%27infanterie_territoriale","titre":"13e régiment d\'infanterie territoriale"},{"url":"/wiki/14_(roman)","titre":"14 (roman)"},{"url":"/wiki/14_-_Des_armes_et_des_mots","titre":"14 - Des armes et des mots"},{"url":"/wiki/14-18_(film)","titre":"14-18 (film)"},{"url":"/wiki/14-18_magazine","titre":"14-18 magazine"},{"url":"/wiki/140e_r%C3%A9giment_d%27infanterie_territoriale","titre":"140e régiment d\'infanterie territoriale"},{"url":"/wiki/141e_r%C3%A9giment_d%27infanterie_territoriale","titre":"141e régiment d\'infanterie territoriale"},{"url":"/wiki/142e_r%C3%A9giment_d%27infanterie_territoriale","titre":"142e régiment d\'infanterie territoriale"},{"url":"/wiki/143e_r%C3%A9giment_d%27infanterie_territoriale","titre":"143e régiment d\'infanterie territoriale"},{"url":"/wiki/144e_r%C3%A9giment_d%27infanterie_territoriale","titre":"144e régiment d\'infanterie territoriale"},{"url":"/wiki/145e_r%C3%A9giment_d%27infanterie","titre":"145e régiment d\'infanterie"},{"url":"/wiki/145e_r%C3%A9giment_d%27infanterie_territoriale","titre":"145e régiment d\'infanterie territoriale"},{"url":"/wiki/14e_division_d%27infanterie_(Empire_allemand)","titre":"14e division d\'infanterie (Empire allemand)"},{"url":"/wiki/14e_r%C3%A9giment_d%27infanterie_coloniale","titre":"14e régiment d\'infanterie coloniale"},{"url":"/wiki/14e_r%C3%A9giment_d%27infanterie_territoriale","titre":"14e régiment d\'infanterie territoriale"},{"url":"/wiki/15e_division_d%27infanterie_(Empire_allemand)","titre":"15e division d\'infanterie (Empire allemand)"},{"url":"/wiki/15e_r%C3%A9giment_d%27infanterie_coloniale","titre":"15e régiment d\'infanterie coloniale"},{"url":"/wiki/16e_division_d%27infanterie_(Empire_allemand)","titre":"16e division d\'infanterie (Empire allemand)"},{"url":"/wiki/16e_r%C3%A9giment_d%27infanterie_coloniale","titre":"16e régiment d\'infanterie coloniale"},{"url":"/wiki/16e_r%C3%A9giment_d%27infanterie_territoriale","titre":"16e régiment d\'infanterie territoriale"},{"url":"/wiki/178e_r%C3%A9giment_d%27artillerie_de_tranch%C3%A9e","titre":"178e régiment d\'artillerie de tranchée"},{"url":"/wiki/17e_division_d%27infanterie_(Empire_allemand)","titre":"17e division d\'infanterie (Empire allemand)"},{"url":"/wiki/17e_r%C3%A9giment_d%27infanterie_coloniale","titre":"17e régiment d\'infanterie coloniale"},{"url":"/wiki/17e_r%C3%A9giment_d%27infanterie_territoriale","titre":"17e régiment d\'infanterie territoriale"},{"url":"/wiki/18e_division_d%27infanterie_(Empire_allemand)","titre":"18e division d\'infanterie (Empire allemand)"},{"url":"/wiki/18e_r%C3%A9giment_d%27infanterie_coloniale","titre":"18e régiment d\'infanterie coloniale"},{"url":"/wiki/18e_r%C3%A9giment_d%27infanterie_territoriale","titre":"18e régiment d\'infanterie territoriale"},{"url":"/wiki/1914","titre":"1914"},{"url":"/wiki/1914_au_Qu%C3%A9bec","titre":"1914 au Québec"},{"url":"/wiki/1914_en_a%C3%A9ronautique","titre":"1914 en aéronautique"},{"url":"/wiki/1914_en_France","titre":"1914 en France"},{"url":"/wiki/1914_en_musique_classique","titre":"1914 en musique classique"},{"url":"/wiki/1914._Les_Atrocit%C3%A9s_allemandes","titre":"1914. Les Atrocités allemandes"},{"url":"/wiki/1915","titre":"1915"},{"url":"/wiki/1915_au_Qu%C3%A9bec","titre":"1915 au Québec"},{"url":"/wiki/1915_en_a%C3%A9ronautique","titre":"1915 en aéronautique"},{"url":"/wiki/1915_en_France","titre":"1915 en France"},{"url":"/wiki/1915_en_musique_classique","titre":"1915 en musique classique"},{"url":"/wiki/1916","titre":"1916"},{"url":"/wiki/1916_au_Qu%C3%A9bec","titre":"1916 au Québec"},{"url":"/wiki/1916_en_a%C3%A9ronautique","titre":"1916 en aéronautique"},{"url":"/wiki/1916_en_France","titre":"1916 en France"},{"url":"/wiki/1916_en_musique_classique","titre":"1916 en musique classique"},{"url":"/wiki/1917","titre":"1917"},{"url":"/wiki/1917_au_Qu%C3%A9bec","titre":"1917 au Québec"},{"url":"/wiki/1917_aux_%C3%89tats-Unis","titre":"1917 aux États-Unis"},{"url":"/wiki/1917_en_a%C3%A9ronautique","titre":"1917 en aéronautique"},{"url":"/wiki/1917_en_France","titre":"1917 en France"},{"url":"/wiki/1917_en_musique_classique","titre":"1917 en musique classique"},{"url":"/wiki/1918","titre":"1918"},{"url":"/wiki/1918_au_Qu%C3%A9bec","titre":"1918 au Québec"},{"url":"/wiki/1918_aux_%C3%89tats-Unis","titre":"1918 aux États-Unis"},{"url":"/wiki/1918_en_a%C3%A9ronautique","titre":"1918 en aéronautique"},{"url":"/wiki/1918_en_France","titre":"1918 en France"},{"url":"/wiki/19e_division_d%27infanterie_(Empire_allemand)","titre":"19e division d\'infanterie (Empire allemand)"},{"url":"/wiki/19e_r%C3%A9giment_d%27infanterie_(France)","titre":"19e régiment d\'infanterie (France)"},{"url":"/wiki/19e_r%C3%A9giment_d%27infanterie_territoriale","titre":"19e régiment d\'infanterie territoriale"},{"url":"/wiki/1er_corps_d%27arm%C3%A9e_(France)","titre":"1er corps d\'armée (France)"},{"url":"/wiki/1er_r%C3%A9giment_cosaque_de_Nertchinsk","titre":"1er régiment cosaque de Nertchinsk"},{"url":"/wiki/1er_r%C3%A9giment_de_spahis_alg%C3%A9riens","titre":"1er régiment de spahis algériens"},{"url":"/wiki/1re_Brigade_d%27infanterie_sud-africaine","titre":"1re Brigade d\'infanterie sud-africaine"},{"url":"/wiki/1re_Division_canadienne_(1914-1918)","titre":"1re Division canadienne (1914-1918)"},{"url":"/wiki/1re_division_d%27infanterie_(Empire_allemand)","titre":"1re division d\'infanterie (Empire allemand)"},{"url":"/wiki/1re_division_d%27infanterie_bavaroise","titre":"1re division d\'infanterie bavaroise"},{"url":"/wiki/1re_division_de_la_Garde_(Empire_allemand)","titre":"1re division de la Garde (Empire allemand)"},{"url":"/wiki/1st_Indian_Cavalry_Division","titre":"1st Indian Cavalry Division"},{"url":"/wiki/201e_r%C3%A9giment_d%27infanterie_territoriale","titre":"201e régiment d\'infanterie territoriale"},{"url":"/wiki/20e_division_d%27infanterie_(Empire_allemand)","titre":"20e division d\'infanterie (Empire allemand)"},{"url":"/wiki/20e_r%C3%A9giment_d%27infanterie","titre":"20e régiment d\'infanterie"},{"url":"/wiki/20e_r%C3%A9giment_d%27infanterie_territoriale","titre":"20e régiment d\'infanterie territoriale"},{"url":"/wiki/20e_r%C3%A9giment_de_tirailleurs_tunisiens","titre":"20e régiment de tirailleurs tunisiens"},{"url":"/wiki/210e_r%C3%A9giment_d%27infanterie_territoriale","titre":"210e régiment d\'infanterie territoriale"},{"url":"/wiki/212e_r%C3%A9giment_d%27infanterie_territoriale","titre":"212e régiment d\'infanterie territoriale"},{"url":"/wiki/213e_r%C3%A9giment_d%27infanterie_territoriale","titre":"213e régiment d\'infanterie territoriale"},{"url":"/wiki/214e_r%C3%A9giment_d%27infanterie_territoriale","titre":"214e régiment d\'infanterie territoriale"},{"url":"/wiki/215e_r%C3%A9giment_d%27infanterie_territoriale","titre":"215e régiment d\'infanterie territoriale"},{"url":"/wiki/216e_r%C3%A9giment_d%27infanterie_territoriale","titre":"216e régiment d\'infanterie territoriale"},{"url":"/wiki/217e_r%C3%A9giment_d%27infanterie_territoriale","titre":"217e régiment d\'infanterie territoriale"},{"url":"/wiki/218e_r%C3%A9giment_d%27infanterie_territoriale","titre":"218e régiment d\'infanterie territoriale"},{"url":"/wiki/219e_r%C3%A9giment_d%27infanterie_territoriale","titre":"219e régiment d\'infanterie territoriale"},{"url":"/wiki/21e_division_d%27infanterie_(Empire_allemand)","titre":"21e division d\'infanterie (Empire allemand)"},{"url":"/wiki/21e_r%C3%A9giment_d%27infanterie_de_marine","titre":"21e régiment d\'infanterie de marine"},{"url":"/wiki/220e_r%C3%A9giment_d%27infanterie_territoriale","titre":"220e régiment d\'infanterie territoriale"},{"url":"/wiki/221e_r%C3%A9giment_d%27infanterie_territoriale","titre":"221e régiment d\'infanterie territoriale"},{"url":"/wiki/222e_r%C3%A9giment_d%27infanterie_territoriale","titre":"222e régiment d\'infanterie territoriale"},{"url":"/wiki/223e_r%C3%A9giment_d%27infanterie_territoriale","titre":"223e régiment d\'infanterie territoriale"},{"url":"/wiki/224e_r%C3%A9giment_d%27infanterie_territoriale","titre":"224e régiment d\'infanterie territoriale"},{"url":"/wiki/225e_r%C3%A9giment_d%27infanterie_territoriale","titre":"225e régiment d\'infanterie territoriale"},{"url":"/wiki/226e_r%C3%A9giment_d%27infanterie_territoriale","titre":"226e régiment d\'infanterie territoriale"},{"url":"/wiki/227e_r%C3%A9giment_d%27infanterie_territoriale","titre":"227e régiment d\'infanterie territoriale"},{"url":"/wiki/228e_r%C3%A9giment_d%27infanterie_territoriale","titre":"228e régiment d\'infanterie territoriale"},{"url":"/wiki/229e_r%C3%A9giment_d%27infanterie_territoriale","titre":"229e régiment d\'infanterie territoriale"},{"url":"/wiki/22e_bataillon_d%27infanterie_de_marine","titre":"22e bataillon d\'infanterie de marine"},{"url":"/wiki/22e_division_d%27infanterie_(Empire_allemand)","titre":"22e division d\'infanterie (Empire allemand)"},{"url":"/wiki/22e_r%C3%A9giment_d%27infanterie_coloniale","titre":"22e régiment d\'infanterie coloniale"},{"url":"/wiki/22e_r%C3%A9giment_de_tirailleurs_alg%C3%A9riens","titre":"22e régiment de tirailleurs algériens"},{"url":"/wiki/230e_r%C3%A9giment_d%27infanterie_territoriale","titre":"230e régiment d\'infanterie territoriale"},{"url":"/wiki/231e_r%C3%A9giment_d%27infanterie_territoriale","titre":"231e régiment d\'infanterie territoriale"},{"url":"/wiki/232e_r%C3%A9giment_d%27infanterie_territoriale","titre":"232e régiment d\'infanterie territoriale"},{"url":"/wiki/233e_r%C3%A9giment_d%27infanterie_territoriale","titre":"233e régiment d\'infanterie territoriale"},{"url":"/wiki/234e_r%C3%A9giment_d%27infanterie_territoriale","titre":"234e régiment d\'infanterie territoriale"},{"url":"/wiki/235e_r%C3%A9giment_d%27infanterie_territoriale","titre":"235e régiment d\'infanterie territoriale"},{"url":"/wiki/236e_r%C3%A9giment_d%27infanterie_territoriale","titre":"236e régiment d\'infanterie territoriale"},{"url":"/wiki/237e_r%C3%A9giment_d%27infanterie_territoriale","titre":"237e régiment d\'infanterie territoriale"},{"url":"/wiki/238e_r%C3%A9giment_d%27infanterie_territoriale","titre":"238e régiment d\'infanterie territoriale"},{"url":"/wiki/239e_r%C3%A9giment_d%27infanterie_territoriale","titre":"239e régiment d\'infanterie territoriale"},{"url":"/wiki/23e_division_d%27infanterie_(Empire_allemand)","titre":"23e division d\'infanterie (Empire allemand)"},{"url":"/wiki/23e_division_de_r%C3%A9serve_(Empire_allemand)","titre":"23e division de réserve (Empire allemand)"},{"url":"/wiki/23e_r%C3%A9giment_d%27infanterie_coloniale","titre":"23e régiment d\'infanterie coloniale"},{"url":"/wiki/23e_r%C3%A9giment_d%27infanterie_de_marine","titre":"23e régiment d\'infanterie de marine"},{"url":"/wiki/23e_r%C3%A9giment_d%27infanterie_territoriale","titre":"23e régiment d\'infanterie territoriale"},{"url":"/wiki/240e_r%C3%A9giment_d%27infanterie_territoriale","titre":"240e régiment d\'infanterie territoriale"},{"url":"/wiki/241e_r%C3%A9giment_d%27infanterie_territoriale","titre":"241e régiment d\'infanterie territoriale"},{"url":"/wiki/242e_r%C3%A9giment_d%27infanterie_territoriale","titre":"242e régiment d\'infanterie territoriale"},{"url":"/wiki/243e_r%C3%A9giment_d%27infanterie_territoriale","titre":"243e régiment d\'infanterie territoriale"},{"url":"/wiki/244e_r%C3%A9giment_d%27infanterie_territoriale","titre":"244e régiment d\'infanterie territoriale"},{"url":"/wiki/245e_r%C3%A9giment_d%27infanterie_territoriale","titre":"245e régiment d\'infanterie territoriale"},{"url":"/wiki/246e_r%C3%A9giment_d%27infanterie_territoriale","titre":"246e régiment d\'infanterie territoriale"},{"url":"/wiki/247e_r%C3%A9giment_d%27infanterie_territoriale","titre":"247e régiment d\'infanterie territoriale"},{"url":"/wiki/248e_r%C3%A9giment_d%27infanterie_territoriale","titre":"248e régiment d\'infanterie territoriale"},{"url":"/wiki/249e_r%C3%A9giment_d%27infanterie_territoriale","titre":"249e régiment d\'infanterie territoriale"},{"url":"/wiki/24e_division_d%27infanterie_(Empire_allemand)","titre":"24e division d\'infanterie (Empire allemand)"},{"url":"/wiki/24e_division_de_r%C3%A9serve_(Empire_allemand)","titre":"24e division de réserve (Empire allemand)"},{"url":"/wiki/24e_r%C3%A9giment_de_tirailleurs_tunisiens","titre":"24e régiment de tirailleurs tunisiens"},{"url":"/wiki/250e_r%C3%A9giment_d%27infanterie_territoriale","titre":"250e régiment d\'infanterie territoriale"},{"url":"/wiki/25e_division_d%27infanterie_(Empire_allemand)","titre":"25e division d\'infanterie (Empire allemand)"},{"url":"/wiki/25e_r%C3%A9giment_d%27infanterie_territoriale","titre":"25e régiment d\'infanterie territoriale"},{"url":"/wiki/25e_r%C3%A9giment_de_tirailleurs_alg%C3%A9riens","titre":"25e régiment de tirailleurs algériens"},{"url":"/wiki/260e_r%C3%A9giment_d%27infanterie_territoriale","titre":"260e régiment d\'infanterie territoriale"},{"url":"/wiki/262e_r%C3%A9giment_d%27infanterie_territoriale","titre":"262e régiment d\'infanterie territoriale"},{"url":"/wiki/263e_r%C3%A9giment_d%27infanterie_territoriale","titre":"263e régiment d\'infanterie territoriale"},{"url":"/wiki/264e_r%C3%A9giment_d%27infanterie_territoriale","titre":"264e régiment d\'infanterie territoriale"},{"url":"/wiki/265e_r%C3%A9giment_d%27infanterie_territoriale","titre":"265e régiment d\'infanterie territoriale"},{"url":"/wiki/266e_r%C3%A9giment_d%27infanterie_territoriale","titre":"266e régiment d\'infanterie territoriale"},{"url":"/wiki/267e_r%C3%A9giment_d%27infanterie_territoriale","titre":"267e régiment d\'infanterie territoriale"},{"url":"/wiki/268e_r%C3%A9giment_d%27infanterie_territoriale","titre":"268e régiment d\'infanterie territoriale"},{"url":"/wiki/269e_r%C3%A9giment_d%27infanterie_territoriale","titre":"269e régiment d\'infanterie territoriale"},{"url":"/wiki/26e_division_d%27infanterie_(Empire_allemand)","titre":"26e division d\'infanterie (Empire allemand)"},{"url":"/wiki/26e_r%C3%A9giment_d%27infanterie_territoriale","titre":"26e régiment d\'infanterie territoriale"},{"url":"/wiki/26e_r%C3%A9giment_de_tirailleurs_alg%C3%A9riens","titre":"26e régiment de tirailleurs algériens"},{"url":"/wiki/270e_r%C3%A9giment_d%27infanterie_territoriale","titre":"270e régiment d\'infanterie territoriale"},{"url":"/wiki/271e_r%C3%A9giment_d%27infanterie_territoriale","titre":"271e régiment d\'infanterie territoriale"},{"url":"/wiki/272e_r%C3%A9giment_d%27infanterie_territoriale","titre":"272e régiment d\'infanterie territoriale"},{"url":"/wiki/273e_r%C3%A9giment_d%27infanterie_territoriale","titre":"273e régiment d\'infanterie territoriale"},{"url":"/wiki/274e_r%C3%A9giment_d%27infanterie_territoriale","titre":"274e régiment d\'infanterie territoriale"},{"url":"/wiki/275e_r%C3%A9giment_d%27infanterie_territoriale","titre":"275e régiment d\'infanterie territoriale"},{"url":"/wiki/276e_r%C3%A9giment_d%27infanterie_territoriale","titre":"276e régiment d\'infanterie territoriale"},{"url":"/wiki/277e_r%C3%A9giment_d%27infanterie_territoriale","titre":"277e régiment d\'infanterie territoriale"},{"url":"/wiki/278e_r%C3%A9giment_d%27infanterie_territoriale","titre":"278e régiment d\'infanterie territoriale"},{"url":"/wiki/279e_r%C3%A9giment_d%27infanterie_territoriale","titre":"279e régiment d\'infanterie territoriale"},{"url":"/wiki/27e_bataillon_de_j%C3%A4gers","titre":"27e bataillon de jägers"},{"url":"/wiki/27e_Division_(Royaume-Uni)","titre":"27e Division (Royaume-Uni)"},{"url":"/wiki/27e_division_d%27infanterie_(Empire_allemand)","titre":"27e division d\'infanterie (Empire allemand)"},{"url":"/wiki/27e_r%C3%A9giment_d%27infanterie_territoriale","titre":"27e régiment d\'infanterie territoriale"},{"url":"/wiki/27e_r%C3%A9giment_de_tirailleurs_alg%C3%A9riens","titre":"27e régiment de tirailleurs algériens"},{"url":"/wiki/280e_r%C3%A9giment_d%27infanterie_territoriale","titre":"280e régiment d\'infanterie territoriale"},{"url":"/wiki/281e_r%C3%A9giment_d%27infanterie_territoriale","titre":"281e régiment d\'infanterie territoriale"}],"e":[],"suiv":"&pagefrom=282e_régiment_d\'infanterie_territoriale","prec":""}]'
};

$.ready = function () {	
	/**
		Lancer les test si data.attendu != '', sinon genere le test
	**/
	if (data.attendu == '') {genererTests();} else {executerTests();}
}

/**
	Execution des tests unitaires prévus dans la variable data.
	Entrée : null, variable globale
	Sortie : null, affichage direct dans la 
**/
function executerTests() {
	$('#statut').html('Génération du test en cours...').addClass('en_cours');

	var valide = true;

	var attendu = JSON.parse(data.attendu);
	$.each(data.tests, function (i, test) {
		// Maj etat :
		$('#etat').html('Test '+(i+1)+'/'+data.tests.length+' : "'+test.titre+'"...');
		// On execute le code :
		tps = eval(test.code); // retour en objet

		test_html = '<p>'+test.titre+'</p><span>'+test.commentaire+'</span>';
		res_html = '<p class="succes">Test validé !</p>';
		
		// On compare le resultat :
		if (JSON.stringify(tps) != JSON.stringify(attendu[i])) {
			$('#erreurs').show();
			$('#erreurs').append('<p>'+test.titre+'</p>');
			$('#tests').append('<div class="test"></div>');
			valide = false;
			res_html = '<p class="rate">Test non validé !</p>';
		}
		$('#tests').append('<div class="test">'+test_html+res_html+'</div>');
	});

	if (valide) {
		$('#etat').html('Tests terminés avec succès.');
		$('#statut').html('Tests validés !').addClass('succes');
	} else {
		$('#etat').html('Tests terminés.');
		$('#statut').html('Tests non validés !').addClass('rate');
	}
}

/**
	Generation des tests si le string attendu == ''. Le text est affiché dans la page (sortie null)
	Entrée : null
	Sortie : null
**/
function genererTests() {
	$('#statut').html('Génération du test en cours...').addClass('en_cours');

	var attendu = [];
	$.each(data.tests, function (i, test) {
		// Maj etat :
		$('#etat').html('Test '+i+'/'+data.tests.length+' : "'+test.titre+'"...');
		// On execute le code :
		tps = eval(test.code); // en objet
		// On ajout le resultat :
		attendu.push(tps);
	});

	$('#etat').html('Tests effectués avec succès.');

	// A la fin, on transforme attendu en string :
	var str = JSON.stringify(attendu).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
	//et on le met dans un textarea :
	$('#tests').append('<textarea id="attendu">' + str + '</textarea>');

	$('#statut').html('Génération terminée avec succes.').addClass('succes');
}