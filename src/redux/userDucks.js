import { auth } from "../firebase";

const initialState = {
  currentUser: false,
};

const CURRENT_USER_FIREBASE = "CURRENT_USER_FIREBASE";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_FIREBASE:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export const currentUserFirebase = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    return dispatch({
      type: CURRENT_USER_FIREBASE,
      payload: user,
    });
  });
};

export default userReducer;
