const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('playliste.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS playliste (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// GET /api/playliste
app.get('/api/playliste', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM playliste ORDER BY created_at DESC');
    const playlistes = stmt.all();
    res.json(playlistes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/playliste
app.post('/api/playliste', (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const stmt = db.prepare('INSERT INTO playliste (title, description) VALUES (?, ?)');
    const result = stmt.run(title, description || null);
    res.status(201).json({ id: result.lastInsertRowid, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/playliste/:id
app.delete('/api/playliste/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM playliste WHERE id = ?');
    const result = stmt.run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Playliste not found' });
    }
    res.json({ message: 'Playliste deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); // GET /api/playlist
app.get('/api/playlist', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM playlist ORDER BY id').all();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/playlist
app.post('/api/playlist', (req, res) => {
  try {
    db.prepare('DELETE FROM playlist').run();
    const insert = db.prepare('INSERT INTO playlist (nom, hz, duree) VALUES (?, ?, ?)');
    req.body.forEach(item => insert.run(item.nom, item.hz, item.duree));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
