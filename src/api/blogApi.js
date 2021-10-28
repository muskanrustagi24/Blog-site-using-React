import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/blogs/";

export function getBlogs() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveBlog(blog) {
  return fetch(baseUrl + (blog.id || ""), {
    method: blog.id ? "PUT" : "POST", 
    headers: { "content-type": "application/json" },
    body: JSON.stringify(blog)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBlog(blogId) {
  return fetch(baseUrl + blogId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
