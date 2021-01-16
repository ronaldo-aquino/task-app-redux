import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin">
          Task App
        </Link>
        <div>
          <div className="d-flex">
            <NavLink className="btn btn-dark mr-2" to="/login" exact>Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
