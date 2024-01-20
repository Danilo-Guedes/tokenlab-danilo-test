import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import { CircleUser } from "lucide-react";

function NavBar() {
  return (
    <nav className="flex flex-row  justify-between p-10 bg-white border-b-2 border-border shadow-lg">
      <div className="">
        <Link to={ROUTES.home}>
          <img src="/logos/logo-quikdev.png" className="w-14 h-14" alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-xl font-bold">Social Media QuikDev</span>
      </div>
      <div className="">
      <Link to={ROUTES.me}>
        <CircleUser size={30} />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
