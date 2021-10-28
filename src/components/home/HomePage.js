import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Blog-Website</h1>
    <p>
      Blogging is a communications mechanism handed to us by the long tail of
      the Internet.
    </p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn More
    </Link>
  </div>
);

export default HomePage;