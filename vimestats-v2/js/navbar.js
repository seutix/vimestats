document.addEventListener('DOMContentLoaded', () => {
    // Создаем навигационную панель
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    // Контейнер для элементов навигации
    const navContainer = document.createElement('div');
    navContainer.classList.add('nav-container');
    
    // Логотип/название сайта в навбаре
    const logo = document.createElement('a');
    logo.classList.add('nav-logo');
    logo.href = 'index.html';
    logo.textContent = 'VimeStats';

    // Контейнер для центральных кнопок
    const navCenter = document.createElement('div');
    navCenter.classList.add('nav-center');
    
    // Создаем кнопки навигации с иконками
    const navItems = [
        { text: 'Модеры', icon: 'fa-shield-halved', link: 'moders.html' },
        { text: 'Топы', icon: 'fa-trophy', link: 'tops.html' },
        { text: 'Гильдии', icon: 'fa-users', link: 'guilds.html' }
    ];
    
    navItems.forEach(item => {
        const navItem = document.createElement('a');
        navItem.classList.add('nav-item');
        navItem.href = item.link;
        navItem.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
        navCenter.appendChild(navItem);
    });

    // Компактное поисковое окно
    const compactSearch = document.createElement('div');
    compactSearch.classList.add('compact-search');
    compactSearch.innerHTML = `
        <input type="text" placeholder="Поиск..." class="compact-search-input">
        <button class="compact-search-button">
            <i class="fas fa-search"></i>
        </button>
    `;
    
    // Кнопка авторизации
    const authButton = document.createElement('a');
    authButton.classList.add('auth-button');
    authButton.href = 'auth.html';
    authButton.innerHTML = '<i class="fas fa-key"></i>';
    
    // Собираем навигационную панель
    navContainer.appendChild(logo);
    navContainer.appendChild(navCenter);
    navContainer.appendChild(compactSearch);
    navContainer.appendChild(authButton);
    navbar.appendChild(navContainer);
    
    // Вставляем навигационную панель в начало body
    document.body.insertBefore(navbar, document.body.firstChild);
    
    // Добавляем отступ для body, чтобы контент не перекрывался навбаром
    document.body.style.paddingTop = navbar.offsetHeight + 'px';

    const compactSearchInput = document.querySelector('.compact-search-input');
    const compactSearchButton = document.querySelector('.compact-search-button');

    function handleCompactSearch() {
        const query = compactSearchInput.value.trim();
        if (query) {
            // Переходим на страницу игрока с параметром поиска
            window.location.href = `player.html?query=${encodeURIComponent(query)}`;
        }
    }

    // Обработка клика по кнопке поиска
    compactSearchButton.addEventListener('click', handleCompactSearch);

    // Обработка нажатия Enter в поле поиска
    compactSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleCompactSearch();
        }
    });
}); 