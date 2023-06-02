import { FC } from 'react';

interface RevisionProps {
    timestamp: number;
    isSelected: boolean;
    onClick: () => void;
}

const RevisionComponent: FC<RevisionProps> = ({
    timestamp,
    isSelected,
    onClick,
}) => (
    <div
        onClick={onClick}
        style={{ background: isSelected ? 'gray' : 'transparent' }}
    >
        {new Date(timestamp * 1000).toLocaleString()}
    </div>
);

export default RevisionComponent;
