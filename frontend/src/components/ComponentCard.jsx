import HealthBadge from "./HealthBadge";

export default function ComponentCard({ name, data }) {
  if (!data) {
    return <div>{name}: Data unavailable</div>;
  }

  return (
    <div>
      <h4>{name.toUpperCase()}</h4>
      <p>Health: <HealthBadge health={data.health} /></p>
      <p>Score: {data.score}</p>
    </div>
  );
}
