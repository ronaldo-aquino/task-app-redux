import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import "./AddTaskForm.css";

const AddTaskForm = () => {
  const history = useHistory();
  const { currentUser } = useSelector(({ user }) => user);

  const [taskAddModel, setTaskAddModel] = useState({
    title: "",
    description: "",
    finished: false,
  });

  const handleOnChangeTask = (e) => {
    const { name, value } = e.target;
    setTaskAddModel({
      ...taskAddModel,
      [name]: value,
    });
  };

  const handleSumitAddTask = async (e) => {
    e.preventDefault();

    const emptyTitle = !taskAddModel.title.trim();
    const emptyDescription = !taskAddModel.description.trim();
    if (emptyTitle || emptyDescription)
      return console.log("Nenhum campo pode fica fazio.");

    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("task")
        .add(taskAddModel);

      setTaskAddModel({
        title: "",
        description: "",
        finished: false,
      });
      history.push("./admin");
    } catch (error) {
      console.log(error);
    }
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
