import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetching() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://<hostname>:<port>/<database>/<collection>`)
      .then((res) => {
        console.log(res);
      })
      .catch.log(err);
  });

  return;
  <div>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </div>;
}

export default DataFetching;
