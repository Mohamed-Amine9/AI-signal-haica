const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'assets')));

// Your routes here
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/admins', (req, res) => {
    res.render('index', { content: './pages/admins.ejs' });
});
app.get('/chanels', (req, res) => {
    res.render('index', { content: './pages/Chanels.ejs' });
});
app.get('/dashboard', (req, res) => {
    res.render('index', { content: './pages/dashboard.ejs' });
});
app.get('/edit', (req, res) => {
    res.render('index', { content: './pages/edit.ejs' });
});
app.get('/radios', (req, res) => {
    res.render('index', { content: './pages/radios.ejs' });
});
app.get('/sign-in', (req, res) => {
    res.render('index', { content: './pages/sign-in.ejs' });
});
app.get('/signals', (req, res) => {
    res.render('index', { content: './pages/signals.ejs' });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
