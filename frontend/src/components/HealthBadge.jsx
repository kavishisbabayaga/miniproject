export default function HealthBadge({ health }) {
  return <strong>{health ?? "UNKNOWN"}</strong>;
}
