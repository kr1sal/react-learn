'use client';

export async function getEmojis({ query }: EmojiArgs): Promise<EmojiModel[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${query ? `?q=${encodeURIComponent(query)}` : ''}`
  );
  const data = await response.json();
  const parsedData: EmojiModel[] = data.map((item: any) => ({
    emoji: item.emoji,
    title: item.title,
    keywords: item.keywords.split(' '),
  }));
  return parsedData;
}
