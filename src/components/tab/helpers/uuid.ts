// Get a universally unique identifier
let count = 0;
export default function uuid() {
  //ランダムなIDを生成
  const randomID = Math.random().toString(36).slice(2);
  return `${randomID}--${count++}`;
}

export function reset() {
  count = 0;
}