import { Downbutton } from "../components/Downbutton";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";

export function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center ">
          <Heading label={"Sign In"} />
          <Inputbox label={"Email"} placeholder={"email"} />
          <Inputbox label={"Password"} placeholder={"password"} />
          <Downbutton label={"Sign In"} />
        </div>
      </div>
    </div>
  );
}
