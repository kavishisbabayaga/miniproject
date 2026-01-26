const express = require("express");
const evaluateDevice = require("../services/evaluateDevice");

const router = express.Router();

let lastResult = null;

router.post("/submit-diagnostics", (req, res) => {
  const input = req.body;

  const result = evaluateDevice(input);
  lastResult = result;

  res.json({ status: "received" });
});

router.get("/diagnostics", (req, res) => {
  if (!lastResult) {
    return res.status(404).json({ error: "No diagnostics available" });
  }
  res.json(lastResult);
});

module.exports = router;
