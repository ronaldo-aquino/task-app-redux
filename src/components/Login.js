import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { useCallback, useState } from "react";

const Login = () => {
  const history = useHistory();

  const [dataUserLogin, setDataUserLogin] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState(false);

  const handleOnChangeLogin = (e) => {
    const { name, value } = e.target;
    setDataUserLogin({
      ...dataUserLogin,
      [name]: value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!dataUserLogin.email.trim())
      return setErrorLogin("O email não pode ficar fazio.");
    if (!dataUserLogin.password.trim())
      return setErrorLogin("A senha não pode ficar fazia.");
    if (dataUserLogin.password.length < 6)
      return setErrorLogin("A senha precisa ter no mínimo 6 caracteres.");

    setErrorLogin(false);

    loginUser();
  };

  const loginUser = useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(
        dataUserLogin.email,
        dataUserLogin.password
      );
      setDataUserLogin({
        email: "",
        password: "",
      });
      setErrorLogin(null);
      history.push("/admin");
    } catch (error) {
      const emailError = error.code === "auth/user-not-found";
      const passwordError = error.code === "auth/wrong-password";
      if (emailError || passwordError)
        return setErrorLogin("Email e/ou senha inválidos");
    }
  }, [dataUserLogin, history]);

  return (
    <div className="Login-Component">
      <div className="form-login">
        <h3 className="text-white text-center mb-3">FAÇA SEU LOGIN</h3>

        {errorLogin && (
          <div className="alert alert-danger" role="alert">
            {errorLogin}
          </div>
        )}

        <form onSubmit={handleSubmitLogin}>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Digite seu email..."
            onChange={(e) => handleOnChangeLogin(e)}
            value={dataUserLogin.email}
          />
          <input
            type="password"
            className="form-control mt-3"
            name="password"
            placeholder="Digite sua senha..."
            onChange={(e) => handleOnChangeLogin(e)}
            value={dataUserLogin.password}
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
