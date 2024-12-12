import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageLinkContext } from '../providers/PageLinkProvider.tsx';

export default function PageLink() {
    const { setPageNumber } = useContext(PageLinkContext);

    const onNextPageClick = () => {
      console.log('next');
      setPageNumber((prevPage) => prevPage += 1);
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
  text-align: rigth;
`

const SPageLinkButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  width: 15%;
`