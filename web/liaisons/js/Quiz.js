/**
 * @author Zachary Nicol-P. <1735193@cegep-ste-foy.qc.ca>
 * @version 4.0
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Quiz {
        constructor() {
            this.questionActive = 1;
            this.pointage = 0;
            this.objJSONQuiz = null;
            this.arrBonnesReponses = Array('', '2', '0', '0');
            this.afficherQuestion = () => {
                const numero = 'Q' + this.questionActive;
                // Afficher la question
                document.getElementById(numero).style.visibility = "visible";
                document.getElementById('soumettre' + numero).style.visibility = "visible";
            };
            this.cliquerBoutonValiderMonChoix = () => {
                document.querySelector('#explication' + this.questionActive).classList.add('apparaitre');
                // Faire disparaitre le bouton "valider mon choix"
                document.getElementById('soumettreQ' + this.questionActive).style.visibility = "hidden";
                // Faire apparaitre le bouton "Question suivante"
                document.getElementById('btnSuivant' + this.questionActive).style.visibility = "visible";
                // Ajouter l'écouteur d'évènement sur le bouton "Question suivante"
                document.getElementById('btnSuivant' + this.questionActive).addEventListener('click', this.cliquerBoutonProchaineQuestion);
                // Aller chercher le bouton radio "checked"
                let radios = Array.apply(null, document.getElementsByName('Q' + this.questionActive));
                // Boucle qui vérifie tout les boutons
                for (let i = 0; i < radios.length; i++) {
                    // Rendre les boutons radio non-cliquable
                    radios[i].disabled = true;
                    // Trouver quel bouton radio à été séléctionné
                    if (radios[i].checked) {
                        // Variable qui correspond à la réponse saisie par l'utilisateur
                        let radioSelectionner = radios[i].value;
                        // Variable qui correspond à la bonne réponse à la question
                        let bonneReponse = this.arrBonnesReponses[this.questionActive];
                        if (radioSelectionner == bonneReponse) {
                            // Bonne réponse
                            this.pointage = this.pointage + 1;
                            document.getElementById("retroaction" + this.questionActive).innerHTML = this.objJSONQuiz['retroactions']['positive'];
                            document.getElementById("explication" + this.questionActive).innerHTML = this.objJSONQuiz['explications'][this.questionActive];
                            document.getElementById("retroaction" + this.questionActive).className = "reussi";
                            document.getElementById("explication" + this.questionActive).classList.remove("explication--hidden");
                            document.getElementById("explication" + this.questionActive).classList.add("explication");
                            document.getElementById(this.questionActive + "-" + radioSelectionner).className = "bonneReponse";
                        }
                        else {
                            // Mauvaise réponse
                            document.getElementById("retroaction" + this.questionActive).innerHTML = this.objJSONQuiz['retroactions']['negative'];
                            document.getElementById("explication" + this.questionActive).innerHTML = this.objJSONQuiz['explications'][this.questionActive];
                            document.getElementById("retroaction" + this.questionActive).className = "erreur";
                            document.getElementById("explication" + this.questionActive).classList.remove("explication--hidden");
                            document.getElementById("explication" + this.questionActive).classList.add("explication");
                            document.getElementById(this.questionActive + "-" + radioSelectionner).className = "mauvaiseReponse";
                        }
                    }
                }
            };
            this.cliquerBoutonProchaineQuestion = () => {
                // setTimeout(function () {
                //     document.getElementById('Q' + this.questionActive).classList.add('apparaitre');
                // }, 2000);
                if (this.questionActive <= 2) {
                    //Fait disparaitre la derniere question
                    const numero = 'Q' + this.questionActive;
                    document.getElementById(numero).classList.add('Q--cachee');
                    document.getElementById(numero).style.visibility = "hidden";
                    document.getElementById('btnSuivant' + this.questionActive).style.visibility = "hidden";
                    // Passe à la question suivante
                    this.questionActive = this.questionActive + 1;
                    document.getElementById('soumettreQ' + this.questionActive).addEventListener('click', this.cliquerBoutonValiderMonChoix);
                    this.afficherQuestion();
                }
                else {
                    this.afficherResultatsFinaux();
                }
            };
            this.afficherResultatsFinaux = () => {
                // Faire disparaitre la dernière question ainsi que le bouton "question suivante"
                const numero = 'Q' + this.questionActive;
                document.getElementById(numero).style.visibility = "hidden";
                document.getElementById('btnSuivant' + this.questionActive).style.visibility = "hidden";
                document.getElementById('resultat').style.visibility = "visible";
                // Aucune bonne réponse
                if (this.pointage == 0) {
                    document.getElementById('pourcentage').innerHTML = "0";
                }
                // 1 seule bonne réponse
                if (this.pointage == 1) {
                    document.getElementById('pourcentage').innerHTML = "33";
                }
                // 2 bonnes réponses
                if (this.pointage == 2) {
                    document.getElementById('pourcentage').innerHTML = "66";
                }
                // 3 bonnes réponses
                if (this.pointage == 3) {
                    document.getElementById('pourcentage').innerHTML = "100";
                }
            };
            this.initialiser();
            fetch('liaisons/js/objJSONquiz.json').then(response => {
                return response.json();
            }).then(response => {
                this.objJSONQuiz = response;
            }).catch(error => {
                console.log(error);
            });
        }
        initialiser() {
            // Cacher le bouton de soumission du formulaire
            document.getElementById('validerQuiz').style.visibility = "hidden";
            // Cacher toutes les questions
            document.getElementById('Q1').style.visibility = "hidden";
            document.getElementById('Q2').style.visibility = "hidden";
            document.getElementById('Q3').style.visibility = "hidden";
            // Cacher le messages sans Javascript
            document.getElementById('messageNoJS').style.visibility = "hidden";
            // Afficher les questions une à la fois
            document.getElementById('Q1').classList.add('Q1');
            document.getElementById('Q2').classList.add('Q2');
            document.getElementById('Q3').classList.add('Q3');
            // Afficher première question
            this.afficherQuestion();
            // Ajouter un écouteur d'évènement sur le premier bouton
            document.getElementById('soumettreQ' + this.questionActive).addEventListener('click', this.cliquerBoutonValiderMonChoix);
        }
    }
    exports.Quiz = Quiz;
});
//# sourceMappingURL=Quiz.js.map