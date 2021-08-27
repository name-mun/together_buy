import React, { useEffect, useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweet";
import DetailContent from "components/DetailContent";

const Detail = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);
  return (
    <div className="container">
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <DetailContent
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Detail;
