import styles from "./card.module.css"

export interface CardProps {
    imageSource: string,
    title: string
    desctiption: string
}

export default function Card(props: CardProps) {
    return <div className={styles.card}>
        <img src={props.imageSource} alt={props.title} />
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.description}>{props.desctiption}</p>
    </div>
}
