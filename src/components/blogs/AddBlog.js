import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";

const AddBlog = ({
  blog,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{blog.id ? "Edit" : "Add"} Blog</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={blog.title}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        name="category"
        label="Category"
        value={blog.category}
        onChange={onChange}
        error={errors.category}
      />

      <TextInput
        name="content"
        label="Content"
        value={blog.content}
        onChange={onChange}
        error={errors.content}
      />

      <button type="submit" disabled={saving} className="btn btn-primary mt-3">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

AddBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AddBlog;
