declare module 'react-image-magnifiers' {
    import { CSSProperties } from 'react';

    interface MagnifierProps {
        imageSrc: string;
        imageAlt?: string;
        largeImageSrc?: string;
        magnifierSize?: string | number;
        magnifierBorderSize?: number;
        magnifierBorderColor?: string;
        square?: boolean;
        allowOverflow?: boolean;
        style?: CSSProperties;
        className?: string;
    }

    export const GlassMagnifier: React.FC<MagnifierProps>;
    export const SideBySideMagnifier: React.FC<MagnifierProps>;
    export const MagnifierContainer: React.FC<{ className?: string; style?: CSSProperties; children?: React.ReactNode }>;
    export const MagnifierPreview: React.FC<MagnifierProps>;
    export const MagnifierZoom: React.FC<{ imageSrc: string; style?: CSSProperties; className?: string }>;
}
