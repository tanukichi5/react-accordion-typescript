import { css } from '@emotion/react'

//アコーディオン全体（wrapper）
export const accordion = css`
  max-width: 600px;
  width: 100%;
  margin: 50px auto;
`;

//アコーディオン単体(item)
export const accordion_item = css`
  margin-bottom: 1em;
  border: solid 1px #ccc;
`;

//アコーディオントリガー
export const accordion_item__triger = css`
  display: flex;
  align-items: center;
  padding: 0;
	background: none;
	border: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
  cursor: pointer;
  width: 100%;
  padding: 1em;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  background: #eee;
  svg {
    display: block;
    margin-left: auto;
  }
  &[aria-expanded="false"] svg {
    transform: rotate(-90deg);
    transition: transform .2s;
  }
  &[aria-expanded="true"] svg {
    transition: transform .2s;
  }
`;

export const accordion_item__panel_content = css`
  padding: 1em;
`;

// export const styles = {
//   accordion,
//   accordion_item,
//   accordion_item__triger,
//   accordion_item__panel_content,
// }
