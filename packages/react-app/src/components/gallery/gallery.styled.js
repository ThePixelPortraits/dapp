import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const GalleryItem = styled.div`
  display: flex;
  width: 25%;

  a {
    display: block;
    width: 100%;
    position: relative;
    margin: 15px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  div {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 20px;
    background: rgba(229, 229, 229, 0.85);
    padding: 0 15px;
    text-align: center;
  }

  &:hover {
    div {
      display: flex;
    }
  }

  @media ${theme.breakpoints.tabletDown} {
    width: 50%;
  }

  //img:first-child {
  //  position: absolute;
  //  z-index: 1;
  //}

  img:last-child {
    padding: 6%;
  }
`
