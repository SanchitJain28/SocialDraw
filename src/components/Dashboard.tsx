import React, { useEffect, useState } from 'react'
import {  h2, h3, primaryButton, Primarypara } from '../Themeclasses'
import DrawingCard from './DrawingCard'
import { Axios } from '../ApiFormat'

export default function Dashboard() {
    const [drawings,setDrawings]=useState<any>(null)
    const [loading,setLoading]=useState<boolean>(true)
    const Fetchdrawings=async()=>{
        setLoading(true)
        try {
            const response=await Axios.get("/api/drawings")
            console.log(response)
            setDrawings(response.data.data)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
      Fetchdrawings()
    }, [])
    const [create,setCreate]=useState<boolean>(false)
    if(loading){
        return <p className={h3}>Loading...</p>
    }
    return (
        <div className='p-8'>
            <p className={h2 + "my-4"}>Create a Drawing</p>
            <button className={primaryButton} onClick={()=>{
                setCreate(true)
            }}>Create</button>
            {create && <DrawingCard/>}
            <div className="grid grid-cols-3">
                {drawings && drawings.map((e,index:number)=>{
                    return <div key={index} className="border border-zinc-600 rounded-xl p-4 my-4 mr-4">
                        <p className={Primarypara}>{e.title}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
