"use strict";
// apps/backend/src/routes/queue.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queue_controller_1 = require("../controllers/queue.controller");
const router = (0, express_1.Router)();
// 1. GET Queue (Specific Clinic)
router.get("/:clinicId", queue_controller_1.getQueue);
// 2. Call Next (Specific Clinic)
router.post("/:clinicId/next", queue_controller_1.callNextPatient);
// 3. Add Patient (Specific Clinic) <--- UPDATE THIS LINE
router.post("/:clinicId/add", queue_controller_1.addPatient);
exports.default = router;
