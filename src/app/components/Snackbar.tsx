import "./snackbar.css"

import { useEffect } from "react";
import State from "../core/state";

export interface SnackbarState extends State {
    id: string;
    title: string;
    message: string;
    duration: number;
    onTimeout?: (id: string) => void;
}

export default function Snackbar(props: SnackbarState) {
    useEffect(() => {
        const timeout = setTimeout(() => { if (props.onTimeout) props.onTimeout(props.id); }, props.duration)
        return () => clearTimeout(timeout);
    }, [])

    return (
        <div className="snackbar">
            <button className="snackbar__close-button" type="button" aria-label="Close" onClick={() => { if (props.onTimeout != null) props.onTimeout(props.id) }}></button>
            <h3 className="snackbar__title">{props.title}</h3>
            <p className="snackbar__message">{props.message}</p>
        </div>
    )
}