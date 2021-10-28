import * as types from "./actionTypes";
import * as blogApi from "../../api/blogApi";

export function loadBlogSuccess(blogs){
    return { type: types.LOAD_BLOGS_SUCCESS, blogs };
}

export function createBlogSuccess(blog) {
  return { type: types.CREATE_BLOG_SUCCESS, blog };
}

export function updateBlogSuccess(blog) {
  return { type: types.UPDATE_BLOG_SUCCESS, blog };
}

export function deleteBlogOptimistic(blog) {
  return { type: types.DELETE_BLOG_OPTIMISTIC, blog };
}

export function loadBlogs() {
  return function (dispatch) {
    return blogApi
      .getBlogs()
      .then( blogs => {
        dispatch(loadBlogSuccess(blogs));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}


export function saveBlog(blog) {
  return function (dispatch, getState) {
    return blogApi
      .saveBlog(blog)
      .then((savedBlog) => {
        blog.id
          ? dispatch(updateBlogSuccess(savedBlog))
          : dispatch(createBlogSuccess(savedBlog));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteBlog(blog) {
  return function (dispatch) {
    dispatch(deleteBlogOptimistic(blog));
    return blogApi.deleteBlog(blog.id);
  };
}