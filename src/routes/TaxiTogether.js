import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import TaxiTogetherNweet from "components/TaxiTN/TaxiTogetherNweet";
import TaxiTogetherNweetFactory from "components/TaxiTN/TaxiTogetherNweetFactory";

const TaxiTogether = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("taxiTogether")
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
      <TaxiTogetherNweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <TaxiTogetherNweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default TaxiTogether;
