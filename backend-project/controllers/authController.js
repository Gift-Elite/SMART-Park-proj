const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const [users] = await pool.query('SELECT * FROM User WHERE Username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user.UserID;
    req.session.username = user.Username;

    res.json({ 
      message: 'Login successful',
      username: user.Username 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Register (for initial setup)
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO User (Username, Password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

// Check session
exports.checkSession = (req, res) => {
  if (req.session.userId) {
    res.json({ 
      isAuthenticated: true,
      username: req.session.username 
    });
  } else {
    res.json({ isAuthenticated: false });
  }
};
