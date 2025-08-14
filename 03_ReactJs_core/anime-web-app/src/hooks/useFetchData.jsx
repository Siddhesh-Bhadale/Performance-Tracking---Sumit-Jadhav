import { useEffect, useState } from "react";

const useFetchData =(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false);
    const [error, setError]=useState("")

    useEffect(()=>{
        const fetchData=async ()=>{
            setLoading(true);
            try {
                const response=await fetch(url)
                const result= await response.json();
                setData(result)
            } catch (error) {
               setError(error)
            } finally{
                setLoading(false)
            }
        }

        fetchData()
    },[url])
    return [data,loading,error];

}

export default useFetchData;