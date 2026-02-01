// ====================================
// Interface Mobile Optimisée pour Liber Aventure
// Foundry VTT v13 - Version Réseau Local
// ====================================

export default class MobileActorInterface {
  constructor() {
    this.isMobile = this.detectMobile();
    this.actorListElement = null;
    this.activeSheet = null;
    this.isOffline = false;
   
    // Configuration des optimisations
    this.optimizations = {
      disableScenes: true,
      disableAudio: true,
      disableVideo: true,
      disableWeather: true,
      disableLighting: true,
      disableAnimations: true,
      disableTokens: true,
      disableDrawings: true,
      disableTiles: true,
      simplifyUI: true,
      reduceImageQuality: true,
      lazyLoadActors: true,
      blockExternalRequests: true  // CRITIQUE pour réseau local
    };
  }

  // Détection mobile
  detectMobile() {
    const width = window.innerWidth;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
   
    return (width < 768) || (isTouchDevice && width < 1024) || isMobileUA;
  }

  // NOUVEAU : Détecter si on est hors ligne / réseau local
  async detectOfflineMode() {
    try {
      // Tenter de charger une ressource externe avec timeout court
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
     
      await fetch('https://fonts.googleapis.com/css2', {
        signal: controller.signal,
        mode: 'no-cors'
      });
     
      clearTimeout(timeoutId);
      this.isOffline = false;
      console.log("🌐 Mode en ligne détecté");
    } catch (error) {
      this.isOffline = true;
      console.log("📡 Mode hors ligne / réseau local détecté");
    }
   
    return this.isOffline;
  }

  // Initialisation
  init() {
    if (!this.isMobile) return;

    console.log("🚀 Mode mobile détecté - Initialisation...");
   
    // CRITIQUE : Bloquer les requêtes externes IMMÉDIATEMENT
    this.blockExternalRequests();
   
    // Détecter le mode hors ligne
    this.detectOfflineMode().then(() => {
      if (this.isOffline) {
        this.applyOfflineOptimizations();
      }
    });
   
    // Optimisations pré-chargement
    this.applyPreLoadOptimizations();
   
    Hooks.once('init', () => {
      this.setupInitOptimizations();
    });

    Hooks.once('ready', () => {
      this.setupMobileUI();
      this.setupResizeHandler();
      console.log("✅ Interface mobile prête");
    });

    Hooks.on('renderActorSheet', (sheet, html) => {
      this.optimizeSheetForMobile(sheet, html);
    });
  }

