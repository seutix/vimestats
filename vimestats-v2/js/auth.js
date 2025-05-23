document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    const apiTokenInput = document.getElementById('apiToken');

    // Проверяем, есть ли сохраненный токен
    const savedToken = localStorage.getItem('vimeworld_token');
    if (savedToken) {
        apiTokenInput.value = savedToken;
    }

    authForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const token = apiTokenInput.value.trim();
        if (!token) {
            alert('Пожалуйста, введите API токен');
            return;
        }

        try {
            // Проверяем токен через API
            const response = await fetch('https://api.vimeworld.com/user/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Сохраняем токен
                localStorage.setItem('vimeworld_token', token);
                // Перенаправляем на главную страницу
                window.location.href = 'index.html';
            } else {
                alert('Неверный API токен');
            }
        } catch (error) {
            console.error('Ошибка при проверке токена:', error);
            alert('Произошла ошибка при проверке токена');
        }
    });
}); 