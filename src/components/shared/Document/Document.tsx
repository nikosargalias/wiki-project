import React from 'react';
import ReactMarkdown from 'react-markdown';

export type DocumentProps = {
    title: string;
    data: string;
};

const Document: React.FC<DocumentProps> = ({ title, data }) => {
    return (
        <div>
            <h1>{title}</h1>
            <ReactMarkdown>{data}</ReactMarkdown>
        </div>
    );
};

export default Document;
