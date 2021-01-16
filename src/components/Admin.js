import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Admin = () => {
  const history = useHistory();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe um usúario");
      setUser(auth.currentUser);
    } else {
      console.log("Não existe um usúario");
      history.push("/login");
    }
  }, [history]);

  return user && (
    <div className="d-flex align-items-center justify-content-end mt-2">
      <button className="btn btn-dark">Add Tarefa</button>
    </div>
  );
};

export default Admin;
