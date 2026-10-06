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


export interface IAboutCharacterInfo {
  id: string,
  photo: string,
  name: string,
  gender: string,
  aliasNames: string,
  house: House,
  wands: string,
  bloodStatus: string,
  born: string,
  died: string,
  isFree: string,
  eyeColor: string,
  hairColor: string,
  height: string,
  wiki: string

}


export default function AboutCharacter({ params }: Props ) {
  
  const [role, setRole] = useState<IAboutCharacterInfo | undefined>();

  const fetchData = async () => {

    const data = await getHarryPotterCharacterById("1980s-hogwarts-gobstones-tournament-champion")
    const character = data.data


    const charInfo = {
      id: character.id,
      photo: character.image ?? 'https://images.pixels.com/images/artworkimages/mediumlarge/2/harry-potter-logo-brand-a.jpg',
      name: character.name,
      gender: character.name,
      aliasNames: character.alias_names[0] ?? "Unknown",
      house: (character.house as House) ?? "Unknown",
      wands: character.wands[0] ?? "Unknown",
      bloodStatus: character.blood_status ?? "Unknown",
      born: character.born ?? "Unknown",
      died: character.died ?? "Unknown",
      isFree: character.is_free ?? "Unknown",
      eyeColor: character.eye_color ?? "Unknown",
      hairColor: character.hair_color ?? "Unknown",
      height: character.height ?? "Unknown",
      wiki: character.wiki ?? "Unknown"
    }

    setRole(charInfo)
  }

  useEffect(() => {
    fetchData()     
  }, [])

  
  
  
  return (
    <div>
      <div className="left_box">
        <h1>{role?.name}</h1>
        <img src={role?.image} alt="Char photo" />
      </div>


        <div className="char_description">
            <h2>Description</h2>
            <p>name: {role?.name}</p>
            <p>gender: {role?.gender}</p>
            <p>alias names: {role?.aliasNames}</p>
            <p>house: {role?.house} </p>

            <hr/>

            <p>wands: {role?.wands}</p>

            <p>blood status: {role?.bloodStatus}</p>
            <p>born: {role?.born}</p>
            <p>died: {role?.died}</p>

            <p>is free: {role?.isFree}</p>

            <p>eye color: {role?.eyeColor}</p>
            <p>hair color: {role?.hairColor}</p>
            <p>height: {role?.height}</p>

            <a href={role?.wiki}>Wiki: {role?.wiki}</a>
        </div>
      
    </div>
  );
}