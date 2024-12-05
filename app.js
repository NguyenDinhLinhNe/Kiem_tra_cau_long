const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Danh sách lưu thông tin đặt sân
let bookings = [];

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// API: Lưu thông tin đặt sân
app.post("/api/bookings", (req, res) => {
    const { timeSlot, name, phone } = req.body;

    if (!timeSlot || !name || !phone) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // Thêm thông tin vào danh sách
    bookings.push({ timeSlot, name, phone });
    res.status(200).json({ message: "Đặt sân thành công!", bookings });
});

// API: Lấy danh sách đặt sân
app.get("/api/bookings", (req, res) => {
    res.status(200).json(bookings);
});

app.get('/' , (req , res) => {
    res.send('Chào mừng đến với web đặt cầu lông !');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
