import { useEffect, useRef } from "react"
import { useIntersection } from "./useIntersection"
import useSWRInfinite from "swr/infinite"
import { getApi } from "../utils/getApi"

const useInfiniteScroll = ({limit, initialSize }) => {
  const ref = useRef(null)
  const intersection = useIntersection(ref)
  const getKey = (pageIndex, previousPageData) => {
    if(previousPageData && !previousPageData.length) return null;
    return `http://jsonplaceholder.typicode.com/photos?_start=${(pageIndex) * limit}&_limit=${limit}`
  }
  const {data: result , error, setSize} = useSWRInfinite(getKey, (url) => getApi(url), {initialSize: initialSize})
  const isEmpty = result?.[0]?.length === 0
  const isReachingEnd = isEmpty || (result && result[result.length]?.length < limit)
  const getData = async () => {
    setSize((prev) => prev + 1)
  }
  useEffect(() => {
    if(intersection && !isReachingEnd){
      getData();
    }
  }, [intersection, isReachingEnd])
  const data = result?.flat()
  return {ref, data, error, isReachingEnd, isEmpty}
}

export default useInfiniteScroll