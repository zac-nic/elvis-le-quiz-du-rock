<?php
/**
 * @author Zachary Nicol-P. <1735193@cegep-ste-foy.qc.ca>
 */
// NOTE: cette page n'est utilisée que dans le cas d'une expérience utilisateur SANS JavaScript
// Vérifier si le bouton "Valider mes choix" a été cliqué
if (isset($_GET['validerQuiz'])) {
    // Vérifier si les trois questions ont étés répondues
    if (isset($_GET['Q1']) && isset($_GET['Q2']) && isset($_GET['Q3'])) {
        // Déclaration de la variable qui contiendra le résultat obtenu
        $resultat = '';
        // Variables qui contiennent les bonnes réponses aux questions
        $reponseQ1 = '2';
        $reponseQ2 = '0';
        $reponseQ3 = '0';
        // Variables qui vont chercher dans l'url les réponses saisies par l'utilisateur
        $q1 = $_GET['Q1'];
        $q2 = $_GET['Q2'];
        $q3 = $_GET['Q3'];
        // Résultats possibles :
        // Q1 & Q2 & Q3
        if ($reponseQ1 == $q1 && $reponseQ2 == $q2 && $reponseQ3 == $q3) {
            $resultat = '100%';
        }
        // Q1
        if ($reponseQ1 == $q1 && $reponseQ2 != $q2 && $reponseQ3 != $q3) {
            $resultat = '33%';
        }
        // Q2
        if ($reponseQ1 != $q1 && $reponseQ2 == $q2 && $reponseQ3 != $q3) {
            $resultat = '33%';
        }
        // Q3
        if ($reponseQ1 != $q1 && $reponseQ2 != $q2 && $reponseQ3 == $q3) {
            $resultat = '33%';
        }
        // Q1 & Q2
        if ($reponseQ1 == $q1 && $reponseQ2 == $q2 && $reponseQ3 != $q3) {
            $resultat = '66%';
        }
        // Q2 & Q3
        if ($reponseQ1 != $q1 && $reponseQ2 == $q2 && $reponseQ3 == $q3) {
            $resultat = '66%';
        }
        // Q1 & Q3
        if ($reponseQ1 == $q1 && $reponseQ2 != $q2 && $reponseQ3 == $q3) {
            $resultat = '66%';
        }
        // Aucune bonne réponse
        if ($reponseQ1 != $q1 && $reponseQ2 != $q2 && $reponseQ3 != $q3) {
            $resultat = '0%';
        }
    } else {
        // Redirection vers le questionnaire si au moins une des trois questions n'a pas été répondue
        header('Location:question.html');
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-status-title" content="black">
    <title>Elvis "Le Quiz du Rock n' Roll" Presley</title>
    <link href="liaisons/css/styles.css" rel="stylesheet" type="text/css"/>
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="Elvis 'Le Quiz du Rock n' Roll' Presley est le quiz ultime sur le King!">
</head>
<body>
<header role="banner">
    <h1 class="entete titre__degrade">Elvis<span class="entete__quiz"> "Le Quiz du Rock n' Roll" </span>Presley</h1>
</header>
<div class="grandConteneur">
    <main>
        <div class="petitConteneur">
            <img src="liaisons/images/resultat.jpg" class="img__index" alt="Le king"/>
            <div class="instructions">
                <p>Votre résultat final : <br/>
                    Vous avez obtenu <span class="pourcentage"><?php echo $resultat ?></span>
                </p>
                <p><a href="index.html" class="accueil__btnCommencer">RETOUR À L'ACCUEIL</a></p>
            </div>
        </div>
    </main>
</div>
<footer class="footer" role="contentinfo">
    <small>Zachary Nicol-P. © Travail réalisé dans le cadre du cours de Réalisation de Produit Numérique Interactif
        III - Automne 2019</small>
</footer>
<img class="background" src="liaisons/images/background_mobile.jpg"
     srcset="liaisons/images/background_mobile.jpg 412w,liaisons/images/background_tablette.jpg 800w,liaisons/images/background.jpg 1200w"
     alt="arrière-plan"/>
</body>
</html>