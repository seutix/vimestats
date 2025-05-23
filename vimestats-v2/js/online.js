async function fetchOnlineData() {
    try {
        const response = await fetch('https://api.vimeworld.com/online');
        const data = await response.json();
        updateOnlineContent(data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        document.querySelector('.online-content').innerHTML = '<p class="error">Ошибка загрузки данных</p>';
    }
}

function updateOnlineContent(data) {
    const onlineContent = document.querySelector('.online-content');
    let html = '<div class="online-stats">';
    
    // Общее количество игроков
    html += `<div class="total-online">
        <span class="total-count">${data.total}</span>
        <span class="total-label">игроков</span>
    </div>`;
    
    // Список серверов
    html += '<div class="servers-list">';
    for (const [server, count] of Object.entries(data.separated)) {
        if (count > 0) {
            html += `
                <div class="server-item">
                    <span class="server-name">${formatServerName(server)}</span>
                    <span class="server-count">${count}</span>
                </div>`;
        }
    }
    html += '</div></div>';
    
    onlineContent.innerHTML = html;
}

function formatServerName(server) {
    const serverNames = {
        'ann': 'Annihilation',
        'bb': 'BedWars',
        'bp': 'Block Party',
        'bw': 'BedWars',
        'cp': 'Clash Point',
        'duels': 'Дуэли',
        'gg': 'GunGame',
        'hg': 'Hunger Games',
        'kpvp': 'KitPvP',
        'lobby': 'Лобби',
        'mw': 'MegaWalls',
        'prison': 'Prison',
        'prison-lite': 'Prison Lite',
        'sw': 'SkyWars',
        'swt': 'SkyWars Team',
        'murder': 'Murder Mystery',
        'bridge': 'The Bridge',
        'jumpleague': 'Jump League',
        'turfwars': 'Turf Wars',
        'sheep': 'Sheep Wars',
        'tntrun': 'TNT Run',
        'tnttag': 'TNT Tag',
        'luckywars': 'Lucky Wars',
        'zombieclaus': 'Zombie Claus',
        'whitecold': 'White Cold',
        'squidgame': 'Squid Game',
        'hide': 'Hide and Seek',
        'speedbuilders': 'Speed Builders',
        'teamfortress': 'Team Fortress',
        'fallguys': 'Fall Guys',
        'eggwars': 'EggWars',
        'skyblock': 'SkyBlock',
        'bwhype': 'BedWars Hype',
        'battlebox': 'Battle Box',
        'farm': 'Farm',
        'rodwars': 'Rod Wars',
        'petsimulator': 'Pet Simulator',
        'sololeveling': 'Solo Leveling',
        'deathrun': 'Death Run',
        'fireballfight': 'Fireball Fight',
        'css': 'Custom Steve Chaos',
        'cor': 'Chaos Of Reign'
    };
    
    return serverNames[server] || server;
}

// Обновляем данные каждые 30 секунд
fetchOnlineData();
setInterval(fetchOnlineData, 30000); 