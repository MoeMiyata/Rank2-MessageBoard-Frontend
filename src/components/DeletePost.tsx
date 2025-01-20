import React from "react"
import styled from "styled-components"

export const DeletePost = () => {
    return <SDeletePostButton>削除</SDeletePostButton>
}

const SDeletePostButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  border-radius: 8px;
  padding: 0px 10px;
  margin-left: 30px;
`