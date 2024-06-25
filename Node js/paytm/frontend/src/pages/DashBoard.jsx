import { Balance } from "../components/Balance";
import { Topbar } from "../components/Topbar";
import { User } from "../components/User";

export function DashBoard() {
  return (
    <div>
      <Topbar></Topbar>
      <div className="m-8">
        <Balance></Balance>
        <div className="font-bold pt-2">Users</div>
        <div>
          <input
            placeholder="Search user"
            className="mt-2  px-2 w-full border-2 border-gray-950 "
          ></input>
          {/* users are here */}
          <div className="pt-2">
            <User></User>
            <User></User>
          </div>
        </div>
      </div>
    </div>
  );
}
