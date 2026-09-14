async function getEmojis({ query }: EmojiArgs): Promise<EmojiModel[]> {
  const response = await fetch(`/api/emojis?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
}
