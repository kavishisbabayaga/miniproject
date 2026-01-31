#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$SCRIPT_DIR/diagnostics.sh"

echo "Device Health Diagnostics Launcher"
echo "=================================="
echo

# Check if the diagnostics script exists
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "ERROR: diagnostics.sh not found in the same directory as this launcher."
    echo "Please ensure both files are in the same folder."
    exit 1
fi

# Make the script executable
echo "Making diagnostics script executable..."
chmod +x "$SCRIPT_PATH"

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to make script executable. Please run: chmod +x diagnostics.sh"
    exit 1
fi

echo "Running diagnostics..."
echo

# Run the diagnostics script
"$SCRIPT_PATH"

if [ $? -eq 0 ]; then
    echo
    echo "✓ Diagnostics completed successfully!"
    echo "You can now view the results in your browser at: http://localhost:5173/results"
    echo
    echo "Press Enter to continue..."
    read -r
else
    echo
    echo "✗ Diagnostics failed. Please check the error messages above."
    echo
    echo "Press Enter to continue..."
    read -r
fi