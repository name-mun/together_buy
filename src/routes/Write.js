import React, { useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const Write = ({ userObj }) => {
  const [number, setNumber] = useState(0);
  const [nweetLocation, setNweetLocation] = useState("");
  const [nweetTitle, setNweetTitle] = useState("");
  const [nweetContent, setNweetContent] = useState("");
  const [attachment, setAttachment] = useState("");

  const onIncrease = () => {
    setNumber(number + 1);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweetLocation === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      id: onIncrease,
      location: nweetLocation,
      title: nweetTitle,
      content: nweetContent,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweetLocation("");
    setNweetTitle("");
    setNweetContent("");
    setAttachment("");
  };
  
    const {
      target: { value },
    } = event;
    setNweetLocation(value);
  };
  const onChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setNweetTitle(value);
  };
  const onChange3 = (event) => {
    const {
      target: { value },
    } = event;
    setNweetContent(value);
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div>
        <input
          className="factoryInput__input"
          value={nweetLocation}
          onChange={onChange1}
          type="text"
          placeholder="거래장소"
          maxLength={120}
        />
        <input
          className="factoryInput__input"
          value={nweetTitle}
          onChange={onChange2}
          type="text"
          placeholder="제목"
          maxLength={10}
        />
      </div>
      <div>
        <input
          className="factoryInput__input"
          value={nweetContent}
          onChange={onChange3}
          type="text"
          placeholder="상세 내용"
          maxLength={120}
        />
      </div>
      <input type="submit" value="게시" className="factoryInput__arrow" />
    </form>
  );
};

export default Write;
