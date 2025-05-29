import React, { useState } from "react";
import styled from "styled-components";

export const PostMobile = () => {
    const [ isOpenPostBox, setIsOpenPostBox ] = useState(false);
    const [msg, setMsg] = useState("");

    const onPostMobileButton = () => {
        setIsOpenPostBox(!isOpenPostBox)
        console.log('投稿（Mobile ver）');
        console.log(msg);
    }

    return (
        <>
            { isOpenPostBox && (
            <SMobilePostBoxContainer>
                <SMobilePostBox>
                    <SMobilePostTextArea
                        rows={1}
                        value={msg}
                        onChange={(evt) => setMsg(evt.target.value)}
                    ></SMobilePostTextArea>
                </SMobilePostBox>
            </SMobilePostBoxContainer>
            )}
            <SPostMobileButton onClick={onPostMobileButton}><img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/posticon.png?raw=true" alt="button" width="30" height="30" /></SPostMobileButton>
        </>
    )
}

const SPostMobileButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  position: fixed;
  bottom: 45px;
  right: 10px;
  padding: 3px 5px 0px 4px;
  border-radius: 50%;
  cursor: pointer;
`;

const SMobilePostBoxContainer = styled.div`
  display: inline-block;
  justify-content: center;
`;

const SMobilePostBox = styled.div`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(34, 34, 34);
  width: 90%;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 20px;
  box-shadow: rgb(170, 170, 170) 0px 8px 8px;
`;

const SMobilePostTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  width: 100%;
`;
