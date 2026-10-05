import styles from './card.module.css';
import Link from "next/link";

export interface CardProps {
  id: string,
  imageSource: string;
  title: string;
  children: React.ReactNode;
}

export default function Card(props: CardProps) {
  return (
    <Link href={`/characters/${props.id}`}>
      <div className={styles.card} >
      <img src={props.imageSource ? props.imageSource : 'https://images.pixels.com/images/artworkimages/mediumlarge/2/harry-potter-logo-brand-a.jpg'} alt={props.title} />
      <h2 className={styles.title}>{props.title}</h2>
      {props.children}
    </div>
    </Link>
  );
}
