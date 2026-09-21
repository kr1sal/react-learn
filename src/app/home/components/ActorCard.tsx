import Actor from "../../model/actor"
import Card from "./Card"

export interface ActorCardProps extends Actor {
    imageSource: string
}

export default function ActorCard(props: ActorCardProps) {
    return <Card imageSource={props.imageSource} title={props.role} desctiption={[props.actorName, props.gender, props.house, props.wandCore, props.alive].join("\n")}></Card>
}