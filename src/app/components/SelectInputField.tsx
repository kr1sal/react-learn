import styles from "./selectinputfield.module.css"
import { InputFieldProps } from "./InputField";
import { HOUSES, House, isHouse } from "../model/houses";
import { useState } from "react";


export interface SelectInputFieldProps extends InputFieldProps {
    id: string,
    value?: string,
    options: ReadonlyArray<string>
    onChange?: (value?: string) => void,
    onError?: (errorMessage: string) => void,
}

export default function SelectInputField(props: SelectInputFieldProps) {
    const [value, setValue] = useState<string | undefined>(props.value)
    const [errorMessage, setErrorMessage] = useState(props.errorMessage)

    return <>
        {props.label != null ? <label className={styles.label} htmlFor={props.id}>{props.label}</label> : null}
        <input className={styles.input} id={props.id} list={props.id + "-list"} type="text" value={value ?? ""} onChange={(e) => {
            const nextValue = e.currentTarget.value
            setValue(nextValue)
            props.onChange?.(nextValue)
            if (nextValue! in props.options) {
                setErrorMessage('There is no that option!')
                props.onError?.('There is no that option!')
                return;
            }
        }} placeholder={props.placeholder}></input>
        <datalist id={props.id + "-list"}>
            {HOUSES.map((option) => <option key={option} value={option}></option>)}
        </datalist>
        {props.errorMessage != null ? <label className={styles.errorMessage} htmlFor={props.id}>{errorMessage}</label> : null}
    </>
}
