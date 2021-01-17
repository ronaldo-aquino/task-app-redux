import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

const ReadTask = () => {
  const history = useHistory();
  const { currentUser } = useSelector(({ user }) => user);

  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idTaskCurrent, setIdTaskCurrent] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const { docs } = await db
          .collection("users")
          .doc(currentUser.uid)
          .collection("task")
          .orderBy("finished")
          .get();

        const setTasksArray = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(setTasksArray);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [currentUser]);

  const deleteTask = async (idTask) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("task")
        .doc(idTask)
        .delete();

      const filterArray = tasks.filter((task) => task.id !== idTask);
      setTasks(filterArray);
    } catch (error) {
      console.log(error);
    }
  };

  const finishedTask = async (idTask) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("task")
        .doc(idTask)
        .update({
          finished: true,
        });

      const tasksFinishedMap = tasks.map((task) =>
        task.id === idTask ? { ...task, finished: true } : task
      );

      setTasks(tasksFinishedMap);
    } catch (error) {
      console.log(error);
    }
  };

  const modeEdit = (task) => {
    setIdTaskCurrent(task.id);
    setEditMode(true);
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
                <td>{task.title}</td>
                <td>{task.description}</td>
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
                      onClick={() => finishedTask(task.id)}
                      disabled={task.finished}
                    >
                      Finalizar
                    </button>
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      disabled={task.finished}
                      onClick={() => modeEdit(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTask(task.id)}
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
