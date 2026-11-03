// Fonctionnement de l'accordéon de l'histoire

const mainAcc = document.getElementsByClassName("main-accordion-story");
const acc = document.getElementsByClassName("accordion-story");
let i;

for (i = 0; i < mainAcc.length; i++) {
  mainAcc[i].addEventListener("click", function() {
    this.classList.toggle("active-main-accordion");

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active-accordion");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}



// Fenêtre de validation achat

document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("purchase-overlay");
    const productName = document.getElementById("purchase-product-name");
    const unitPrice = document.getElementById("purchase-unit-price");
    const quantityInput = document.getElementById("purchase-quantity");
    const totalPrice = document.getElementById("purchase-total-price");
    const stepConfirm = document.getElementById("purchase-step-confirm");
    const stepSuccess = document.getElementById("purchase-step-success");

    let currentPrice = 0;

    // Affiche un prix au format français : 59.99 -> "59,99 €"
    function formatPrice(price) {
        return price.toFixed(2).replace(".", ",") + " €";
    }

    // Recalcule le total
    function updateTotal() {
        let quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }
        if (quantity > 10) {
            quantity = 10;
        }
        totalPrice.textContent = formatPrice(currentPrice * quantity);
    }

    // Ouvre fenêtre avec informations paiement
    function openPurchaseWindow(name, price) {
        currentPrice = price;
        productName.textContent = name;
        unitPrice.textContent = formatPrice(price);
        quantityInput.value = 1;
        updateTotal();

        stepConfirm.classList.remove("purchase-step-hidden");
        stepSuccess.classList.add("purchase-step-hidden");
        overlay.classList.add("purchase-overlay-visible");
    }

    // Ferme fenêtre avec informations paiement
    function closePurchaseWindow() {
        overlay.classList.remove("purchase-overlay-visible");
    }

    // Chaque bouton "Acheter" lit le nom et le prix dans ses attributs data-
    document.querySelectorAll(".buy-button").forEach(function (button) {
        button.addEventListener("click", function () {
            openPurchaseWindow(button.dataset.name, parseFloat(button.dataset.price));
        });
    });

    quantityInput.addEventListener("input", updateTotal);

    document.getElementById("purchase-cancel").addEventListener("click", closePurchaseWindow);
    document.getElementById("purchase-close").addEventListener("click", closePurchaseWindow);

    // Validation
    document.getElementById("purchase-confirm").addEventListener("click", function () {
        stepConfirm.classList.add("purchase-step-hidden");
        stepSuccess.classList.remove("purchase-step-hidden");
    });

    // Fermeture en cliquant à côté de la fenêtre
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closePurchaseWindow();
        }
    });

    // Fermeture avec la touche Échap
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePurchaseWindow();
        }
    });
});

//Message personnalisé confirmation achat
function purchase_message() {
    const email = document.getElementById("email-client").value;
    document.getElementById("purchase-message").textContent = `Merci pour votre achat ! Un email de confirmation a été envoyé à l\'adresse ${email}`
}

//Ouverture page d'achat depuis l'accueil
window.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get("article");
    const button = id && document.getElementById(id);
    if (button) {
        button.click();
    }
})

//Empêche de recharger la page au submit du formulaire
document.getElementById("submit-help").addEventListener("click", function(event){
  event.preventDefault()
});

//Fenêtre de confirmation formulaire
document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("submit-overlay");

    function openSubmitWindow() {

        stepConfirm.classList.remove("submit-step-hidden");
        stepSuccess.classList.add("submit-step-hidden");
        overlay.classList.add("submit-overlay-visible");
    }

    function closeSubmitWindow() {
        overlay.classList.remove("submit-overlay-visible");
    }
})