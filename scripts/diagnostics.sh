#!/bin/bash

BACKEND="http://localhost:3000/api/submit-diagnostics"

echo "Running diagnostics..."

CPU=$(top -bn1 | awk '/Cpu/ {print int(100 - $8)}')
RAM=$(free -g | awk '/Mem:/ {print $2}')
DISK_USED=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
STORAGE=$((100 - DISK_USED))

JSON=$(cat <<EOF
{
  "cpu_usage": $CPU,
  "ram_gb": $RAM,
  "storage_health": $STORAGE,
  "battery_health": 90,
  "motherboard": true
}
EOF
)

curl -X POST "$BACKEND" \
  -H "Content-Type: application/json" \
  -d "$JSON"

echo "Diagnostics sent."
