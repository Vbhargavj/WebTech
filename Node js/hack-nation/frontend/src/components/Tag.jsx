export function Tag({ name, color }) {
  return (
    <span className={`flex text-white px-2 text-sm font-semibold rounded`} style={{ backgroundColor: color }}>
      {name}
    </span>
  );
}