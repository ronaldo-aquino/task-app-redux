import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addTask, onChangeModelTask } from "../redux/taskDucks";
import "./AddTaskForm.css";

const AddTaskForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { taskAddModel } = useSelector(({ taskFirebase }) => taskFirebase);

  const handleOnChangeTask = (e) => {
    dispatch(onChangeModelTask(e));
  };

  const handleSumitAddTask = async (e) => {
    e.preventDefault();

    const emptyTitle = !taskAddModel.title.trim();
    const emptyDescription = !taskAddModel.description.trim();
    if (emptyTitle || emptyDescription)
      return console.log("Nenhum campo pode fica fazio.");

    dispatch(addTask(taskAddModel));
    history.push("./admin");
  };

  return (
    <div className="form-add-task">
      <form onSubmit={handleSumitAddTask} className="form-add-task-content">
        <div className="form-group">
          <label>Título da tarefa</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Digite aqui sua tarefa"
            onChange={(e) => handleOnChangeTask(e)}
            value={taskAddModel.title}
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Digite uma descrição curta."
            onChange={(e) => handleOnChangeTask(e)}
            value={taskAddModel.description}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-dark">
            Salvar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
