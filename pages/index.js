import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import { getApi } from '../utils/getApi'
import { useIntersection } from '../hooks/useIntersection'
import useSWRInfinite from "swr/infinite"
import useInfiniteScroll from '../hooks/useInfiniteScroll'

export default function Home() {
  const {ref, data, error, isReachingEnd, isEmpty} = useInfiniteScroll({limit: 10, initialSize: 3})
  if(error) return "failed to load"
  if(!data) return "loading"
  return (
    <div>
      {data?.map((item, i) => (
        <div key={i} style={{marginBlock: "100px"}}>
          <p>{item.id}:{item.title}</p>
        </div>
      ))}
        <div ref={ref}>
          {!isReachingEnd ? "読み込み中" : "全て読み込みました"}
          {isEmpty ? "取得するデータはありませんでした。" : null}
        </div>
    </div>
  )
}
