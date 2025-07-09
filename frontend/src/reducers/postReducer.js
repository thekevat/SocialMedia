const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };

    case "UPLOAD_FAIL":
      return { ...state, error: true, uploading: false };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
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

export default postReducer;
