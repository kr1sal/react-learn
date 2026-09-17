"use client";

import "./main.css";
import { getEmojis } from "./api/emoji";
import Card from "./components/Card";
import SnackbarField, { SnackbarFieldReducer } from "./components/SnackbarField";
import { useEffect, useReducer, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [emojis, setEmojis] = useState<EmojiModel[]>([]);
  const [snackbarsFieldState, dispatchSnackbarsFieldState] = useReducer(SnackbarFieldReducer, {
    snackbars: [],
  });

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const data = await getEmojis({ query: search ? search : null });
        setEmojis(data);
      } catch (e) {
        dispatchSnackbarsFieldState({
          type: "add_snackbar",
          snackbar: {
            id: `${Date.now()}`,
            title: "Error",
            message: "There is a error here!",
            duration: 3000,
          }
        });
      }
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
          <Card emoji={emoji.emoji} title={emoji.title} description={emoji.keywords.join(", ")} />
        ))}
      </main>

      <SnackbarField {...snackbarsFieldState} onDeleteSnackbar={(id) => { console.log('death time'); dispatchSnackbarsFieldState({ type: "delete_snackbar", snackbarId: id }) }} />
    </div>
  );
}