  // CRITIQUE : Bloquer toutes les requêtes externes
  blockExternalRequests() {
    if (!this.optimizations.blockExternalRequests) return;

    // Bloquer Google Fonts et autres CDN
    const style = document.createElement('style');
    style.id = 'block-external-fonts';
    style.textContent = `
      /* Utiliser des polices système au lieu des Google Fonts */
      @font-face {
        font-family: 'MedievalSharp';
        src: local('Georgia'), local('Times New Roman'), local('serif');
        font-display: block;
      }
     
      /* Bloquer les imports externes */
      @import url('') !important;
    `;
   
    // Insérer AVANT tout autre style
    document.head.insertBefore(style, document.head.firstChild);

    // Intercepter et bloquer les requêtes fetch vers des domaines externes
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
      const urlString = typeof url === 'string' ? url : url.url;
     
      // Liste des domaines à bloquer
      const blockedDomains = [
        'googleapis.com',
        'gstatic.com',
        'google-analytics.com',
        'googletagmanager.com',
        'cloudflare.com',
        'cdnjs.com',
        'jsdelivr.net',
        'unpkg.com',
        'fonts.net'
      ];
     
      // Vérifier si l'URL est externe et dans la liste de blocage
      const isBlocked = blockedDomains.some(domain => urlString.includes(domain));
     
      if (isBlocked) {
        console.log(`🚫 Requête bloquée: ${urlString}`);
        return Promise.reject(new Error('Requête externe bloquée pour optimisation'));
      }
     
      // Ajouter un timeout pour les requêtes locales
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 5000);
      });
     
      return Promise.race([
        originalFetch(url, options),
        timeoutPromise
      ]).catch(error => {
        console.warn(`⚠️ Requête échouée: ${urlString}`, error);
        return Promise.reject(error);
      });
    };

    // Bloquer les balises <link> vers des ressources externes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
            const href = node.href || '';
            const blockedDomains = ['googleapis.com', 'gstatic.com', 'fonts.net'];
           
            if (blockedDomains.some(domain => href.includes(domain))) {
              console.log(`🚫 Feuille de style externe bloquée: ${href}`);
              node.remove();
            }
          }
        });
      });
    });

    observer.observe(document.head, { childList: true, subtree: true });
  }

  // Optimisations spécifiques mode hors ligne
  applyOfflineOptimizations() {
    console.log("📡 Application des optimisations réseau local");
   
    // Désactiver toutes les vérifications de version
    if (typeof game !== 'undefined' && game.settings) {
      try {
        game.settings.set("core", "updateCheck", false).catch(() => {});
      } catch (e) {}
    }

    // Bloquer les analytics et tracking
    window.gtag = function() {};
    window.ga = function() {};
    window._gaq = { push: function() {} };

    // Désactiver les notifications de mise à jour
    Hooks.on('renderSettingsConfig', (app, html) => {
      const updateCheck = html.find('[name="core.updateCheck"]');
      if (updateCheck.length) {
        updateCheck.prop('checked', false).prop('disabled', true);
      }
    });
  }

  // Optimisations pré-chargement
  applyPreLoadOptimizations() {
    // Bloquer le canvas
    if (this.optimizations.disableScenes) {
      Hooks.on('canvasInit', () => {
        console.log("🚫 Canvas bloqué");
        return false;
      });
    }

    // Bloquer l'audio
    if (this.optimizations.disableAudio) {
      Hooks.on('preCreatePlaylist', () => false);
      Hooks.on('preCreatePlaylistSound', () => false);
    }

    // Pré-charger les styles critiques
    this.injectCriticalStyles();
  }

  // Injecter les styles critiques IMMÉDIATEMENT
  injectCriticalStyles() {
    const criticalCSS = document.createElement('style');
    criticalCSS.id = 'critical-mobile-styles';
    criticalCSS.textContent = `
      /* Polices système locales - AUCUNE requête externe */
      body, .liber {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                     Roboto, "Helvetica Neue", Arial, sans-serif,
                     "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
      }
     
      /* Cacher immédiatement les éléments non nécessaires */
      #players, #navigation, #controls, #hotbar,
      #pause, #fps, #logo, .vtt, #board, canvas,
      #ui-left, #scene-list, #macro-directory {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Désactiver TOUTES les animations */
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }

      /* Optimisation du rendu */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
      }

      /* Bloquer les images de fond lourdes */
      body::before, body::after {
        display: none !important;
      }
    `;
   
    // Insérer en PREMIER pour application immédiate
    document.head.insertBefore(criticalCSS, document.head.firstChild);
  }

  // Optimisations lors de l'init
  setupInitOptimizations() {
    // Désactiver l'audio
    if (this.optimizations.disableAudio) {
      try {
        game.settings.set("core", "globalVolume", 0);
        if (game.audio) {
          game.audio.locked = true;
          game.audio.play = () => Promise.resolve();
        }
      } catch (e) {}
    }

    // Désactiver les vidéos
    if (this.optimizations.disableVideo) {
      if (game.video) {
        game.video.play = () => Promise.resolve();
      }
    }

    // Configurer le canvas
    if (this.optimizations.disableScenes) {
      CONFIG.Canvas.disabled = true;
     
      Hooks.on('canvasReady', (canvas) => {
        if (canvas.tokens) canvas.tokens.visible = false;
        if (canvas.tiles) canvas.tiles.visible = false;
        if (canvas.drawings) canvas.drawings.visible = false;
        if (canvas.lighting) canvas.lighting.visible = false;
        if (canvas.effects) canvas.effects.visible = false;
        return false;
      });
    }

    // Bloquer les tokens, dessins, tuiles
    if (this.optimizations.disableTokens) {
      Hooks.on('preCreateToken', () => false);
      Hooks.on('preUpdateToken', () => false);
    }

    if (this.optimizations.disableDrawings) {
      Hooks.on('preCreateDrawing', () => false);
    }

    if (this.optimizations.disableTiles) {
      Hooks.on('preCreateTile', () => false);
    }

    // Limiter le FPS
    this.optimizeRendering();
  }

  // Optimiser le rendu
  optimizeRendering() {
    Hooks.on('canvasReady', () => {
      if (game.canvas && game.canvas.app && game.canvas.app.ticker) {
        game.canvas.app.ticker.maxFPS = 30;
        game.canvas.app.ticker.minFPS = 15;
      }
    });

    // Désactiver WebGL si non nécessaire
    if (this.optimizations.disableScenes) {
      if (typeof PIXI !== 'undefined') {
        PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = true;
        PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL_LEGACY;
      }
    }
  }

  // Configuration de l'interface mobile
  setupMobileUI() {
    this.hideDesktopElements();
    this.showEssentialElements();
   
    // Chargement différé pour éviter le blocage
    requestAnimationFrame(() => {
      this.createActorList();
      this.injectMobileStyles();
    });
  }

  // Masquer les éléments desktop
  hideDesktopElements() {
    const elementsToHide = [
      '#players', '#navigation', '#controls', '#hotbar',
      '#pause', '#fps', '#logo', '.vtt', '#board', 'canvas',
      '#ui-left', '#scene-list', '#macro-directory',
      '#combat-tracker', '#playlist-directory'
    ];

    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
        }
      });
    });

    // Masquer la sidebar
    const sidebar = document.querySelector('#sidebar');
    if (sidebar && this.optimizations.simplifyUI) {
      sidebar.style.display = 'none';
    }
  }

  // Afficher les éléments essentiels
  showEssentialElements() {
    const uiMiddle = document.querySelector('#ui-middle');
    if (uiMiddle) uiMiddle.style.display = 'block';
  }

  // Injecter les styles mobiles
  injectMobileStyles() {
    const style = document.createElement('style');
    style.id = 'mobile-actor-list-styles';
    style.textContent = `
      #mobile-actor-list {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(218deg, #2a2b2c 0%, #120304 100%);
        z-index: 9999;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding: 20px 10px 80px 10px;
        box-sizing: border-box;
      }

      #mobile-actor-list h2 {
        color: #c99e4c;
        text-align: center;
        font-size: 1.8em;
        margin: 0 0 20px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
      }

      .mobile-actor-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
        padding: 0 10px;
      }

      .mobile-actor-card {
        background: #d3bd90;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        border: 2px solid #c99e4c;
        -webkit-tap-highlight-color: transparent;
      }

      .mobile-actor-card:active {
        transform: scale(0.95);
      }

      .mobile-actor-img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid #c99e4c;
        margin-bottom: 10px;
        background: #2b2c2c;
      }

      .mobile-actor-name {
        font-weight: bold;
        color: #2b2c2c;
        font-size: 1.1em;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .mobile-actor-type {
        color: #2b2c2c;
        font-size: 0.9em;
        opacity: 0.8;
        text-transform: capitalize;
      }

      .mobile-back-button {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        background: #c99e4c;
        color: #2b2c2c;
        border: 3px solid #d3bd90;
        border-radius: 50%;
        font-size: 1.5em;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        -webkit-tap-highlight-color: transparent;
      }

      .mobile-back-button.visible {
        display: flex;
      }

      .mobile-back-button:active {
        transform: translateX(-50%) scale(0.9);
      }

      @media (max-width: 480px) {
        .mobile-actor-grid {
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }
        .mobile-actor-img { height: 100px; }
        #mobile-actor-list h2 { font-size: 1.4em; }
      }
    `;
    document.head.appendChild(style);
  }

  // Créer la liste des acteurs
  createActorList() {
    if (this.actorListElement) {
      this.actorListElement.remove();
    }

    const actors = game.actors.filter(actor => {
      return actor.testUserPermission(game.user, "OWNER") ||
             actor.testUserPermission(game.user, "OBSERVER");
    });

    console.log(`📋 ${actors.length} personnage(s) chargé(s)`);

    const container = document.createElement('div');
    container.id = 'mobile-actor-list';
    container.innerHTML = `
      <h2>⚔️ Mes Personnages</h2>
      <div class="mobile-actor-grid"></div>
      <button class="mobile-back-button" title="Retour">↩</button>
    `;

    const grid = container.querySelector('.mobile-actor-grid');
    const backButton = container.querySelector('.mobile-back-button');

    // Chargement optimisé
    if (this.optimizations.lazyLoadActors && actors.length > 6) {
      this.loadActorsLazy(actors, grid, container, backButton);
    } else {
      this.loadActorsSync(actors, grid, container, backButton);
    }

    document.body.appendChild(container);
    this.actorListElement = container;
  }

  // Chargement synchrone
  loadActorsSync(actors, grid, container, backButton) {
    actors.forEach(actor => {
      const card = this.createActorCard(actor, container, backButton);
      grid.appendChild(card);
    });
    this.setupBackButton(backButton, container);
  }

  // Chargement différé
  loadActorsLazy(actors, grid, container, backButton) {
    let index = 0;
    const batchSize = 4;

    const loadBatch = () => {
      const end = Math.min(index + batchSize, actors.length);
     
      for (let i = index; i < end; i++) {
        const card = this.createActorCard(actors[i], container, backButton);
        grid.appendChild(card);
      }

      index = end;
      if (index < actors.length) {
        requestAnimationFrame(loadBatch);
      }
    };

    loadBatch();
    this.setupBackButton(backButton, container);
  }

  // Créer une carte d'acteur
  createActorCard(actor, container, backButton) {
    const card = document.createElement('div');
    card.className = 'mobile-actor-card';
    card.dataset.actorId = actor.id;

    const img = actor.img || 'icons/svg/mystery-man.svg';
    const name = actor.name;
    const type = this.translateActorType(actor.type);

    card.innerHTML = `
      <img src="${img}" alt="${name}" class="mobile-actor-img" loading="lazy">
      <div class="mobile-actor-name">${name}</div>
      <div class="mobile-actor-type">${type}</div>
    `;

    card.addEventListener('click', () => {
      this.openActorSheet(actor, container, backButton);
    }, { passive: true });

    return card;
  }

  // Traduire le type d'acteur
  translateActorType(type) {
    const types = {
      'character': 'Personnage',
      'npc': 'PNJ',
      'monster': 'Monstre',
      'vehicle': 'Véhicule'
    };
    return types[type] || type;
  }

  // Configurer le bouton retour
  setupBackButton(backButton, container) {
    backButton.addEventListener('click', (e) => {
      e.stopPropagation();
     
      if (this.activeSheet) {
        this.activeSheet.close();
        this.activeSheet = null;
      }
     
      container.style.display = 'block';
      backButton.classList.remove('visible');
    }, { passive: false });
  }

  // Ouvrir la fiche
  openActorSheet(actor, listContainer, backButton) {
    console.log(`📖 Ouverture: ${actor.name}`);
   
    listContainer.style.display = 'none';
    backButton.classList.add('visible');

    this.activeSheet = actor.sheet;
    actor.sheet.render(true);
  }

  // Optimiser la fiche pour mobile
  optimizeSheetForMobile(sheet, html) {
    const sheetElement = html[0] || html;

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
      z-index: 9998 !important;
      transform: none !important;
    `;

    const content = sheetElement.querySelector('.window-content');
    if (content) {
      content.style.cssText = `
        overflow-y: auto !important;
        overflow-x: hidden !important;
        padding: 10px !important;
        font-size: 14px !important;
        -webkit-overflow-scrolling: touch !important;
      `;
    }

    const inputs = sheetElement.querySelectorAll('input, button, select, textarea, a');
    inputs.forEach(input => {
      input.style.minHeight = '44px';
      input.style.minWidth = '44px';
      input.style.fontSize = '16px';
    });

    const closeBtn = sheetElement.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.actorListElement) {
          this.actorListElement.style.display = 'block';
          const backBtn = this.actorListElement.querySelector('.mobile-back-button');
          if (backBtn) backBtn.classList.remove('visible');
        }
        this.activeSheet = null;
      });
    }
  }

  // Gérer le redimensionnement
  setupResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasMobile = this.isMobile;
        this.isMobile = this.detectMobile();

        if (wasMobile !== this.isMobile) {
          location.reload();
        }
      }, 250);
    }, { passive: true });
  }

  // Stats de performance
  getPerformanceStats() {
    const stats = {
      isMobile: this.isMobile,
      isOffline: this.isOffline,
      activeOptimizations: Object.keys(this.optimizations).filter(k => this.optimizations[k]),
      actorCount: game.actors ? game.actors.size : 0,
      loadTime: performance.timing ?
        Math.round(performance.timing.loadEventEnd - performance.timing.navigationStart) + 'ms' :
        'N/A'
    };
   
    console.table(stats);
    return stats;
  }
}

