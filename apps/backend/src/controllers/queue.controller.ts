import { Request, Response } from "express";

// Mock Data (Temporary DB)
let queue = [
  { id: "1", name: "Alice M.", token: 42, status: "WAITING" },
  { id: "2", name: "Bob D.", token: 43, status: "WAITING" },
];

export const getQueue = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: queue });
};

export const callNextPatient = (req: Request, res: Response) => {
  // Logic: Remove first patient, emit socket event
  const nextPatient = queue.shift();

  if (!nextPatient) {
    return res.status(400).json({ success: false, message: "Queue is empty" });
  }

  // REAL-TIME UPDATE
  const io = req.app.get("io");
  io.emit("queue_update", queue); // Notify all connected apps

  res
    .status(200)
    .json({ success: true, served: nextPatient, remaining: queue.length });
};
