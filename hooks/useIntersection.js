import { useState, useEffect } from "react";

export const useIntersection = (ref) => {
  const [intersecting, setIntersecting] = useState(false)
  useEffect(() => {
    if(!ref.current) return () => {};
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })
    let observerRefCurrent = null;
    if(ref.current){
      observer.observe(ref.current)
      observerRefCurrent = ref.current
    }
    if(observerRefCurrent){
      return () => {
        observer.unobserve(observerRefCurrent)
      }
    }
    return () => {}
  })
  return intersecting
}