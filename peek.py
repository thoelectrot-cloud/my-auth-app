import sqlite3

# Connect to the vault
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Grab all the users
cursor.execute("SELECT username, email, password_hash FROM users")
users = cursor.fetchall()

print("--- REGISTERED USERS ---")
for user in users:
    print(f"Username: {user[0]}")
    print(f"Email: {user[1]}")
    print(f"Password: {user[2]} (See? Totally encrypted!)")
    print("------------------------")

conn.close()