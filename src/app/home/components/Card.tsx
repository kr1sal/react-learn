import styles from './card.module.css';

export interface CardProps {
  imageSource: string;
  title: string;
  children: React.ReactNode;
}

export default function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <img src={props.imageSource} alt={props.title} />
      <h2 className={styles.title}>{props.title}</h2>
      {/* <p className={styles.description}>{props.desctiption}</p> */}
      {props.children}
    </div>
  );
}
