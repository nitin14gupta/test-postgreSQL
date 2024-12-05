const pool = require('./db');

// Create tables
const createTables = async () => {
  try {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createOtpsTable = `
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        otp_code VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );
    `;

    await pool.query(createUsersTable);
    await pool.query(createOtpsTable);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err.stack);
  }
};

// Insert a user
const insertUser = async (name, email) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [name, email]
    );
    console.log('User inserted:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting user:', err.stack);
  }
};

// Get all users
const getUsers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    console.log('Users:', result.rows);
    return result.rows;
  } catch (err) {
    console.error('Error fetching users:', err.stack);
  }
};

// Export functions
module.exports = {
  createTables,
  insertUser,
  getUsers,
};
