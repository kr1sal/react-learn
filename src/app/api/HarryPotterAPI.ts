'use server';
import axios from 'axios';

const API_URL = process.env.HARRY_POTTER_API;
import { CharactersResponse } from './models/Character';

export const getHarryPotterCharacters = async (
  search?: string,
  page?: number,
  pageSize?: number
) => {
  try {
    if (search === '') search = undefined;
    const params = { search, page, pageSize };
    const response = await axios.get<CharactersResponse>(API_URL as string, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch Harry Potter characters', error);
    return [];
  }
};

export const getHarryPotterCharacterById = async (id: string) => {
  try {
    const response = await axios.get<CharactersResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Harry Potter character by ID', error);
    return [];
  }
};
