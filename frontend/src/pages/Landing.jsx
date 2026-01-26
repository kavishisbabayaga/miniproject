import { useNavigate } from "react-router-dom";

function detectOS() {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes("win")) return "Windows";
  if (platform.includes("linux")) return "Linux";
  if (platform.includes("mac")) return "Mac";
  return "Unknown";
}

export default function Landing() {
  const navigate = useNavigate();
  const os = detectOS();

  const isWindows = os === "Windows";
  const isLinux = os === "Linux";

  return (
    <div className="landing-container">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="label">OPEN SOURCE · PRIVACY FIRST</span>

          <h1 className="hero-title">
            Hardware Diagnostics &<br />Device Health Check
          </h1>

          <p className="subtitle">
            Run a lightweight local script to analyze your system components
            without leaving your browser.
          </p>
        </div>

        {/* Download buttons */}
        <div className="download-section">
          <div
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
          >
            <div style={{ display: "flex", gap: 12, width: "100%", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                className="btn btn-primary"
                disabled={!isWindows}
                title={!isWindows ? "Available on Windows only" : ""}
              >
                <span style={{ marginRight: 8 }}>⬇</span> Download for Windows (PowerShell)
              </button>

              <button
                className="btn btn-secondary"
                disabled={!isLinux}
                title={!isLinux ? "Available on Linux only" : ""}
              >
                <span style={{ marginRight: 8 }}>⬇</span> Download for Linux (Bash)
              </button>
            </div>
            <p className="small-text">Save the script and run it in your terminal</p>
          </div>
        </div>

        {/* Features */}
        <div style={{ marginTop: 80 }}>
          <h2 style={{ textAlign: "center", marginBottom: 40 }}>Secure. Transparent. Lightweight.</h2>
          <p className="subtitle" style={{ textAlign: "center", marginBottom: 40 }}>
            Our diagnostic tool analyzes your hardware without installation or system impact.
          </p>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div className="card feature-card">
              <div className="feature-icon">🔒</div>
              <strong>Read-Only</strong>
              <p className="muted">No system modifications or installs.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon">⚡</div>
              <strong>Zero-Install</strong>
              <p className="muted">Runs directly in terminal.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon">🛡️</div>
              <strong>Privacy-First</strong>
              <p className="muted">No data leaves your control.</p>
            </div>
          </div>
        </div>

        {/* Continue */}
        <div style={{ marginTop: 100, textAlign: "center" }}>
          <h2>Ready to proceed?</h2>
          <p className="subtitle" style={{ marginBottom: 24 }}>Once you have run the diagnostic script, click below to analyze the results</p>

          <button className="btn btn-primary btn-large" onClick={() => navigate("/analysis")}>
            I have run the script → Continue
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 100, textAlign: "center", paddingTop: 40, borderTop: "1px solid #1F2A44" }}>
          <p className="muted" style={{ fontSize: 13 }}>© 2024-2026. Open source · MIT License</p>
        </div>
      </div>
    </div>
  );
}
