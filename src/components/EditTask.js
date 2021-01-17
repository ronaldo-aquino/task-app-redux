import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editTask, onChangeModelTaskEdit } from "../redux/taskDucks";
import "./AddTaskForm.css";

const EditTask = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { task } = useSelector(
    ({ taskFirebase }) => taskFirebase
  );

  const handleOnChangeTask = (e) => {
    dispatch(onChangeModelTaskEdit(e));
  };

  const handleSumitEditTask = async (e) => {
    e.preventDefault();

    const emptyTitle = !task.title.trim();
    const emptyDescription = !task.description.trim();
    if (emptyTitle || emptyDescription)
      return console.log("Nenhum campo pode fica fazio.");

    dispatch(editTask());

    history.push("./admin");
  };

  return (
    <div className="form-add-task">
      <form onSubmit={handleSumitEditTask} className="form-add-task-content">
        <div className="form-group">
          <label>Título da tarefa</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Digite aqui sua tarefa"
            onChange={(e) => handleOnChangeTask(e)}
            value={task.title}
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Digite uma descrição curta."
            onChange={(e) => handleOnChangeTask(e)}
            value={task.description}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-dark">
            Editar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
