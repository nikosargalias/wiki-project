'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DocumentComponent, {
    DocumentProps,
} from '../../components/shared/Document/Document';
import RevisionComponent from '../../components/core/revision/Revision';
import { createRevision, fetchDocument } from '../../utils/document-api';
import { NextPage } from 'next';
import RevisionForm from '../../components/core/revision-form/Revision-form';

const DocumentPage: NextPage = () => {
    const router = useRouter();
    const [selectedVersion, setSelectedVersion] =
        useState<DocumentProps | null>(null);
    const [pageHistory, setPageHistory] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchPageHistory = async () => {
                try {
                    const [pageHistory, latestPageVersion] = await Promise.all([
                        fetchDocument(`page/${id}`),
                        fetchDocument(`page/${id}/latest`),
                    ]);
                    setPageHistory(pageHistory);
                    setSelectedVersion(latestPageVersion);
                } catch (e) {
                    setError('Could not fetch page history');
                }
            };
            fetchPageHistory();
        }
    }, [id]);

    const handleSelectedVersion = async (version: number) => {
        selectedVersion;
        try {
            const selectedRevisionData = await fetchDocument(
                `page/${id}/${version}`
            );
            setSelectedVersion(selectedRevisionData);
        } catch (e) {
            setError('Could not select version');
        }
    };

    const handleSubmitNewRevision = async (values: { page: string }) => {
        try {
            await createRevision(id as string, values.page);

            // refetch latest version and page history
            const latestPageVersion = await fetchDocument(`page/${id}/latest`);
            setSelectedVersion(latestPageVersion);

            const pageHistory = await fetchDocument(`page/${id}`);
            setPageHistory(pageHistory);
        } catch (e) {
            setError('Could not create revision');
        }
    };

    if (error) return <div>Failed to load</div>;

    if (!selectedVersion || !pageHistory) return <div>Loading...</div>;

    return (
        <div>
            <DocumentComponent
                title={selectedVersion.title}
                data={selectedVersion.data}
            />

            {pageHistory.revisions.map((revision: any) => (
                <RevisionComponent
                    key={revision}
                    timestamp={revision}
                    isSelected={revision === selectedVersion}
                    onClick={() => handleSelectedVersion(revision)}
                />
            ))}
            <RevisionForm
                initialValues={{ page: '' }}
                onSubmit={handleSubmitNewRevision}
            />
        </div>
    );
};

export default DocumentPage;
