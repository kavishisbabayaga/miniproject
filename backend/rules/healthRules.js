module.exports = {
  cpu: [
    { min: 80, health: "GOOD", score: 25 },
    { min: 50, health: "FAIR", score: 15 },
    { min: 0,  health: "POOR", score: 5 }
  ],

  ram: [
    { min: 16, health: "GOOD", score: 20 },
    { min: 8,  health: "FAIR", score: 12 },
    { min: 0,  health: "POOR", score: 5 }
  ],

  storage: [
    { min: 80, health: "GOOD", score: 30 },
    { min: 50, health: "FAIR", score: 15 },
    { min: 0,  health: "POOR", score: 5 }
  ],

  battery: [
    { min: 80, health: "GOOD", score: 15 },
    { min: 40, health: "FAIR", score: 8 },
    { min: 0,  health: "POOR", score: 3 }
  ]
};
