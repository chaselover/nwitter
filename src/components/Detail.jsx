import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

// function useFetch(url, board_type) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   function fetchUrl() {
//     axios
//       .get(`${url}`, {
//         params: {
//           type: board_type
//         }
//       })
//       .then((response) => {
//         console.log(response);
//         setData(response.data);
//       })
//       .catch((e) => console.log(e));
//     setLoading(false);
//   }

//   useEffect(() => {
//     if (board_type) {
//       fetchUrl();
//     } else {
//       setData(null);
//       setLoading(false);
//     }
//   }, []);
//   return [data, loading];
// }

const Detail = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  console.log(query);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/find/${query.id}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((e) => console.log(e));
  }, [query.id]);

  const deleteArticle = () => {
    axios
      .get(`http://localhost:8080/post/del/${query.id}`)
      .then(
        (res) =>
          (window.location.href = `http://localhost:3000/board/${data.type}`)
      )
      .catch((e) => console.log(e));
  };

  return (
    <div className="Read">
      <div className="list-title">폼 게시판</div>
      <div className="read_title">{data.title}</div>
      <table background-color="white">
        <tbody>
          <tr align="center" className="table_info">
            <td width="15%">작성자</td>
            <td width="15%">숭주</td>
          </tr>
          <tr height="500px">
            <td colspan="6">{data.contents}</td>
          </tr>
        </tbody>
      </table>
      <div className="ud_btn">
        <Link
          to={{
            pathname: "/update",
            search: `?board_id=${query.id}`
          }}
        >
          <button className="btn1">수정</button>
        </Link>
        <button className="btn1" onClick={deleteArticle}>
          삭제
        </button>
      </div>
      <div className="return_btn">
        <button>목록으로 돌아가기</button>
      </div>
    </div>
  );
};
export default Detail;
