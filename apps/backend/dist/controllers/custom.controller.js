"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callNext = exports.getSessionDetails = exports.joinSession = exports.createSession = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// 1. START A QUEUE (Host)
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hostName, title } = req.body;
        // Ensure unique code logic (Simple retry mechanism could be added here later)
        const joinCode = Math.floor(100000 + Math.random() * 900000).toString();
        const session = yield prisma.customSession.create({
            data: { hostName, title, joinCode },
        });
        res.status(201).json({ success: true, data: session });
    }
    catch (error) {
        // PRINT THE REAL ERROR TO TERMINAL
        console.error("❌ Create Session Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create session. Check server logs.",
        });
    }
});
exports.createSession = createSession;
// 2. JOIN A QUEUE (Guest)
const joinSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { joinCode, name } = req.body;
        const session = yield prisma.customSession.findUnique({
            where: { joinCode },
            include: { participants: true },
        });
        if (!session || !session.isActive) {
            return res
                .status(404)
                .json({ success: false, error: "Queue not found or ended" });
        }
        const token = session.participants.length + 1;
        const participant = yield prisma.sessionParticipant.create({
            data: {
                name,
                token,
                sessionId: session.id,
                status: "WAITING",
            },
        });
        // ⚡ REAL-TIME ALERT: Tell the Host someone joined
        const io = req.app.get("io");
        io.to(`session_${session.id}`).emit("participant_joined", participant);
        res.status(200).json({ success: true, data: participant, session });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to join queue" });
    }
});
exports.joinSession = joinSession;
// 3. GET DETAILS (Sync)
const getSessionDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ⚠️ FIX: Cast as string to satisfy TypeScript
        const sessionId = req.params.sessionId;
        const session = yield prisma.customSession.findUnique({
            where: { id: sessionId },
            include: { participants: { orderBy: { token: "asc" } } },
        });
        res.json({ success: true, data: session });
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
});
exports.getSessionDetails = getSessionDetails;
// 4. CALL NEXT PARTICIPANT (Host Action)
const callNext = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.body;
        // 1. Find next waiting person
        const nextPerson = yield prisma.sessionParticipant.findFirst({
            where: { sessionId, status: "WAITING" },
            orderBy: { token: "asc" },
        });
        if (!nextPerson) {
            return res.status(400).json({ success: false, error: "Queue is empty" });
        }
        // 2. Update status
        const updatedPerson = yield prisma.sessionParticipant.update({
            where: { id: nextPerson.id },
            data: { status: "SERVING" },
        });
        // 3. Notify the Room (Real-time magic)
        const io = req.app.get("io");
        // Emit specific event for UI updates
        io.to(`session_${sessionId}`).emit("queue_updated", updatedPerson);
        res.json({ success: true, data: updatedPerson });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.callNext = callNext;
