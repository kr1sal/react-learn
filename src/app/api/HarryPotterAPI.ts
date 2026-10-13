'use server';
import axios from 'axios';

const API_URL = process.env.HARRY_POTTER_API!;
import { CharactersResponse } from './models/Character';
import { IAboutCharacterInfo } from '../characters/[id]/page';

const base = API_URL.replace(/\/$/, '');

export const getHarryPotterCharacters = async (
  search?: string,
  page?: number,
  pageSize?: number
) => {
  try {
    if (search === '') search = undefined;
    const params = { search, page, pageSize };
    const response = await axios.get<CharactersResponse>(base, {
      params,
    });

    return response.data.chars;
  } catch (error) {
    console.error('Failed to fetch Harry Potter characters', error);
    return [];
  }
};

export const getHarryPotterCharacterById = async (id: string): Promise<IAboutCharacterInfo> => {
  try {
<<<<<<< HEAD
    const response = await axios.get<CharactersResponse>(`${API_URL}/${id}`);
                                                                                         
    
    return response.data.data;
=======
    const response = await axios.get<CharactersResponse>(`${base}/${id}`);
    return response.data;
>>>>>>> 98cadd3fe09713aa6161dffe0fc849f735d3754f
  } catch (error) {
    console.error('Failed to fetch Harry Potter character by ID', error);
    return [];
  }
};
