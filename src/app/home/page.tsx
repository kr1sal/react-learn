'use client';

import styles from '@/app/home/page.module.css';
import TextInputField from '@/app/components/TextInputField';
import SelectInputField from '@/app/components/SelectInputField';
import { useState, useEffect } from 'react';
import HOUSES, { House, isHouse } from '@/app/model/houses';
import ActorCard, { ActorCardProps } from './components/ActorCard';
import { getHarryPotterCharacters } from '../api/HarryPotterAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const pageSize = 25

export default function Home() {
  const [search, setSearch] = useState('');
  const [house, setHouse] = useState<string | undefined>(undefined);
  const [houseError, setHouseError] = useState('');
  const [page, setPage] = useState(1)

  const [roles, setRoles] = useState<ActorCardProps[]>([]);


  const checkNextPage = () => roles.length == pageSize
  const checkPrevPage = () => page > 1
  const nextPage = () => { if (checkNextPage()) setPage(page + 1) }
  const prevPage = () => { if (checkPrevPage()) setPage(page - 1) }

  const fetchData = async () => {
    const data = await getHarryPotterCharacters(search, page, pageSize)
    const characters = Array.isArray(data) ? data : data.data;
    const mappedRoles: ActorCardProps[] = characters.map((character) => ({
      id: character.id,
      imageSource: character.image ?? '',
      role: character.name,
      actorName: character.alias_names[0] ?? 'Unknown',
      gender: character.gender ?? 'Unknown',
      house: (character.house as House) ?? 'Unknown',
      wandCore: character.wands[0] ?? 'Unknown',
      alive: character.died ? 'no' : 'yes',
    }));
    setRoles(mappedRoles);
  }

  const filterRoles = () => roles
    .filter((role) => {
      if (search) {
        const fieldRe = new RegExp(search, 'i');
        const isMatch = Object.values(role).some(
          (field) => typeof field === 'string' && fieldRe.test(field)
        );
        if (!isMatch) return false;
      }

      if (isHouse(house) && role.house !== house) return false;

      return true;
    })


  useEffect(() => {
    fetchData();
  }, [search, page]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Harry Potter</h1>
          <p className={styles.description}>
            View all characters from the Harry Potter universe
          </p>
        </div>
        <div className={styles.searchBar}>
          <TextInputField
            id="search"
            onChange={(value) => { setSearch(value ?? ''); setPage(1) }}
            value={search}
            placeholder="Hermione"
            label="Name"
          ></TextInputField>
          <SelectInputField
            id="house"
            options={HOUSES}
            onChange={(value) => {
              setHouse(value);
              setHouseError('');
              if (isHouse(house)) setPage(1)
            }}
            onError={(error) => setHouseError(error)}
            errorMessage={houseError}
            placeholder="Choose one"
            label="School"
          ></SelectInputField>
        </div>
      </header>
      <hr />

      <div className={styles.content}>
        {filterRoles().map((role, index) => (
          <ActorCard key={`${index}-${role.actorName}`} {...role}></ActorCard>
        ))}
      </div>

      <div className={styles["page-bar"]}>
        <button className={styles["page-bar__prev-btn"]} disabled={!checkPrevPage()} onClick={(e) => { prevPage(); scrollTo(0, 0) }}><FontAwesomeIcon icon={faAngleLeft} /></button>
        <div className={styles["page-bar__counter"]}>{page}</div>
        <button className={styles["page-bar__next-btn"]} disabled={!checkNextPage()} onClick={(e) => { nextPage(); scrollTo(0, 0) }}><FontAwesomeIcon icon={faAngleRight} /></button>
      </div>
    </div>
  );
}
