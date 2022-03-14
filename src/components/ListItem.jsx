import React from "react";
import { Link } from "react-router-dom";

function ListItem({ board_id, title }) {
  return (
    <Link
      to={{
        pathname: "/detail",
        search: `?id=${board_id}`
      }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="list-item">
        <div className="id">{board_id}</div>
        <div className="column-title">{title}</div>
        <div className="member">작성자</div>
      </div>
    </Link>
  );
}

export default ListItem;
