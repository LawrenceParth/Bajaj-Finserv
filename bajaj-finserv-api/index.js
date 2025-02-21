const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// GET /bfhl - Hardcoded response
app.get("/bfhl", (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST /bfhl - Processes JSON input
app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const numbers = data.filter((item) => !isNaN(item)).map(Number);
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    const highestAlphabet = alphabets.length 
        ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]] 
        : [];

    const response = {
        is_success: true,
        user_id: "Parth_Mehta_22092002",
        email: "22bcs15601@cuchd.in",
        roll_number: "22bcs15601",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };

    res.status(200).json(response);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
