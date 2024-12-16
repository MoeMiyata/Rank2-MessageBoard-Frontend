import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageLinkContext } from '../providers/PageLinkProvider.tsx';

export default function PageLink() {
    const { pageNumber } = useContext(PageLinkContext);
    const { setPageNumber } = useContext(PageLinkContext);

    const onBeforePageClick = async () => {
        console.log('before');
        await setPageNumber((prevPage) => prevPage -= 10);
    }

    const onNextPageClick = async () => {
      console.log('next');
      await setPageNumber((prevPage) => prevPage += 10);
    }

    console.log('pageNumber:', pageNumber);

	return (
        <SPageLink>
            <SPageLinkRow>
                {pageNumber<10 ? <SPageLinkButton onClick={onBeforePageClick}>前へ</SPageLinkButton> : null}
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