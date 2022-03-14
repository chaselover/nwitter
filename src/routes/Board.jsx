import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "components/ListItem";
import axios from "axios";

const Board = ({ match }) => {
  const type = match.params.type;
  const [data, setData] = useState([]);

  async function fetchUrl() {
    await axios
      .get(`http://localhost:8080/post/find`, {
        params: {
          type: type
        }
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchUrl();
    console.log(type);
  }, [type]);

  return (
    <>
      <h1>글 목록</h1>
      <div className="list-title">{type} 게시판</div>
      <section className="head-wrapper">
        <span className="title-column">제목</span>
        <span>작성자</span>
        <span>작성일</span>
      </section>
      <section className="list-wrapper">
        {data.map((article) => (
          <ListItem board_id={article.id} title={article.title} />
        ))}
      </section>
      <Link to="/write">
        <button>글쓰기</button>
      </Link>
    </>
  );
};

export default Board;
