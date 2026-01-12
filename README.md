# Bright Future Academy - School Management System

A modern school management website featuring user authentication, scholarship applications, and a contact system. Built with Node.js, Express, and MySQL.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 📋 Prerequisites

Ensure you have the following installed:
* **Node.js** (v14 or higher)
* **XAMPP** (for MySQL database and phpMyAdmin)

---

## 🛠️ Local Setup Instructions

### 1. Install Dependencies
Open your terminal/command prompt in the project root directory and run:
```bash
npm install
```
This will install all necessary packages defined in `package.json` (Express, MySQL2, Cors, etc.).

### 2. Database Setup (XAMPP)
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache** and **MySQL**.
3. Open your browser and go to: `http://localhost/phpmyadmin/`.
4. Create a new database named **`school`**.
5. Select the `school` database and click the **Import** tab.
6. Choose the **`school.sql`** file located in the project root and click **Go/Import**.
   * *Alternatively: You can copy the content of `school.sql` and run it in the SQL tab.*

### 3. Configure Database Connection
If you have a customized MySQL password or username, update the configuration in `server.js`:
```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: '',      // Your MySQL password
    database: 'school'
};
```

---

## 🏃 Running the Project

### 1. Start the Server
In your terminal, run the following command:
```bash
node server.js
```
You should see: `Server running at http://localhost:3000` and `Connected to MySQL database "school".`

### 2. View the Website
Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Key Features
* **User Authentication**: Login and Signup with either Email or Username.
* **Scholarship Portal**: Allows logged-in users to apply for scholarships.
* **Contact Form**: Secure messaging system (restricted to logged-in users).
* **Responsive Design**: Optimized for mobile and desktop viewing.
* **Dark Mode**: Toggle between light and dark themes.

---

## 📁 Project Structure
* `index.html` - Main landing page.
* `server.js` - Backend Node.js server and API routes.
* `js/script.js` - Frontend logic and interactivity.
* `css/style.css` - Custom styling.
* `school.sql` - Database schema and initial data.
