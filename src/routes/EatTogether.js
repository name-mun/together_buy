import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import EatTogetherNweet from "components/EaTN/EatTogetherNweet";
import EatTogetherNweetFactory from "components/EaTN/EatTogetherNweetFactory";

const EatTogether = ({ userObj }) => {
  const [eatnweets, seteatNweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("eatTogether")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        seteatNweets(nweetArray);
      });
  }, []);

  return (
    <div className="container">
      <EatTogetherNweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {eatnweets.map((Nweet) => (
          <EatTogetherNweet
            key={Nweet.id}
            nweetObj={Nweet}
            isOwner={Nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default EatTogether;
