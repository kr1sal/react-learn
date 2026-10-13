'use server';
import axios from 'axios';

const API_URL = process.env.HARRY_POTTER_API!;
import { CharacterAbout } from './entities/characterabout';
import { House } from './models/houses';
import { CharacterByIdResponse, CharactersResponse } from './models/Character';
import { CharacterCard } from './entities/charactercard';

const base = API_URL.replace(/\/$/, '');

async function getCharacters(
  search?: string,
  page?: number,
  pageSize?: number
): Promise<CharactersResponse | undefined> {
  try {
    if (search === '') search = undefined;
    const params = { search, page, pageSize };
    const response = await axios.get<CharactersResponse>(base, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch Harry Potter characters', error);
    return undefined;
  }
}

export async function getCharacterById(
  id: string
): Promise<CharacterByIdResponse | undefined> {
  try {
    const response = await axios.get<CharacterByIdResponse>(`${base}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Harry Potter character by ID', error);
    return undefined;
  }
}

export async function getCharacterCards(
  search?: string,
  page?: number,
  pageSize?: number
): Promise<CharacterCard[] | undefined> {
  const chars = await getCharacters(search, page, pageSize);
  if (chars == undefined || chars.data.length == 0) {
    return undefined;
  }
  const data = chars.data;
  return data.map((char) => ({
    id: char.id,
    imageSource: char.image,
    role: char.name,
    actorName: char.alias_names[0] ?? 'Unknown',
    gender: char.gender ?? 'Unknown',
    house: (char.house as House) ?? 'Unknown',
    wandCore: char.wands[0] ?? 'Unknown',
    alive: char.died ? 'no' : 'yes',
  }));
}

export async function getCharacterAbout(
  id: string
): Promise<CharacterAbout | undefined> {
  const char = await getCharacterById(id);
  if (char == undefined || char.data == undefined) {
    return undefined;
  }
  console.log(char);
  const data = char.data;
  return {
    id: id,
    photo:
      data.image ??
      'https://images.pixels.com/images/artworkimages/mediumlarge/2/harry-potter-logo-brand-a.jpg',
    name: data.name,
    gender: data.name,
    aliasNames: data.alias_names[0] ?? 'Unknown',
    house: (data.house as House) ?? 'Unknown',
    wands: data.wands[0] ?? 'Unknown',
    bloodStatus: data.blood_status ?? 'Unknown',
    born: data.born ?? 'Unknown',
    died: data.died ?? 'Unknown',
    isFree: data.is_free ? 'Yes' : 'No',
    eyeColor: data.eye_color ?? 'Unknown',
    hairColor: data.hair_color ?? 'Unknown',
    height: `${data.height ?? 'Unknown'}`,
    wiki: data.wiki ?? 'Unknown',
  };
}
