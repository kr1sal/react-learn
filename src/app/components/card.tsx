import "./card.css"

export default function Card(args: { emoji: string, title: string, description: string }) {

    return (
        <div className="card">
            <h1 className="emoji">{args.emoji}</h1>
            <h3 className="title">{args.title}</h3>
            <p className="description">{args.description}</p>
        </div>
    )
}