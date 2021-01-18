import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteTask,
  finishedTask,
  getDataTasks,
  modeEdit,
} from "../redux/taskDucks";

import "./ReadTasks.css";

const ReadTask = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { tasks } = useSelector(({ taskFirebase }) => taskFirebase);

  useEffect(() => {
    const getData = async () => {
      dispatch(getDataTasks());
    };

    getData();
  }, [dispatch]);

  const editMode = (task) => {
    dispatch(modeEdit(task));
    history.push("./editar-tarefa");
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => history.push("/add-tarefa")}
        >
          Add Tarefa
        </button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Finalizado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task.id}>
                <td className={task.finished ? "finished-task" : undefined}>
                  {task.title}
                </td>
                <td className={task.finished ? "finished-task" : undefined}>
                  {task.description}
                </td>
                <td>
                  {task.finished ? (
                    <span className="badge badge-success p-1">SIM</span>
                  ) : (
                    <span className="badge badge-info p-1">NÃO</span>
                  )}
                </td>
                <td>
                  <div>
                    <button
                      className="btn btn-sm btn-dark mr-2"
                      onClick={() => dispatch(finishedTask(task.id))}
                      disabled={task.finished}
                    >
                      Finalizar
                    </button>
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      disabled={task.finished}
                      onClick={() => editMode(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(deleteTask(task.id))}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ReadTask;
