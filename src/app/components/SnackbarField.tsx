import "./snackbarfield.css";

import Snackbar, { SnackbarState } from "./Snackbar";
import { Reducer, useReducer } from "react";
import Action from "../core/action";
import State from "../core/state";

export interface SnackbarFieldState extends State {
    snackbars: SnackbarState[];
    onDeleteSnackbar?: (id: string) => void
}

export interface AddSnackbarFieldAction extends Action {
    type: "add_snackbar";
    snackbar: SnackbarState;
}

export interface DeleteSnackbarFieldAction extends Action {
    type: "delete_snackbar";
    snackbarId: string;
}

export type SnackbarFieldActions = AddSnackbarFieldAction | DeleteSnackbarFieldAction;
export type SnackbarFieldReducer = Reducer<SnackbarFieldState, SnackbarFieldActions>;

export function SnackbarFieldReducer(
    state: SnackbarFieldState,
    action: SnackbarFieldActions
): SnackbarFieldState {
    switch (action.type) {
        case "add_snackbar":
            return {
                ...state,
                snackbars: [...state.snackbars, { ...action.snackbar }],
            };
        case "delete_snackbar":
            return {
                ...state,
                snackbars: state.snackbars.filter((item) => item.id !== action.snackbarId),
            };
        default:
            return state;
    }
}

export default function SnackbarField(props: SnackbarFieldState) {
    return (
        <div className="snackbar-field">
            {props.snackbars.map((snackbar) => (
                <Snackbar
                    key={snackbar.id}
                    id={snackbar.id}
                    title={snackbar.title}
                    message={snackbar.message}
                    duration={snackbar.duration ?? 3000}
                    onTimeout={(id) => { if (props.onDeleteSnackbar != null) props.onDeleteSnackbar(id) }}
                />
            ))}
        </div>
    );
}