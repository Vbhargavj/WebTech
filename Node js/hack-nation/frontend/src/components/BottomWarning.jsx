
import { Link } from 'react-router-dom';

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 flex justify-center">
      <div className="text-sky-300 text-sm">{label}</div>
      <Link
        to={to}
        className="text-sky-300 text-sm underline decoration-orange-900 decoration-2 pl-1 cursor-pointer"
      >
        {buttonText}
      </Link>
    </div>
  );
}
