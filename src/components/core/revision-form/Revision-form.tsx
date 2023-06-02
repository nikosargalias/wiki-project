// File: components/RevisionForm.tsx
import { Form, SubmitButton, TextInput } from '@/components/shared/form/Form';
import { ChangeEvent, FormEvent, useState } from 'react';

interface RevisionFormProps {
    initialValues: {
        page: string;
    };
    onSubmit: (values: { page: string }) => void;
}

const RevisionForm: React.FC<RevisionFormProps> = ({
    initialValues,
    onSubmit,
}) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextInput
                id='page'
                label='New Revision:'
                name='page'
                value={values.page}
                onChange={handleChange}
            />
            <SubmitButton text='Submit' />
        </Form>
    );
};

export default RevisionForm;
