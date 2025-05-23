document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Переходим на страницу игрока с параметром поиска
            window.location.href = `player.html?query=${encodeURIComponent(query)}`;
        }
    }

    // Обработка клика по кнопке поиска
    searchButton.addEventListener('click', handleSearch);

    // Обработка нажатия Enter в поле поиска
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}); 