import { Bottomwarning } from "../components/Bottomwarning";
import { Downbutton } from "../components/Downbutton";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";

export function Signup(){
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center ">
                <Heading label={"Sign Up"}/>
                <Subheading label={"Enter your information for craete an account"}/>
                <Inputbox placeholder={"vbj"} label={"First Name"}  />
                <Inputbox placeholder={"vbj"} label={"Last Name"}  />
                <Inputbox placeholder={"vbj"} label={"Email"}  />
                <Inputbox placeholder={"vbj"} label={"Password"}  />
                <Downbutton label={"sign up"}/>
                {/* <Bottomwarning label="This is a warning:" buttontext="Click here" to="/signup" /> */}
            </div>
        </div>
    </div>
}