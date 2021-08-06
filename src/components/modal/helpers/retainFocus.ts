const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
]

export function retainFocus(event:any, element:any) {
  if(!element) return
  let focusableNodes:any = getFocusableNodes(element)

  if (focusableNodes.length === 0) return

  const focusedItemIndex = focusableNodes.indexOf(document.activeElement)

  //外側にフォーカスしている場合は強制的にモーダルの最初の要素をフォーカス
  if (focusedItemIndex === -1) {
    focusableNodes[0].focus()
    event.preventDefault()
  }

  if (event.shiftKey && focusedItemIndex === 0) {
    focusableNodes[focusableNodes.length - 1].focus()
    event.preventDefault()
  }

  if (!event.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
    focusableNodes[0].focus()
    event.preventDefault()
  }

}

function getFocusableNodes(element:any) {
  if(!element) return
  const nodes = element.querySelectorAll(FOCUSABLE_ELEMENTS)
  return [...nodes]
}