import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Content</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => {
        return (
          <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.category}</td>
            <td>{blog.content}</td>
            <td>
              <Link to={"/blog/" + blog.id} className="btn btn-outline-primary">
                Edit
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(blog)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BlogList;
