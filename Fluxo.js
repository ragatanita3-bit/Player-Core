
    // ============================================================
    // 1. FIREBASE CONFIG (constante)
    // ============================================================
    const FB_CONFIG = {
      apiKey: "AIzaSyBtXIDuoSv1tw-1TaRTGIdsa0MiH7d7gvc",
      authDomain: "coop-play-rs1.firebaseapp.com",
      databaseURL: "https://coop-play-rs1-default-rtdb.firebaseio.com",
      projectId: "coop-play-rs1",
      storageBucket: "coop-play-rs1.firebasestorage.app",
      messagingSenderId: "673223949837",
      appId: "1:673223949837:web:39b24466f49b81b4325f44",
      measurementId: "G-G7ZK26MH7X"
    };
    firebase.initializeApp(FB_CONFIG);
    const auth = firebase.auth();
    const db = firebase.firestore();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const adminEmails = ["annibal071@gmail.com"];

    // ============================================================
    // 2. DADOS ESTÁTICOS (games, paletas, etc.)
    // ============================================================
    const GAME_RANKING_DATA = {
      'FPS / SHOOTER': ["Counter-Strike 2","Counter-Strike: Global Offensive","Call of Duty: Warzone","Call of Duty: Modern Warfare","Call of Duty: Black Ops","Call of Duty: Black Ops II","Call of Duty: Black Ops III","Call of Duty: Black Ops 6","Call of Duty: Black Ops 7","Call of Duty: Mobile","Fortnite","PUBG: Battlegrounds","PUBG Mobile","Free Fire","Apex Legends","Valorant","Overwatch 2","Team Fortress 2","Rainbow Six Siege","Battlefield 1","Battlefield V","Battlefield 2042","Battlefield 4","Halo Infinite","Halo 5: Guardians","Destiny 2","Doom Eternal","Doom","Wolfenstein: The New Order","Far Cry 5","Far Cry 6","Far Cry 3","Left 4 Dead 2","Half-Life 2","Half-Life","Titanfall 2","Borderlands 2","Borderlands 3","Warframe","Escape from Tarkov","Helldivers 2","Marvel Rivals","XDefiant","CrossFire","Delta Force","The Finals","Quake","Paladins","Destiny","Killing Floor 2"],
      'ACTION / ACTION-ADVENTURE': ["Grand Theft Auto V","Grand Theft Auto: San Andreas","Grand Theft Auto IV","Grand Theft Auto: Vice City","Red Dead Redemption 2","Red Dead Redemption","The Last of Us","The Last of Us Part II","God of War","God of War Ragnarök","Marvel's Spider-Man","Marvel's Spider-Man 2","Batman: Arkham City","Batman: Arkham Knight","Assassin's Creed II","Assassin's Creed IV: Black Flag","Assassin's Creed Odyssey","Assassin's Creed Origins","Assassin's Creed Valhalla","Uncharted 4","Uncharted 2","Ghost of Tsushima","Horizon Zero Dawn","Horizon Forbidden West","The Witcher 3","Sekiro: Shadows Die Twice","Elden Ring","Dark Souls","Dark Souls III","Bloodborne","Devil May Cry 5","Monster Hunter: World","Monster Hunter Rise","Metal Gear Solid V","Tomb Raider","Rise of the Tomb Raider","Shadow of the Tomb Raider","Control","Alan Wake 2","Days Gone","Death Stranding","Uncharted: Legacy of Thieves","Prince of Persia: The Sands of Time","Star Wars Jedi: Fallen Order","Star Wars Jedi: Survivor","Infamous Second Son","Sleeping Dogs","Prototype","Just Cause 3","Watch Dogs 2"],
      'RPG': ["The Witcher 3","Elden Ring","Skyrim","Fallout 4","Fallout: New Vegas","Fallout 3","Baldur's Gate 3","Diablo IV","Diablo III","Diablo II","World of Warcraft","Final Fantasy VII","Final Fantasy VII Remake","Final Fantasy XVI","Final Fantasy XIV","Final Fantasy XV","Pokémon Red/Blue","Pokémon Gold/Silver","Pokémon Diamond/Pearl","Pokémon Sword/Shield","Pokémon Scarlet/Violet","Pokémon GO","Genshin Impact","Honkai: Star Rail","Wuthering Waves","Dragon Quest XI","Persona 5 Royal","Persona 4","Mass Effect 2","Mass Effect 3","Dragon Age: Inquisition","Dragon Age: Origins","Cyberpunk 2077","Kingdom Hearts","Kingdom Hearts II","Monster Hunter: World","Monster Hunter Rise","Starfield","Dragon's Dogma 2","Dragon's Dogma","Path of Exile","Path of Exile 2","Lost Ark","MapleStory","RuneScape","Black Desert Online","Terraria","Stardew Valley","Undertale","Deltarune"],
      'PUZZLE': ["Candy Crush Saga","Tetris","Tetris Effect","Portal","Portal 2","The Witness","Monument Valley","Monument Valley 2","Brain Out","Sudoku","Bejeweled","Bejeweled 2","Candy Crush Soda Saga","Candy Crush Jelly Saga","Gardenscapes","Homescapes","Toon Blast","Royal Match","Angry Birds","Angry Birds 2","Cut the Rope","Cut the Rope 2","Fruit Ninja","Where's My Water?","World of Goo","Baba Is You","Human: Fall Flat","Little Nightmares","Little Nightmares II","Limbo","Inside","Braid","The Talos Principle","The Talos Principle 2","Superliminal","Cocoon","Viewfinder","Antichamber","The Room","The Room Two","The Room Three","Professor Layton","Ace Attorney","Picross","Peggle","Peggle 2","Puyo Puyo","Portal Knights","It Takes Two","Keep Talking and Nobody Explodes"],
      'SPORTS': ["EA Sports FC","FIFA 23","FIFA 22","FIFA 21","FIFA 20","FIFA 19","FIFA 18","eFootball","PES 2021","PES 2020","NBA 2K","NBA 2K25","NBA 2K24","NBA 2K23","Madden NFL","Madden NFL 25","MLB The Show","NHL","Rocket League","Wii Sports","Wii Sports Resort","Mario Tennis Aces","Mario Golf: Super Rush","Mario Strikers: Battle League","Mario & Sonic at the Olympic Games","Tony Hawk's Pro Skater 1+2","Tony Hawk's Underground","Skate","Skate 3","Riders Republic","Steep","Gran Turismo 7","Gran Turismo Sport","Gran Turismo 6","Forza Motorsport","Forza Horizon 5","Forza Horizon 4","Need for Speed Heat","Need for Speed Most Wanted","F1 25","F1 24","F1 23","The Crew Motorfest","The Crew 2","WRC","Dirt Rally 2.0","Trackmania","Fall Guys","8 Ball Pool","Fishing Planet"],
      'INDIE': ["Minecraft","Terraria","Stardew Valley","Among Us","Undertale","Hollow Knight","Celeste","Hades","Hades II","Cuphead","Dead Cells","The Binding of Isaac: Rebirth","Don't Starve","Don't Starve Together","Braid","Limbo","Inside","Little Nightmares","Little Nightmares II","Slay the Spire","Balatro","Vampire Survivors","Dave the Diver","Lethal Company","Phasmophobia","Content Warning","Valheim","Rust","Project Zomboid","Unturned","Palworld","Factorio","RimWorld","Prison Architect","Papers, Please","Hotline Miami","Hotline Miami 2","Katana ZERO","Shovel Knight","Ori and the Blind Forest","Ori and the Will of the Wisps","Deltarune","Enter the Gungeon","Risk of Rain 2","Inscryption","Disco Elysium","Outer Wilds","Subnautica","Sons of the Forest","Core Keeper"],
      'SANDBOX / SURVIVAL': ["Minecraft","Roblox","Terraria","GTA V","Rust","Palworld","ARK: Survival Evolved","ARK: Survival Ascended","Valheim","The Forest","Sons of the Forest","Subnautica","Subnautica: Below Zero","Don't Starve","Don't Starve Together","Project Zomboid","Unturned","DayZ","7 Days to Die","Conan Exiles","Raft","Grounded","Enshrouded","Core Keeper","Starbound","Factorio","Satisfactory","No Man's Sky","Astroneer","Scrap Mechanic","Garry's Mod","Besiege","Teardown","Space Engineers","Empyrion","The Sims 4","SimCity","Cities: Skylines","Planet Zoo","Planet Coaster","LEGO Worlds","Dreams","LittleBigPlanet","Dragon Quest Builders","Dragon Quest Builders 2","Creativerse","Trove","Eco","Stranded Deep","Medieval Dynasty"],
      'STRATEGY': ["League of Legends","Dota 2","StarCraft II","StarCraft","Warcraft III","Age of Empires II","Age of Empires IV","Civilization VI","Civilization V","Civilization VII","Clash of Clans","Clash Royale","Teamfight Tactics","Hearthstone","Chess.com","XCOM 2","XCOM: Enemy Unknown","Total War: Warhammer III","Total War: Rome II","Total War: Three Kingdoms","Crusader Kings III","Europa Universalis IV","Hearts of Iron IV","Stellaris","RimWorld","Factorio","Satisfactory","Frostpunk","Frostpunk 2","Into the Breach","Slay the Spire","Bloons TD 6","Plants vs. Zombies","Plants vs. Zombies 2","Age of Mythology","Command & Conquer","Command & Conquer: Red Alert 2","Company of Heroes","Company of Heroes 2","Stronghold","Stronghold Crusader","Anno 1800","Banished","Tropico 6","Pokémon Unite","Marvel Snap","Magic: The Gathering Arena","Yu-Gi-Oh! Master Duel","Fire Emblem: Three Houses","Advance Wars"],
      'FIGHTING': ["Street Fighter II","Street Fighter IV","Street Fighter V","Street Fighter 6","Mortal Kombat","Mortal Kombat II","Mortal Kombat 9","Mortal Kombat X","Mortal Kombat 11","Mortal Kombat 1","Tekken 3","Tekken 5","Tekken 7","Tekken 8","Super Smash Bros.","Super Smash Bros. Melee","Super Smash Bros. Brawl","Super Smash Bros. Ultimate","Dragon Ball FighterZ","Dragon Ball Xenoverse 2","Guilty Gear Strive","Guilty Gear Xrd","The King of Fighters XV","The King of Fighters XIII","Soulcalibur II","Soulcalibur VI","Marvel vs. Capcom","Marvel vs. Capcom 2","Marvel vs. Capcom Infinite","Injustice: Gods Among Us","Injustice 2","Killer Instinct","Dead or Alive 5","Dead or Alive 6","Naruto Shippuden: Ultimate Ninja Storm 4","Naruto Ultimate Ninja Storm 3","Brawlhalla","MultiVersus","Skullgirls","BlazBlue","Persona 4 Arena","Virtua Fighter 5","UFC 5","UFC 4","WWE 2K24","WWE 2K25","JoJo's Bizarre Adventure: All-Star Battle R","Granblue Fantasy Versus: Rising","Dragon Ball: Sparking! ZERO","Nickelodeon All-Star Brawl"],
      'RACING': ["Mario Kart 8 Deluxe","Mario Kart Wii","Mario Kart DS","Mario Kart 7","Mario Kart Tour","Gran Turismo 7","Gran Turismo Sport","Gran Turismo 4","Forza Horizon 5","Forza Horizon 4","Forza Horizon 3","Forza Motorsport","Need for Speed Most Wanted","Need for Speed Underground 2","Need for Speed Heat","Need for Speed Unbound","Need for Speed Hot Pursuit","Need for Speed Carbon","Burnout Paradise","Burnout 3: Takedown","The Crew 2","The Crew Motorfest","Trackmania","F1 25","F1 24","F1 23","Dirt Rally 2.0","Dirt 5","Assetto Corsa","Assetto Corsa Competizione","iRacing","Project CARS 2","Wreckfest","BeamNG.drive","Rocket League","Hot Wheels Unleashed","Hot Wheels Unleashed 2","Crash Team Racing Nitro-Fueled","Sonic & All-Stars Racing Transformed","Team Sonic Racing","Mario Kart 64","Mario Kart 8","Riders Republic","Steep","SnowRunner","Euro Truck Simulator 2","American Truck Simulator","CarX Drift Racing Online","Need for Speed Rivals","The Crew"],
      'HORROR': ["Resident Evil 4","Resident Evil 2","Resident Evil 7","Resident Evil Village","Resident Evil 3","Resident Evil 5","Resident Evil 6","Resident Evil","Silent Hill 2","Silent Hill 3","Silent Hill","Outlast","Outlast 2","Amnesia: The Dark Descent","Amnesia: Rebirth","Alien: Isolation","Dead Space","Dead Space 2","Dead Space Remake","The Evil Within","The Evil Within 2","Phasmophobia","Lethal Company","Five Nights at Freddy's","Five Nights at Freddy's 2","Five Nights at Freddy's 4","Poppy Playtime","Poppy Playtime Chapter 2","Poppy Playtime Chapter 3","Little Nightmares","Little Nightmares II","Amnesia: The Bunker","SOMA","Layers of Fear","Visage","Devour","Dead by Daylight","Dying Light","Dying Light 2","Until Dawn","The Quarry","Slender: The Eight Pages","Slender: The Arrival","Cry of Fear","Darkwood","Signalis","Iron Lung","Garten of Banban","Content Warning","Alien: Isolation"],
      'OPEN WORLD': ["GTA V","GTA San Andreas","GTA IV","GTA Vice City","Red Dead Redemption 2","Red Dead Redemption","Minecraft","Roblox","The Witcher 3","Cyberpunk 2077","Skyrim","Fallout 4","Fallout 3","Fallout: New Vegas","Elden Ring","The Legend of Zelda: Breath of the Wild","The Legend of Zelda: Tears of the Kingdom","Horizon Zero Dawn","Horizon Forbidden West","Ghost of Tsushima","Assassin's Creed Odyssey","Assassin's Creed Origins","Assassin's Creed Valhalla","Assassin's Creed IV: Black Flag","Watch Dogs","Watch Dogs 2","Far Cry 5","Far Cry 6","Far Cry 3","Just Cause 2","Just Cause 3","Just Cause 4","No Man's Sky","Starfield","Hogwarts Legacy","Palworld","ARK: Survival Evolved","Rust","Terraria","Subnautica","Days Gone","Dying Light","Dying Light 2","Dragon's Dogma 2","Kingdom Come: Deliverance","Kingdom Come: Deliverance II","The Crew 2","Forza Horizon 5","Marvel's Spider-Man","Death Stranding"],
      'MULTIPLAYER / CO-OP': ["Minecraft","Roblox","Fortnite","GTA Online","Among Us","Counter-Strike 2","League of Legends","Dota 2","Valorant","PUBG: Battlegrounds","Apex Legends","Call of Duty: Warzone","Free Fire","Overwatch 2","Rocket League","Fall Guys","Terraria","Stardew Valley","Lethal Company","Phasmophobia","Helldivers 2","Left 4 Dead 2","Portal 2","It Takes Two","A Way Out","Sea of Thieves","Rust","ARK: Survival Evolved","Valheim","Don't Starve Together","Palworld","Monster Hunter: World","Monster Hunter Rise","Warframe","Destiny 2","Diablo IV","World of Warcraft","Final Fantasy XIV","Lost Ark","Rainbow Six Siege","Team Fortress 2","Garry's Mod","Payday 2","Payday 3","Deep Rock Galactic","Human: Fall Flat","Content Warning","Dead by Daylight","Brawlhalla","Marvel Rivals"]
    };
    const GLOBAL_RANKINGS = {
      ' MAIS JOGADOS 2026': ["Roblox","Minecraft","Fortnite","Free Fire","League of Legends","Counter-Strike 2","PUBG / PUBG Mobile","Call of Duty / Warzone","Mobile Legends: Bang Bang","Honor of Kings","Dota 2","Genshin Impact","Valorant","Grand Theft Auto V / GTA Online","Apex Legends","Candy Crush Saga","Clash of Clans","Clash Royale","Pokémon GO","Brawl Stars","Overwatch 2","EA Sports FC 26","Rocket League","World of Warcraft","Destiny 2","Terraria","Rust","Palworld","Marvel Rivals","Warframe"],
      'STEAM 2026': ["Counter-Strike 2","Dota 2","PUBG: Battlegrounds","Apex Legends","Palworld","Rust","Grand Theft Auto V / FiveM","Marvel Rivals","Warframe","Path of Exile 2","Rainbow Six Siege","Team Fortress 2","Baldur's Gate 3","Helldivers 2","Stardew Valley","Terraria","Dead by Daylight","Football Manager","Wallpaper Engine","Garry's Mod"]
    };
    const gameToGenreMap = {};
    for (const [genre, games] of Object.entries(GAME_RANKING_DATA)) {
      games.forEach(name => { gameToGenreMap[name] = genre; });
    }
    const SHOP_PALETTES = [
      { id:'default', name:'Roxo/Índigo', price:0, free:true },
      { id:'green', name:'Verde/Esmeralda', price:0, free:true },
      { id:'blue', name:'Azul/Oceano', price:0, free:true },
      { id:'red', name:'Vermelho/Coral', price:0, free:true },
      { id:'orange', name:'Laranja/Âmbar', price:0, free:true },
      { id:'pink', name:'Rosa/Roxo', price:0, free:true },
      { id:'purple', name:'Roxo Escuro', price:0, free:true },
      { id:'yellow', name:'Amarelo/Dourado', price:0, free:true },
      { id:'cyan', name:'Ciano/Turquesa', price:0, free:true },
      { id:'graphite', name:'Grafite/Elegante', price:0, free:true },
      { id:'neon', name:'Neon', price:200, free:false },
      { id:'retro', name:'Retrô', price:150, free:false },
      { id:'midnight', name:'Meia-Noite', price:250, free:false },
      { id:'ocean', name:'Oceano Profundo', price:180, free:false },
      { id:'sunset', name:'Pôr do Sol', price:220, free:false }
    ];

    // ============================================================
    // 3. UTILITÁRIOS
    // ============================================================
    function escapeHTML(str) { if (!str) return ''; return String(str).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[m]||m); }
    function showToast(msg, type='info') {
      const c = document.getElementById('toastContainer');
      const t = document.createElement('div');
      t.className = `toast ${type}`;
      t.textContent = msg;
      c.appendChild(t);
      setTimeout(() => { t.style.opacity='0'; t.style.transform='scale(0.95)'; setTimeout(()=>t.remove(),300); }, 3000);
    }
    function getAvatarUrl(name, size=40) {
      if(!name) name='U';
      const encoded = encodeURIComponent(name);
      return `https://ui-avatars.com/api/?name=${encoded}&background=${encodeURIComponent(getColorFromName(name))}&color=fff&size=${size}&font-size=0.5&rounded=true&bold=true`;
    }
    function getColorFromName(name) {
      if(!name) return '8B5CF6';
      let hash=0; for(let i=0;i<name.length;i++) hash=name.charCodeAt(i)+((hash<<5)-hash);
      const colors=['8B5CF6','3B82F6','10B981','F59E0B','EF4444','EC4899','8B5CF6','06B6D4','F97316','A78BFA'];
      return colors[Math.abs(hash)%colors.length];
    }
    function getInitials(name) {
      if(!name) return 'U';
      const parts = name.trim().split(/\s+/);
      if(parts.length>=2) return (parts[0][0]+parts[1][0]).toUpperCase();
      return name.substring(0,2).toUpperCase();
    }
    function formatTimestamp(ts) {
      if(!ts) return 'Agora';
      let d = ts.toMillis ? new Date(ts.toMillis()) : new Date(ts);
      if(isNaN(d.getTime())) return 'Agora';
      const now = Date.now();
      const diff = now - d.getTime();
      if(diff<60000) return 'Agora';
      if(diff<3600000) return `${Math.floor(diff/60000)} min atrás`;
      return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()} • ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    }
    function formatMessageTime(ts) {
      if(!ts) return '';
      let d = ts.toMillis ? new Date(ts.toMillis()) : new Date(ts);
      if(isNaN(d.getTime())) return '';
      return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    }
    function formatMessageDate(ts) {
      if(!ts) return null;
      let d = ts.toMillis ? new Date(ts.toMillis()) : new Date(ts);
      if(isNaN(d.getTime())) return null;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const msgDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const diffDays = Math.floor((today - msgDate)/(1000*60*60*24));
      if(diffDays===0) return 'HOJE';
      if(diffDays===1) return 'ONTEM';
      if(diffDays<=7) return `${diffDays} dias atrás`;
      return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    }
    const ONLINE_TIMEOUT = 90000;
    function isUserActuallyOnline(profile) {
      if(!profile || !profile.is_online || !profile.lastSeen) return false;
      let ms = profile.lastSeen.toMillis ? profile.lastSeen.toMillis() : profile.lastSeen;
      return (Date.now() - ms) < ONLINE_TIMEOUT;
    }

    // ============================================================
    // 4. ESTADO CENTRALIZADO
    // ============================================================
    const State = {
      currentUser: null,
      userProfile: null,
      following: [],
      purchasedPalettes: ['default'],
      currentChatId: null,
      userLocation: null,
      notificationUnread: 0,
      notificationData: [],
      allPosts: [],
      allTournaments: [],
      allBadges: [],
      allMissions: [],
      allGames: [],
      allGroups: [],
      allLfg: [],
      allSquads: [],
      allClips: [],
      allGuides: [],
      allCommunities: [],
      allSeasons: [],
      currentLobbyId: null,
      mapInitialized: false,
      mapInstance: null,
      mapMarkers: [],
      // Cache
      cache: {
        profiles: {},     // uid -> profile data
        games: {},        // gameId -> game data
        covers: {},       // gameName -> cover_url
      },
      // Listeners
      listeners: {
        chat: null,
        matchmaking: null,
        notifications: null,
        lobby: null,
        presence: null,
      }
    };

    // ============================================================
    // 5. REFERÊNCIAS DOM (centralizadas)
    // ============================================================
    const E = {
      toast: document.getElementById('toastContainer'),
      sidebar: document.getElementById('sidebar'),
      menuToggle: document.getElementById('menuToggle'),
      sidebarClose: document.getElementById('sidebarCloseBtn'),
      navItems: document.querySelectorAll('.nav-item, .m-item'),
      pages: document.querySelectorAll('.page'),
      // Auth
      authOverlay: document.getElementById('authOverlay'),
      authEmail: document.getElementById('authEmail'),
      authPassword: document.getElementById('authPassword'),
      authSubmit: document.getElementById('authSubmitBtn'),
      authToggle: document.getElementById('authToggle'),
      authError: document.getElementById('authError'),
      // Sidebar
      sidebarUsername: document.getElementById('sidebarUsername'),
      sidebarNexus: document.getElementById('sidebarNexus'),
      logoutBtn: document.getElementById('logoutBtn'),
      themeSelect: document.getElementById('themeSelectSidebar'),
      themeToggle: document.getElementById('themeToggleSidebar'),
      playlistSelect: document.getElementById('playlistSelectSidebar'),
      musicFrame: document.getElementById('musicFrameSidebar'),
      openFilters: document.getElementById('openFiltersBtn'),
      chatBadge: document.getElementById('chatBadge'),
      notifCount: document.getElementById('notifCount'),
      // Feed
      feedContainer: document.getElementById('feedContainer'),
      postInput: document.getElementById('postInput'),
      postSubmit: document.getElementById('postSubmitBtn'),
      feedGameFilter: document.getElementById('feedGameFilter'),
      // Matchmaking
      mmSearch: document.getElementById('mmSearch'),
      matchmakingContainer: document.getElementById('matchmakingContainer'),
      mmFilterBtn: document.getElementById('mmFilterBtn'),
      // Chat
      chatList: document.getElementById('chatList'),
      chatMessages: document.getElementById('chatMessages'),
      chatInput: document.getElementById('chatInput'),
      chatSendBtn: document.getElementById('chatSendBtn'),
      chatTyping: document.getElementById('chatTyping'),
      chatHeader: document.getElementById('chatHeader'),
      chatTitle: document.getElementById('chatTitle'),
      deleteChatBtn: document.getElementById('deleteChatBtn'),
      chatBackBtn: document.getElementById('chatBackBtn'),
      chatWindow: document.getElementById('chatWindow'),
      statTotal: document.getElementById('statTotal'),
      statUnread: document.getElementById('statUnread'),
      statReplied: document.getElementById('statReplied'),
      // Profile
      profileAvatar: document.getElementById('profileAvatar'),
      profileName: document.getElementById('profileName'),
      profileNexus: document.getElementById('profileNexus'),
      profileCoins: document.getElementById('profileCoins'),
      profileXP: document.getElementById('profileXP'),
      profileLevel: document.getElementById('profileLevel'),
      profileRep: document.getElementById('profileRep'),
      profileBio: document.getElementById('profileBio'),
      profileGames: document.getElementById('profileGames'),
      profileBadges: document.getElementById('profileBadges'),
      profileFollowers: document.getElementById('profileFollowers'),
      profileFollowing: document.getElementById('profileFollowing'),
      profileStatus: document.getElementById('profileStatus'),
      xpProgress: document.getElementById('xpProgress'),
      profileFollowingList: document.getElementById('profileFollowingList'),
      profileFollowersList: document.getElementById('profileFollowersList'),
      profileFollowingCount: document.getElementById('profileFollowingCount'),
      profileFollowersCount: document.getElementById('profileFollowersCount'),
      editBioBtn: document.getElementById('editBioBtn'),
      saveVisibility: document.getElementById('saveVisibilityBtn'),
      deleteAccount: document.getElementById('deleteAccountBtn'),
      // Settings
      settingsDisplayName: document.getElementById('settingsDisplayName'),
      settingsBio: document.getElementById('settingsBio'),
      settingsGames: document.getElementById('settingsGames'),
      settingsSave: document.getElementById('settingsSaveBtn'),
      // Notifications
      notificationsContainer: document.getElementById('notificationsContainer'),
      markAllRead: document.getElementById('markAllReadBtn'),
      // Map
      mapDiv: document.getElementById('map'),
      locateBtn: document.getElementById('locateBtn'),
      nearbyBtn: document.getElementById('nearbyBtn'),
      nearbyList: document.getElementById('nearbyList'),
      // Games
      gamesContainer: document.getElementById('gamesContainer'),
      gameGenreFilter: document.getElementById('gameGenreFilter'),
      rankingTabs: document.getElementById('rankingTabs'),
      rankingContent: document.getElementById('rankingContent'),
      // Admin
      adminBadgeName: document.getElementById('adminBadgeName'),
      adminBadgeDesc: document.getElementById('adminBadgeDesc'),
      adminBadgeIcon: document.getElementById('adminBadgeIcon'),
      adminBadgeRarity: document.getElementById('adminBadgeRarity'),
      adminBadgeXP: document.getElementById('adminBadgeXP'),
      adminCreateBadge: document.getElementById('adminCreateBadgeBtn'),
      adminMissionTitle: document.getElementById('adminMissionTitle'),
      adminMissionDesc: document.getElementById('adminMissionDesc'),
      adminMissionType: document.getElementById('adminMissionType'),
      adminMissionCoins: document.getElementById('adminMissionCoins'),
      adminMissionXP: document.getElementById('adminMissionXP'),
      adminMissionTarget: document.getElementById('adminMissionTarget'),
      adminCreateMission: document.getElementById('adminCreateMissionBtn'),
      adminGameName: document.getElementById('adminGameName'),
      adminGameGenre: document.getElementById('adminGameGenre'),
      adminAddGame: document.getElementById('adminAddGameBtn'),
      adminGameList: document.getElementById('adminGameList'),
      adminFetchCover: document.getElementById('adminFetchCoverBtn'),
      adminCoverPreview: document.getElementById('adminCoverPreview'),
      adminMigrateCovers: document.getElementById('adminMigrateCoversBtn'),
      adminMigrateProgress: document.getElementById('adminMigrateProgress'),
      // Home
      homeUsername: document.getElementById('homeUsername'),
      homeDisplayName: document.getElementById('homeDisplayName'),
      homeNexus: document.getElementById('homeNexus'),
      homeLevel: document.getElementById('homeLevel'),
      homeXP: document.getElementById('homeXP'),
      homeCoins: document.getElementById('homeCoins'),
      homeRep: document.getElementById('homeRep'),
      homeXpBar: document.getElementById('homeXpBar'),
      homeOnlineCount: document.getElementById('homeOnlineCount'),
      homeMissions: document.getElementById('homeMissions'),
      homeLfg: document.getElementById('homeLfg'),
      homeSquad: document.getElementById('homeSquad'),
      homeNotifs: document.getElementById('homeNotifs'),
      // LFG
      lfgContainer: document.getElementById('lfgContainer'),
      createLfg: document.getElementById('createLfgBtn'),
      // Squads
      squadsContainer: document.getElementById('squadsContainer'),
      createSquad: document.getElementById('createSquadBtn'),
      // Lobby
      lobbyPlayers: document.getElementById('lobbyPlayers'),
      lobbyMessages: document.getElementById('lobbyMessages'),
      lobbyChatInput: document.getElementById('lobbyChatInput'),
      lobbyChatSend: document.getElementById('lobbyChatSend'),
      createLobby: document.getElementById('createLobbyBtn'),
      // Others
      communitiesContainer: document.getElementById('communitiesContainer'),
      seasonsContainer: document.getElementById('seasonsContainer'),
      hubpassContainer: document.getElementById('hubpassContainer'),
      clipsContainer: document.getElementById('clipsContainer'),
      createClip: document.getElementById('createClipBtn'),
      guidesContainer: document.getElementById('guidesContainer'),
      createGuide: document.getElementById('createGuideBtn'),
      aiChat: document.getElementById('aiChat'),
      aiInput: document.getElementById('aiInput'),
      aiSend: document.getElementById('aiSendBtn'),
      exploreSearch: document.getElementById('exploreSearch'),
      exploreSearchBtn: document.getElementById('exploreSearchBtn'),
      exploreResults: document.getElementById('exploreResults'),
      filterModal: document.getElementById('filterModal'),
      filterSearch: document.getElementById('filterSearch'),
      filterGenre: document.getElementById('filterGenre'),
      filterPlatform: document.getElementById('filterPlatform'),
      filterDistance: document.getElementById('filterDistance'),
      filterApply: document.getElementById('filterApplyBtn'),
      filterClear: document.getElementById('filterClearBtn'),
      likesModal: document.getElementById('likesModal'),
      closeLikes: document.getElementById('closeLikesModal'),
      likesList: document.getElementById('likesList'),
      likesModalTitle: document.getElementById('likesModalTitle'),
      profileModal: document.getElementById('profileModal'),
      profileModalContent: document.getElementById('profileModalContent'),
      closeProfileModal: document.getElementById('closeProfileModal'),
      guessInput: document.getElementById('guessInput'),
      guessBtn: document.getElementById('guessBtn'),
      guessResult: document.getElementById('guessResult'),
      guessRecord: document.getElementById('guessRecord'),
      // Tournaments
      tournamentContainer: document.getElementById('tournamentContainer'),
      createTournament: document.getElementById('createTournamentBtn'),
      // Rankings
      rankingsContainer: document.getElementById('rankingsContainer'),
      // Groups
      groupsContainer: document.getElementById('groupsContainer'),
      createGroup: document.getElementById('createGroupBtn'),
      // Friends
      friendsContainer: document.getElementById('friendsContainer'),
      // Shop
      shopContainer: document.getElementById('shopContainer'),
      // Badges
      badgesContainer: document.getElementById('badgesContainer'),
      missionsContainer: document.getElementById('missionsContainer'),
    };

    // ============================================================
    // 6. NAVEGAÇÃO
    // ============================================================
    function navigateTo(pageId) {
      E.pages.forEach(p => p.classList.remove('active'));
      const target = document.getElementById('page-' + pageId);
      if (target) target.classList.add('active');
      E.navItems.forEach(el => el.classList.toggle('active', el.dataset.page === pageId));
      E.sidebar.classList.remove('open');
      // Inicialização sob demanda
      const initMap = {
        home: () => updateHome(),
        chat: () => { loadChatList(); updateChatStats(); },
        map: () => initMap(),
        badges: () => loadBadges(),
        challenges: () => loadMissions(),
        tournaments: () => loadTournaments(),
        games: () => { loadGames(); renderRankingTabs(); },
        rankings: () => loadRankings(),
        groups: () => loadGroups(),
        notifications: () => renderNotifications(State.notificationData),
        profile: () => { updateUI(); loadFollowLists(); },
        friends: () => loadFriends(),
        shop: () => loadShop(),
        matchmaking: () => loadMatchmaking(),
        lfg: () => loadLfg(),
        squads: () => loadSquads(),
        clips: () => loadClips(),
        guides: () => loadGuides(),
        communities: () => loadCommunities(),
        seasons: () => loadSeasons(),
        hubpass: () => loadHubPass(),
        lobby: () => updateLobby(),
      };
      if (initMap[pageId]) initMap[pageId]();
      if (pageId !== 'chat') {
        E.chatWindow.classList.remove('full-mobile');
        document.querySelector('.chat-list')?.classList.remove('hidden-mobile');
      }
    }

    // Eventos de navegação
    E.navItems.forEach(el => {
      el.addEventListener('click', () => { if (el.dataset.page) navigateTo(el.dataset.page); });
    });
    E.menuToggle.addEventListener('click', () => E.sidebar.classList.toggle('open'));
    E.sidebarClose.addEventListener('click', () => E.sidebar.classList.remove('open'));
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !E.sidebar.contains(e.target) && e.target !== E.menuToggle) {
        E.sidebar.classList.remove('open');
      }
    });
    E.openFilters.addEventListener('click', () => E.filterModal.classList.add('active'));

    // ============================================================
    // 7. AUTENTICAÇÃO
    // ============================================================
    let isRegistering = false;
    function showAuthError(msg) { E.authError.style.display='block'; E.authError.textContent=msg; }
    function clearAuthError() { E.authError.style.display='none'; }

    E.authSubmit.addEventListener('click', async () => {
      clearAuthError();
      const email = E.authEmail.value.trim(), pass = E.authPassword.value.trim();
      if (!email || !pass) { showAuthError('Preencha email e senha.'); return; }
      try {
        if (isRegistering) {
          const cred = await auth.createUserWithEmailAndPassword(email, pass);
          await createUserProfile(cred.user);
        } else {
          await auth.signInWithEmailAndPassword(email, pass);
        }
      } catch (err) { showAuthError(err.message); }
    });
    E.authToggle.addEventListener('click', () => {
      isRegistering = !isRegistering;
      E.authSubmit.textContent = isRegistering ? 'Criar conta' : 'Entrar';
      E.authToggle.innerHTML = isRegistering ? 'Já tem conta? <a href="#">Entrar</a>' : 'Não tem conta? <a href="#">Criar uma</a>';
      clearAuthError();
    });
    document.getElementById('googleAuthBtn').style.display = 'none';

    async function createUserProfile(user) {
      const profile = {
        nexus_id: '#' + Math.floor(1000+Math.random()*9000),
        display_name: user.displayName || user.email.split('@')[0],
        avatar_url: '', bio: '', platforms: [], favorite_games: [], tags: [],
        coins: 100, xp: 0, level: 1, reputation: 0,
        is_online: true,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        theme: 'dark', purchased_palettes: ['default'], profile_visibility: 'public',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        city: '', state: '', country: '', postal_code: '', location_lat: null, location_lng: null,
        title: 'Novato', guessRecord: 0,
        rep_fairplay: 0, rep_communication: 0, rep_cooperation: 0, rep_strategy: 0, rep_reliability: 0,
        season_xp: 0, season_level: 1, hub_pass_level: 0
      };
      await db.collection('profiles').doc(user.uid).set(profile);
      return profile;
    }

    // Logout
    E.logoutBtn.addEventListener('click', async () => {
      if (State.currentUser) {
        try {
          await db.collection('profiles').doc(State.currentUser.uid).update({ is_online: false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() });
        } catch(e){}
      }
      stopAllListeners();
      await auth.signOut();
    });

    // ============================================================
    // 8. PRESENÇA
    // ============================================================
    function startPresence() {
      if (!State.currentUser) return;
      if (State.listeners.presence) clearInterval(State.listeners.presence);
      updatePresence();
      State.listeners.presence = setInterval(updatePresence, 30000);
    }
    let presenceDebounce = null;
    async function updatePresence() {
      if (!State.currentUser) return;
      try {
        await db.collection('profiles').doc(State.currentUser.uid).update({ is_online: true, lastSeen: firebase.firestore.FieldValue.serverTimestamp() });
      } catch(e){}
    }
    function schedulePresenceUpdate() {
      if (presenceDebounce) clearTimeout(presenceDebounce);
      presenceDebounce = setTimeout(() => { updatePresence(); presenceDebounce=null; }, 2000);
    }
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') schedulePresenceUpdate(); });
    document.addEventListener('focus', schedulePresenceUpdate);
    document.addEventListener('pointerdown', schedulePresenceUpdate);
    document.addEventListener('keydown', schedulePresenceUpdate);
    document.addEventListener('touchstart', schedulePresenceUpdate);
    window.addEventListener('beforeunload', async () => {
      if (State.currentUser) {
        try { await db.collection('profiles').doc(State.currentUser.uid).update({ is_online: false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() }); } catch(e){}
      }
    });

    // ============================================================
    // 9. GERENCIADOR DE LISTENERS
    // ============================================================
    function stopAllListeners() {
      if (State.listeners.chat) { State.listeners.chat(); State.listeners.chat=null; }
      if (State.listeners.matchmaking) { State.listeners.matchmaking(); State.listeners.matchmaking=null; }
      if (State.listeners.notifications) { State.listeners.notifications(); State.listeners.notifications=null; }
      if (State.listeners.lobby) { State.listeners.lobby(); State.listeners.lobby=null; }
      if (State.listeners.presence) { clearInterval(State.listeners.presence); State.listeners.presence=null; }
    }

    // ============================================================
    // 10. AUTH STATE OBSERVER
    // ============================================================
    auth.onAuthStateChanged(async user => {
      if (user) {
        State.currentUser = user;
        E.authOverlay.classList.add('hidden');
        try {
          const doc = await db.collection('profiles').doc(user.uid).get();
          if (doc.exists) {
            State.userProfile = { id: user.uid, ...doc.data() };
          } else {
            const newProfile = await createUserProfile(user);
            State.userProfile = { id: user.uid, ...newProfile };
          }
          State.userProfile.isAdmin = adminEmails.includes(user.email);
          document.querySelector('.nav-item[data-page="admin"]').style.display = State.userProfile.isAdmin ? 'flex' : 'none';
          State.purchasedPalettes = State.userProfile.purchased_palettes || ['default'];
          document.documentElement.setAttribute('data-theme', State.userProfile.theme || 'dark');
          E.themeSelect.value = State.userProfile.theme || 'dark';
          updateThemeIcon(State.userProfile.theme || 'dark');
          await db.collection('profiles').doc(user.uid).update({ is_online: true, lastSeen: firebase.firestore.FieldValue.serverTimestamp() });
          State.userProfile.is_online = true;
          await loadFollowingList();
          updateUI();
          loadFeed();
          loadMatchmaking();
          loadTournaments();
          loadBadges();
          loadMissions();
          loadGames();
          loadRankings();
          loadGroups();
          loadFollowLists();
          renderRankingTabs();
          listenNotifications();
          startPresence();
          loadShop();
          initMusicPlayer();
          setupFilters();
          setupVisibility();
          updateHome();
          loadLfg();
          loadSquads();
          loadClips();
          loadGuides();
          loadCommunities();
          loadSeasons();
          loadHubPass();
          if (State.userProfile.isAdmin) loadAdminGameList();
        } catch (err) { console.error(err); showToast('Erro ao carregar perfil.', 'error'); }
      } else {
        State.currentUser = null; State.userProfile = null;
        E.authOverlay.classList.remove('hidden');
        stopAllListeners();
      }
    });

    // ============================================================
    // 11. FOLLOW SYSTEM
    // ============================================================
    async function loadFollowingList() {
      if (!State.currentUser) return;
      const snap = await db.collection('follows').where('follower','==',State.currentUser.uid).get();
      State.following = snap.docs.map(d => d.data().followed);
    }
    window.followUser = async (uid) => {
      if (!State.currentUser || uid===State.currentUser.uid) return showToast('Não pode seguir a si mesmo.','error');
      try {
        const existing = await db.collection('follows').where('follower','==',State.currentUser.uid).where('followed','==',uid).get();
        if (!existing.empty) {
          await existing.docs[0].ref.delete();
          State.following = State.following.filter(id => id !== uid);
          showToast('Deixou de seguir.','info');
        } else {
          await db.collection('follows').add({ follower: State.currentUser.uid, followed: uid, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
          State.following.push(uid);
          showToast('Agora você segue este usuário!','success');
          await createNotification(uid, 'follow', State.currentUser.uid, null);
        }
        loadMatchmaking(); updateProfileStats(); loadFollowLists(); loadFriends(); updateHome();
      } catch(e) { showToast('Erro: '+e.message,'error'); }
    };
    async function updateProfileStats() {
      if (!State.currentUser) return;
      const f1 = await db.collection('follows').where('followed','==',State.currentUser.uid).get();
      const f2 = await db.collection('follows').where('follower','==',State.currentUser.uid).get();
      E.profileFollowers.textContent = f1.size;
      E.profileFollowing.textContent = f2.size;
      E.profileFollowingCount.textContent = f2.size;
      E.profileFollowersCount.textContent = f1.size;
      E.profileStatus.className = (isUserActuallyOnline(State.userProfile) ? 'status-indicator status-online' : 'status-indicator status-offline');
      E.profileStatus.textContent = isUserActuallyOnline(State.userProfile) ? 'Online' : 'Offline';
    }
    async function loadFollowLists() {
      if (!State.currentUser) return;
      try {
        const f1 = await db.collection('follows').where('follower','==',State.currentUser.uid).get();
        const ids = f1.docs.map(d => d.data().followed);
        E.profileFollowingCount.textContent = ids.length;
        if (ids.length===0) E.profileFollowingList.innerHTML='<span class="text-muted">Ninguém ainda.</span>';
        else {
          const profs = await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in', ids.slice(0,10)).get();
          let html='';
          profs.forEach(d => { const data=d.data(); html+=`<span class="follow-item" onclick="viewProfile('${d.id}')">${escapeHTML(data.display_name)}</span>`; });
          if(ids.length>10) html+=` <span class="text-muted">+${ids.length-10} outros</span>`;
          E.profileFollowingList.innerHTML = html;
        }
        const f2 = await db.collection('follows').where('followed','==',State.currentUser.uid).get();
        const ids2 = f2.docs.map(d => d.data().follower);
        E.profileFollowersCount.textContent = ids2.length;
        if (ids2.length===0) E.profileFollowersList.innerHTML='<span class="text-muted">Ninguém ainda.</span>';
        else {
          const profs = await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in', ids2.slice(0,10)).get();
          let html='';
          profs.forEach(d => { const data=d.data(); html+=`<span class="follow-item" onclick="viewProfile('${d.id}')">${escapeHTML(data.display_name)}</span>`; });
          if(ids2.length>10) html+=` <span class="text-muted">+${ids2.length-10} outros</span>`;
          E.profileFollowersList.innerHTML = html;
        }
      } catch(e) { console.warn(e); }
    }

    // ============================================================
    // 12. PROFILE MODAL (público)
    // ============================================================
    window.viewProfile = async (uid) => {
      if (!uid) return;
      E.profileModal.classList.add('active');
      E.profileModalContent.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary);">Carregando...</div>';
      try {
        const doc = await db.collection('profiles').doc(uid).get();
        if (!doc.exists) { E.profileModalContent.innerHTML='<div style="text-align:center;padding:20px;color:var(--danger);">Usuário não encontrado.</div>'; return; }
        const data = doc.data();
        const isOwner = State.currentUser && uid === State.currentUser.uid;
        const isPrivate = data.profile_visibility === 'private' && !isOwner;
        if (isPrivate) {
          E.profileModalContent.innerHTML = `
            <div style="text-align:center;padding:20px;">
              <div style="width:80px;height:80px;border-radius:50%;margin:0 auto 12px;background:var(--accent-color);display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-weight:700;">${escapeHTML((data.display_name||'U')[0])}</div>
              <h2>${escapeHTML(data.display_name||'Usuário')}</h2>
              <div class="text-muted">${escapeHTML(data.nexus_id||'#----')}</div>
              <div style="margin-top:12px;padding:12px;background:var(--bg-primary);border-radius:8px;color:var(--text-secondary);">🔒 Este perfil é privado.</div>
              ${uid !== State.currentUser?.uid ? `<button class="btn-outline mt-4" onclick="followUser('${uid}'); viewProfile('${uid}');">${State.following.includes(uid) ? 'Seguindo' : 'Seguir'}</button>` : ''}
            </div>
          `;
          return;
        }
        const f1 = await db.collection('follows').where('followed','==',uid).get();
        const f2 = await db.collection('follows').where('follower','==',uid).get();
        const followersCount = f1.size, followingCount = f2.size;
        const online = isUserActuallyOnline(data);
        const isFollowing = State.currentUser && State.following.includes(uid);
        let followingNames=[], followersNames=[];
        const ids = f2.docs.map(d=>d.data().followed).slice(0,5);
        if(ids.length){ const p=await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in',ids).get(); p.forEach(d=>followingNames.push(escapeHTML(d.data().display_name))); }
        const ids2 = f1.docs.map(d=>d.data().follower).slice(0,5);
        if(ids2.length){ const p=await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in',ids2).get(); p.forEach(d=>followersNames.push(escapeHTML(d.data().display_name))); }
        E.profileModalContent.innerHTML = `
          <div style="text-align:center;">
            <div style="width:100px;height:100px;border-radius:50%;margin:0 auto 16px;background:var(--accent-color);display:flex;align-items:center;justify-content:center;font-size:40px;color:#fff;font-weight:700;">${escapeHTML((data.display_name||'U')[0])}</div>
            <h2 style="font-size:28px;">${escapeHTML(data.display_name||'Usuário')}</h2>
            <div class="text-muted">${escapeHTML(data.nexus_id||'#----')}</div>
            <div class="status-indicator ${online ? 'status-online' : 'status-offline'}" style="margin-top:8px;">${online ? 'Online' : 'Offline'}</div>
            <div class="profile-stats" style="justify-content:center;margin-top:12px;">
              <div><div class="num">${data.xp||0}</div><div class="label">XP</div></div>
              <div><div class="num">${Math.floor((data.xp||0)/500)+1}</div><div class="label">Nível</div></div>
              <div><div class="num">${data.reputation||0}</div><div class="label">Reputação</div></div>
              <div><div class="num">${followersCount}</div><div class="label">Seguidores</div></div>
              <div><div class="num">${followingCount}</div><div class="label">Seguindo</div></div>
            </div>
            <div style="margin-top:12px;padding:12px;background:var(--bg-primary);border-radius:8px;"><p style="font-style:italic;color:var(--text-secondary);">${escapeHTML(data.bio||'Nenhuma bio definida.')}</p></div>
            ${data.favorite_games && data.favorite_games.length ? `<div style="margin-top:12px;"><strong>Jogos Favoritos</strong><div>${data.favorite_games.map(g=>`<span class="badge-item">${escapeHTML(g)}</span>`).join(' ')}</div></div>` : ''}
            <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
              ${uid !== State.currentUser?.uid ? `<button class="btn-outline" onclick="followUser('${uid}'); viewProfile('${uid}');">${isFollowing ? 'Seguindo' : 'Seguir'}</button><button class="btn-neon" onclick="startChatWith('${uid}'); closeProfileModal.click();">💬 Chat</button>` : ''}
              <button class="btn-outline" onclick="closeProfileModal.click();">Fechar</button>
            </div>
            ${followingNames.length ? `<div style="margin-top:16px;"><strong>Seguindo:</strong><div class="follow-list" style="justify-content:center;">${followingNames.map(n=>`<span class="follow-item">${n}</span>`).join(' ')}</div></div>` : ''}
            ${followersNames.length ? `<div style="margin-top:8px;"><strong>Seguidores:</strong><div class="follow-list" style="justify-content:center;">${followersNames.map(n=>`<span class="follow-item">${n}</span>`).join(' ')}</div></div>` : ''}
          </div>
        `;
      } catch(e) { E.profileModalContent.innerHTML = `<div style="text-align:center;padding:20px;color:var(--danger);">Erro: ${e.message}</div>`; }
    };
    E.closeProfileModal.addEventListener('click', ()=>E.profileModal.classList.remove('active'));
    E.profileModal.addEventListener('click', (e)=>{ if(e.target===E.profileModal) E.profileModal.classList.remove('active'); });

    // ============================================================
    // 13. UI (perfil próprio)
    // ============================================================
    function updateUI() {
      if (!State.userProfile) return;
      const p=State.userProfile;
      E.sidebarUsername.textContent = escapeHTML(p.display_name||'Gamer');
      E.sidebarNexus.textContent = escapeHTML(p.nexus_id||'#----');
      E.profileName.textContent = escapeHTML(p.display_name||'Usuário');
      E.profileNexus.textContent = escapeHTML(p.nexus_id||'#----');
      E.profileCoins.textContent = p.coins||0;
      E.profileXP.textContent = p.xp||0;
      E.profileLevel.textContent = Math.floor((p.xp||0)/500)+1;
      E.profileRep.textContent = p.reputation||0;
      E.profileBio.textContent = escapeHTML(p.bio||'Nenhuma bio definida.');
      const xpInLevel = (p.xp||0)%500;
      E.xpProgress.style.width = (xpInLevel/500*100)+'%';
      const initial = (p.display_name||'U')[0].toUpperCase();
      E.profileAvatar.textContent = initial;
      E.profileAvatar.style.background = 'var(--accent-color)';
      if(p.favorite_games && p.favorite_games.length) {
        E.profileGames.innerHTML = p.favorite_games.map(g=>`<span class="badge-item">${escapeHTML(g)}</span>`).join(' ');
      } else E.profileGames.textContent = 'Nenhum jogo adicionado.';
      updateProfileStats();
      loadFollowLists();
      document.querySelectorAll('input[name="visibility"]').forEach(el => el.checked = (p.profile_visibility||'public')===el.value);
      updateHome();
    }
    E.editBioBtn.addEventListener('click', ()=>{
      const newBio = prompt('Digite sua nova bio:', State.userProfile.bio||'');
      if(newBio !== null) {
        const sanitized = newBio.replace(/(swear|badword|curse)/gi,'****');
        db.collection('profiles').doc(State.currentUser.uid).update({ bio: sanitized });
        State.userProfile.bio = sanitized;
        updateUI();
        showToast('Bio atualizada!','success');
      }
    });

    // ============================================================
    // 14. PRIVACIDADE
    // ============================================================
    function setupVisibility() {
      E.saveVisibility.addEventListener('click', async ()=>{
        if(!State.currentUser) return showToast('Faça login primeiro.','error');
        const selected = document.querySelector('input[name="visibility"]:checked');
        if(!selected) return showToast('Selecione uma opção.','error');
        try {
          await db.collection('profiles').doc(State.currentUser.uid).update({ profile_visibility: selected.value });
          State.userProfile.profile_visibility = selected.value;
          showToast(`Perfil agora é ${selected.value === 'public' ? 'público' : 'privado'}.`,'success');
        } catch(e) { showToast('Erro: '+e.message,'error'); }
      });
    }

    // ============================================================
    // 15. DELETE ACCOUNT
    // ============================================================
    E.deleteAccount.addEventListener('click', async ()=>{
      if(!State.currentUser) return;
      if(!confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível!')) return;
      try {
        const uid=State.currentUser.uid;
        const batch=db.batch();
        (await db.collection('posts').where('author_uid','==',uid).get()).docs.forEach(d=>batch.delete(d.ref));
        (await db.collection('conversations').where('participants','array-contains',uid).get()).docs.forEach(d=>batch.delete(d.ref));
        (await db.collection('notifications').where('userId','==',uid).get()).docs.forEach(d=>batch.delete(d.ref));
        (await db.collection('follows').where('follower','==',uid).get()).docs.forEach(d=>batch.delete(d.ref));
        (await db.collection('follows').where('followed','==',uid).get()).docs.forEach(d=>batch.delete(d.ref));
        batch.delete(db.collection('profiles').doc(uid));
        await batch.commit();
        await State.currentUser.delete();
        showToast('Conta excluída com sucesso.','success');
      } catch(e) { showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 16. GAMIFICAÇÃO
    // ============================================================
    async function addXP(amount) {
      if(!State.userProfile) return;
      State.userProfile.xp = (State.userProfile.xp||0)+amount;
      await db.collection('profiles').doc(State.currentUser.uid).update({ xp: State.userProfile.xp });
      updateUI();
    }
    async function addCoins(amount) {
      if(!State.userProfile) return;
      State.userProfile.coins = (State.userProfile.coins||0)+amount;
      await db.collection('profiles').doc(State.currentUser.uid).update({ coins: State.userProfile.coins });
      updateUI();
    }

    // ============================================================
    // 17. FEED (com paginação e atualização granular)
    // ============================================================
    let feedPage = 0;
    const FEED_LIMIT = 20;
    async function loadFeed(reset=true) {
      if(reset) { feedPage=0; State.allPosts=[]; }
      try {
        const q = db.collection('posts').orderBy('createdAt','desc').limit(FEED_LIMIT);
        const snap = await q.get();
        const posts = [];
        snap.forEach(d=>posts.push({ id:d.id, ...d.data() }));
        if(reset) State.allPosts = posts;
        else State.allPosts = [...State.allPosts, ...posts];
        applyFeedFilters();
      } catch(e) { console.warn(e); if(reset) { State.allPosts = []; applyFeedFilters(); } }
    }
    function applyFeedFilters() {
      let filtered = [...State.allPosts];
      const search = document.getElementById('feedSearch')?.value?.toLowerCase() || '';
      const genre = E.feedGameFilter?.value || '';
      if(search) filtered = filtered.filter(p => p.content.toLowerCase().includes(search) || p.author_name.toLowerCase().includes(search));
      if(genre) filtered = filtered.filter(p => p.game_tag && gameToGenreMap[p.game_tag] === genre);
      renderFeed(filtered);
    }
    function renderFeed(posts) {
      E.feedContainer.innerHTML = posts.map(post => {
        const isLiked = post.likes && post.likes.includes(State.currentUser?.uid);
        const likeClass = isLiked ? 'liked' : '';
        const canDelete = State.currentUser && (post.author_uid === State.currentUser.uid || State.userProfile?.isAdmin);
        const authorName = post.author_name || 'Anônimo';
        const avatar = getAvatarUrl(authorName, 40);
        return `
          <div class="post-item" data-postid="${post.id}">
            <div class="author" onclick="viewProfile('${post.author_uid||''}')">
              <img src="${avatar}" class="avatar-small" alt="${escapeHTML(authorName)}" />
              <div><div class="name">${escapeHTML(authorName)}</div><div class="nexus">${escapeHTML(post.author_nexus_id||'#----')} • ${escapeHTML(post.game_tag||'Geral')}</div></div>
            </div>
            ${canDelete ? `<div class="post-actions"><button onclick="event.stopPropagation(); deletePost('${post.id}')" title="Excluir post">🗑️</button></div>` : ''}
            <div class="content">${escapeHTML(post.content)}</div>
            ${post.image_url ? `<img src="${escapeHTML(post.image_url)}" class="post-image">` : ''}
            ${post.poll ? renderPoll(post) : ''}
            ${post.clip_url ? `<div style="margin:8px 0;padding:12px;background:var(--bg-primary);border-radius:8px;">🎬 Clip: <a href="${escapeHTML(post.clip_url)}" target="_blank">${escapeHTML(post.clip_title||'Ver clip')}</a></div>` : ''}
            ${post.guide_url ? `<div style="margin:8px 0;padding:12px;background:var(--bg-primary);border-radius:8px;">📚 Guia: <a href="${escapeHTML(post.guide_url)}" target="_blank">${escapeHTML(post.guide_title||'Ver guia')}</a></div>` : ''}
            <div class="footer">
              <span class="like-btn ${likeClass}" onclick="toggleLike('${post.id}')">❤️ <span id="likeCount-${post.id}">${post.likes ? post.likes.length : 0}</span></span>
              <span onclick="toggleComments('${post.id}')">💬 ${post.comments_count||0}</span>
              <span onclick="sharePost('${post.id}')">📤 Compartilhar</span>
              ${State.currentUser && post.author_uid === State.currentUser.uid ? `<span onclick="showLikes('${post.id}')">👀 Ver quem curtiu</span>` : ''}
            </div>
            <div class="comments-section" id="comments-${post.id}" style="display:none;">
              <div id="commentsList-${post.id}"></div>
              <div class="comment-input"><input type="text" placeholder="Comente..." id="commentInput-${post.id}"><button class="btn-neon" style="padding:4px 12px;font-size:12px;" onclick="addComment('${post.id}')">Comentar</button></div>
            </div>
          </div>
        `;
      }).join('');
      posts.forEach(p => { if(p.id) loadComments(p.id); });
    }
    function renderPoll(post) {
      if(!post.poll) return '';
      const total = post.poll.options.reduce((s,o)=>s+(o.votes||0),0) || 1;
      return `<div style="margin:12px 0;padding:12px;background:var(--bg-primary);border-radius:8px;"><p><strong>${escapeHTML(post.poll.question)}</strong></p>${post.poll.options.map((o,i)=>`
        <div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
          <span style="flex:1;">${escapeHTML(o.text)}</span>
          <span style="width:60px;font-size:13px;">${Math.round((o.votes||0)/total*100)}%</span>
          <div style="flex:2;height:6px;background:var(--bg-secondary);border-radius:4px;overflow:hidden;"><div style="height:100%;width:${Math.round((o.votes||0)/total*100)}%;background:var(--accent-color);"></div></div>
          <button class="btn-outline" style="padding:2px 8px;font-size:11px;" onclick="votePoll('${post.id}',${i})">Votar</button>
        </div>
      `).join('')}</div>`;
    }
    window.sharePost = async (postId) => {
      const post = State.allPosts.find(p=>p.id===postId);
      if(!post) return showToast('Post não encontrado.','error');
      const text = `"${post.content}" - ${post.author_name||'Anônimo'}`;
      const url = window.location.href.split('?')[0] + '?post='+postId;
      if(navigator.share) { try{ await navigator.share({title:'Post no Gamer Hub', text, url}); } catch(err){ if(err.name!=='AbortError') showToast('Não foi possível compartilhar.','error'); } }
      else { try{ await navigator.clipboard.writeText(`${text}\n\nVeja mais em: ${url}`); showToast('✅ Conteúdo copiado!','success'); } catch(err){ prompt('Copie o link manualmente:',`${text}\n\n${url}`); } }
    };
    window.toggleLike = async (postId) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      try {
        const ref = db.collection('posts').doc(postId);
        const doc = await ref.get();
        if(!doc.exists) return;
        const data = doc.data();
        const likes = data.likes || [];
        const idx = likes.indexOf(State.currentUser.uid);
        if(idx>-1) likes.splice(idx,1);
        else {
          likes.push(State.currentUser.uid);
          if(data.author_uid && data.author_uid !== State.currentUser.uid) await createNotification(data.author_uid, 'like', State.currentUser.uid, postId);
        }
        await ref.update({ likes });
        const count = document.getElementById(`likeCount-${postId}`);
        if(count) count.textContent = likes.length;
        const btn = document.querySelector(`.post-item[data-postid="${postId}"] .like-btn`);
        if(btn) { btn.classList.toggle('liked', idx===-1); btn.classList.add('pop'); setTimeout(()=>btn.classList.remove('pop'),300); }
        loadFeed();
      } catch(e){}
    };
    window.toggleComments = (postId) => {
      const section = document.getElementById('comments-'+postId);
      if(section) { const hidden = section.style.display==='none'; section.style.display = hidden ? 'block' : 'none'; if(hidden) loadComments(postId); }
    };
    async function loadComments(postId) {
      try {
        const snap = await db.collection('posts').doc(postId).collection('comments').orderBy('timestamp','asc').get();
        const list = document.getElementById('commentsList-'+postId);
        if(!list) return;
        const comments = []; snap.forEach(d=>comments.push({id:d.id,...d.data()}));
        if(!comments.length) { list.innerHTML='<div class="text-muted" style="padding:4px 0;">Nenhum comentário.</div>'; return; }
        list.innerHTML = comments.map(c => `<div class="comment"><span class="c-author">${escapeHTML(c.author_name||'Anônimo')}:</span><span>${escapeHTML(c.content)}</span></div>`).join('');
      } catch(e){}
    }
    window.addComment = async (postId) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const input = document.getElementById('commentInput-'+postId);
      const content = input.value.trim();
      if(!content) return;
      try {
        await db.collection('posts').doc(postId).collection('comments').add({ author_uid: State.currentUser.uid, author_name: State.userProfile.display_name||'Anônimo', content: content.replace(/(swear|badword)/gi,'****'), timestamp: firebase.firestore.FieldValue.serverTimestamp() });
        await db.collection('posts').doc(postId).update({ comments_count: firebase.firestore.FieldValue.increment(1) });
        input.value = '';
        loadComments(postId);
        const postDoc = await db.collection('posts').doc(postId).get();
        if(postDoc.exists && postDoc.data().author_uid && postDoc.data().author_uid !== State.currentUser.uid) await createNotification(postDoc.data().author_uid, 'comment', State.currentUser.uid, postId);
        loadFeed();
        showToast('Comentário enviado!','success');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    window.votePoll = async (postId, optIdx) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      try {
        const ref = db.collection('posts').doc(postId);
        const doc = await ref.get();
        if(!doc.exists) return;
        const data = doc.data();
        if(!data.poll) return;
        if(data.poll.voters && data.poll.voters.includes(State.currentUser.uid)) { showToast('Você já votou nesta enquete.','info'); return; }
        const opts = data.poll.options;
        opts[optIdx].votes = (opts[optIdx].votes||0)+1;
        const voters = data.poll.voters || [];
        voters.push(State.currentUser.uid);
        await ref.update({ 'poll.options': opts, 'poll.voters': voters });
        loadFeed();
        showToast('Voto registrado!','success');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    window.deletePost = async (postId) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(!confirm('Tem certeza que deseja excluir este post?')) return;
      try { await db.collection('posts').doc(postId).delete(); loadFeed(); showToast('Post excluído.','info'); } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    E.postSubmit.addEventListener('click', async ()=>{
      const content = E.postInput.value.trim();
      if(!content) return showToast('Digite algo para publicar.','error');
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const sanitized = content.replace(/(swear|badword|curse)/gi,'****');
      try {
        await db.collection('posts').add({ author_name: State.userProfile.display_name||'Gamer', author_nexus_id: State.userProfile.nexus_id||'#----', author_uid: State.currentUser.uid, content: sanitized, type:'text', likes:[], comments_count:0, game_tag:'Geral', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        E.postInput.value='';
        loadFeed();
        await addXP(20); await addCoins(5);
        showToast('Post publicado!','success');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    document.getElementById('addImageBtn')?.addEventListener('click', ()=>showToast('Upload de imagem desativado. Use um link externo.','info'));
    document.getElementById('addPollBtn')?.addEventListener('click', ()=>{
      const question=prompt('Pergunta da enquete:'); if(!question) return;
      const optsText=prompt('Opções separadas por vírgula (ex: Sim, Não, Talvez):'); if(!optsText) return;
      const options = optsText.split(',').map(t=>({ text: t.trim(), votes:0 }));
      if(options.length<2) { showToast('Mínimo 2 opções.','error'); return; }
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      db.collection('posts').add({ author_name: State.userProfile.display_name||'Gamer', author_nexus_id: State.userProfile.nexus_id||'#----', author_uid: State.currentUser.uid, content: `📊 Enquete: ${question}`, type:'poll', poll:{ question, options, voters:[] }, likes:[], comments_count:0, game_tag:'Geral', createdAt: firebase.firestore.FieldValue.serverTimestamp() }).then(()=>{ loadFeed(); addXP(15); addCoins(3); showToast('Enquete publicada!','success'); }).catch(err=>showToast('Erro: '+err.message,'error'));
    });
    document.getElementById('feedSearch')?.addEventListener('input', applyFeedFilters);
    E.feedGameFilter.addEventListener('change', applyFeedFilters);

    // ============================================================
    // 18. LIKES MODAL
    // ============================================================
    window.showLikes = async (postId) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const post = State.allPosts.find(p=>p.id===postId);
      if(!post) return showToast('Post não encontrado.','error');
      if(post.author_uid !== State.currentUser.uid) return showToast('Apenas o dono do post pode ver quem curtiu.','error');
      const uids = post.likes || [];
      if(!uids.length) { E.likesList.innerHTML='<div class="text-muted">Ninguém curtiu este post ainda.</div>'; }
      else {
        const profs = await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in', uids).get();
        let html='';
        profs.forEach(d=>{
          const data=d.data(); const online=isUserActuallyOnline(data); const name=data.display_name||'Usuário';
          const avatar=getAvatarUrl(name,36);
          html+=`<div class="like-user" onclick="viewProfile('${d.id}'); E.likesModal.classList.remove('active');"><img src="${avatar}" class="avatar-small" alt="${escapeHTML(name)}" /><div><div class="name">${escapeHTML(name)}</div><div class="nexus">${escapeHTML(data.nexus_id||'#----')}</div></div>${online ? '<div class="online-dot"></div>' : ''}</div>`;
        });
        E.likesList.innerHTML = html;
      }
      E.likesModalTitle.textContent = `Quem curtiu (${uids.length})`;
      E.likesModal.classList.add('active');
    };
    E.closeLikes.addEventListener('click', ()=>E.likesModal.classList.remove('active'));
    E.likesModal.addEventListener('click', (e)=>{ if(e.target===E.likesModal) E.likesModal.classList.remove('active'); });

    // ============================================================
    // 19. MATCHMAKING (com listener controlado)
    // ============================================================
    function loadMatchmaking() {
      if(!State.currentUser) return;
      if(State.listeners.matchmaking) { State.listeners.matchmaking(); State.listeners.matchmaking=null; }
      State.listeners.matchmaking = db.collection('profiles').where('is_online','==',true).onSnapshot(snap => {
        const players=[];
        snap.forEach(d=>{
          const data=d.data();
          if(!isUserActuallyOnline(data)) return;
          players.push({ id:d.id, name:data.display_name||'Gamer', nexus:data.nexus_id||'#----', game:(data.favorite_games&&data.favorite_games[0])||'Vários', platform:(data.platforms&&data.platforms[0])||'PC', online:true, isFollowing:State.following.includes(d.id), avatar:data.avatar_url||'' });
        });
        renderMatchmaking(players);
      }, err=>{ console.warn(err); E.matchmakingContainer.innerHTML='<p class="text-muted">Erro ao carregar jogadores online.</p>'; });
    }
    function renderMatchmaking(players) {
      if(!players.length) { E.matchmakingContainer.innerHTML='<p class="text-muted">Nenhum jogador online no momento.</p>'; return; }
      const sorted = [...players].sort((a,b)=> (a.isFollowing && !b.isFollowing) ? -1 : (!a.isFollowing && b.isFollowing) ? 1 : 0);
      E.matchmakingContainer.innerHTML = sorted.map(p => {
        const followText = p.isFollowing ? 'Seguindo' : 'Seguir';
        const avatar = getAvatarUrl(p.name,48);
        return `<div class="player-card"><div class="avatar" style="background-image:url('${avatar}');background-size:cover;cursor:pointer;" onclick="viewProfile('${p.id}')">${p.name[0]}</div><div class="info"><div class="name-row"><span class="name" onclick="viewProfile('${p.id}')">${escapeHTML(p.name)}</span><span class="nexus">${escapeHTML(p.nexus)}</span></div><div class="detail">🎮 ${escapeHTML(p.game)} • ${escapeHTML(p.platform)}</div><div class="status-row"><span class="online-dot"></span><span class="status-text">Online</span></div></div>${p.id !== State.currentUser?.uid ? `<div class="actions"><button class="btn-outline" onclick="followUser('${p.id}')">${followText}</button><button class="btn-outline" onclick="startChatWith('${p.id}')">💬</button></div>` : ''}</div>`;
      }).join('');
      applyMatchmakingFilters();
    }
    function applyMatchmakingFilters() {
      const term = E.mmSearch.value.toLowerCase();
      document.querySelectorAll('.player-card').forEach(card => {
        const name = card.querySelector('.name')?.textContent?.toLowerCase() || '';
        const nexus = card.querySelector('.nexus')?.textContent?.toLowerCase() || '';
        card.style.display = (term==='' || name.includes(term) || nexus.includes(term)) ? 'flex' : 'none';
      });
    }
    E.mmSearch.addEventListener('input', applyMatchmakingFilters);

    // ============================================================
    // 20. CHAT (com paginação e listener único)
    // ============================================================
    async function updateChatStats() {
      if(!State.currentUser) return;
      try {
        const snap = await db.collection('conversations').where('participants','array-contains',State.currentUser.uid).get();
        const convs=[]; snap.forEach(d=>convs.push({id:d.id,...d.data()}));
        let total=convs.length, unread=0, replied=0;
        convs.forEach(c=>{ if(c.unread && c.unread[State.currentUser.uid]) unread += c.unread[State.currentUser.uid]; if(c.lastMessageSender && c.lastMessageSender !== State.currentUser.uid) replied++; });
        E.statTotal.textContent=total; E.statUnread.textContent=unread; E.statReplied.textContent=replied; E.chatBadge.textContent=unread;
      } catch(e){}
    }
    async function loadChatList() {
      if(!State.currentUser) return;
      try {
        const snap = await db.collection('conversations').where('participants','array-contains',State.currentUser.uid).get();
        const convs=[]; snap.forEach(d=>convs.push({id:d.id,...d.data()}));
        convs.sort((a,b)=> (b.lastMessageAt?.toMillis?.()||0) - (a.lastMessageAt?.toMillis?.()||0) );
        if(!convs.length) { E.chatList.innerHTML='<div class="text-muted" style="padding:12px;">Nenhuma conversa ainda. Comece uma pelo matchmaking!</div>'; return; }
        E.chatList.innerHTML = convs.map(c => {
          const otherId = c.participants.find(p=>p!==State.currentUser.uid);
          if(!otherId) return '';
          const otherName = (c.participant_names && c.participant_names[otherId]) || 'Desconhecido';
          const unreadCount = (c.unread && c.unread[State.currentUser.uid]) || 0;
          const avatar = getAvatarUrl(otherName,32);
          const lastMsg = c.lastMessage || 'Nova conversa';
          const lastTime = c.lastMessageAt ? formatTimestamp(c.lastMessageAt) : '';
          return `<div class="chat-item" data-chatid="${c.id}" onclick="selectChat('${c.id}')"><img src="${avatar}" class="chat-avatar" alt="${escapeHTML(otherName)}" /><div style="flex:1;min-width:0;"><div class="chat-name truncate">${escapeHTML(otherName)}</div><div class="chat-last truncate">${escapeHTML(lastMsg)}</div></div>${lastTime ? `<span class="chat-time">${lastTime}</span>` : ''}${unreadCount ? `<span class="badge" style="background:var(--accent-color);flex-shrink:0;">${unreadCount}</span>` : ''}</div>`;
        }).join('');
      } catch(e){ console.warn(e); E.chatList.innerHTML='<div class="text-muted" style="padding:12px;">Erro ao carregar conversas. <button class="btn-outline" style="padding:4px 12px;font-size:12px;margin-top:8px;" onclick="loadChatList()">Tentar novamente</button></div>'; }
    }
    window.selectChat = async (chatId) => {
      State.currentChatId = chatId;
      E.chatInput.disabled = false; E.chatSendBtn.disabled = false;
      E.chatMessages.innerHTML = '<div class="text-muted" style="padding:16px;">Carregando mensagens...</div>';
      E.chatHeader.style.display = 'flex';
      try {
        const doc = await db.collection('conversations').doc(chatId).get();
        if(doc.exists) {
          const data=doc.data();
          const otherId=data.participants.find(p=>p!==State.currentUser.uid);
          const otherName=data.participant_names?data.participant_names[otherId]:'Usuário';
          E.chatTitle.textContent = escapeHTML(otherName||'Chat');
        }
      } catch(e){ E.chatTitle.textContent='Chat'; }
      if(State.listeners.chat) { State.listeners.chat(); State.listeners.chat=null; }
      const q = db.collection('conversations').doc(chatId).collection('messages').orderBy('timestamp','asc');
      State.listeners.chat = q.onSnapshot(snap => {
        const msgs=[]; snap.forEach(d=>msgs.push({id:d.id,...d.data()}));
        renderChatMessages(msgs);
        db.collection('conversations').doc(chatId).update({ [`unread.${State.currentUser.uid}`]: 0 });
        loadChatList(); updateChatStats();
      });
      db.collection('conversations').doc(chatId).onSnapshot(doc => {
        if(doc.exists) {
          const data=doc.data();
          if(data.typing && data.typing !== State.currentUser.uid) { E.chatTyping.style.display='block'; clearTimeout(window.typingTimeout); window.typingTimeout=setTimeout(()=>E.chatTyping.style.display='none',3000); }
          else E.chatTyping.style.display='none';
        }
      });
      if(window.innerWidth <= 768) { document.querySelector('.chat-list').classList.add('hidden-mobile'); E.chatWindow.classList.add('full-mobile'); }
    };
    function renderChatMessages(messages) {
      if(!messages.length) { E.chatMessages.innerHTML='<div class="text-muted" style="padding:16px;">Nenhuma mensagem ainda. Seja o primeiro!</div>'; return; }
      let html='', lastDate=null;
      messages.forEach((m,idx)=>{
        const isMine = m.sender === State.currentUser.uid;
        const authorName = isMine ? 'Você' : (m.senderName || 'Usuário');
        const initials = isMine ? 'V' : getInitials(m.senderName||'Usuário');
        const timeStr = formatMessageTime(m.timestamp);
        const dateStr = formatMessageDate(m.timestamp);
        if(dateStr && dateStr!==lastDate) { lastDate=dateStr; html+=`<div class="chat-date-divider">──────── ${dateStr} ────────</div>`; }
        html+=`<div class="chat-message ${isMine ? 'mine' : ''}"><div class="msg-header"><span class="msg-avatar" style="background:${getColorFromName(m.senderName||'U')};">${initials}</span><span class="msg-author">${escapeHTML(authorName)}</span><span class="msg-time">${timeStr}</span></div><div class="msg-content">${escapeHTML(m.content)}</div></div>`;
      });
      E.chatMessages.innerHTML = html;
      E.chatMessages.scrollTop = E.chatMessages.scrollHeight;
    }
    E.chatInput.addEventListener('input', async ()=>{
      if(!State.currentChatId) return;
      await db.collection('conversations').doc(State.currentChatId).update({ typing: State.currentUser.uid });
      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(async ()=>{ await db.collection('conversations').doc(State.currentChatId).update({ typing: null }); },2000);
    });
    E.chatSendBtn.addEventListener('click', async ()=>{
      if(!State.currentChatId || !E.chatInput.value.trim()) return;
      const content = E.chatInput.value.trim();
      E.chatInput.value='';
      try {
        await db.collection('conversations').doc(State.currentChatId).collection('messages').add({ sender: State.currentUser.uid, senderName: State.userProfile.display_name||'Gamer', content, timestamp: firebase.firestore.FieldValue.serverTimestamp(), seen: false });
        await db.collection('conversations').doc(State.currentChatId).update({ lastMessage: content, lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(), lastMessageSender: State.currentUser.uid, [`unread.${State.currentUser.uid}`]: 0 });
        const doc = await db.collection('conversations').doc(State.currentChatId).get();
        if(doc.exists) {
          const data=doc.data();
          const otherId=data.participants.find(p=>p!==State.currentUser.uid);
          if(otherId) {
            await db.collection('conversations').doc(State.currentChatId).update({ [`unread.${otherId}`]: firebase.firestore.FieldValue.increment(1) });
            await createNotification(otherId, 'message', State.currentUser.uid, null);
          }
        }
        loadChatList(); updateChatStats();
      } catch(e){ showToast('Erro ao enviar: '+e.message,'error'); }
    });
    E.chatInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') E.chatSendBtn.click(); });
    E.deleteChatBtn.addEventListener('click', async ()=>{
      if(!State.currentChatId) return;
      if(!confirm('Excluir esta conversa? As mensagens permanecem no banco de dados.')) return;
      try {
        await db.collection('conversations').doc(State.currentChatId).delete();
        State.currentChatId=null; E.chatHeader.style.display='none'; E.chatMessages.innerHTML='<div class="text-muted" style="padding:16px;">Conversa excluída. Selecione outra.</div>'; E.chatInput.disabled=true; E.chatSendBtn.disabled=true;
        if(State.listeners.chat) { State.listeners.chat(); State.listeners.chat=null; }
        loadChatList(); updateChatStats();
        if(window.innerWidth<=768) { document.querySelector('.chat-list').classList.remove('hidden-mobile'); E.chatWindow.classList.remove('full-mobile'); }
        showToast('Conversa excluída.','info');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    E.chatBackBtn.addEventListener('click', ()=>{
      if(window.innerWidth<=768) {
        document.querySelector('.chat-list').classList.remove('hidden-mobile');
        E.chatWindow.classList.remove('full-mobile');
        if(State.listeners.chat) { State.listeners.chat(); State.listeners.chat=null; }
        E.chatHeader.style.display='none';
        E.chatMessages.innerHTML='<div class="text-muted" style="padding:16px;">Selecione uma conversa</div>';
        E.chatInput.disabled=true; E.chatSendBtn.disabled=true;
      }
    });
    window.startChatWith = async (friendId) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      try {
        const q = await db.collection('conversations').where('participants','array-contains',State.currentUser.uid).get();
        let existing=null;
        q.forEach(d=>{ if(d.data().participants.includes(friendId)) existing=d.id; });
        if(existing) { selectChat(existing); navigateTo('chat'); return; }
        const friendDoc = await db.collection('profiles').doc(friendId).get();
        const friendData = friendDoc.exists ? friendDoc.data() : { display_name: 'Amigo' };
        const newConv = { participants: [State.currentUser.uid, friendId], participant_names: { [State.currentUser.uid]: State.userProfile.display_name||'Gamer', [friendId]: friendData.display_name||'Amigo' }, participant_avatars: { [State.currentUser.uid]: '', [friendId]: '' }, unread: { [State.currentUser.uid]: 0, [friendId]: 0 }, lastMessage: '', lastMessageSender: null, lastMessageAt: firebase.firestore.FieldValue.serverTimestamp() };
        const docRef = await db.collection('conversations').add(newConv);
        selectChat(docRef.id);
        navigateTo('chat');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };

    // ============================================================
    // 21. TOURNAMENTS (mantido)
    // ============================================================
    async function loadTournaments() {
      try {
        const snap = await db.collection('tournaments').orderBy('startDate','asc').get();
        const t=[]; snap.forEach(d=>t.push({id:d.id,...d.data()}));
        State.allTournaments=t;
        renderTournaments(t);
      } catch(e){ console.warn(e); const mock=[{id:'t1',name:'CS2 Open',game:'CS2',format:'Dupla Eliminação',prize:'500 moedas',participants:8,max_participants:16,status:'Aberto',organizer_name:'Admin',participantsList:[]},{id:'t2',name:'Valorant Cup',game:'Valorant',format:'Todos contra todos',prize:'1000 moedas',participants:12,max_participants:16,status:'Em andamento',organizer_name:'GamerPro',participantsList:[]}]; State.allTournaments=mock; renderTournaments(mock); }
    }
    function renderTournaments(tournaments) {
      E.tournamentContainer.innerHTML = tournaments.map(t => `
        <div class="tournament-card">
          ${State.userProfile?.isAdmin ? `<div class="t-actions"><button class="btn-danger" style="padding:2px 8px;font-size:11px;" onclick="deleteTournament('${t.id}')">🗑️</button></div>` : ''}
          <div class="t-header"><div class="t-title">${escapeHTML(t.name)}</div><span class="badge-item" style="background:${t.status==='Aberto' ? 'var(--success)' : 'var(--info)'};">${escapeHTML(t.status)}</span></div>
          <div class="t-meta">🎮 ${escapeHTML(t.game)} • ${escapeHTML(t.format)} • 🏆 ${escapeHTML(t.prize||t.prize_coins||'Sem prêmio')}</div>
          <div class="t-meta">👥 ${t.participants||0}/${t.max_participants||16} registrados • Organizador: ${escapeHTML(t.organizer_name||t.organizer||'Desconhecido')}</div>
          ${t.status==='Aberto' ? `<button class="btn-outline mt-2" onclick="joinTournament('${t.id}')">Registrar</button>` : ''}
        </div>
      `).join('');
    }
    window.joinTournament = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      try {
        const ref=db.collection('tournaments').doc(id);
        const doc=await ref.get();
        if(!doc.exists) return showToast('Torneio não encontrado.','error');
        const data=doc.data();
        if((data.participants||0) >= data.max_participants) return showToast('Torneio lotado!','error');
        if(!data.participantsList) await ref.update({ participantsList: [] });
        await ref.update({ participants: (data.participants||0)+1, participantsList: firebase.firestore.FieldValue.arrayUnion(State.currentUser.uid) });
        showToast('Inscrito com sucesso!','success');
        loadTournaments();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    window.deleteTournament = async (id) => {
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      if(!confirm('Excluir este torneio?')) return;
      try { await db.collection('tournaments').doc(id).delete(); loadTournaments(); showToast('Torneio excluído.','info'); } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    E.createTournament.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(!State.userProfile.isAdmin) return showToast('Apenas administradores podem criar torneios.','error');
      const name=prompt('Nome do torneio:'); if(!name) return;
      const game=prompt('Jogo:'); const format=prompt('Formato:'); const prize=prompt('Prêmio:'); const max=parseInt(prompt('Máximo de participantes:'))||16;
      try {
        await db.collection('tournaments').add({ name, game, format, prize, max_participants: max, participants: 0, status: 'Aberto', organizer_name: State.userProfile.display_name||'Anônimo', organizer_nexus_id: State.userProfile.nexus_id||'#----', participantsList: [], startDate: firebase.firestore.FieldValue.serverTimestamp(), createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast('Torneio criado!','success');
        loadTournaments();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 22. NOTIFICAÇÕES (com listener e cache)
    // ============================================================
    async function createNotification(userId, type, fromUserId, postId=null) {
      try { await db.collection('notifications').add({ userId, type, fromUserId, postId, read: false, timestamp: firebase.firestore.FieldValue.serverTimestamp() }); } catch(e){}
    }
    function listenNotifications() {
      if(!State.currentUser) return;
      if(State.listeners.notifications) { State.listeners.notifications(); State.listeners.notifications=null; }
      State.listeners.notifications = db.collection('notifications').where('userId','==',State.currentUser.uid).orderBy('timestamp','desc').onSnapshot(async snap => {
        let unread=0;
        const notifs=[], fromIds=[];
        snap.forEach(d=>{ const data=d.data(); if(!data.read) unread++; if(data.fromUserId) fromIds.push(data.fromUserId); notifs.push({id:d.id,...data}); });
        State.notificationUnread = unread;
        E.notifCount.textContent = unread;
        const fromNames={};
        if(fromIds.length) {
          try {
            const unique=[...new Set(fromIds)].slice(0,10);
            const profs = await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in', unique).get();
            profs.forEach(d=>{ fromNames[d.id] = d.data().display_name||'Usuário'; });
          } catch(e){}
        }
        State.notificationData = notifs.map(n => ({ ...n, fromName: fromNames[n.fromUserId] || 'Alguém' }));
        if(document.getElementById('page-notifications').classList.contains('active')) renderNotifications(State.notificationData);
        updateHome();
      }, err=>{ console.warn(err); if(!State.notificationData.length) renderNotifications([]); });
    }
    function renderNotifications(notifs) {
      if(!notifs || !notifs.length) { E.notificationsContainer.innerHTML='<p class="text-muted">Nenhuma notificação ainda.</p>'; return; }
      const grouped={};
      notifs.forEach(n=>{
        let key='Hoje';
        if(n.timestamp) {
          let d = n.timestamp.toMillis ? new Date(n.timestamp.toMillis()) : new Date(n.timestamp);
          if(!isNaN(d.getTime())) {
            const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
            const msgDate=new Date(d.getFullYear(),d.getMonth(),d.getDate());
            const diff=Math.floor((today-msgDate)/(1000*60*60*24));
            if(diff===0) key='Hoje';
            else if(diff===1) key='Ontem';
            else if(diff<=7) key=`${diff} dias atrás`;
            else key=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
          }
        }
        if(!grouped[key]) grouped[key]=[];
        grouped[key].push(n);
      });
      let html='';
      for(const [date, items] of Object.entries(grouped)) {
        html += `<div class="text-muted" style="margin-top:12px;margin-bottom:8px;font-weight:600;">${date}</div>`;
        items.forEach(n=>{
          const timeStr = n.timestamp ? formatTimestamp(n.timestamp) : 'Agora';
          let icon='🔔', actionText='';
          if(n.type==='like') { icon='❤️'; actionText='curtiu seu post'; }
          else if(n.type==='comment') { icon='💬'; actionText='comentou no seu post'; }
          else if(n.type==='follow') { icon='👥'; actionText='começou a seguir você'; }
          else if(n.type==='message') { icon='💬'; actionText='enviou uma mensagem'; }
          else { actionText='interagiu com você'; }
          const avatar = getAvatarUrl(n.fromName||'U',24);
          html += `<div class="neon-card mb-4" style="padding:12px 16px;border-left:4px solid ${n.read ? 'transparent' : 'var(--accent-color)'};display:flex;align-items:center;gap:12px;"><img src="${avatar}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="${escapeHTML(n.fromName)}" /><div style="flex:1;"><div><strong>${escapeHTML(n.fromName)}</strong> ${actionText}</div><div class="text-sm text-muted">${timeStr}</div></div>${!n.read ? `<button class="btn-outline" style="padding:2px 8px;font-size:11px;flex-shrink:0;" onclick="markNotificationRead('${n.id}')">Marcar lida</button>` : ''}</div>`;
        });
      }
      E.notificationsContainer.innerHTML = html;
    }
    window.markNotificationRead = async (id) => {
      await db.collection('notifications').doc(id).update({ read: true });
      const idx = State.notificationData.findIndex(n=>n.id===id);
      if(idx>-1) { State.notificationData[idx].read = true; State.notificationUnread = Math.max(0, State.notificationUnread-1); E.notifCount.textContent = State.notificationUnread; renderNotifications(State.notificationData); updateHome(); }
    };
    E.markAllRead.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const unread = State.notificationData.filter(n=>!n.read);
      if(!unread.length) return showToast('Nenhuma notificação não lida.','info');
      const batch=db.batch();
      unread.forEach(n=>{ batch.update(db.collection('notifications').doc(n.id), { read: true }); n.read=true; });
      await batch.commit();
      State.notificationUnread=0; E.notifCount.textContent=0; renderNotifications(State.notificationData); updateHome(); showToast('Todas as notificações marcadas como lidas.','success');
    });

    // ============================================================
    // 23. FRIENDS
    // ============================================================
    async function loadFriends() {
      if(!State.currentUser) return;
      try {
        const f1 = await db.collection('follows').where('follower','==',State.currentUser.uid).get();
        const f2 = await db.collection('follows').where('followed','==',State.currentUser.uid).get();
        const following = f1.docs.map(d=>d.data().followed);
        const followers = f2.docs.map(d=>d.data().follower);
        const mutual = following.filter(id=>followers.includes(id));
        if(!mutual.length) { E.friendsContainer.innerHTML='<p class="text-muted">Você não tem amigos mútuos ainda. Siga mais pessoas e seja seguido de volta!</p>'; return; }
        const profs = await db.collection('profiles').where(firebase.firestore.FieldPath.documentId(),'in', mutual).get();
        let html='';
        profs.forEach(d=>{
          const data=d.data(); const online=isUserActuallyOnline(data); const name=data.display_name||'Gamer';
          const avatar=getAvatarUrl(name,48);
          html+=`<div class="friend-card"><div class="avatar" style="background-image:url('${avatar}');background-size:cover;cursor:pointer;" onclick="viewProfile('${d.id}')">${name[0]}</div><div class="info"><div class="name" onclick="viewProfile('${d.id}')">${escapeHTML(name)} <span class="text-muted">${escapeHTML(data.nexus_id||'#----')}</span></div><div class="detail">🎮 ${escapeHTML((data.favorite_games&&data.favorite_games[0])||'Vários')}</div></div><div style="width:10px;height:10px;border-radius:50%;background:${online ? 'var(--success)' : 'var(--offline-status)'};"></div><button class="btn-outline" style="padding:4px 12px;font-size:12px;" onclick="startChatWith('${d.id}')">💬</button></div>`;
        });
        E.friendsContainer.innerHTML = html;
      } catch(e){ E.friendsContainer.innerHTML='<p class="text-muted">Erro ao carregar amigos.</p>'; }
    }

    // ============================================================
    // 24. SHOP
    // ============================================================
    function loadShop() {
      if(!State.currentUser || !State.userProfile) { E.shopContainer.innerHTML='<p class="text-muted">Faça login para ver a loja.</p>'; return; }
      const coins = State.userProfile.coins||0;
      let html='';
      SHOP_PALETTES.forEach(p=>{
        const owned = State.purchasedPalettes.includes(p.id);
        const canBuy = !owned && coins >= p.price;
        const previewColor = p.id==='default' ? 'var(--accent-color)' : `var(--${p.id}-color, var(--accent-color))`;
        html+=`<div class="shop-item"><div class="palette-preview" style="background:${previewColor};"></div><h4>${escapeHTML(p.name)}</h4><p class="price">${p.free ? 'Grátis' : p.price+' moedas'}</p>${owned ? '<span class="owned">✅ Desbloqueado</span>' : `<button class="btn-neon btn-buy" onclick="buyPalette('${p.id}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? `Comprar (${p.price} moedas)` : 'Moedas insuficientes'}</button>`}</div>`;
      });
      E.shopContainer.innerHTML = html;
    }
    window.buyPalette = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const p = SHOP_PALETTES.find(p=>p.id===id);
      if(!p) return;
      if(State.purchasedPalettes.includes(id)) return showToast('Você já possui esta paleta.','info');
      if(State.userProfile.coins < p.price) return showToast('Moedas insuficientes!','error');
      try {
        await db.collection('profiles').doc(State.currentUser.uid).update({ coins: State.userProfile.coins - p.price, purchased_palettes: firebase.firestore.FieldValue.arrayUnion(id) });
        State.userProfile.coins -= p.price;
        State.purchasedPalettes.push(id);
        updateUI(); loadShop(); applyPalette(id);
        showToast(`Paleta "${p.name}" comprada!`,'success');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    function applyPalette(id) {
      document.documentElement.removeAttribute('data-palette');
      if(id!=='default') document.documentElement.setAttribute('data-palette', id);
      localStorage.setItem('selectedPalette', id);
    }

    // ============================================================
    // 25. BADGES & MISSIONS
    // ============================================================
    async function loadBadges() {
      try {
        const snap = await db.collection('badges').get();
        const b=[]; snap.forEach(d=>b.push({id:d.id,...d.data()}));
        if(!b.length) {
          const sample=[{name:'Iniciante',description:'Primeiro login',icon:'🌟',rarity:'Comum',xp_reward:10},{name:'Comunicativo',description:'Primeiro post',icon:'💬',rarity:'Comum',xp_reward:15},{name:'Lendário',description:'100 posts',icon:'👑',rarity:'Lendário',xp_reward:100}];
          for(const s of sample) await db.collection('badges').add(s);
          loadBadges(); return;
        }
        State.allBadges=b;
        E.badgesContainer.innerHTML = b.map(b => `<div class="badge-item ${b.rarity==='Lendário' ? 'legendary' : ''}">${escapeHTML(b.icon||'🏅')} ${escapeHTML(b.name)} (${escapeHTML(b.rarity)}) – ${b.xp_reward||0} XP</div>`).join('');
      } catch(e){ E.badgesContainer.innerHTML='<p class="text-muted">Nenhuma conquista disponível.</p>'; }
    }
    async function loadMissions() {
      try {
        const snap = await db.collection('missions').get();
        const m=[]; snap.forEach(d=>m.push({id:d.id,...d.data()}));
        if(!m.length) {
          const sample=[{title:'Login Diário',description:'Faça login na plataforma',type:'daily',coin_reward:5,xp_reward:10,target_count:1,action_type:'login'},{title:'Publicar Post',description:'Crie um post',type:'daily',coin_reward:10,xp_reward:20,target_count:1,action_type:'post'},{title:'Seguir 3 Pessoas',description:'Siga 3 usuários',type:'weekly',coin_reward:30,xp_reward:50,target_count:3,action_type:'follow'}];
          for(const s of sample) await db.collection('missions').add(s);
          loadMissions(); return;
        }
        State.allMissions=m;
        E.missionsContainer.innerHTML = m.map(m => `
          <div class="neon-card mb-4">
            ${State.userProfile?.isAdmin ? `<div style="float:right;"><button class="btn-danger" style="padding:2px 8px;font-size:11px;" onclick="deleteMission('${m.id}')">🗑️</button></div>` : ''}
            <h4>${escapeHTML(m.title)} <span class="badge-item" style="background:${m.type==='daily' ? 'var(--info)' : 'var(--warning)'};">${escapeHTML(m.type)}</span></h4>
            <p class="text-muted">${escapeHTML(m.description)}</p>
            <div class="text-sm">🎯 Alvo: ${m.target_count} • 🪙 ${m.coin_reward||0} moedas • ⚡ ${m.xp_reward||0} XP</div>
            <button class="btn-outline mt-2" onclick="claimMission('${m.id}')">Reivindicar</button>
          </div>
        `).join('');
      } catch(e){ E.missionsContainer.innerHTML='<p class="text-muted">Nenhum desafio disponível.</p>'; }
    }
    window.claimMission = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const m = State.allMissions.find(m=>m.id===id);
      if(!m) return showToast('Desafio não encontrado.','error');
      try {
        await db.collection('profiles').doc(State.currentUser.uid).update({ coins: firebase.firestore.FieldValue.increment(m.coin_reward||0), xp: firebase.firestore.FieldValue.increment(m.xp_reward||0) });
        State.userProfile.coins = (State.userProfile.coins||0)+(m.coin_reward||0);
        State.userProfile.xp = (State.userProfile.xp||0)+(m.xp_reward||0);
        updateUI();
        showToast(`Recompensa recebida! +${m.coin_reward||0} moedas, +${m.xp_reward||0} XP`,'success');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    window.deleteMission = async (id) => {
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      if(!confirm('Excluir este desafio?')) return;
      try { await db.collection('missions').doc(id).delete(); loadMissions(); showToast('Desafio excluído.','info'); } catch(e){ showToast('Erro: '+e.message,'error'); }
    };

    // ============================================================
    // 26. GAMES (com cache e capas)
    // ============================================================
    async function fetchGameCover(gameName) {
      // Simulação – substituir por API real
      return { cover_url: `https://via.placeholder.com/300x400/1e293b/ffffff?text=${encodeURIComponent(gameName)}`, background_url: `https://via.placeholder.com/1200x600/1e293b/ffffff?text=${encodeURIComponent(gameName)}`, description: `Jogo popular: ${gameName}`, rating: (Math.random()*2+3).toFixed(1), platforms: ['PC','PlayStation','Xbox'], genres: ['Ação','Aventura'], external_id: `ext_${gameName.replace(/\s/g,'_')}`, source: 'demo' };
    }
    async function loadGames() {
      const allCategories = { ...GAME_RANKING_DATA, ...GLOBAL_RANKINGS };
      const games = [];
      for(const [category, list] of Object.entries(allCategories)) {
        list.forEach(name => games.push({ name, genre: category, icon:'🎮' }));
      }
      State.allGames = games;
      const categories = Object.keys(allCategories);
      E.gameGenreFilter.innerHTML = `<option value="">Todas categorias</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join('');
      const genres = Object.keys(GAME_RANKING_DATA);
      E.feedGameFilter.innerHTML = `<option value="">Todos os gêneros</option>` + genres.map(g => `<option value="${g}">${g}</option>`).join('');
      // Buscar capas do Firestore
      const gameDocs = await db.collection('games').get();
      const coverMap = {};
      gameDocs.forEach(doc => { const data=doc.data(); if(data.name && data.cover_url) coverMap[data.name.toLowerCase()] = data.cover_url; });
      renderGames(games, coverMap);
    }
    function renderGames(games, coverMap={}) {
      const filter = E.gameGenreFilter.value;
      const filtered = filter ? games.filter(g=>g.genre===filter) : games;
      if(!filtered.length) { E.gamesContainer.innerHTML='<p class="text-muted">Nenhum jogo encontrado para esta categoria.</p>'; return; }
      E.gamesContainer.innerHTML = filtered.slice(0,30).map(g => {
        const cover = coverMap[g.name.toLowerCase()] || `https://via.placeholder.com/300x400/1e293b/ffffff?text=${encodeURIComponent(g.name)}`;
        return `<div class="neon-card" style="cursor:pointer;overflow:hidden;" onclick="showGameSummary('${escapeHTML(g.name)}','${escapeHTML(g.genre)}')"><img src="${cover}" alt="${escapeHTML(g.name)}" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:8px;background:var(--bg-primary);" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/1e293b/ffffff?text=Game'"><h4 style="text-align:center;">${escapeHTML(g.name)}</h4><p class="text-muted" style="text-align:center;">${escapeHTML(g.genre||'Geral')}</p></div>`;
      }).join('');
    }
    window.showGameSummary = function(name, genre) {
      alert(`🎮 ${name}\n\nGênero: ${genre}\n\n${name} é um jogo do gênero ${genre}. Oferece uma experiência envolvente com mecânicas interessantes e uma comunidade ativa.`);
    };
    E.gameGenreFilter.addEventListener('change', loadGames);

    // ============================================================
    // 27. RANKINGS
    // ============================================================
    async function loadRankings() {
      try {
        const snap = await db.collection('profiles').orderBy('xp','desc').limit(20).get();
        const users=[]; snap.forEach(d=>users.push({id:d.id,...d.data()}));
        E.rankingsContainer.innerHTML = `<div class="neon-card"><table style="width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:1px solid var(--text-secondary);"><th style="padding:8px;text-align:left;">#</th><th style="padding:8px;text-align:left;">Usuário</th><th style="padding:8px;text-align:left;">XP</th><th style="padding:8px;text-align:left;">Nível</th><th style="padding:8px;text-align:left;">Reputação</th></tr></thead><tbody>${users.map((u,i)=>`<tr style="border-bottom:1px solid var(--border-color);cursor:pointer;" onclick="viewProfile('${u.id}')"><td style="padding:8px;">${i+1}</td><td style="padding:8px;">${escapeHTML(u.display_name)} ${escapeHTML(u.nexus_id)}</td><td style="padding:8px;">${u.xp||0}</td><td style="padding:8px;">${Math.floor((u.xp||0)/500)+1}</td><td style="padding:8px;">${u.reputation||0}</td></tr>`).join('')}</tbody></table></div>`;
      } catch(e){ E.rankingsContainer.innerHTML='<p class="text-muted">Erro ao carregar ranking.</p>'; }
    }

    // ============================================================
    // 28. GAME RANKING TABS
    // ============================================================
    function renderRankingTabs() {
      const genres = Object.keys(GAME_RANKING_DATA);
      const globalKeys = Object.keys(GLOBAL_RANKINGS);
      let html='';
      genres.forEach(g=>{ html+=`<button class="tab-btn" data-genre="${g}" onclick="showRanking('${g}')">${g}</button>`; });
      globalKeys.forEach(g=>{ html+=`<button class="tab-btn" data-genre="${g}" onclick="showRanking('${g}')">${g}</button>`; });
      E.rankingTabs.innerHTML = html;
      const first = E.rankingTabs.querySelector('.tab-btn');
      if(first) first.classList.add('active');
      if(genres.length) showRanking(genres[0]);
      else if(globalKeys.length) showRanking(globalKeys[0]);
    }
    window.showRanking = function(genre) {
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      const active = document.querySelector(`.tab-btn[data-genre="${genre}"]`);
      if(active) active.classList.add('active');
      let list=[], title=genre;
      if(GAME_RANKING_DATA[genre]) list=GAME_RANKING_DATA[genre];
      else if(GLOBAL_RANKINGS[genre]) list=GLOBAL_RANKINGS[genre];
      else { E.rankingContent.innerHTML='<p class="text-muted">Dados indisponíveis.</p>'; return; }
      let html=`<h4>${title}</h4><div class="ranking-list">`;
      list.forEach((game,idx)=>{ html+=`<div class="rank-item"><span class="pos">${idx+1}</span><span class="name">${escapeHTML(game)}</span></div>`; });
      html+='</div>';
      E.rankingContent.innerHTML = html;
    };

    // ============================================================
    // 29. GROUPS
    // ============================================================
    async function loadGroups() {
      try {
        const snap = await db.collection('groups').get();
        const g=[]; snap.forEach(d=>g.push({id:d.id,...d.data()}));
        State.allGroups=g;
        E.groupsContainer.innerHTML = g.map(gr => `
          <div class="neon-card mb-4">
            ${(gr.owner === State.currentUser?.uid || State.userProfile?.isAdmin) ? `<div style="float:right;"><button class="btn-danger" style="padding:2px 8px;font-size:11px;" onclick="deleteGroup('${gr.id}')">🗑️</button></div>` : ''}
            <h4>${escapeHTML(gr.name)}</h4>
            <p class="text-muted">${escapeHTML(gr.description||'')}</p>
            <div class="text-sm">👥 ${gr.members ? gr.members.length : 0} membros • Criado por ${escapeHTML(gr.owner_name||'Anônimo')}</div>
            ${gr.members && gr.members.includes(State.currentUser?.uid) ? `<button class="btn-outline mt-2" onclick="leaveGroup('${gr.id}')">Sair do grupo</button>` : `<button class="btn-neon mt-2" onclick="joinGroup('${gr.id}')">Entrar no grupo</button>`}
          </div>
        `).join('');
      } catch(e){ E.groupsContainer.innerHTML='<p class="text-muted">Nenhum grupo disponível.</p>'; }
    }
    window.joinGroup = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      await db.collection('groups').doc(id).update({ members: firebase.firestore.FieldValue.arrayUnion(State.currentUser.uid) });
      loadGroups(); showToast('Entrou no grupo!','success');
    };
    window.leaveGroup = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      await db.collection('groups').doc(id).update({ members: firebase.firestore.FieldValue.arrayRemove(State.currentUser.uid) });
      loadGroups(); showToast('Saiu do grupo.','info');
    };
    window.deleteGroup = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const gr = State.allGroups.find(g=>g.id===id);
      if(!gr) return;
      if(gr.owner !== State.currentUser.uid && !State.userProfile.isAdmin) return showToast('Apenas o criador pode excluir o grupo.','error');
      if(!confirm('Excluir este grupo?')) return;
      try { await db.collection('groups').doc(id).delete(); loadGroups(); showToast('Grupo excluído.','info'); } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    E.createGroup.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const name=prompt('Nome do grupo:'); if(!name) return;
      const desc=prompt('Descrição:');
      try {
        await db.collection('groups').add({ name, description: desc||'', owner: State.currentUser.uid, owner_name: State.userProfile.display_name||'Anônimo', members: [State.currentUser.uid], createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast('Grupo criado!','success');
        loadGroups();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 30. MAP (com inicialização sob demanda)
    // ============================================================
    function initMap() {
      if(State.mapInitialized) return;
      if(!E.mapDiv) return;
      State.mapInstance = L.map('map').setView([-23.5505,-46.6333],13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'&copy; OpenStreetMap' }).addTo(State.mapInstance);
      State.mapInitialized = true;
      db.collection('profiles').where('is_online','==',true).onSnapshot(snap => {
        State.mapMarkers.forEach(m=>State.mapInstance.removeLayer(m));
        State.mapMarkers = [];
        const nearby=[];
        snap.forEach(d=>{
          const data=d.data();
          if(!isUserActuallyOnline(data)) return;
          if(data.profile_visibility==='private' && d.id !== State.currentUser?.uid) return;
          if(data.location_lat && data.location_lng) {
            const lat=data.location_lat, lng=data.location_lng;
            const marker=L.circleMarker([lat,lng],{ radius:8, color:'#8B5CF6', fillColor:'#8B5CF6', fillOpacity:0.8 }).addTo(State.mapInstance);
            marker.bindPopup(`<b>${escapeHTML(data.display_name||'Gamer')}</b><br>${escapeHTML(data.nexus_id)}`);
            State.mapMarkers.push(marker);
            nearby.push({ id:d.id, name:data.display_name||'Gamer', nexus:data.nexus_id, lat, lng, online:true, game:(data.favorite_games&&data.favorite_games[0])||'Vários', city:data.city||'', state:data.state||'', country:data.country||'', postal_code:data.postal_code||'' });
          }
        });
        if(document.getElementById('page-map').classList.contains('active')) renderNearby(nearby);
      });
    }
    function renderNearby(users) {
      if(!State.currentUser || !State.userProfile) { E.nearbyList.innerHTML='<div class="text-muted">Faça login para ver jogadores próximos.</div>'; return; }
      const current = State.userProfile;
      const currentLat = current.location_lat, currentLng = current.location_lng;
      if(!current.city && !current.state && !current.country && (currentLat===null || currentLng===null)) { E.nearbyList.innerHTML='<div class="text-muted">Atualize sua localização para ver jogadores próximos.</div>'; return; }
      const filtered = users.filter(u=>u.id !== State.currentUser.uid);
      const scored = filtered.map(u => {
        let score=0, label='';
        if(current.postal_code && u.postal_code && current.postal_code===u.postal_code) { score=100; label='Mesmo CEP'; }
        else if(current.city && u.city && current.city===u.city) { score=80; label=`${u.city}, ${u.state||''}`; }
        else if(current.state && u.state && current.state===u.state) { score=60; label=`${u.state}, ${u.country||''}`; }
        else if(current.country && u.country && current.country===u.country) { score=40; label=u.country||''; }
        else if(currentLat!==null && currentLng!==null && u.lat && u.lng) {
          const dist = haversine(currentLat, currentLng, u.lat, u.lng);
          score = Math.max(0, 100 - dist*2);
          label = dist<1 ? '<1 km' : `${dist.toFixed(1)} km`;
        } else { score=0; label='Localização desconhecida'; }
        return { ...u, score, label };
      });
      scored.sort((a,b)=>b.score - a.score);
      const near = scored.filter(u=>u.score>0);
      if(!near.length) { E.nearbyList.innerHTML='<div class="text-muted">Nenhum jogador próximo encontrado.</div>'; return; }
      let html='';
      near.slice(0,20).forEach(u=>{
        const avatar=getAvatarUrl(u.name,32);
        html+=`<div class="nearby-item"><img src="${avatar}" class="avatar-small" alt="${escapeHTML(u.name)}" onclick="viewProfile('${u.id}')" /><div class="info"><div class="name" onclick="viewProfile('${u.id}')">${escapeHTML(u.name)}</div><div class="detail">🎮 ${escapeHTML(u.game)} • ${escapeHTML(u.nexus)}</div><div class="detail">📍 ${escapeHTML(u.label)}</div></div><div class="online-dot"></div><div class="distance">${u.online ? '🟢 Online' : '⚪ Offline'}</div></div>`;
      });
      E.nearbyList.innerHTML = html;
    }
    function haversine(lat1,lon1,lat2,lon2) {
      const R=6371, dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180;
      const a=Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
      return R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }
    E.locateBtn.addEventListener('click', ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(!navigator.geolocation) return showToast('Geolocalização não suportada.','error');
      navigator.geolocation.getCurrentPosition(async (pos)=>{
        const {latitude, longitude} = pos.coords;
        if(State.mapInstance) {
          State.mapInstance.setView([latitude,longitude],15);
          L.circleMarker([latitude,longitude],{ radius:10, color:'#4ade80', fillColor:'#4ade80', fillOpacity:1 }).addTo(State.mapInstance).bindPopup('📍 Você está aqui');
        }
        try {
          const resp=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data=await resp.json();
          const addr=data.address||{};
          const city=addr.city||addr.town||addr.village||'', state=addr.state||'', country=addr.country||'', postal=addr.postcode||'';
          await db.collection('profiles').doc(State.currentUser.uid).update({ location_lat: latitude, location_lng: longitude, city, state, country, postal_code: postal });
          State.userProfile.city=city; State.userProfile.state=state; State.userProfile.country=country; State.userProfile.postal_code=postal; State.userProfile.location_lat=latitude; State.userProfile.location_lng=longitude;
          showToast(`Localização atualizada: ${city}, ${state}`,'success');
        } catch(e){ await db.collection('profiles').doc(State.currentUser.uid).update({ location_lat: latitude, location_lng: longitude }); State.userProfile.location_lat=latitude; State.userProfile.location_lng=longitude; showToast('Localização (coordenadas) salva.','info'); }
      }, ()=>showToast('Não foi possível obter localização.','error'));
    });
    E.nearbyBtn.addEventListener('click', ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(!State.mapInitialized) initMap();
      if(State.mapInstance) {
        State.mapInstance.setView([-23.5505,-46.6333],13);
        showToast('Buscando jogadores próximos...','info');
        db.collection('profiles').where('is_online','==',true).get().then(snap=>{
          const users=[];
          snap.forEach(d=>{
            const data=d.data();
            if(!isUserActuallyOnline(data)) return;
            if(data.profile_visibility==='private' && d.id!==State.currentUser?.uid) return;
            if(data.location_lat && data.location_lng) users.push({ id:d.id, name:data.display_name||'Gamer', nexus:data.nexus_id, lat:data.location_lat, lng:data.location_lng, online:true, game:(data.favorite_games&&data.favorite_games[0])||'Vários', city:data.city||'', state:data.state||'', country:data.country||'', postal_code:data.postal_code||'' });
          });
          renderNearby(users);
        }).catch(e=>console.warn(e));
      }
    });

    // ============================================================
    // 31. ADMIN (com capas)
    // ============================================================
    E.adminCreateBadge.addEventListener('click', async ()=>{
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      const name=E.adminBadgeName.value.trim(), desc=E.adminBadgeDesc.value.trim(), icon=E.adminBadgeIcon.value.trim()||'🏅', rarity=E.adminBadgeRarity.value, xp=parseInt(E.adminBadgeXP.value)||0;
      if(!name) return showToast('Digite um nome.','error');
      try { await db.collection('badges').add({ name, description:desc, icon, rarity, xp_reward:xp, is_active:true }); showToast('Conquista criada!','success'); loadBadges(); E.adminBadgeName.value=E.adminBadgeDesc.value=E.adminBadgeIcon.value=E.adminBadgeXP.value=''; } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    E.adminCreateMission.addEventListener('click', async ()=>{
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      const title=E.adminMissionTitle.value.trim(), desc=E.adminMissionDesc.value.trim(), type=E.adminMissionType.value, coins=parseInt(E.adminMissionCoins.value)||0, xp=parseInt(E.adminMissionXP.value)||0, target=parseInt(E.adminMissionTarget.value)||1;
      if(!title) return showToast('Digite um título.','error');
      try { await db.collection('missions').add({ title, description:desc, type, coin_reward:coins, xp_reward:xp, target_count:target, action_type:'login', is_active:true }); showToast('Desafio criado!','success'); loadMissions(); E.adminMissionTitle.value=E.adminMissionDesc.value=E.adminMissionCoins.value=E.adminMissionXP.value=E.adminMissionTarget.value=''; } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    E.adminAddGame.addEventListener('click', async ()=>{
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      const name=E.adminGameName.value.trim(), genre=E.adminGameGenre.value.trim();
      if(!name) return showToast('Digite o nome do jogo.','error');
      try { await db.collection('games').add({ name, genre, icon:'🎮', updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); showToast('Jogo adicionado!','success'); E.adminGameName.value=E.adminGameGenre.value=''; loadGames(); loadAdminGameList(); } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    async function loadAdminGameList() {
      if(!State.currentUser || !State.userProfile.isAdmin) return;
      try {
        const snap = await db.collection('games').get();
        const games=[]; snap.forEach(d=>games.push({id:d.id,...d.data()}));
        E.adminGameList.innerHTML = games.map(g => `<div class="flex items-center justify-between" style="padding:4px 0;border-bottom:1px solid var(--border-color);"><span>${escapeHTML(g.icon||'🎮')} ${escapeHTML(g.name)} (${escapeHTML(g.genre||'Geral')}) ${g.cover_url ? '🖼️' : ''}</span><div><button class="btn-outline" style="padding:2px 8px;font-size:11px;" onclick="fetchCoverForGame('${g.id}')">🔎 Buscar capa</button><button class="btn-outline" style="padding:2px 8px;font-size:11px;" onclick="deleteGame('${g.id}')">🗑️</button></div></div>`).join('');
      } catch(e){}
    }
    window.deleteGame = async (id) => {
      if(!confirm('Remover este jogo?')) return;
      await db.collection('games').doc(id).delete();
      loadAdminGameList(); loadGames();
    };
    window.fetchCoverForGame = async (id) => {
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      try {
        const doc = await db.collection('games').doc(id).get();
        if(!doc.exists) return showToast('Jogo não encontrado.','error');
        const data=doc.data();
        const coverData = await fetchGameCover(data.name);
        if(coverData && coverData.cover_url) {
          await db.collection('games').doc(id).update({ cover_url: coverData.cover_url, background_url: coverData.background_url, external_id: coverData.external_id, source: coverData.source, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
          showToast(`Capa de "${data.name}" atualizada!`,'success');
          loadAdminGameList(); loadGames();
        } else showToast('Capa não encontrada.','error');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    E.adminFetchCover.addEventListener('click', async ()=>{
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      const name = E.adminGameName.value.trim();
      if(!name) return showToast('Digite o nome do jogo.','error');
      E.adminCoverPreview.style.display='block';
      E.adminCoverPreview.innerHTML='<div class="text-muted">Buscando...</div>';
      try {
        const coverData = await fetchGameCover(name);
        if(coverData && coverData.cover_url) {
          E.adminCoverPreview.innerHTML = `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;"><img src="${coverData.cover_url}" style="max-width:150px;border-radius:8px;" /><div><p><strong>${escapeHTML(name)}</strong></p><p class="text-muted">${escapeHTML(coverData.description||'')}</p><p>⭐ ${coverData.rating||'N/A'}</p><button class="btn-neon" onclick="adminSaveCover('${name}','${coverData.cover_url}','${coverData.background_url||''}')">✅ Usar esta capa</button><button class="btn-outline" onclick="E.adminCoverPreview.style.display='none'">Cancelar</button></div></div>`;
        } else {
          E.adminCoverPreview.innerHTML = `<div class="text-muted">Capa não encontrada. <input type="text" id="manualCoverUrl" placeholder="URL da imagem" style="padding:4px;background:var(--bg-primary);border:1px solid var(--border-color);border-radius:4px;color:var(--text-primary);" /><button class="btn-outline" onclick="adminSaveCoverManual()">Salvar</button></div>`;
        }
      } catch(e){ E.adminCoverPreview.innerHTML=`<div class="text-muted">Erro: ${e.message}</div>`; }
    });
    window.adminSaveCover = async (name, coverUrl, bgUrl) => {
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      try {
        const snap = await db.collection('games').where('name','==',name).get();
        if(snap.empty) {
          await db.collection('games').add({ name, genre: E.adminGameGenre.value.trim()||'Geral', cover_url: coverUrl, background_url: bgUrl, icon:'🎮', updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        } else {
          snap.forEach(d=>db.collection('games').doc(d.id).update({ cover_url: coverUrl, background_url: bgUrl, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }));
        }
        showToast('Capa salva!','success');
        E.adminCoverPreview.style.display='none';
        loadGames(); loadAdminGameList();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    window.adminSaveCoverManual = () => {
      const url = document.getElementById('manualCoverUrl')?.value.trim();
      if(!url) return showToast('Insira uma URL.','error');
      const name = E.adminGameName.value.trim();
      if(!name) return showToast('Nome do jogo não definido.','error');
      adminSaveCover(name, url, '');
    };
    E.adminMigrateCovers.addEventListener('click', async ()=>{
      if(!State.currentUser || !State.userProfile.isAdmin) return showToast('Acesso negado.','error');
      if(!confirm('Iniciar migração automática de capas para todos os jogos? Isso pode demorar.')) return;
      E.adminMigrateProgress.innerHTML = 'Iniciando...';
      try {
        const snap = await db.collection('games').get();
        const games=[]; snap.forEach(d=>games.push({id:d.id,...d.data()}));
        let updated=0;
        for(const game of games) {
          if(!game.cover_url) {
            const coverData = await fetchGameCover(game.name);
            if(coverData && coverData.cover_url) {
              await db.collection('games').doc(game.id).update({ cover_url: coverData.cover_url, background_url: coverData.background_url, external_id: coverData.external_id, source: coverData.source, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
              updated++;
              E.adminMigrateProgress.innerHTML = `Atualizado: ${updated}/${games.length}`;
              await new Promise(r=>setTimeout(r,300));
            }
          }
        }
        E.adminMigrateProgress.innerHTML = `Migração concluída! ${updated} jogos atualizados.`;
        loadGames(); loadAdminGameList();
      } catch(e){ E.adminMigrateProgress.innerHTML = 'Erro: '+e.message; }
    });

    // ============================================================
    // 32. SETTINGS
    // ============================================================
    E.settingsDisplayName.value = State.userProfile?.display_name || '';
    E.settingsBio.value = State.userProfile?.bio || '';
    E.settingsGames.value = State.userProfile?.favorite_games?.join(', ') || '';
    E.settingsSave.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const displayName = E.settingsDisplayName.value.trim();
      const bio = E.settingsBio.value.trim();
      const games = E.settingsGames.value.split(',').map(g=>g.trim()).filter(Boolean);
      try {
        await db.collection('profiles').doc(State.currentUser.uid).update({ display_name: displayName || State.userProfile.display_name, bio: bio || '', favorite_games: games });
        State.userProfile.display_name = displayName || State.userProfile.display_name;
        State.userProfile.bio = bio || '';
        State.userProfile.favorite_games = games;
        updateUI();
        showToast('Perfil atualizado!','success');
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 33. THEME
    // ============================================================
    function updateThemeIcon(theme) { E.themeToggle.textContent = theme==='dark' ? '🌙' : '☀️'; }
    E.themeSelect.addEventListener('change', async ()=>{
      const theme = E.themeSelect.value;
      document.documentElement.setAttribute('data-theme', theme);
      updateThemeIcon(theme);
      if(State.currentUser) { await db.collection('profiles').doc(State.currentUser.uid).update({ theme }); State.userProfile.theme=theme; }
      showToast(`Tema alterado para ${theme==='dark' ? 'escuro' : 'claro'}.`,'info');
    });
    E.themeToggle.addEventListener('click', async ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current==='dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      E.themeSelect.value = next;
      updateThemeIcon(next);
      if(State.currentUser) { await db.collection('profiles').doc(State.currentUser.uid).update({ theme: next }); State.userProfile.theme=next; }
      showToast(`Tema alterado para ${next==='dark' ? 'escuro' : 'claro'}.`,'info');
    });

    // ============================================================
    // 34. MUSIC PLAYER
    // ============================================================
    function initMusicPlayer() {
      const saved = localStorage.getItem('selectedPlaylist');
      if(saved) { E.playlistSelect.value = saved; updateMusicPlaylist(saved); } else updateMusicPlaylist(E.playlistSelect.value);
      E.playlistSelect.addEventListener('change', ()=>updateMusicPlaylist(E.playlistSelect.value));
    }
    function updateMusicPlaylist(id) { E.musicFrame.src = `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`; localStorage.setItem('selectedPlaylist', id); }

    // ============================================================
    // 35. FILTERS
    // ============================================================
    function setupFilters() {
      const genres = Object.keys(GAME_RANKING_DATA);
      E.filterGenre.innerHTML = `<option value="">Todos</option>` + genres.map(g=>`<option value="${g}">${g}</option>`).join('');
      E.filterApply.addEventListener('click', ()=>{
        E.mmSearch.value = E.filterSearch.value.trim();
        applyMatchmakingFilters();
        E.feedGameFilter.value = E.filterGenre.value;
        applyFeedFilters();
        showToast('Filtros aplicados!','success');
        E.filterModal.classList.remove('active');
      });
      E.filterClear.addEventListener('click', ()=>{
        E.filterSearch.value=''; E.filterGenre.value=''; E.filterPlatform.value=''; E.filterDistance.value='';
        E.mmSearch.value=''; E.feedGameFilter.value='';
        applyMatchmakingFilters(); applyFeedFilters();
        showToast('Filtros limpos.','info');
        E.filterModal.classList.remove('active');
      });
      E.mmFilterBtn.addEventListener('click', ()=>E.filterModal.classList.add('active'));
      E.filterModal.addEventListener('click', (e)=>{ if(e.target===E.filterModal) E.filterModal.classList.remove('active'); });
    }

    // ============================================================
    // 36. MINI GAMES
    // ============================================================
    let secretNumber = Math.floor(Math.random()*100)+1, attempts=0;
    if(State.currentUser) {
      db.collection('profiles').doc(State.currentUser.uid).get().then(d=>{ if(d.exists) E.guessRecord.textContent = d.data().guessRecord||0; });
    }
    E.guessBtn.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const guess = parseInt(E.guessInput.value);
      if(isNaN(guess) || guess<1 || guess>100) { E.guessResult.innerHTML='<p class="text-muted">Digite um número entre 1 e 100.</p>'; return; }
      attempts++;
      if(guess===secretNumber) {
        E.guessResult.innerHTML = `<p style="color:var(--success);">🎉 Parabéns! Você acertou em ${attempts} tentativas!</p>`;
        const doc = await db.collection('profiles').doc(State.currentUser.uid).get();
        const record = doc.data().guessRecord||0;
        if(record===0 || attempts<record) {
          await db.collection('profiles').doc(State.currentUser.uid).update({ guessRecord: attempts });
          E.guessRecord.textContent = attempts;
          E.guessResult.innerHTML += `<p style="color:var(--warning);">🏆 Novo recorde!</p>`;
        }
        secretNumber = Math.floor(Math.random()*100)+1; attempts=0; E.guessInput.value='';
      } else if(guess<secretNumber) E.guessResult.innerHTML=`<p>📈 O número é maior que ${guess}.</p>`;
      else E.guessResult.innerHTML=`<p>📉 O número é menor que ${guess}.</p>`;
    });

    // ============================================================
    // 37. LFG
    // ============================================================
    async function loadLfg() {
      try {
        const snap = await db.collection('lfg').orderBy('createdAt','desc').get();
        const lfgs=[]; snap.forEach(d=>lfgs.push({id:d.id,...d.data()}));
        State.allLfg=lfgs;
        if(!lfgs.length) { E.lfgContainer.innerHTML='<p class="text-muted">Nenhum LFG ativo. Crie o seu!</p>'; return; }
        E.lfgContainer.innerHTML = lfgs.map(l => `
          <div class="lfg-card">
            <div class="lfg-header"><div class="lfg-title">${escapeHTML(l.game)}</div><span class="badge-item">${escapeHTML(l.mode||'Casual')}</span>${(l.author_uid===State.currentUser?.uid || State.userProfile?.isAdmin) ? `<button class="btn-danger" style="padding:2px 8px;font-size:11px;" onclick="deleteLfg('${l.id}')">🗑️</button>` : ''}</div>
            <div class="lfg-meta">👥 ${l.slots||1} jogador(es) • ${escapeHTML(l.platform||'PC')} • ${escapeHTML(l.region||'Global')}</div>
            <div class="lfg-meta">🎤 ${l.mic ? 'Microfone' : 'Sem microfone'} • 🕒 ${escapeHTML(l.time||'Flexível')}</div>
            <p class="text-muted">${escapeHTML(l.description||'')}</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;"><button class="btn-neon" onclick="joinLfg('${l.id}')">🎮 Entrar na equipe</button><button class="btn-outline" onclick="viewProfile('${l.author_uid}')">👤 Ver perfil</button></div>
          </div>
        `).join('');
      } catch(e){ E.lfgContainer.innerHTML='<p class="text-muted">Nenhum LFG ativo.</p>'; }
    }
    window.joinLfg = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      try {
        const ref=db.collection('lfg').doc(id);
        const doc=await ref.get();
        if(!doc.exists) return showToast('LFG não encontrado.','error');
        const data=doc.data();
        if((data.current_slots||0) >= data.slots) return showToast('Vagas esgotadas.','error');
        await ref.update({ current_slots: (data.current_slots||0)+1, participants: firebase.firestore.FieldValue.arrayUnion(State.currentUser.uid) });
        showToast('Você entrou no time!','success');
        loadLfg();
        await createAutoLobby(data.game, [data.author_uid, State.currentUser.uid]);
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    window.deleteLfg = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(!confirm('Excluir este LFG?')) return;
      try { await db.collection('lfg').doc(id).delete(); loadLfg(); showToast('LFG excluído.','info'); } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    E.createLfg.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const game=prompt('Jogo:'); if(!game) return;
      const slots=parseInt(prompt('Quantos jogadores? (mínimo 1)'))||1;
      const mode=prompt('Modo (casual/competitivo):')||'Casual';
      const platform=prompt('Plataforma:')||'PC';
      const region=prompt('Região:')||'Global';
      const mic=confirm('Usa microfone?');
      const time=prompt('Horário:')||'Flexível';
      const desc=prompt('Descrição:')||'';
      try {
        await db.collection('lfg').add({ game, slots, mode, platform, region, mic, time, description:desc, author_uid:State.currentUser.uid, author_name:State.userProfile.display_name||'Gamer', current_slots:1, participants:[State.currentUser.uid], createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast('LFG criado!','success');
        loadLfg();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 38. SQUADS
    // ============================================================
    async function loadSquads() {
      try {
        const snap = await db.collection('squads').get();
        const squads=[]; snap.forEach(d=>squads.push({id:d.id,...d.data()}));
        State.allSquads=squads;
        if(!squads.length) { E.squadsContainer.innerHTML='<p class="text-muted">Nenhum squad. Crie o seu!</p>'; return; }
        E.squadsContainer.innerHTML = squads.map(s => {
          const isMember = s.members && s.members.includes(State.currentUser?.uid);
          const canDelete = s.leader === State.currentUser?.uid || State.userProfile?.isAdmin;
          return `<div class="squad-card"><div class="squad-header"><div class="squad-logo">${escapeHTML(s.logo||'⚔️')}</div><div><div class="squad-name">${escapeHTML(s.name)}</div><div class="text-muted">Líder: ${escapeHTML(s.leader_name||'Anônimo')}</div></div>${canDelete ? `<button class="btn-danger" style="margin-left:auto;padding:2px 8px;font-size:11px;" onclick="deleteSquad('${s.id}')">🗑️</button>` : ''}</div><p class="text-muted">${escapeHTML(s.description||'')}</p><div class="text-sm">👥 ${s.members ? s.members.length : 0} membros • ${s.games ? s.games.join(', ') : 'Vários jogos'}</div>${isMember ? `<button class="btn-outline mt-2" onclick="leaveSquad('${s.id}')">Sair do Squad</button>` : `<button class="btn-neon mt-2" onclick="joinSquad('${s.id}')">Entrar no Squad</button>`}</div>`;
        }).join('');
      } catch(e){ E.squadsContainer.innerHTML='<p class="text-muted">Nenhum squad disponível.</p>'; }
    }
    window.joinSquad = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      await db.collection('squads').doc(id).update({ members: firebase.firestore.FieldValue.arrayUnion(State.currentUser.uid) });
      loadSquads(); showToast('Entrou no Squad!','success');
    };
    window.leaveSquad = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      await db.collection('squads').doc(id).update({ members: firebase.firestore.FieldValue.arrayRemove(State.currentUser.uid) });
      loadSquads(); showToast('Saiu do Squad.','info');
    };
    window.deleteSquad = async (id) => {
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(!confirm('Excluir este Squad?')) return;
      try { await db.collection('squads').doc(id).delete(); loadSquads(); showToast('Squad excluído.','info'); } catch(e){ showToast('Erro: '+e.message,'error'); }
    };
    E.createSquad.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const name=prompt('Nome do Squad:'); if(!name) return;
      const desc=prompt('Descrição:');
      const games=prompt('Jogos (separados por vírgula):')?.split(',').map(g=>g.trim()).filter(Boolean)||[];
      try {
        await db.collection('squads').add({ name, description:desc||'', games, leader:State.currentUser.uid, leader_name:State.userProfile.display_name||'Anônimo', members:[State.currentUser.uid], logo:'⚔️', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast('Squad criado!','success');
        loadSquads();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 39. LOBBY
    // ============================================================
    function updateLobby() {
      if(!State.currentUser) return;
      if(State.listeners.lobby) { State.listeners.lobby(); State.listeners.lobby=null; }
      State.listeners.lobby = db.collection('lobbies').where('participants','array-contains',State.currentUser.uid).onSnapshot(snap => {
        const lobbies=[]; snap.forEach(d=>lobbies.push({id:d.id,...d.data()}));
        if(lobbies.length) {
          const lobby=lobbies[0];
          State.currentLobbyId = lobby.id;
          renderLobby(lobby);
        } else { E.lobbyPlayers.innerHTML='<p class="text-muted">Nenhum lobby ativo. Crie um!</p>'; }
      });
    }
    function renderLobby(lobby) {
      const participants = lobby.participants||[];
      const ready = lobby.ready||[];
      let html='<div style="display:flex;flex-direction:column;gap:8px;">';
      participants.forEach(uid => {
        const isReady = ready.includes(uid);
        const name = lobby.participant_names?.[uid] || 'Usuário';
        html += `<div class="lobby-player"><div class="lobby-avatar">${name[0]}</div><div class="lobby-name">${escapeHTML(name)}</div><div class="lobby-status ${isReady ? 'ready' : 'not-ready'}">${isReady ? '✅ Pronto' : '⏳ Aguardando'}</div>${uid===State.currentUser?.uid ? `<button class="btn-outline" style="padding:2px 8px;font-size:11px;" onclick="toggleReady()">${isReady ? 'Cancelar' : 'Pronto'}</button>` : ''}</div>`;
      });
      html+='</div>';
      E.lobbyPlayers.innerHTML = html;
      if(lobby.messages) {
        const msgs = lobby.messages.slice(-10);
        E.lobbyMessages.innerHTML = msgs.map(m => `<div><strong>${escapeHTML(m.senderName)}</strong>: ${escapeHTML(m.content)}</div>`).join('');
      }
    }
    window.toggleReady = async () => {
      if(!State.currentLobbyId || !State.currentUser) return;
      const ref=db.collection('lobbies').doc(State.currentLobbyId);
      const doc=await ref.get();
      if(!doc.exists) return;
      const data=doc.data();
      const ready=data.ready||[];
      if(ready.includes(State.currentUser.uid)) await ref.update({ ready: firebase.firestore.FieldValue.arrayRemove(State.currentUser.uid) });
      else await ref.update({ ready: firebase.firestore.FieldValue.arrayUnion(State.currentUser.uid) });
    };
    E.createLobby.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      if(State.currentLobbyId) return showToast('Você já está em um lobby.','info');
      try {
        const ref = await db.collection('lobbies').add({ participants: [State.currentUser.uid], participant_names: { [State.currentUser.uid]: State.userProfile.display_name||'Gamer' }, ready: [], messages: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        State.currentLobbyId = ref.id;
        showToast('Lobby criado!','success');
        updateLobby();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    E.lobbyChatSend.addEventListener('click', async ()=>{
      if(!State.currentLobbyId || !E.lobbyChatInput.value.trim()) return;
      const content = E.lobbyChatInput.value.trim();
      E.lobbyChatInput.value='';
      try {
        await db.collection('lobbies').doc(State.currentLobbyId).update({ messages: firebase.firestore.FieldValue.arrayUnion({ sender: State.currentUser.uid, senderName: State.userProfile.display_name||'Gamer', content, timestamp: firebase.firestore.FieldValue.serverTimestamp() }) });
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });
    async function createAutoLobby(game, participants) {
      try {
        const ref = await db.collection('lobbies').add({
          participants,
          participant_names: participants.reduce((acc,uid)=> { acc[uid] = uid===State.currentUser?.uid ? (State.userProfile.display_name||'Gamer') : 'Jogador'; return acc; }, {}),
          ready: [],
          messages: [],
          game,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast('Lobby criado automaticamente!','success');
        State.currentLobbyId = ref.id;
        updateLobby();
        navigateTo('lobby');
      } catch(e){ console.warn(e); }
    }

    // ============================================================
    // 40. COMMUNITIES
    // ============================================================
    async function loadCommunities() {
      try {
        const snap = await db.collection('communities').get();
        const comms=[]; snap.forEach(d=>comms.push({id:d.id,...d.data()}));
        State.allCommunities=comms;
        if(!comms.length) {
          const mock=[{name:'Minecraft',icon:'⛏️',members:120,games:['Minecraft']},{name:'Fortnite',icon:'🔫',members:90,games:['Fortnite']},{name:'Valorant',icon:'🎯',members:75,games:['Valorant']},{name:'Roblox',icon:'🤖',members:200,games:['Roblox']}];
          State.allCommunities=mock;
          E.communitiesContainer.innerHTML = mock.map(c => `<div class="community-card" onclick="navigateTo('games')"><div class="community-icon">${c.icon||'🌍'}</div><h4>${escapeHTML(c.name)}</h4><p class="text-muted">👥 ${c.members||0} membros</p></div>`).join('');
          return;
        }
        E.communitiesContainer.innerHTML = comms.map(c => `<div class="community-card" onclick="navigateTo('games')"><div class="community-icon">${c.icon||'🌍'}</div><h4>${escapeHTML(c.name)}</h4><p class="text-muted">👥 ${c.members||0} membros</p></div>`).join('');
      } catch(e){ E.communitiesContainer.innerHTML='<p class="text-muted">Nenhuma comunidade disponível.</p>'; }
    }

    // ============================================================
    // 41. CLIPS
    // ============================================================
    async function loadClips() {
      try {
        const snap = await db.collection('clips').orderBy('createdAt','desc').get();
        const clips=[]; snap.forEach(d=>clips.push({id:d.id,...d.data()}));
        State.allClips=clips;
        if(!clips.length) { E.clipsContainer.innerHTML='<p class="text-muted">Nenhum clip. Envie o seu!</p>'; return; }
        E.clipsContainer.innerHTML = clips.map(c => `<div class="clip-card"><div class="clip-thumb">🎬</div><div class="clip-info"><div class="clip-title">${escapeHTML(c.title)}</div><div class="text-muted">🎮 ${escapeHTML(c.game)} • ${escapeHTML(c.author_name)}</div><div class="text-sm">❤️ ${c.likes?.length||0} • 💬 ${c.comments?.length||0}</div></div></div>`).join('');
      } catch(e){ E.clipsContainer.innerHTML='<p class="text-muted">Nenhum clip disponível.</p>'; }
    }
    E.createClip.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const title=prompt('Título do clip:'); if(!title) return;
      const game=prompt('Jogo:'); const url=prompt('URL do vídeo (YouTube, etc.):'); if(!url) return;
      try {
        await db.collection('clips').add({ title, game, url, author_uid: State.currentUser.uid, author_name: State.userProfile.display_name||'Gamer', likes:[], comments:[], createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast('Clip enviado!','success');
        loadClips();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 42. GUIDES
    // ============================================================
    async function loadGuides() {
      try {
        const snap = await db.collection('guides').orderBy('createdAt','desc').get();
        const guides=[]; snap.forEach(d=>guides.push({id:d.id,...d.data()}));
        State.allGuides=guides;
        if(!guides.length) { E.guidesContainer.innerHTML='<p class="text-muted">Nenhum guia. Crie o seu!</p>'; return; }
        E.guidesContainer.innerHTML = guides.map(g => `<div class="guide-card"><div class="guide-title">${escapeHTML(g.title)}</div><div class="guide-meta">📚 ${escapeHTML(g.type||'Tutorial')} • 🎮 ${escapeHTML(g.game)} • 👤 ${escapeHTML(g.author_name)}</div><p class="text-muted">${escapeHTML(g.description||'')}</p>${g.url ? `<a href="${escapeHTML(g.url)}" target="_blank" class="btn-outline" style="display:inline-block;margin-top:8px;">Ver guia</a>` : ''}</div>`).join('');
      } catch(e){ E.guidesContainer.innerHTML='<p class="text-muted">Nenhum guia disponível.</p>'; }
    }
    E.createGuide.addEventListener('click', async ()=>{
      if(!State.currentUser) return showToast('Faça login primeiro.','error');
      const title=prompt('Título do guia:'); if(!title) return;
      const game=prompt('Jogo:'); const type=prompt('Tipo (tutorial, estratégia, build, etc.):')||'Tutorial';
      const desc=prompt('Descrição:'); const url=prompt('URL do guia (opcional):');
      try {
        await db.collection('guides').add({ title, game, type, description:desc||'', url:url||'', author_uid: State.currentUser.uid, author_name: State.userProfile.display_name||'Gamer', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast('Guia criado!','success');
        loadGuides();
      } catch(e){ showToast('Erro: '+e.message,'error'); }
    });

    // ============================================================
    // 43. SEASONS & HUB PASS
    // ============================================================
    async function loadSeasons() {
      try {
        const snap = await db.collection('seasons').orderBy('startDate','desc').get();
        const seasons=[]; snap.forEach(d=>seasons.push({id:d.id,...d.data()}));
        State.allSeasons=seasons;
        if(!seasons.length) {
          const mock=[{name:'Season 01 — Nexus Rising',startDate:new Date(2025,0,1),endDate:new Date(2025,2,31),level:1,rewards:['🪙 100 moedas','🏅 Badge Especial']}];
          State.allSeasons=mock;
          E.seasonsContainer.innerHTML = mock.map(s => `<div class="season-card"><div class="season-name">${escapeHTML(s.name)}</div><div class="text-muted">${formatTimestamp(s.startDate)} — ${formatTimestamp(s.endDate)}</div><div class="season-progress"><div class="fill" style="width:${Math.random()*100}%;"></div></div><div class="text-sm">🏅 Recompensas: ${s.rewards ? s.rewards.join(', ') : 'N/A'}</div></div>`).join('');
          return;
        }
        E.seasonsContainer.innerHTML = seasons.map(s => `<div class="season-card"><div class="season-name">${escapeHTML(s.name)}</div><div class="text-muted">${formatTimestamp(s.startDate)} — ${formatTimestamp(s.endDate)}</div><div class="season-progress"><div class="fill" style="width:${Math.random()*100}%;"></div></div><div class="text-sm">🏅 Recompensas: ${s.rewards ? s.rewards.join(', ') : 'N/A'}</div></div>`).join('');
      } catch(e){ E.seasonsContainer.innerHTML='<p class="text-muted">Nenhuma temporada disponível.</p>'; }
    }
    async function loadHubPass() {
      if(!State.currentUser) return;
      try {
        const doc = await db.collection('profiles').doc(State.currentUser.uid).get();
        const data=doc.data();
        const level=data.hub_pass_level||0;
        const rewards = [
          { name:'Avatar Frame', desc:'Moldura exclusiva', unlocked: level>=1 },
          { name:'Background Neon', desc:'Fundo dinâmico', unlocked: level>=3 },
          { name:'Título "Veterano"', desc:'Título no perfil', unlocked: level>=5 },
        ];
        let html = `<p>Nível do Hub Pass: <strong>${level}</strong></p><div class="xp-bar"><div class="fill" style="width:${Math.min(100, level*10)}%;"></div></div>`;
        html += rewards.map(r => `<div class="hub-pass-item"><div class="pass-icon">🎁</div><div class="pass-info"><div class="pass-name">${escapeHTML(r.name)}</div><div class="pass-desc">${escapeHTML(r.desc)}</div></div><div class="pass-status ${r.unlocked ? 'unlocked' : 'locked'}">${r.unlocked ? '✅ Desbloqueado' : '🔒 Bloqueado'}</div></div>`).join('');
        E.hubpassContainer.innerHTML = html;
      } catch(e){ E.hubpassContainer.innerHTML='<p class="text-muted">Erro ao carregar Hub Pass.</p>'; }
    }

    // ============================================================
    // 44. GAMER HUB AI (simulado)
    // ============================================================
    E.aiSend.addEventListener('click', ()=>{
      const query = E.aiInput.value.trim();
      if(!query) return;
      E.aiInput.value='';
      E.aiChat.innerHTML += `<div class="ai-message user"><strong>Você:</strong> ${escapeHTML(query)}</div>`;
      setTimeout(()=>{
        const responses = ['Que legal! Você está buscando jogadores para jogar?','Recomendo dar uma olhada na seção de Matchmaking.','Temos muitos torneios ativos! Dá uma olhada.','Você já completou suas missões diárias?','Que tal criar um Squad com seus amigos?','Explore novas comunidades na seção Comunidades!'];
        const reply = responses[Math.floor(Math.random()*responses.length)];
        E.aiChat.innerHTML += `<div class="ai-message bot">🤖 ${reply}</div>`;
        E.aiChat.scrollTop = E.aiChat.scrollHeight;
      },800);
    });

    // ============================================================
    // 45. EXPLORE
    // ============================================================
    E.exploreSearchBtn.addEventListener('click', ()=>{
      const term = E.exploreSearch.value.trim().toLowerCase();
      if(!term) { E.exploreResults.innerHTML='<p class="text-muted">Digite algo para pesquisar.</p>'; return; }
      let results=[];
      const gamesMatch = State.allGames.filter(g=>g.name.toLowerCase().includes(term));
      const postsMatch = State.allPosts.filter(p=>p.content.toLowerCase().includes(term) || p.author_name.toLowerCase().includes(term));
      const groupsMatch = State.allGroups.filter(g=>g.name.toLowerCase().includes(term) || (g.description && g.description.toLowerCase().includes(term)));
      const squadsMatch = State.allSquads.filter(s=>s.name.toLowerCase().includes(term) || (s.description && s.description.toLowerCase().includes(term)));
      results = [
        ...gamesMatch.slice(0,5).map(g=>({type:'🎮 Jogo', name:g.name})),
        ...postsMatch.slice(0,5).map(p=>({type:'📰 Post', name:p.content.substring(0,30)})),
        ...groupsMatch.slice(0,5).map(g=>({type:'👥 Grupo', name:g.name})),
        ...squadsMatch.slice(0,5).map(s=>({type:'⚔️ Squad', name:s.name})),
      ];
      if(!results.length) E.exploreResults.innerHTML='<p class="text-muted">Nenhum resultado encontrado.</p>';
      else E.exploreResults.innerHTML = results.map(r => `<div class="neon-card mb-4">${r.type}: ${escapeHTML(r.name)}</div>`).join('');
    });

    // ============================================================
    // 46. HOME (Dashboard)
    // ============================================================
    function updateHome() {
      if(!State.userProfile) return;
      const p=State.userProfile;
      E.homeUsername.textContent = p.display_name||'Gamer';
      E.homeDisplayName.textContent = p.display_name||'Gamer';
      E.homeNexus.textContent = p.nexus_id||'#----';
      E.homeLevel.textContent = Math.floor((p.xp||0)/500)+1;
      E.homeXP.textContent = p.xp||0;
      E.homeCoins.textContent = p.coins||0;
      E.homeRep.textContent = p.reputation||0;
      const xpInLevel = (p.xp||0)%500;
      E.homeXpBar.style.width = (xpInLevel/500*100)+'%';
      // Online count
      db.collection('profiles').where('is_online','==',true).get().then(snap=>{
        let online=0;
        snap.forEach(d=>{ const data=d.data(); if(isUserActuallyOnline(data)) online++; });
        E.homeOnlineCount.textContent = online;
      }).catch(()=>{});
      // Missões
      if(State.allMissions.length) E.homeMissions.innerHTML = State.allMissions.slice(0,3).map(m=>`<div>⚡ ${escapeHTML(m.title)}</div>`).join('');
      else E.homeMissions.innerHTML = '<span class="text-muted">Nenhuma missão ativa.</span>';
      // LFG
      if(State.allLfg.length) E.homeLfg.innerHTML = State.allLfg.slice(0,3).map(l=>`<div>📢 ${escapeHTML(l.game)} (${l.slots} vagas)</div>`).join('');
      else E.homeLfg.innerHTML = '<span class="text-muted">Nenhum LFG ativo.</span>';
      // Squad
      if(State.allSquads.length) {
        const userSquad = State.allSquads.find(s=>s.members && s.members.includes(State.currentUser?.uid));
        E.homeSquad.innerHTML = userSquad ? `<div>⚔️ ${escapeHTML(userSquad.name)}</div>` : '<span class="text-muted">Nenhum squad.</span>';
      } else E.homeSquad.innerHTML = '<span class="text-muted">Nenhum squad.</span>';
      // Notificações
      const unread = State.notificationData.filter(n=>!n.read).length;
      E.homeNotifs.innerHTML = unread ? `<div>🔔 ${unread} não lidas</div>` : '<span class="text-muted">Nenhuma notificação.</span>';
    }

    // ============================================================
    // 47. INICIALIZAÇÃO
    // ============================================================
    console.log('🚀 Gamer Hub 2.0 otimizado iniciado!');
    const savedPalette = localStorage.getItem('selectedPalette');
    if(savedPalette && savedPalette!=='default') document.documentElement.setAttribute('data-palette', savedPalette);
    if(State.currentUser && State.userProfile?.isAdmin) loadAdminGameList();
    setInterval(updateHome, 30000);
    // Load initial data
    if(State.currentUser) {
      loadFeed();
      loadMatchmaking();
      loadChatList();
      updateChatStats();
      loadTournaments();
      loadBadges();
      loadMissions();
      loadGames();
      loadRankings();
      loadGroups();
      loadFollowLists();
      renderRankingTabs();
      listenNotifications();
      loadShop();
      loadLfg();
      loadSquads();
      loadClips();
      loadGuides();
      loadCommunities();
      loadSeasons();
      loadHubPass();
      if(State.userProfile?.isAdmin) loadAdminGameList();
    }