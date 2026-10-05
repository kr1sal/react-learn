"use client"

import { getHarryPotterCharacterById } from "@/app/api/HarryPotterAPI";
import { ActorCardProps } from "@/app/home/components/ActorCard";
import HOUSES, { House, isHouse } from '@/app/model/houses';
import { useEffect, useState } from "react";


interface Props {
  params: Promise<{
    id:string
  }>
}



export default function AboutCharacter({ params }: Props ) {
  
  const [role, setRole] = useState<ActorCardProps | undefined>();

  // const fetchData = async () => {
  //   const { id } = await params;
  //   const data = (await getHarryPotterCharacterById(id)) as any;

  //   setRole();
  // }

  // console.log(role)

  // useEffect(() => {
  //   fetchData();
  // }, [])

  
  return (
    <div>
      <h1>Name {role?.role}</h1>
      <img src="https://harrypotter.fandom.com/wiki/1992_Gryffindor_vs_Slytherin_Quidditch_match_spectators" alt="Char photo" />


        <div className="char_description">
            <h2>Description</h2>
            <p>name: </p>
            <p>gender:</p>
            <p>alias names: </p>
            <p>house: </p>

            <hr/>

            <p>wands: </p>

            <p>blood status: </p>
            <p>born: </p>
            <p>died: </p>

            <p>is free: </p>

            <p>eye color: </p>
            <p>hair color: </p>
            <p>height:</p>

            <p>Wiki: </p>          
        </div>
      
    </div>
  );
}