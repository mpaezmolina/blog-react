import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h1>Unplugged</h1>
      </Link>
      <h3>Hey, I just wanted to write!</h3>
    </div>
  );
}

export default Header;
