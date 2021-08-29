import React, { useEffect, useState } from "react";
import { storageService, dbService } from "fbase";

const DetailEat = ({ match }) => {
  const { no } = match.params;
  let loc, ti, co, im, ph;

  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("eatTogether")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  nweets.map((index) => {
    if (index.id == `${no}`) {
      loc = index.location;
      ti = index.title;
      co = index.content;
      im = index.attachmentUrl;
      ph = index.phone;
    }
  });
  const onClick2 = () => {
    alert(ph);
  };

  return (
    <>
      <div className="post-view-wrapper">
        <>
          <h2 align="center" className="detail-post">
            게시글 상세정보
          </h2>

          <div className="detail-location">
            <label>장소</label>
            <label>{loc}</label>
          </div>
          <div className="detail-title">
            <label>제목</label>
            <label>{ti}</label>
          </div>
          <div className="detail-content">
            <label>내용</label>
            <label>{co}</label>
          </div>
          {im != "" && <img src={im} width="200" height="200" />}
          <div className="detail-Btns">
            <button onClick={onClick2} name="github" className="detail-Btn">
              연락하기
            </button>
          </div>
        </>
      </div>
    </>
  );
};
export default DetailEat;
