export interface InputFieldProps {
    label?: string,
    value?: unknown,
    errorMessage?: string
    placeholder?: string
    validate?: (value: string) => unknown
    format?: (value: string) => string
}