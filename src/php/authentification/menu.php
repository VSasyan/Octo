
<div id="menu">                      
<ul>
  <li><a href=a.php>Mes cartes</a></li>
  <li><a href=b.php>Créer une carte</a></li>
  <li><a href=b.php>Editer une carte</a></li>
  <li><a href=b.php>Personnaliser une carte</a></li>
  <?php
  if ($_SESSION['user']["role"]>1){
	echo '<li><a href=b.php>Ajouter un portail</a></li>';
   }
   ?>
  <li><a href=auth.php?deconnect>Déconnexion</a></li>
</ul>        
</div>