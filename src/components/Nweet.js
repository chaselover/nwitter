import React, { useState, Fragment } from "react"
import { dbService } from "fBase";

// isOwner가 true면 Fragment가 보임.
const Nweet = ({nweetObj, isOwner}) => {
    // editing mode인지 아닌지 true false로 알려줌
    const [editing, setEditing] = useState(false);
    // input에 입력된 text를 업데이트 해줌.
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?")
        if(ok){
            // delete nweet (document의 id를 통해 삭제)
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }
    const toggleEditiong = () => {
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
        <div>
            {editing ? (
                <Fragment>
                    {isOwner &&
                        <Fragment>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="Edit your nweet" value={newNweet} onChange={onChange} required />
                                <input type="submit" value="Update Nweet" />
                            </form>
                            <button onClick={toggleEditiong}>Cancel</button>
                        </Fragment>    
                    }
                </Fragment>
            ) : (
                <Fragment>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <Fragment>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditiong}>Edit Nweet</button>
                    </Fragment>
                )}
                </Fragment>
            )}
        </div>
    )
}

export default Nweet