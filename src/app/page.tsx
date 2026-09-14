import "./main.css";
import Card from "./components/card";

export default function Home() {
  return (
    <div className="main">
      <header className="header">

        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>

      </header>

      <input id="1" className="search" placeholder="Search emoji" />

      <main>
        <Card />
        <Card />
        <Card />
      </main>
    </div>
  );
}
