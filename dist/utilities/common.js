import { env } from '$env/dynamic/public';
import { DateTime } from 'luxon';
const getImmichApp = (host) => {
    if (!host || !host.endsWith('immich.app')) {
        return false;
    }
    if (host === 'immich.app' || host.startsWith('pr-')) {
        return 'root';
    }
    return host.split('.')[0];
};
export const resolveUrl = (url, currentHostname) => {
    if (!isExternalLink(url)) {
        return url;
    }
    const target = new URL(url);
    const targetApp = getImmichApp(target.hostname);
    const currentApp = getImmichApp(currentHostname ?? globalThis.location?.hostname ?? env.PUBLIC_IMMICH_HOSTNAME);
    return targetApp && targetApp === currentApp ? target.pathname : target.href;
};
export const isExternalLink = (href) => {
    return !(href.startsWith('/') || href.startsWith('#'));
};
export const resolveMetadata = (site, page, article) => {
    const title = page ? `${page.title} | ${site.title}` : site.title;
    const description = page?.description ?? site.description;
    const imageUrl = page?.imageUrl ?? site?.imageUrl;
    const siteName = page ? `${site.title} — ${site.description}` : site.title;
    const type = article ? 'article' : 'website';
    return {
        type,
        siteName,
        title,
        description,
        imageUrl,
        article: article
            ? {
                publishedTime: article.publishedTime.toISO(),
                modifiedTime: article.modifiedTime?.toISO(),
                expirationTime: article.expirationTime?.toISO(),
                authors: article.authors,
                section: article.section,
                tags: article.tags,
            }
            : undefined,
    };
};
