// ====================================
// Interface Mobile pour Liber Aventure
// Foundry VTT v13
// ====================================

export default class MobileActorInterface {
  constructor() {
    this.isMobile = this.detectMobile();
    this.actorListElement = null;
    this.activeSheet = null;
  }

  // Détection des appareils mobiles/faible résolution
  detectMobile() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Considéré comme mobile si largeur < 768px ou si c'est un appareil tactile avec résolution < 1024px
    return (width < 768) || (isTouchDevice && width < 1024);
  }

  // Initialisation
  init() {
    if (!this.isMobile) return;

    console.log("Mode mobile détecté - Interface adaptative activée");
    
    // Attendre que Foundry soit prêt
    Hooks.once('ready', () => {
      this.setupMobileUI();
      this.setupResizeHandler();
    });

    // Intercepter l'ouverture des fiches de personnage
    Hooks.on('renderActorSheet', (sheet, html) => {
      if (this.isMobile) {
        this.optimizeSheetForMobile(sheet, html);
      }
    });
  }

  // Configuration de l'interface mobile
  setupMobileUI() {
    // Masquer les éléments non essentiels
    this.hideDesktopElements();
    
    // Créer et afficher la liste des acteurs
    this.createActorList();
  }

  // Masquer les éléments desktop
  hideDesktopElements() {
    const elementsToHide = [
      '#players',
      '#navigation',
      '#controls',
      '#hotbar'
    ];

    elementsToHide.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.style.display = 'none';
    });

    // Masquer la sidebar par défaut
    const sidebar = document.querySelector('#sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }
  }

  // Créer la liste des acteurs
  createActorList() {
    // Supprimer l'ancienne liste si elle existe
    if (this.actorListElement) {
      this.actorListElement.remove();
    }

    // Récupérer les acteurs accessibles par l'utilisateur
    const actors = game.actors.filter(actor => {
      return actor.testUserPermission(game.user, "OWNER") || 
             actor.testUserPermission(game.user, "OBSERVER");
    });

    // Créer le conteneur
    const container = document.createElement('div');
    container.id = 'mobile-actor-list';
    container.innerHTML = `
      <h2>Mes Personnages</h2>
      <div class="mobile-actor-grid"></div>
      <button class="mobile-back-button" title="Retour">←</button>
    `;

    const grid = container.querySelector('.mobile-actor-grid');
    const backButton = container.querySelector('.mobile-back-button');

    // Ajouter les cartes d'acteurs
    actors.forEach(actor => {
      const card = document.createElement('div');
      card.className = 'mobile-actor-card';
      card.dataset.actorId = actor.id;

      const img = actor.img || 'icons/svg/mystery-man.svg';
      const name = actor.name;
      const type = actor.type;

      card.innerHTML = `
        <img src="${img}" alt="${name}" class="mobile-actor-img">
        <div class="mobile-actor-name">${name}</div>
        <div class="mobile-actor-type">${type}</div>
      `;

      card.addEventListener('click', () => this.openActorSheet(actor, container, backButton));
      grid.appendChild(card);
    });

    // Bouton retour
    backButton.addEventListener('click', () => {
      if (this.activeSheet) {
        this.activeSheet.close();
        this.activeSheet = null;
      }
    });

    document.body.appendChild(container);
    this.actorListElement = container;
  }

  // Ouvrir la fiche d'un acteur
  openActorSheet(actor, listContainer, backButton) {
    // Masquer la liste
    listContainer.style.display = 'block';

    // Ouvrir la fiche
    this.activeSheet = actor.sheet;
    actor.sheet.render(true);
  }

  // Optimiser la fiche pour mobile
  optimizeSheetForMobile(sheet, html) {
    const sheetElement = html[0] || html;

    // Ajuster la taille et position
    sheetElement.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      margin: 0 !important;
      border-radius: 0 !important;
      z-index: 10000 !important;
    `;

    // Ajuster le contenu
    const content = sheetElement.querySelector('.window-content');
    if (content) {
      content.style.cssText = `
        overflow-y: auto !important;
        padding: 10px !important;
        font-size: 14px !important;
      `;
    }

    // Agrandir les boutons et inputs pour le tactile
    const inputs = sheetElement.querySelectorAll('input, button, select, textarea');
    inputs.forEach(input => {
      input.style.minHeight = '44px';
      input.style.fontSize = '16px'; // Évite le zoom automatique sur iOS
    });
  }

  // Gérer le redimensionnement
  setupResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasMobile = this.isMobile;
        this.isMobile = this.detectMobile();

        // Si le statut a changé, recharger
        if (wasMobile !== this.isMobile) {
          location.reload();
        }
      }, 250);
    });
  }
}



