
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// ========================================
// 1. Middleware Configuration
// ========================================

// Read form data submitted by users
app.use(express.urlencoded({ extended: true }));

// Serve CSS and other static files
app.use(express.static(path.join(__dirname, "public")));

// Configure user sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET || "central-city-library-demo-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 30 * 60 * 1000
        }
    })
);

// ========================================
// 2. Predefined User Credentials
// ========================================

const users = {
    student: {
        password: "student123",
        name: "Student Member",
        role: "Student"
    },

    staff: {
        password: "staff123",
        name: "Library Staff",
        role: "Staff"
    }
};

// ========================================
// 3. HTML Helper Function
// ========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[char];
    });
}

function renderPage(title, content, user = null) {

    let navigation = `
        <a href="/">Home</a>
        <a href="/about">About</a>
    `;

    if (user) {
        navigation += `
            <a href="/dashboard">Dashboard</a>

            <form action="/logout" method="POST">
                <button type="submit" class="nav-logout">
                    Logout
                </button>
            </form>
        `;
    } else {
        navigation += `<a href="/login">Login</a>`;
    }

    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escapeHTML(title)} | Central City Library</title>
            <link rel="stylesheet" href="/style.css">
        </head>

        <body>

            <header class="site-header">
                <div class="container navbar">

                    <a href="/" class="brand">
                        📚 Central City Library
                    </a>

                    <nav>
                        ${navigation}
                    </nav>

                </div>
            </header>

            ${content}

            <footer class="site-footer">
                <p>
                    &copy; 2026 Central City Library.
                    All Rights Reserved.
                </p>
            </footer>

        </body>
        </html>
    `;
}

// ========================================
// 4. Authentication Middleware
// ========================================

function requireLogin(req, res, next) {

    if (!req.session.user) {
        return res.redirect(
            "/login?message=Please%20login%20to%20access%20the%20dashboard."
        );
    }

    next();
}

// ========================================
// 5. Home Route
// ========================================

app.get("/", function (req, res) {

    const content = `
        <main class="hero">
            <div class="container">
                <p class="eyebrow">WELCOME TO YOUR KNOWLEDGE HUB</p>

                <h1>Discover a World of Knowledge</h1>

                <p>
                    Explore books, access library resources,
                    and make learning a wonderful experience.
                </p>

                <a href="/login" class="primary-button">
                    Login to Library
                </a>

                <a href="/about" class="secondary-button">
                    Learn More
                </a>
            </div>
        </main>
    `;

    res.status(200).send(
        renderPage("Home", content, req.session.user)
    );
});

// ========================================
// 6. About Route
// ========================================

app.get("/about", function (req, res) {

    const content = `
        <main class="container page-content">

            <h1>About Central City Library</h1>

            <p>
                Central City Library provides learning resources
                and reading facilities for students and staff.
            </p>

            <div class="info-card">
                <h2>Our Services</h2>

                <ul>
                    <li>Book and journal resources</li>
                    <li>Student membership facilities</li>
                    <li>Digital learning resources</li>
                    <li>Academic research support</li>
                </ul>
            </div>

        </main>
    `;

    res.status(200).send(
        renderPage("About", content, req.session.user)
    );
});

// ========================================
// 7. Login - GET Route
// ========================================

app.get("/login", function (req, res) {

    if (req.session.user) {
        return res.redirect("/dashboard");
    }

    const message = req.query.message
        ? `<p class="notice">${escapeHTML(req.query.message)}</p>`
        : "";

    const content = `
        <main class="container login-section">

            <div class="login-card">

                <h1>Member Login</h1>

                <p>Login to access library resources.</p>

                ${message}

                <form action="/login" method="POST">

                    <label for="username">Username:</label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        autocomplete="username"
                        required
                    >

                    <label for="password">Password:</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        autocomplete="current-password"
                        required
                    >

                    <button type="submit" class="primary-button">
                        Login
                    </button>

                </form>

                <div class="demo-credentials">
                    <h3>Demo Login Credentials</h3>

                    <p><strong>Student:</strong> student / student123</p>
                    <p><strong>Staff:</strong> staff / staff123</p>
                </div>

            </div>

        </main>
    `;

    res.status(200).send(renderPage("Login", content));
});

// ========================================
// 8. Login - POST Route
// ========================================

app.post("/login", function (req, res) {

    const username = String(req.body.username || "").trim();
    const password = String(req.body.password || "");

    const account = users[username];

    if (!account || account.password !== password) {

        return res.status(401).send(
            renderPage(
                "Login Failed",
                `
                    <main class="container page-content">
                        <div class="login-card">
                            <h1>Login Failed</h1>

                            <p class="error-message">
                                Invalid username or password.
                            </p>

                            <a href="/login" class="primary-button">
                                Try Again
                            </a>
                        </div>
                    </main>
                `
            )
        );
    }

    // Create a fresh session after successful login
    req.session.regenerate(function (error) {

        if (error) {
            return res.status(500).send("Unable to create session.");
        }

        req.session.user = {
            username: username,
            name: account.name,
            role: account.role
        };

        req.session.save(function (error) {

            if (error) {
                return res.status(500).send("Unable to save session.");
            }

            res.redirect("/dashboard");
        });
    });
});

// ========================================
// 9. Protected Dashboard Route
// ========================================

app.get("/dashboard", requireLogin, function (req, res) {

    const user = req.session.user;

    const content = `
        <main class="container dashboard-section">

            <h1>Member Dashboard</h1>

            <div class="dashboard-card">

                <h2>
                    Welcome, ${escapeHTML(user.name)}!
                </h2>

                <p>
                    You have successfully logged in to
                    Central City Library.
                </p>

                <p>
                    <strong>Username:</strong>
                    ${escapeHTML(user.username)}
                </p>

                <p>
                    <strong>Membership Type:</strong>
                    ${escapeHTML(user.role)}
                </p>

            </div>

            <div class="dashboard-card">

                <h2>Library Resources</h2>

                <ul>
                    <li>Books and publications</li>
                    <li>Academic journals</li>
                    <li>Digital learning materials</li>
                    <li>Research resources</li>
                </ul>

            </div>

            <form action="/logout" method="POST">
                <button type="submit" class="logout-button">
                    Logout
                </button>
            </form>

        </main>
    `;

    res.status(200).send(
        renderPage("Dashboard", content, user)
    );
});

// ========================================
// 10. Logout Route
// ========================================

app.post("/logout", function (req, res) {

    if (!req.session) {
        return res.redirect("/");
    }

    req.session.destroy(function (error) {

        if (error) {
            return res.status(500).send("Unable to logout.");
        }

        res.clearCookie("connect.sid", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.redirect("/login?message=You%20have%20logged%20out%20successfully.");
    });
});

// ========================================
// 11. Page Not Found Route
// ========================================

app.use(function (req, res) {

    const content = `
        <main class="container page-content">

            <h1>404 - Page Not Found</h1>

            <p>The requested page does not exist.</p>

            <a href="/" class="primary-button">
                Return Home
            </a>

        </main>
    `;

    res.status(404).send(
        renderPage("Page Not Found", content, req.session?.user)
    );
});

// ========================================
// 12. Start Express Server
// ========================================

app.listen(PORT, function () {

    console.log("-------------------------------------");
    console.log("Central City Library Server Started");
    console.log("-------------------------------------");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Press Ctrl + C to stop the server.");
});
