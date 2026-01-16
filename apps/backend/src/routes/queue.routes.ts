import { Router } from "express";
import { getQueue, callNextPatient } from "../controllers/queue.controller";

const router = Router();

router.get("/:clinicId", getQueue);
router.post("/:clinicId/next", callNextPatient);

export default router;
