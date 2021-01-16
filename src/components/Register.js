import { auth } from "../firebase";

import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [dataUserRegister, setDataUserRegister] = useState({
    email: "",
    password: "",
  });

  const [errorRegister, setErrorRegister] = useState(false);

  const handleOnChangeRegister = (e) => {
    const { name, value } = e.target;
    setDataUserRegister({
      ...dataUserRegister,
      [name]: value,
    });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!dataUserRegister.email.trim())
      return setErrorRegister("O email não pode ficar fazio.");
    if (!dataUserRegister.password.trim())
      return setErrorRegister("A senha não pode ficar fazia.");
    if (dataUserRegister.password.length < 6)
      return setErrorRegister("A senha precisa ter no mínimo 6 caracteres.");

    setErrorRegister(false);

    registerUser();
  };

  const registerUser = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(
        dataUserRegister.email,
        dataUserRegister.password
      );
      setDataUserRegister({
        email: "",
        password: "",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email")
        return setErrorRegister("Email inválido.");
      if (error.code === "auth/email-already-in-use")
        return setErrorRegister("Email já cadastrado.");
    }
  }, [dataUserRegister]);

  return (
    <div className="Login-Component">
      <div className="form-login">
        <h3 className="text-white text-center mb-3">FAÇA SEU CADASTRO</h3>

        {errorRegister && (
          <div className="alert alert-danger" role="alert">
            {errorRegister}
          </div>
        )}

        <form onSubmit={handleSubmitRegister}>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Digite seu email..."
            onChange={(e) => handleOnChangeRegister(e)}
            value={dataUserRegister.email}
          />
          <input
            type="password"
            name="password"
            className="form-control mt-3"
            placeholder="Digite sua senha..."
            onChange={(e) => handleOnChangeRegister(e)}
            value={dataUserRegister.password}
          />
          <button type="submit" className="btn btn-primary btn-block mt-3">
            REGISTRAR-SE
          </button>

          <button
            type="button"
            className="btn btn-warning btn-sm btn-block mt-3"
            onClick={() => history.push("/login")}
          >
            Já tem uma conta? Faça login.
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
