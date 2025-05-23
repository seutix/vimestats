document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметр поиска из URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    // Если есть параметр поиска, заполняем поле поиска и ищем игрока
    if (query) {
        const searchInput = document.getElementById('search-input');
        searchInput.value = query;
        fetchPlayerData(query);
    }

    // Получаем все кнопки вкладок и панели контента
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Функция для переключения вкладок
    function switchTab(tabId) {
        // Убираем активный класс у всех кнопок и панелей
        tabButtons.forEach(button => button.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Добавляем активный класс выбранной вкладке и соответствующей панели
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedPane = document.getElementById(tabId);

        if (selectedButton && selectedPane) {
            selectedButton.classList.add('active');
            selectedPane.classList.add('active');
        }
    }

    // Добавляем обработчики событий для кнопок
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Активируем первую вкладку по умолчанию
    switchTab('stats');
});

async function fetchPlayerData(query) {
    try {
        // Здесь будет запрос к API для получения данных игрока
        // Пока просто выводим сообщение о загрузке
        const playerContent = document.querySelector('.player-content');
        playerContent.innerHTML = '<p class="loading">Загрузка данных игрока...</p>';
        
        // TODO: Добавить реальный запрос к API
        // const response = await fetch(`https://api.vimeworld.com/user/${query}`);
        // const data = await response.json();
        // updatePlayerContent(data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        document.querySelector('.player-content').innerHTML = '<p class="error">Ошибка загрузки данных игрока</p>';
    }
}

function updatePlayerContent(data) {
    // Здесь будет логика отображения данных игрока
    // TODO: Реализовать отображение статистики
} 