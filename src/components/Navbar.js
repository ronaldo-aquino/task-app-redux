import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const history = useHistory();
  const { currentUser } = useSelector(({ user }) => user);

  const logOut = async () => {
    await auth.signOut();
    history.push("./login");
  };
  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin">
          Task App
        </Link>
        <div>
          <div className="d-flex">
            {currentUser ? (
              <button className="btn btn-dark mr-2" onClick={logOut}>
                Sair
              </button>
            ) : (
              <NavLink className="btn btn-dark mr-2" to="/login" exact>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
