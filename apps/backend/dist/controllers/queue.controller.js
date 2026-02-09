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
exports.addPatient = exports.callNextPatient = exports.getQueue = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ==========================================
// 1. GET QUEUE (Robust Version)
// ==========================================
const getQueue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicId = req.params.clinicId;
        if (!clinicId) {
            return res
                .status(400)
                .json({ success: false, error: "Clinic ID required" });
        }
        // A. Fetch Waiting List (Sorted by Token)
        const queue = yield prisma.patient.findMany({
            where: {
                clinicId: clinicId,
                status: "WAITING",
            },
            orderBy: { token: "asc" },
        });
        // B. Fetch Currently Serving Patient (Latest one)
        const current = yield prisma.patient.findFirst({
            where: {
                clinicId: clinicId,
                status: "SERVING",
            },
            orderBy: { servedTime: "desc" }, // Get the most recent one
        });
        // C. Return Combined Data
        res.status(200).json({
            success: true,
            data: queue, // For the waiting list
            current: current, // For "Now Serving: #X"
        });
    }
    catch (error) {
        console.error("❌ Error fetching queue:", error.message || error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});
exports.getQueue = getQueue;
// ==========================================
// 2. CALL NEXT PATIENT (Triggers Auto-Refresh)
// ==========================================
const callNextPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicId = req.params.clinicId;
        // 1. Find who is next
        const nextPatient = yield prisma.patient.findFirst({
            where: {
                clinicId: clinicId,
                status: "WAITING",
            },
            orderBy: { token: "asc" },
        });
        if (!nextPatient) {
            return res
                .status(400)
                .json({ success: false, message: "Queue is empty" });
        }
        // 2. Update status to SERVING
        const served = yield prisma.patient.update({
            where: { id: nextPatient.id },
            data: {
                status: "SERVING",
                servedTime: new Date(),
            },
        });
        // 3. BROADCAST TO ALL APPS (User & Doctor)
        const io = req.app.get("io");
        // A. Send new Waiting List
        const remainingQueue = yield prisma.patient.findMany({
            where: { clinicId: clinicId, status: "WAITING" },
            orderBy: { token: "asc" },
        });
        // 📢 Event 1: Updates the list
        io.emit("queue_update", remainingQueue);
        // 📢 Event 2: Updates "Now Serving" dashboard
        io.emit("current_patient", served);
        console.log(`✅ Called Next: Token #${served.token}`);
        res.status(200).json({ success: true, served });
    }
    catch (error) {
        console.error("❌ Error calling next:", error.message || error);
        res.status(500).json({ success: false, error: "Error calling next" });
    }
});
exports.callNextPatient = callNextPatient;
// ==========================================
// 3. ADD PATIENT
// ==========================================
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        const clinicId = req.params.clinicId;
        if (!name)
            return res.status(400).json({ error: "Name is required" });
        const clinic = yield prisma.clinic.findUnique({
            where: { id: clinicId },
        });
        if (!clinic)
            return res.status(404).json({ error: "Clinic not found" });
        // Generate Token
        const todayCount = yield prisma.patient.count({
            where: { clinicId: clinic.id },
        });
        const token = todayCount + 1;
        // Create Patient
        const newPatient = yield prisma.patient.create({
            data: {
                name,
                phone: phone || "",
                token,
                status: "WAITING",
                clinicId: clinic.id,
            },
        });
        // Notify Everyone
        const io = req.app.get("io");
        const updatedQueue = yield prisma.patient.findMany({
            where: { clinicId: clinic.id, status: "WAITING" },
            orderBy: { token: "asc" },
        });
        io.emit("queue_update", updatedQueue);
        res.status(201).json({ success: true, data: newPatient });
    }
    catch (error) {
        console.error("❌ Error adding patient:", error.message || error);
        res.status(500).json({ success: false, error: "Failed to add patient" });
    }
});
exports.addPatient = addPatient;
