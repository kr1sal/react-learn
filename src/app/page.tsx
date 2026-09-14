"use client";

import "./main.css";
import Card from "./components/card";
import { getEmojis } from "./api/emoji";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [emojis, setEmojis] = useState<EmojiModel[]>([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      const data = await getEmojis({ query: search ? search : null });
      setEmojis(data);
    };

    if (search) {
      fetchEmojis();
    }
  }, [search]);

  return (
    <div className="main">
      <header className="header">

        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>

      </header>

      <input id="1" className="search" placeholder="Search emoji" value={search} onChange={(e) => setSearch(e.target.value)} />

      <main className="cards">
        {emojis.map((emoji) => (
          console.log(emoji),
          <Card emoji={emoji.emoji} title={emoji.title} description={emoji.keywords.join(", ")} />
        ))}
      </main>
    </div>
  );
}
