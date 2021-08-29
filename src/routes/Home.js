import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const history = useHistory();

  const eatTogetherClick = () => {
    history.push("/eatTogether");
  };
  const goodsTogetherClick = () => {
    history.push("/goodsTogether");
  };
  const taxiTogetherClick = () => {
    history.push("/taxiTogether");
  };

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
      <div className="eatTogetherClick">
        <span onClick={eatTogetherClick}>배달 같이</span>
      </div>

      <div className="goodsTogetherClick">
        <span onClick={goodsTogetherClick}>물건 같이</span>
      </div>

      <div className="taxiTogetherClick">
        <span onClick={taxiTogetherClick}>택시 같이</span>
      </div>
    </div>
  );
};
export default Home;
