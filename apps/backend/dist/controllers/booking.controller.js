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
exports.getMyAppointments = exports.createAppointment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ==========================================
// CREATE APPOINTMENT
// ==========================================
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clinicId, patientName, date, time } = req.body;
        if (!clinicId || !patientName || !date || !time) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields (clinicId, name, date, time)",
            });
        }
        // 1. Check if slot is taken (Optional - skipping for simplicity now)
        // In a real Unicorn app, you'd check prisma.appointment.findFirst here.
        // 2. Create Booking
        const newAppointment = yield prisma.appointment.create({
            data: {
                clinicId,
                patientName,
                date,
                time,
                status: "CONFIRMED",
            },
        });
        console.log(`✅ New Booking: ${patientName} on ${date} at ${time}`);
        res.status(201).json({
            success: true,
            data: newAppointment,
        });
    }
    catch (error) {
        console.error("❌ Booking Error:", error.message);
        res
            .status(500)
            .json({ success: false, error: "Failed to book appointment" });
    }
});
exports.createAppointment = createAppointment;
// ==========================================
// GET MY APPOINTMENTS
// ==========================================
const getMyAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientName } = req.query; // We will pass ?patientName=Pratham Raj
        if (!patientName) {
            return res
                .status(400)
                .json({ success: false, error: "Patient name required" });
        }
        const appointments = yield prisma.appointment.findMany({
            where: {
                patientName: String(patientName),
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                clinic: true, // Include clinic details if needed
            },
        });
        res.status(200).json({ success: true, data: appointments });
    }
    catch (error) {
        console.error("❌ Fetch Error:", error.message);
        res
            .status(500)
            .json({ success: false, error: "Failed to fetch appointments" });
    }
});
exports.getMyAppointments = getMyAppointments;
