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
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "ADD_NEW_POST_TO_TIMELINE":
      console.log(action.payload);
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case "TOGGLE_LIKE":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id !== action.payload.postId) return post;

          const { userId } = action.payload;
          const userLiked = post.likes.includes(userId);
       

          return {
            ...post,
            likes: userLiked
              ? post.likes.filter((id) => id !== userId) // remove like
              : [...post.likes, userId], // add like
          };
        }),
      };

    default:
      return state;
  }
};

export default timelineReducer;
