import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

// TOAST UI Editor import
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

// TOAST UI Editor Plugins
import chart from "@toast-ui/editor-plugin-chart";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";

const Update = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/find/${query.id}`)
      .then((response) => {
        console.log(response);
        setContent(response.data.contents);
        setType(response.data.type);
      })
      .catch((e) => console.log(e));
  }, [query.id]);

  // editor를 가리킬 ref 변수. 이걸 editor 컴포넌트의 옵션으로 넘겨준 후 후에 이거의 instance를 얻어 사용하면 됨.
  const editorRef = useRef();

  const btnClickListener = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    console.log(getContent_md);
    const getContent_html = editorInstance.getHTML();
    console.log(getContent_html);
    setContent(`${getContent_html}`);
    axios
      .post("http://localhost:8080/post/update", {
        type: type,
        title: title,
        contents: content
      })
      .then(
        (res) =>
          (window.location.href = `http://localhost:3000/detail/${res.id}`)
      )
      .catch((e) => console.log(e));
  };

  return (
    <>
      <input
        className="title-input"
        type="text"
        value={title}
        placeholder="일단제목"
        onChange={(e) => setTitle(e.target.value)}
        name="title"
      />
      <input
        className="mbti-input"
        type="text"
        value={type}
        placeholder={type}
        onChange={(e) => setType(e.target.value)}
        name="mbti"
      />
      <Editor
        initialValue="에디터입니다."
        usageStatistics={false}
        initialEditType="markdown"
        plugins={[
          chart,
          codeSyntaxHighlight,
          colorSyntax,
          tableMergedCell,
          uml
        ]}
        ref={editorRef}
        placeholder={content}
      />
      <button style={{ marginTop: "10px" }} onClick={btnClickListener}>
        등록하기
      </button>
    </>
  );
};

export default Update;
