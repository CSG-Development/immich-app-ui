import { DateTime } from 'luxon';
export declare const resolveUrl: (url: string, currentHostname?: string) => string;
export declare const isExternalLink: (href: string) => boolean;
export type Metadata = {
    title: string;
    description: string;
    imageUrl?: string;
};
export type ArticleMetadata = {
    publishedTime: DateTime;
    modifiedTime?: DateTime;
    expirationTime?: DateTime;
    authors?: string[];
    section?: string;
    tags?: string[];
};
export declare const resolveMetadata: (site: Metadata, page?: Metadata, article?: ArticleMetadata) => {
    type: string;
    siteName: string;
    title: string;
    description: string;
    imageUrl: string | undefined;
    article: {
        publishedTime: string | null;
        modifiedTime: string | null | undefined;
        expirationTime: string | null | undefined;
        authors: string[] | undefined;
        section: string | undefined;
        tags: string[] | undefined;
    } | undefined;
};
