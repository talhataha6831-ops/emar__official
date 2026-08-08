import React, { useEffect } from 'react'

// Simple focus trap hook for modals
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, open: boolean){
  useEffect(()=>{
    if(!open || !ref.current) return
    const node = ref.current
    const focusable = node.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])")
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if(first) first.focus()

    const handler = (e: KeyboardEvent) =>{
      if(e.key === 'Tab'){
        if(e.shiftKey){
          if(document.activeElement === first){
            e.preventDefault(); last?.focus()
          }
        } else {
          if(document.activeElement === last){
            e.preventDefault(); first?.focus()
          }
        }
      }
      if(e.key === 'Escape'){
        // let parent handle Escape via prop
      }
    }

    document.addEventListener('keydown', handler)
    return ()=> document.removeEventListener('keydown', handler)
  },[ref, open])
}
