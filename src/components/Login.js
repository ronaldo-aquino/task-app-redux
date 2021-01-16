import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  return (
    <div className="Login-Component">
      <div className="form-login">
        <h3 className="text-white text-center mb-3">FAÇA SEU LOGIN</h3>
        <form>
          <input
            type="email"
            className="form-control"
            placeholder="Digite seu email..."
          />
          <input
            type="password"
            className="form-control mt-3"
            placeholder="Digite sua senha..."
          />
          <button type="submit" className="btn btn-primary btn-block mt-3">
            ENTRAR
          </button>
          <button
            type="button"
            className="btn btn-warning btn-sm btn-block mt-3"
            onClick={() => history.push("/")}
          >
            Não tem uma conta? Cadastre-se.
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
