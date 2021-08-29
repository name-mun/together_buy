import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import GoodsTogetherNweet from "components/GoodsTN/GoodsTogetherNweet";
import GoodsTogetherNweetFactory from "components/GoodsTN/GoodsTogetherNweetFactory";

const GoodsTogether = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("goodsTogether")
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
      <GoodsTogetherNweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <GoodsTogetherNweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default GoodsTogether;
