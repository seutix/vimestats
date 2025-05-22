// Базовый backend для авторизации через API VimeWorld
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'vimestats_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: 'lax' }
}));
app.use(csrf());

// Заглушка для авторизации (будет интеграция с API VimeWorld)
app.post('/api/auth', (req, res) => {
    // Здесь будет логика авторизации через API VimeWorld
    // Например, получение токена, проверка пользователя и т.д.
    res.json({ success: true, message: 'Авторизация пока не реализована' });
});

// Проверка авторизации
app.get('/api/profile', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'Не авторизован' });
    }
});

// CSRF-токен для фронта
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.listen(PORT, () => {
    console.log(`Backend запущен на http://localhost:${PORT}`);
}); 