import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function blogReducer(state = initialState.blogs, action) {
  switch (action.type) {
    case types.CREATE_BLOG_SUCCESS:
      return [...state, { ...action.blog }];
    case types.UPDATE_BLOG_SUCCESS:
      return state.map((blog) =>
        blog.id === action.blog.id ? action.blog : blog
      );
    case types.LOAD_BLOGS_SUCCESS:
      return action.blogs;
    case types.DELETE_BLOG_OPTIMISTIC:
      return state.filter((blog) => blog.id !== action.blog.id);
    default:
      return state;
  }
}
