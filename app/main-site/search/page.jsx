"use client"
import DoctorList from '../components/DoctorList';
import React,{useEffect} from 'react'

function Search({params}) {
  useEffect(()=>{
    console.log(params.cname)
  },[])
  return (

    <div><DoctorList /></div>
  )
}

export default Search