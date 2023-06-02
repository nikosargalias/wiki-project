// DocumentPage.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRevision, fetchDocument } from '../../utils/document-api';
import DocumentPage from './[id]';

// Mocking useRouter
jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: { id: '123' },
        };
    },
}));

jest.mock('react-markdown', () => {
    return {
        __esModule: true, // this property makes it work
        default: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ), // your mock component here
    };
});

// Mocking API calls
jest.mock('../../utils/document-api', () => ({
    fetchDocument: jest.fn(),
    createRevision: jest.fn(),
}));

const mockDocument = { title: 'title', data: 'data' };
const mockRevisions = { revisions: [1, 2, 3] };

describe('DocumentPage', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    it('renders loading state initially', async () => {
        (fetchDocument as any).mockReturnValue(Promise.resolve());
        render(<DocumentPage />);
        const loadingState = await screen.findByText('Loading...');
        expect(loadingState).toBeInTheDocument();
    });

    it('displays an error message when fetching fails', async () => {
        (fetchDocument as any).mockReturnValue(Promise.reject('error'));
        render(<DocumentPage />);
        await screen.findByText('Failed to load');
    });

    it('displays the document and revisions when fetching is successful', async () => {
        (fetchDocument as jest.Mock)
            .mockReturnValueOnce(Promise.resolve(mockRevisions)) // For fetching page history
            .mockReturnValueOnce(Promise.resolve(mockDocument)); // For fetching latest version

        render(<DocumentPage />);
        await screen.findByText(mockDocument.title);

        // Expect the revisions to be rendered
        mockRevisions.revisions.forEach((revision) => {
            const revisionText = new Date(revision * 1000).toLocaleString();
            const revisionLink = screen.getByText(revisionText);
            expect(revisionLink).toBeInTheDocument();
        });
    });

    it('calls createRevision with correct parameters when submitting the form', async () => {
        const user = userEvent.setup();

        (fetchDocument as jest.Mock)
            .mockReturnValueOnce(Promise.resolve(mockRevisions)) // For fetching page history
            .mockReturnValueOnce(Promise.resolve(mockDocument)); // For fetching latest version
        const newPageContent = 'New page content';

        render(<DocumentPage />);
        await screen.findByText(mockDocument.title);

        const newRevisionInput = screen.getByRole('textbox');
        const newRevisionSubmitButton = screen.getByRole('button', {
            name: /submit/i,
        });

        await user.type(newRevisionInput, newPageContent);
        await user.click(newRevisionSubmitButton);

        // Expect the API to be called with correct parameters
        expect(createRevision).toHaveBeenCalledWith('123', newPageContent);
    });
});
