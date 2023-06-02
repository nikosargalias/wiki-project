import { FormEvent, ChangeEvent } from 'react';

interface FormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};

interface TextInputProps {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    id,
    label,
    name,
    value,
    onChange,
}) => {
    return (
        <label htmlFor={id}>
            {label}
            <textarea id={id} name={name} value={value} onChange={onChange} />
        </label>
    );
};

interface SubmitButtonProps {
    text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
    return <button type='submit'>{text}</button>;
};

export { Form, TextInput, SubmitButton };
