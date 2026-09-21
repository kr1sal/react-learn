import styles from "./textinputfield.module.css"
import { InputFieldProps } from "./InputField";
import { useState } from "react";

export interface TextInputFieldProps extends InputFieldProps {
    id: string
    value?: string
    onChange?: (value?: string) => void
}

export default function TextInputField(props: TextInputFieldProps) {
    const [value, setValue] = useState<string | undefined>(props.value)

    return <>
        {props.label != null ? <label className={styles.label} htmlFor={props.id}>{props.label}</label> : null}
        <input className={styles.input} id={props.id} type="text" value={value} onChange={(e) => { if (props.onChange != null) { setValue(e.currentTarget.value); props.onChange(e.currentTarget.value); } }} placeholder={props.placeholder}></input>
        {props.errorMessage != null ? <label className={styles.errorMessage} htmlFor={props.id}>{props.errorMessage}</label> : null}
    </>
}