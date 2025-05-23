async function fetchModeratorsData() {
    try {
        const response = await fetch('https://api.vimeworld.com/online/staff');
        const data = await response.json();
        updateModeratorsContent(data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        document.querySelector('.moders-content').innerHTML = '<p class="error">Ошибка загрузки данных</p>';
    }
}

function updateModeratorsContent(data) {
    const moderatorsContent = document.querySelector('.moders-content');
    let html = '<div class="moderators-list">';
    
    if (data.length === 0) {
        html += '<p class="no-moderators">Нет модераторов онлайн</p>';
    } else {
        data.forEach(moderator => {
            const rankClass = getRankClass(moderator.rank);
            const guildTag = moderator.guild ? `[${moderator.guild.tag}]` : '';
            
            html += `
                <div class="moderator-item">
                    <div class="moderator-info">
                        <span class="moderator-rank ${rankClass}">${moderator.rank}</span>
                        <span class="moderator-name">${guildTag} ${moderator.username}</span>
                    </div>
                    <div class="moderator-status">
                        <span class="status-indicator online"></span>
                        <span class="status-message">${moderator.online.message}</span>
                    </div>
                </div>`;
        });
    }
    
    html += '</div>';
    moderatorsContent.innerHTML = html;
}

function getRankClass(rank) {
    const rankClasses = {
        'MODER': 'rank-moder',
        'ADMIN': 'rank-admin',
        'OWNER': 'rank-owner',
        'HELPER': 'rank-helper'
    };
    
    return rankClasses[rank] || 'rank-default';
}

// Обновляем данные каждые 30 секунд
fetchModeratorsData();
setInterval(fetchModeratorsData, 30000); 