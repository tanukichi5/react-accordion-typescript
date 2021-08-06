//イベント付与&削除
export function attachEvent(element: any, type: any, listener: any, options?: any) {
  return {
    addEvent() {
      element.addEventListener(type, listener, options);
    },
    removeEvent() {
      element.removeEventListener(type, listener);
    },
  };
}