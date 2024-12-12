import React from 'react';
import styled from 'styled-components';

export default function PageLink() {
    const onNextPageClick = () => {
      console.log('next');
    }

	return (
        <SPageLink>
            <SPageLinkRow>
                <SPageLinkButton onClick={onNextPageClick}>次へ</SPageLinkButton>
            </SPageLinkRow>
        </SPageLink>
	)
}


const SPageLink = styled.div`
  padding: 8px;
`

const SPageLinkRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`

const SPageLinkButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
`