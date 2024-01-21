import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import { CircleUser } from "lucide-react";

function NavBar() {
  return (
    <nav className="flex flex-row items-center justify-between p-2 md:p-10 bg-white border-b-2 border-border shadow-lg">
      <div className="flex-shrink-0">
        <Link to={ROUTES.home}>
          <img src="/logos/logo-tokenlab.jpeg" className="w-14 h-14" alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-lg text-secondary md:text-xl font-bold text-center">Gerencie seus eventos com a TokenLab</span>
      </div>
      <div className="flex-shrink-0">
      <Link to={ROUTES.me}>
        <CircleUser size={30} />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
