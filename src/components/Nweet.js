import React, { useState, Fragment } from "react"
import { dbService, storageService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// isOwner가 true면 Fragment가 보임.
const Nweet = ({nweetObj, isOwner}) => {
    // editing mode인지 아닌지 true false로 알려줌
    const [editing, setEditing] = useState(false);
    // input에 입력된 text를 업데이트 해줌.
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    // 늘 Reference를 찾도록 노력해야함(reference는 어딘가의 object이기 때문.)
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?")
        if(ok){
            // delete nweet on DB (document의 id를 통해 삭제)
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            // delete attachment on storage (URL을 통해)
            // refFromURL은 object로 부터 URL을 읽어오는 메소드.
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    const toggleEditing = () => {
        setEditing((prev) => !prev)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log(nweetObj,newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewNweet(value);
    }
    return(
        <div className="nweet">
            {editing ? (
                <Fragment>
                    {isOwner &&
                        <Fragment>
                            <form className="container nweetEdit" onSubmit={onSubmit}>
                                <input type="text" className="formInput" autoFocus placeholder="Edit your nweet" value={newNweet} onChange={onChange} required />
                                <input type="submit" className="formBtn" value="Update Nweet" />
                            </form>
                            <span onClick={toggleEditing} className="formBtn cancelBtn">
                                Cancel
                            </span>
                        </Fragment>    
                    }
                </Fragment>
            ) : (
                <Fragment>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt=""/>}
                {isOwner && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                )}
                </Fragment>
            )}
        </div>
    )
}

export default Nweet