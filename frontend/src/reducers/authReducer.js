const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_STARTED":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, error: false };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        erro: false,
      };
    case "UPDATING FAIL":
      return { ...state, updateLoading: false, error: true };
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };
    case "RECEIVED_FOLLOW":
      if (state.authData.user.follower.includes(action.data)) return state; 
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            follower: [...state.authData.user.follower, action.data],
          },
        },
      };
    case "RECEIVED_UNFOLLOW":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            follower: state.authData.user.follower.filter(
              (id) => id !== action.data
            ),
          },
        },
      };
    default:
      return state;
  }
};
export default authReducer;
