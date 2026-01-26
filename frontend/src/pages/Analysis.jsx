import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Analysis() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:3000/api/status")
        .then((res) => res.json())
        .then((data) => {
          if (!data.processing && data.hasResult) {
            navigate("/results");
          }
        })
        .catch(() => {
          // silent fail — backend may not be ready yet
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const downloadScript = (type) => {
    const scripts = {
      bash: {
        name: "diagnostics.sh",
        url: "/scripts/diagnostics.sh"
      },
      ps1: {
        name: "diagnostics.ps1",
        url: "/scripts/diagnostics.ps1"
      }
    };

    const script = scripts[type];
    const link = document.createElement("a");
    link.href = script.url;
    link.download = script.name;
    link.click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:3000/api/status")
        .then((res) => res.json())
        .then((data) => {
          if (!data.processing && data.hasResult) {
            navigate("/results");
          }
        })
        .catch(() => {
          // silent fail — backend may not be ready yet
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="container">
      <div
        style={{
          maxWidth: 720,
          margin: "120px auto",
          textAlign: "center",
        }}
      >
        {/* Spinner */}
        <div
          style={{
            width: 88,
            height: 88,
            border: "4px solid #1F2A44",
            borderTopColor: "#2F81F7",
            borderRadius: "50%",
            margin: "0 auto 40px",
            animation: "spin 1.2s linear infinite",
          }}
        />

        {/* Heading */}
        <h1 style={{ marginBottom: 16, fontSize: 32 }}>
          Analyzing Your Device
        </h1>

        {/* Description */}
        <p className="subtitle" style={{ marginBottom: 40 }}>
          We are processing the diagnostic data generated on your device.
          This operation is read-only and does not impact system performance.
        </p>

        {/* Status card */}
        <div className="card" style={{ background: "#0B1220", borderColor: "#1F2A44" }}>
          <p className="label">ANALYZING</p>
          <p className="muted" style={{ marginTop: 8 }}>
            Processing diagnostic data…
          </p>
        </div>

        {/* Links */}
        <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => downloadScript("bash")} className="link" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>⬇ Download (Linux/Mac)</button>
          <span className="muted">·</span>
          <button onClick={() => downloadScript("ps1")} className="link" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>⬇ Download (Windows)</button>
          <span className="muted">·</span>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/instructions"); }} className="link">📖 View Instructions →</a>
        </div>

        {/* Footer note */}
        <p
          className="muted"
          style={{ marginTop: 40, fontSize: 13 }}
        >
          You can keep this page open.
          Once processing completes, you will be redirected automatically.
        </p>
      </div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
