import Actor from '../../model/actor';
import Card from './Card';
import styles from './actorcard.module.css';

export interface ActorCardProps extends Actor {
  imageSource: string;
}

export default function ActorCard(props: ActorCardProps) {
  const description: Record<string, string> = {
    Actor: props.actorName,
    Gender: props.gender,
    House: props.house,
    'Wand core': props.wandCore,
    Alive: props.alive,
  };

  return (
    <Card imageSource={props.imageSource} title={props.role}>
      {Object.keys(description).map((fieldKey) => {
        const fieldValue = description[fieldKey];
        return (
          <p className={styles.description} key={fieldValue + '-' + props.role}>
            {fieldKey + ': ' + fieldValue}
          </p>
        );
      })}
    </Card>
  );
}
