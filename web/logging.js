// First time playing with SW? This script is just for logging,
// you can pretty much ignore it until you want to dive deeper.

if (!navigator.serviceWorker.controller) {
    console.log("Cette page n'est pas contrôlé par un ServiceWorker");
}
else {
    console.log("Cette page est contrôlé par un ServiceWorker");
}

navigator.serviceWorker.getRegistration().then(function(reg) {
    function showWaitingMessage() {
        console.log("Un nouveau ServiceWorker attends pour devenir actif. Il ne peut devenir actif maintenant parce que le document est encore ouvert dans le navigateur et qu'il est contrôlé par une version antérieure. Soit que vous fermez les onglets, ou appuyez sur majuscule+R(reload) ce qui recharge sans le ServiceWorker. Cela permettra à la nouvelle version de devenir active, ainsi il sera utilisé au prochain chargement.");
    }

    reg.addEventListener('updatefound', function() {
        console.log("Un nouveau ServiceWorker a été trouvé!");
        var installing = reg.installing;
        reg.installing.addEventListener('statechange', function() {
            if (installing.state === 'installed') {
                console.log("Nouveau ServiceWorker installé.");
                // donner une seconde pour voir s'il s'active immédiatement
                setTimeout(function() {
                    if (installing.state === 'activated') {
                        console.log("Nouveau ServiceWorker activé! Actualisez pour charger cette page avec le nouveau ServiceWorker.");
                    }
                    else {
                        showWaitingMessage();
                    }
                }, 1000);
            }
            else if (installing.state === 'redundant') {
                console.log("Le nouveau ServiceWorker a échoué son installation");
            }
        });
    });

    if (reg.waiting) {
        showWaitingMessage();
    }
});