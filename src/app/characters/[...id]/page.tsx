"use client"

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { CharacterAbout } from "@/app/api/entities/characterabout";
import { getCharacterAbout, getCharacterCards } from "@/app/api/characters";
import styles from "./page.module.css"
import { CharacterCard } from "@/app/api/entities/charactercard";
import ActorCard from "@/app/home/components/ActorCard";
import HttpError from "@/app/utils/http-code";
import Link from "next/link";
import { Loading } from "@/app/utils/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faHome } from "@fortawesome/free-solid-svg-icons";

export interface AboutCharacterProps extends CharacterAbout {
}

const recCount = 5;

export default function AboutCharacter(props: AboutCharacterProps) {

  const [role, setRole] = useState<AboutCharacterProps>();
  const [recRoles, setRecRoles] = useState<CharacterCard[] | undefined>();
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();

  const fetchData = async () => {
    const character = await getCharacterAbout((id as string[])[id!.length - 1])

    if (character == undefined) {
      setError(new HttpError('Ресурс не найден', 404));
    }

    setRole(character)
  }

  const fetchRecRoles = async () => {
    const recRoles: CharacterCard[] = await getCharacterCards(role?.name.split(' ')[0], 1, recCount) ?? [];
    setRecRoles(recRoles)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (role == undefined) return
    fetchRecRoles()
  }, [role])

  if (error) {
    throw error
  }


  if (role == undefined) return <Loading />

  return (
    <div>
      <header className={styles["header"]}>
        <div className={styles["nav-title"]}>
          <nav className={styles["nav"]}>
            <Link href={"/"}><button className={styles["btn"]}><FontAwesomeIcon icon={faHome} /></button></Link>
            {(id as string[]).length > 1 ? <Link href={`/characters/${(id as string[]).slice(0, (id as string[]).length - 1).join("/")}/`}> <button className={styles["btn"]}><FontAwesomeIcon icon={faAngleLeft} /></button></Link> : null}
          </nav>
          <h1 className={styles["title"]}>{role?.name}</h1>
        </div>

        <img className={styles["image"]} src={role?.photo ?? "https://images.pixels.com/images/artworkimages/mediumlarge/2/harry-potter-logo-brand-a.jpg"} alt="Char photo" />
      </header>

      <main className={styles["main"]}>
        <div className={styles["description"]}>
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
        <div className={styles["rec-roles"]}>
          {recRoles?.filter((recRole) => recRole.role != role!.name).map((recRole, index) =>
            <Link key={`${index}-${recRole.actorName}`} href={`/characters/${(id as string[]).join("/")}/${recRole.role}/`}><ActorCard {...recRole}></ActorCard></Link>).slice(0, recCount)}
        </div>

      </main>
    </div >
  );
}