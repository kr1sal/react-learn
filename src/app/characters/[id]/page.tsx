"use client"

import { ActorCardProps } from "@/app/home/components/ActorCard";
import HOUSES, { House, isHouse } from '@/app/api/models/houses';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { CharacterAbout } from "@/app/api/entities/characterabout";
import { getCharacterAbout } from "@/app/api/characters";

export interface AboutCharacterProps extends CharacterAbout {
}


export default function AboutCharacter(props: AboutCharacterProps) {

  const [role, setRole] = useState<AboutCharacterProps | undefined>();

  const page_id = useParams()


  const fetchData = async () => {

    const character = await getCharacterAbout(page_id.id as string)

    setRole(character)
  }

  useEffect(() => {
    fetchData()
  }, [])




  return (
    <div>
      <div className="left_box">
        <h1>{role?.name}</h1>
        <img src={role?.photo ?? "https://images.pixels.com/images/artworkimages/mediumlarge/2/harry-potter-logo-brand-a.jpg"} alt="Char photo" />
      </div>


      <div className="char_description">
        <h2>Description</h2>
        <p>name: {role?.name}</p>
        <p>gender: {role?.gender}</p>
        <p>alias names: {role?.aliasNames}</p>
        <p>house: {role?.house} </p>

        <hr />

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