'use client';
import { fetchDocument } from '@/utils/document-api';
import Link from 'next/link';
import useSWR from 'swr';

export default function HomePage() {
    const { data, error } = useSWR(
        'http://localhost:5003/pages',
        fetchDocument
    );

    if (error) return <div>Failed to load pages</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Documents</h1>
            {data.titles.map((title: string) => (
                <div key={title}>
                    <Link
                        // style={{ color: 'lightBlue' }}
                        href={`/document/${encodeURIComponent(title)}`}
                    >
                        {title}
                    </Link>
                </div>
            ))}
        </div>
    );
}
