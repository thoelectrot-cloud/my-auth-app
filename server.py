from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# --- THE VAULT (DATABASE SETUP) ---
def init_db():
    conn = sqlite3.connect('users.db') # Connects to file, or creates it if it doesn't exist
    cursor = conn.cursor()
    # Create our user table. UNIQUE means no two people can have the same email/username
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Run the database setup immediately when the file runs
init_db()

# --- THE ROUTES ---
@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"message": "The Python server is alive and breathing!"})

# The new Registration endpoint
@app.route('/api/register', methods=['POST'])
def register():
    # 1. Catch the data coming from your HTML form
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # 2. Check if they left anything blank
    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # 3. Encrypt the password (CRITICAL)
    hashed_pw = generate_password_hash(password)

    # 4. Save to the database
    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            (username, email, hashed_pw)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Account created successfully!"}), 201
        
    except sqlite3.IntegrityError:
        # This triggers if the UNIQUE rule is broken (email/username already exists)
        return jsonify({"error": "Username or Email already exists"}), 409

if __name__ == '__main__':
    print("Starting server on port 5000...")
    app.run(debug=True, port=5000)