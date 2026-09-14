interface EmojiModel {
  emoji: string;
  title: string;
  keywords: string[];
}

interface EmojiArgs {
  query: string | null;
}
