import React from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TaxiTogetherNweet = ({ nweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("해당 글을 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`taxiTogether/${nweetObj.id}`).delete();
      nweetObj.attachmentUrl &&
        (await storageService.refFromURL(nweetObj.attachmentUrl).delete());
    }
  };

  const onDetail = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
  };

  return (
    <div className="nweet">
      <form className="container nweetEdit">
        <Link to={`/taxiTogether/detailTaxi/${nweetObj.id}`}>
          <button value={nweetObj.location} onClick={onDetail}>
            {nweetObj.location + "  |  " + nweetObj.title}
          </button>
        </Link>
      </form>
      {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
      {isOwner && (
        <div class="nweet__actions">
          <span onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      )}
    </div>
  );
};

export default TaxiTogetherNweet;
