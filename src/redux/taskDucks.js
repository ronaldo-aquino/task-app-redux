import { db } from "../firebase";

const initialState = {
  tasks: [],
  editMode: false,
  idTaskCurrent: "",
  task: {},
  taskAddModel: {
    title: "",
    description: "",
    finished: false,
  },
};

const GET_ALL_TASK = "GET_ALL_TASK";
const DELETE_TASK = "DELETE_TASK";
const FINISHED_TASK = "FINISHED_TASK";
const MODO_EDIT = "MODO_EDIT";
const ADD_TASK = "ADD_TASK";
const ON_CHANGE_TASK = "ON_CHANGE_TASK";
const ON_CHANGE_TASK_EDIT = "ON_CHANGE_TASK_EDIT";
const TASK_EDIT = "TASK_EDIT";

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    case FINISHED_TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    case MODO_EDIT:
      return {
        ...state,
        editMode: action.payload.editMode,
        idTaskCurrent: action.payload.idTaskCurrent,
        task: action.payload.task,
      };

    case ON_CHANGE_TASK:
      return {
        ...state,
        taskAddModel: action.payload,
      };

    case ON_CHANGE_TASK_EDIT:
      return {
        ...state,
        task: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        taskAddModel: action.payload,
      };

    case TASK_EDIT:
      return {
        ...state,
        taskAddModel: action.payload,
      };

    default:
      return state;
  }
};

export const getDataTasks = () => async (dispatch, getState) => {
  const { currentUser } = getState().user;

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

    dispatch({
      type: GET_ALL_TASK,
      payload: setTasksArray,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (idTask) => async (dispatch, getState) => {
  const { currentUser } = getState().user;
  const { tasks } = getState().taskFirebase;
  try {
    await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("task")
      .doc(idTask)
      .delete();

    const filterArray = tasks.filter((task) => task.id !== idTask);

    dispatch({
      type: DELETE_TASK,
      payload: filterArray,
    });
  } catch (error) {
    console.log(error);
  }
};

export const finishedTask = (idTask) => async (dispatch, getState) => {
  const { currentUser } = getState().user;
  const { tasks } = getState().taskFirebase;

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

    dispatch({
      type: FINISHED_TASK,
      payload: tasksFinishedMap,
    });
  } catch (error) {
    console.log(error);
  }
};

export const modeEdit = (task) => (dispatch) => {
  dispatch({
    type: MODO_EDIT,
    payload: {
      editMode: true,
      idTaskCurrent: task.id,
      task: task,
    },
  });
};

export const onChangeModelTask = (e) => (dispatch, getState) => {
  const { taskAddModel } = getState().taskFirebase;
  const { name, value } = e.target;

  dispatch({
    type: ON_CHANGE_TASK,
    payload: {
      ...taskAddModel,
      [name]: value,
    },
  });
};

export const onChangeModelTaskEdit = (e) => (dispatch, getState) => {
  const { task } = getState().taskFirebase;
  const { name, value } = e.target;

  dispatch({
    type: ON_CHANGE_TASK_EDIT,
    payload: {
      ...task,
      [name]: value,
    },
  });
};

export const editTask = () => async (dispatch, getState) => {
  const { task, idTaskCurrent } = getState().taskFirebase;
  const { currentUser } = getState().user;

  try {
    await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("task")
      .doc(idTaskCurrent)
      .update(task);

    dispatch({
      type: TASK_EDIT,
      payload: {
        title: "",
        description: "",
        finished: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTask = (taskAddModel) => async (dispatch, getState) => {
  const { currentUser } = getState().user;
  try {
    await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("task")
      .add(taskAddModel);

    dispatch({
      type: ADD_TASK,
      payload: {
        title: "",
        description: "",
        finished: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default taskReducer;
