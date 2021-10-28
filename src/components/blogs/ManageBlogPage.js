import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as blogActions from "../../redux/actions/blogActions";
import PropTypes from "prop-types";
import AddBlog from "./AddBlog";
import { newBlog } from "../../../tools/mockData";

function ManageBlogPage({ blogs, saveBlog, loadBlogs, history, ...props }) {
  const [blog, setBlog] = useState({ ...props.blog });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (blogs.length === 0) {
      loadBlogs().catch((error) => {
        alert("Loading blogs failed" + error);
      });
    }else{
      setBlog({ ...props.blog })
    }
  }, [props.blog]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: name === "id" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveBlog(blog).then(() => {
      history.push("/blogs");
    });
  }

  return (
    <AddBlog
      blog={blog}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageBlogPage.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  saveBlog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getBlogById(blogs, id) {
  return blogs.find((blog) => blog.id == id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const blog =
    id && state.blogs.length > 0 ? getBlogById(state.blogs, id) : newBlog;
  return {
    blog,
    blogs: state.blogs,
  };
}

const mapDispatchToProps = {
  loadBlogs: blogActions.loadBlogs,
  saveBlog: blogActions.saveBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBlogPage);
