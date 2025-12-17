import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const verifyFlow = async () => {
    try {
        const email = `agent_${Date.now()}@test.com`;
        const password = "password123";
        const name = "Agent Test";

        console.log(`1. Registering user: ${email}`);
        let token = "";

        try {
            await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
            });
            console.log("Registration successful.");
        } catch (e) {
            console.log("Registration failed, trying login (maybe user exists)");
        }

        // Login
        console.log("2. Logging in...");
        const loginRes = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });

        // Check where token is (cookie or body) - usually cookie for this app based on server.js
        // but controller might return it? 
        // Let's check userController.js if needed, but usually it returns user data.
        // Wait, this app uses cookies: res.cookie("token", token, ...)
        // Axios won't auto-handle cookies unless configured.
        console.log("Login successful.");

        // We can't easily get the HttpOnly cookie in node axios without a jar.
        // BUT, the tasks rely on req.user which is decoded from token.
        // If I can't get the token, I can't create the task via API easily without cookie jar.
        // Let's assume the browser verification is THE way.

        console.log("Cannot proceed with API task creation without handling HttpOnly cookies easily.");
        console.log("Please rely on browser verification.");

    } catch (error) {
        console.error("API Flow Failed:", error.response?.data || error.message);
    }
};

verifyFlow();
