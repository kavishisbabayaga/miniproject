const rules = require("../rules/healthRules");

function applyRules(value, ruleSet) {
  for (const rule of ruleSet) {
    if (value >= rule.min) {
      return { health: rule.health, score: rule.score };
    }
  }
  return { health: "UNKNOWN", score: 0 };
}

module.exports = function evaluateDevice(input) {
  const components = {};

  components.cpu = applyRules(input.cpu_usage, rules.cpu);
  components.ram = applyRules(input.ram_gb, rules.ram);
  components.storage = applyRules(input.storage_health, rules.storage);
  components.battery = applyRules(input.battery_health, rules.battery);

  components.motherboard = input.motherboard
    ? { health: "GOOD", score: 10 }
    : { health: "UNKNOWN", score: 0 };

  const totalScore = Object.values(components)
    .reduce((sum, c) => sum + c.score, 0);

  let overallHealth = "NOT_REUSABLE";
  if (totalScore >= 90) overallHealth = "REUSABLE_WITH_CHECK";
  else if (totalScore >= 70) overallHealth = "REUSABLE";

  return {
    components,
    overall: {
      health: overallHealth,
      total_score: totalScore
    }
  };
};
