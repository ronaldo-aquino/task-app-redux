import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddTaskForm from "./components/AddTaskForm";
import Admin from "./components/Admin";
import EditTask from "./components/EditTask";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { currentUserFirebase } from "./redux/userDucks";

const App = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(currentUserFirebase());
  }, [dispatch]);

  const MyRoute = ({ component, path, ...rest }) => {
    if (currentUser) {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="./login" {...rest} />;
    }
  };

  return currentUser !== false ? (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route component={Register} path="/" exact />
          <Route component={Login} path="/login" exact />
          <MyRoute component={Admin} path="/admin" exact />
          <MyRoute component={AddTaskForm} path="/add-tarefa" exact />
          <MyRoute component={EditTask} path="/editar-tarefa" exact />
        </Switch>
      </div>
    </Router>
  ): <p>Carregando</p>
};

export default App;
