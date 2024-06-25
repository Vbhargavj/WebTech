import { Downbutton } from "./Downbutton";

export function User() {
  return (
    <div className="py-1 flex justify-between items-center">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mr-2">
          <div className="text-xl">B</div>
        </div>
        <span className="text-sm">USER NAME</span>
      </div>

      <Downbutton label={"Send Money"} />
    </div>
  );
}
