import type { CountdownUnitProps } from "../interfaces/countdown.interface";

function pad(n: number, w: number = 2): string {
  return String(n).padStart(w, "0");
}
 
export default function CountdownUnit({ value, label, width = 2, urgent = false }: CountdownUnitProps) {
  return (
    <div className="countdown-unit">
      <div className={`countdown-num${urgent ? " countdown-num--urgent" : ""}`}>
        {pad(value, width)}
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}
 