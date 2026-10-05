export interface Character {
  id: string;
  slug: string;
  alias_names: string[];
  animagus: string | null;
  blood_status: string | null;
  boggart: string | null;
  born: string | null;
  died: string | null;
  eye_color: string | null;
  family_members: string[];
  gender: string | null;
  hair_color: string | null;
  height: number | null;
  house: string | null;
  image: string | null;
  jobs: string[];
  marital_status: string | null;
  name: string;
  nationality: string | null;
  patronus: string | null;
  romances: string[];
  skin_color: string | null;
  species: string | null;
  titles: string[];
  wands: string[];
  weight: number | null;
  wiki: string | null;
  remembrall_status: string | null;
  is_free: boolean | null;
  order_of_merlin_actual_count: number | null;
}

export interface Meta {
  page: number;
  page_size: number;
  total_pages: number;
  total_records: number;
  search: string | null;
}

export interface CharactersResponse {
  name: ReactNode;
  image: string | Blob | undefined;
  house: ReactNode;
  gender: ReactNode;
  data: Character[];
  meta: Meta;
}
