import { render, screen } from '@testing-library/react';
import Document from './Document';

jest.mock('react-markdown', () => {
    return {
        __esModule: true, // this property makes it work
        default: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ), // your mock component here
    };
});
test('renders document link', () => {
    render(<Document title='Test Title' data='123' />);
    const TitleElement = screen.getByText(/Test Title/i);
    const dataElement = screen.getByText(/123/i);
    expect(TitleElement).toBeInTheDocument();
    expect(dataElement).toBeInTheDocument();
});
