import React, { useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";

const WriteGoods = ({ userObj }) => {
  const [number, setNumber] = useState(0);
  const [nweetLocation, setNweetLocation] = useState("");
  const [nweetTitle, setNweetTitle] = useState("");
  const [nweetContent, setNweetContent] = useState("");
  const [nweetPhoneN, setNweetPhoneN] = useState("");
  const [attachment, setAttachment] = useState("");
  const history = useHistory();

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

    await dbService.collection("goodsTogether").doc(`${number}`).set({
      location: nweetLocation,
      title: nweetTitle,
      content: nweetContent,
      phone: nweetPhoneN,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setNweetLocation("");
    setNweetTitle("");
    setNweetContent("");
    setNweetPhoneN("");
    setAttachment("");
  };
  const onChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setNweetLocation(value);
    setNumber(number + 1);
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
  const onChange4 = (event) => {
    const {
      target: { value },
    } = event;
    setNweetPhoneN(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment("");

  return (
    <form onClick={onSubmit} className="factoryForm">
      <div>
        <input
          className="factoryInput__input_location"
          value={nweetLocation}
          onChange={onChange1}
          type="text"
          placeholder="거래장소"
          maxLength={120}
        />
        <input
          className="factoryInput__input_title"
          value={nweetTitle}
          onChange={onChange2}
          type="text"
          placeholder="제목"
          maxLength={10}
        />
      </div>
      <div>
        <input
          className="factoryInput__input_contect"
          value={nweetContent}
          onChange={onChange3}
          type="text"
          placeholder="상세 내용"
          maxLength={120}
        />
      </div>
      <div>
        <input
          className="factoryInput__input_Phone"
          value={nweetPhoneN}
          onChange={onChange4}
          type="text"
          placeholder="연락처"
          maxLength={120}
        />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>사진 추가</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>지우기</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      <input
        type="submit"
        value="게시"
        className="factoryInput__arrow"
        onClick={() => {
          history.goBack();
        }}
      />
    </form>
  );
};

export default WriteGoods;
