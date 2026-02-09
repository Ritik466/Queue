"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const queue_routes_1 = __importDefault(require("./routes/queue.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const custom_controller_1 = require("./controllers/custom.controller");
// ✅ FIX: Import BOTH functions here
const booking_controller_1 = require("./controllers/booking.controller");
// Load Config
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Initialize Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
// Middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use((0, morgan_1.default)(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api/auth", auth_routes_1.default); // This enables /api/auth/login
// --- 🚦 ROUTES ---
app.use("/api/queue", queue_routes_1.default);
app.post("/api/booking/create", booking_controller_1.createAppointment);
app.get("/api/booking/my-appointments", booking_controller_1.getMyAppointments); // This will work now
app.post("/api/custom/create", custom_controller_1.createSession);
app.post("/api/custom/join", custom_controller_1.joinSession);
app.get("/api/custom/:sessionId", custom_controller_1.getSessionDetails);
app.post("/api/custom/next", custom_controller_1.callNext);
// Health Check
app.get("/", (req, res) => {
    res.status(200).json({ status: "active", service: "Queue Pro API" });
});
// --- SOCKET LOGIC ---
io.on("connection", (socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);
    socket.on("join_clinic", (clinicId) => {
        socket.join(clinicId);
        console.log(`Socket ${socket.id} joined clinic ${clinicId}`);
    });
    socket.on("join_session_room", (sessionId) => {
        socket.join(`session_${sessionId}`);
        console.log(`Socket joined session room: ${sessionId}`);
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
app.set("io", io);
// Start Server
const PORT = Number(process.env.PORT) || 5001;
const HOST = process.env.HOST || "0.0.0.0";
server.listen(PORT, HOST, () => {
    console.log(`
  🚀 SERVER RUNNING
  -----------------
  • Port:     ${PORT}
  • Mode:     ${process.env.NODE_ENV || "development"}
  • Socket:   Active
  `);
});
