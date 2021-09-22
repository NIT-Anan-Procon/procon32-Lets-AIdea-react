import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Library.css";
import Title from "../common/components/Title";
import LibraryRow from "./LibraryRow";

export default function Library() {
  const [data, setData] = useState();
  const params = new FormData();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get("http://localhost/API/Library/GetLibrary.php", {
        params: {
          search: 0,
          sort: 0,
          period: 0,
          page: 1,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const handleSubmit = () => {
    history.push("/");
  };

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    window.history.pushState(null, null, location.href);
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  });

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div id="library">
        <Title text="ライブラリ" />
        <form onSubmit={handleSubmit} className="buttonForm">
          <input type="submit" value="戻る" />
        </form>
        <div id="libraryTable">
          {data.map((data, index) => {
            return (
              <LibraryRow
                icon={data.icon}
                name={data.name}
                image={data.pictureURL}
                ngWord={data.ng}
                description={data.explanation}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
