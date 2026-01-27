const { exec } = require("child_process");
const os = require("os");
const { promisify } = require("util");

const execPromise = promisify(exec);

class SystemMonitor {
  static async getCpuUsage() {
    try {
      if (process.platform === "linux" || process.platform === "darwin") {
        const { stdout } = await execPromise(
          "top -bn1 | awk '/Cpu/ {print int(100 - $8)}' || echo 50"
        );
        return parseInt(stdout.trim()) || 50;
      } else if (process.platform === "win32") {
        // Fallback for Windows
        const cpus = os.cpus();
        const avgLoad = os.loadavg()[0];
        const cpuCount = cpus.length;
        return Math.min(100, Math.round((avgLoad / cpuCount) * 100)) || 50;
      }
      return 50;
    } catch (error) {
      console.error("Error getting CPU usage:", error.message);
      return 50;
    }
  }

  static async getRamUsage() {
    try {
      if (process.platform === "linux") {
        const { stdout } = await execPromise("free -g | awk '/Mem:/ {print $3}'");
        return parseInt(stdout.trim()) || 4;
      } else {
        // For all platforms, calculate from os module
        const totalMem = os.totalmem() / (1024 * 1024 * 1024);
        const freeMem = os.freemem() / (1024 * 1024 * 1024);
        const usedMem = totalMem - freeMem;
        return Math.round(usedMem);
      }
    } catch (error) {
      console.error("Error getting RAM usage:", error.message);
      return 4;
    }
  }

  static async getStorageHealth() {
    try {
      if (process.platform === "linux" || process.platform === "darwin") {
        const { stdout } = await execPromise(
          "df / | awk 'NR==2 {print $5}' | sed 's/%//' || echo 50"
        );
        const diskUsed = parseInt(stdout.trim()) || 50;
        return Math.max(0, 100 - diskUsed);
      } else {
        // Windows fallback
        return 70;
      }
    } catch (error) {
      console.error("Error getting storage health:", error.message);
      return 70;
    }
  }

  static async getBatteryHealth() {
    try {
      if (process.platform === "linux") {
        const { stdout } = await execPromise(
          "upower -i $(upower -e | grep BAT) | grep 'percentage' | awk '{print $2}' | sed 's/%//' || echo 85"
        );
        return parseInt(stdout.trim()) || 85;
      } else if (process.platform === "darwin") {
        const { stdout } = await execPromise(
          "pmset -g batt | awk 'NR==2 {print $3}' | sed 's/%//' || echo 85"
        );
        return parseInt(stdout.trim()) || 85;
      } else {
        return 85;
      }
    } catch (error) {
      console.error("Error getting battery health:", error.message);
      return 85;
    }
  }

  static async getSystemMetrics() {
    try {
      const [cpuUsage, ramUsage, storageHealth, batteryHealth] = await Promise.all([
        this.getCpuUsage(),
        this.getRamUsage(),
        this.getStorageHealth(),
        this.getBatteryHealth()
      ]);

      return {
        timestamp: new Date().toISOString(),
        cpu_usage: cpuUsage,
        ram_gb: ramUsage,
        storage_health: storageHealth,
        battery_health: batteryHealth,
        motherboard: true
      };
    } catch (error) {
      console.error("Error collecting system metrics:", error.message);
      return null;
    }
  }
}

module.exports = SystemMonitor;
