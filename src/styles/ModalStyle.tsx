import { css, keyframes } from '@emotion/react'

const modalOpened = keyframes`
  0% {
      opacity: 0;
      visibility: visible;
  }
  100% {
      opacity: 1;
      visibility: visible;
  }
`

const modalClosed = keyframes`
  0% {
      opacity: 1;
      visibility: visible;
  }
  100% {
      opacity: 0;
      visibility: hidden;
  }
`

//アコーディオン全体（wrapper）
export const modal = css`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all .6s;
  &[aria-hidden="true"] {
    animation-name: ${modalClosed};
    animation-duration: .6s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    /* opacity: 0;
    visibility: hidden; */

  }
  &[aria-hidden="false"] {
    animation-name: ${modalOpened};
    animation-duration: .6s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    /* opacity: 1;
    visibility: visible; */

  }
`;



export const modal_overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
  z-index: 1;
`;



