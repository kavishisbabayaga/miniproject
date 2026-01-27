# Real-Time System Health Monitoring - Architecture

## Overview
The application now features **real-time, live updates** of device hardware health using WebSocket connections and continuous system monitoring.

## Key Components

### Backend (Node.js/Express)
1. **systemMonitor.js** - Collects real system metrics
   - CPU usage (using `top` on Linux/Mac, `os.loadavg()` on Windows)
   - RAM usage (using `free` on Linux, system calls on others)
   - Storage health (using `df` on Linux/Mac)
   - Battery health (using `upower` on Linux, system calls on others)

2. **server.js** - Real-time server with WebSocket support
   - Continuously monitors system every 2 seconds when clients are connected
   - Broadcasts live metrics to all connected WebSocket clients
   - Evaluates hardware against health rules in real-time
   - Stores activity log for historical data

### Frontend (React)
1. **Results.jsx** - Real-time display component
   - WebSocket connection to backend (ws://localhost:3000)
   - Automatically subscribes to live updates
   - Displays real-time health status
   - Fallback to HTTP polling if WebSocket unavailable

## Data Flow

```
┌─────────────────────────────────────┐
│    System Hardware (CPU/RAM/etc)    │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│   systemMonitor.js                   │
│   (Collects real metrics every 2s)  │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│   evaluateDevice.js                  │
│   (Applies health rules)             │
└──────────────────┬──────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   HTTP /api         WebSocket
   (Polling)         (Real-time)
        │                     │
        └──────────┬──────────┘
                   │
                   ▼
           Frontend Results.jsx
           (Live health display)
```

## Real-Time Updates Process

1. **Client Connection**: Browser connects via WebSocket to `ws://localhost:3000`
2. **Monitoring Starts**: Server begins collecting system metrics every 2 seconds
3. **Health Evaluation**: Metrics passed through health rules
4. **Broadcasting**: Updated health report sent to all connected clients
5. **Frontend Update**: React component updates display automatically
6. **Cleanup**: Monitoring stops when all clients disconnect

## Health Rules (Real-Time)

Rules are applied against actual hardware metrics:

- **CPU**: > 80% = GOOD, > 50% = FAIR, < 50% = POOR
- **RAM**: > 16GB = GOOD, > 8GB = FAIR, < 8GB = POOR
- **Storage**: > 80% = GOOD, > 50% = FAIR, < 50% = POOR
- **Battery**: > 80% = GOOD, > 40% = FAIR, < 40% = POOR

## Testing

To view live updates:
```bash
# Terminal 1: Backend is already running
# Terminal 2: Test with WebSocket client
node backend/testLiveMonitor.js

# Or check API endpoint:
curl http://localhost:3000/api/diagnostics
```

## Performance

- Updates every 2 seconds
- No database overhead (in-memory state)
- Efficient WebSocket communication
- Automatic monitoring pause when no clients connected
