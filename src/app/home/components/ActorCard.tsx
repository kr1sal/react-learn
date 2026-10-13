import { CharacterCard } from '@/app/api/entities/charactercard';
import Actor from '../../api/models/actor';
import Card from './Card';
import styles from './actorcard.module.css';

export interface ActorCardProps extends CharacterCard {
}

export default function ActorCard(props: ActorCardProps) {
  const description: Record<string, string> = {
    id: props.id,
    Actor: props.actorName,
    Gender: props.gender,
    House: props.house,
    'Wand core': props.wandCore,
    Alive: props.alive,
  };

  return (
    <Card imageSource={props.imageSource ?? "https://images.pixels.com/images/artworkimages/mediumlarge/2/harry-potter-logo-brand-a.jpg"} title={props.role} id={props.id}>
      {Object.keys(description).map((fieldKey) => {
        const fieldValue = description[fieldKey];

        if (fieldKey != "id") {
          return (
            <p className={styles.description} key={fieldKey}>
              {fieldKey + ': ' + fieldValue}
            </p>
          );
        }
      })}
    </Card>
  );
}
