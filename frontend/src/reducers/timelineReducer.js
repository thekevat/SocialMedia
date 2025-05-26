const timelineReducer = (
  state = { posts: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "RETRIEVING_START":
      return { ...state, loading: true, error: false };
    case "RETRIEVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETRIEVE_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default timelineReducer;