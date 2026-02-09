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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
// 1. 👇 UPDATE IMPORT: Add 'Role' to this line
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is required");
    }
    return secret;
};
// ==========================================
// 1. SIGN UP (Register)
// ==========================================
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, role } = req.body;
        // A. Validation
        if (!email || !password || !name) {
            return res
                .status(400)
                .json({ success: false, error: "Missing required fields" });
        }
        // B. Check if user exists
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, error: "Email already exists" });
        }
        // C. Hash Password (Security First 🔒)
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // D. Create User
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                // 2. 👇 UPDATE THIS LINE: Use the Enum, not a string
                role: role ? role : client_1.Role.PATIENT,
            },
        }); // E. Generate Token
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, role: newUser.role }, getJwtSecret(), {
            expiresIn: "30d",
        });
        res.status(201).json({
            success: true,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                token, // Arjun needs this to store in AsyncStorage
            },
        });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, error: "Registration failed" });
    }
});
exports.signup = signup;
// ==========================================
// 2. LOGIN (Sign In)
// ==========================================
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // A. Validation
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, error: "Email and Password required" });
        }
        // B. Find User
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid credentials" });
        }
        // C. Verify Password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid credentials" });
        }
        // D. Generate Token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, getJwtSecret(), {
            expiresIn: "30d",
        });
        console.log(`✅ User Logged In: ${user.name}`);
        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, error: "Login failed" });
    }
});
exports.login = login;
