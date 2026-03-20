import { Link, useLocation } from "react-router-dom";
import { Home, FlaskConical } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <FlaskConical className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-semibold text-sm tracking-tight text-foreground">
            Material Recovery
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isHome
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
