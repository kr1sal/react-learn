'use client';

import styles from '@/app/home/page.module.css';
import TextInputField from '@/app/components/TextInputField';
import SelectInputField from '@/app/components/SelectInputField';
import { useState, useEffect } from 'react';
import HOUSES, { House, isHouse } from '@/app/model/houses';
import ActorCard, { ActorCardProps } from './components/ActorCard';
import { getHarryPotterCharacters } from '../api/HarryPotterAPI';



// const roles: ActorCardProps[] = [
//   {
//     imageSource: './hermione.jpg',
//     role: 'Hermione Granger',
//     actorName: 'Emma Watson',
//     gender: 'female',
//     house: 'gryffindor',
//     wandCore: 'dragon heartstring',
//     alive: 'yes',
//   },
//   {
//     imageSource: './draco.jpg',
//     role: 'Draco Malfoy',
//     actorName: 'Tom Felton',
//     gender: 'male',
//     house: 'slytherin',
//     wandCore: 'unicorn tail-hair',
//     alive: 'yes',
//   },
//   {
//     imageSource: './hermione.jpg',
//     role: 'Hermione Granger',
//     actorName: 'Emma Watson',
//     gender: 'female',
//     house: 'gryffindor',
//     wandCore: 'dragon heartstring',
//     alive: 'yes',
//   },
// ];



export default function Home() {
  const [search, setSearch] = useState('');
  const [house, setHouse] = useState<string | undefined>(undefined);
  const [houseError, setHouseError] = useState('');

  const [roles, setRoles] = useState<ActorCardProps[]>([]);

  const fetchData = async () => {
    const data = await getHarryPotterCharacters(search)
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

  useEffect(() => {
    fetchData();
  }, [search]);

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
            onChange={(value) => setSearch(value ?? '')}
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
        {roles
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
          .map((role, index) => (
            <ActorCard key={`${index}-${role.actorName}`} {...role}></ActorCard>
          ))}
      </div>
    </div>
  );
}
