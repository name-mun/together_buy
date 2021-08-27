import React, { useEffect, useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweet";
import DetailContent from "components/DetailContent";

const Detail = ({ match }) => {
  const [data, setData] = useState({});
  const { no } = match.params;
  console.log(no + "s");

  return (
    <>
      <h2 align="center">게시글 상세정보</h2>

      <div className="post-view-wrapper">
        <>
          <div className="post-view-row">
            <label>게시글 번호</label>
            <label>{no}</label>
          </div>
          <div className="post-view-row">
            <label>제목</label>
            <label>{data.title}</label>
          </div>
          <div className="post-view-row">
            <label>작성일</label>
            <label>{data.createDate}</label>
          </div>
          <div className="post-view-row">
            <label>조회수</label>
            <label>{data.readCount}</label>
          </div>
          <div className="post-view-row">
            <label>내용</label>
            <div>{data.content}</div>
          </div>
        </>
      </div>
    </>
  );
};
export default Detail;
