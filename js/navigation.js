// Создание и инициализация навигационной панели
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.createNavigation();
        this.setupEventListeners();
        this.setupSearchFunctionality();
    }

    createNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'navbar navbar-expand-lg navbar-light bg-light fixed-top';
        nav.innerHTML = `
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <h1 class="logo-text">VimeStats</h1>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Главная</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="tops.html">Топы</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="guild.html">Гильдии</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="moders.html">Модераторы</a>
                        </li>
                    </ul>
                    <div class="search-container d-flex">
                        <input type="text" class="form-control search-input" placeholder="Поиск игрока...">
                        <button class="btn btn-primary search-button ms-2">Поиск</button>
                    </div>
                    <div class="auth-buttons ms-3">
                        <button class="btn btn-outline-primary login-btn">Войти</button>
                        <button class="btn btn-primary register-btn ms-2">Регистрация</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertBefore(nav, document.body.firstChild);
    }

    setupEventListeners() {
        // Обработчики для кнопок авторизации
        document.querySelector('.login-btn').addEventListener('click', () => {
            window.location.href = 'auth.html';
        });

        document.querySelector('.register-btn').addEventListener('click', () => {
            window.location.href = 'auth.html?register=true';
        });

        // Обработчик для поиска
        const searchButton = document.querySelector('.search-button');
        const searchInput = document.querySelector('.search-input');

        searchButton.addEventListener('click', () => this.handleSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(searchInput.value);
            }
        });
    }

    setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

        searchInput.addEventListener('focus', () => {
            this.showRecentSearches(recentSearches);
        });

        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            if (value.length > 0) {
                this.showSuggestions(value);
            } else {
                this.showRecentSearches(recentSearches);
            }
        });
    }

    handleSearch(query) {
        if (!query.trim()) return;

        // Сохраняем поиск в историю
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        recentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

        // Перенаправляем на страницу игрока
        window.location.href = `player.html?nickname=${encodeURIComponent(query)}`;
    }

    showRecentSearches(recentSearches) {
        const container = document.createElement('div');
        container.className = 'recent-searches';
        
        if (recentSearches.length > 0) {
            const list = document.createElement('ul');
            list.className = 'list-group';
            
            recentSearches.forEach(search => {
                const item = document.createElement('li');
                item.className = 'list-group-item';
                item.textContent = search;
                item.addEventListener('click', () => this.handleSearch(search));
                list.appendChild(item);
            });
            
            container.appendChild(list);
        }

        // Удаляем предыдущие результаты
        const oldContainer = document.querySelector('.recent-searches');
        if (oldContainer) oldContainer.remove();

        // Добавляем новые результаты
        document.querySelector('.search-container').appendChild(container);
    }

    showSuggestions(query) {
        // Здесь можно добавить логику для показа подсказок
        // Например, через API или локальный список
    }
}

// Инициализация навигации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
}); 