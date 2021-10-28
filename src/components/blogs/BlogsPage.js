import React from "react";
import { connect } from "react-redux";
import * as blogActions from "../../redux/actions/blogActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import BlogList from "./BlogList";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

class BlogsPage extends React.Component {
  state = {
    redirectToAddBlogPage: false,
  };

  componentDidMount() {
    const { blogs, actions } = this.props;

    if (blogs.length === 0) {
      actions.loadBlogs().catch((error) => {
        alert("Loading blogs failed" + error);
      });
      console.log(blogs);
    }
  }

  handleDeleteBlog = blog => {
    alert("Blog Successfully Deleted");
    this.props.actions.deleteBlog(blog);
  }

  render() {
    return (
      <>
        {this.state.redirectToAddBlogPage && <Redirect to="/blog" />}
        <h2>Blogs</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-blog"
          onClick={() => this.setState({ redirectToAddBlogPage: true })}
        >
          Add Blog
        </button>

        <BlogList onDeleteClick={this.handleDeleteBlog} blogs={this.props.blogs} />
      </>
    );
  }
}

BlogsPage.propTypes = {
  blogs: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    blogs: state.blogs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions:{
      loadBlogs: bindActionCreators(blogActions.loadBlogs, dispatch),
      deleteBlog: bindActionCreators(blogActions.deleteBlog, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);
