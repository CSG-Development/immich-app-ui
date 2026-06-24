import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import { MenuItemType, type ActionItem, type GithubLinkProps, type IfLike } from '$lib/types.js';
import { DateTime } from 'luxon';

export const asGithubLink = (options: number | GithubLinkProps) => {
  if (typeof options === 'number') {
    options = { number: options };
  }
  const { org = 'immich-app', repo = 'immich', number, type = 'pr' } = options ?? {};

  const text =
    org === 'immich-app' && repo === 'immich'
      ? `#${number}`
      : org === 'immich-app' || org === repo
        ? `${repo}/#${number}`
        : `${org}/${repo}#${number}`;

  return { href: `https://github.com/${org}/${repo}/${urlTypes[type]}/${number}`, text };
};

const getImmichApp = (host: string | undefined) => {
  if (!host || !host.endsWith('immich.app')) {
    return false;
  }

  if (host === 'immich.app' || host.startsWith('pr-')) {
    return 'root';
  }

  return host.split('.')[0];
};

export const navigateTo = async (url: string) => {
  const resolvedUrl = resolveUrl(url);
  const external = isExternalLink(resolvedUrl);

  if (external) {
    window.open(resolvedUrl, '_blank', 'noreferrer');
  } else {
    await goto(resolvedUrl);
  }
};

export const resolveUrl = (url: string, currentHostname?: string) => {
  if (!isExternalLink(url)) {
    return url;
  }

  const target = new URL(url);
  const targetApp = getImmichApp(target.hostname);
  const currentApp = getImmichApp(currentHostname ?? globalThis.location?.hostname ?? env.PUBLIC_IMMICH_HOSTNAME);

  return targetApp && targetApp === currentApp ? target.pathname : target.href;
};

export const isExternalLink = (href: string): boolean => {
  return !(href.startsWith('/') || href.startsWith('#'));
};

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

export const isMenuItemType = (item: ActionItem | MenuItemType): item is MenuItemType => {
  return item === MenuItemType.Divider;
};

export const resolveMetadata = (site: Metadata, page?: Metadata, article?: ArticleMetadata) => {
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

export const asText = (...items: unknown[]) => {
  return items
    .filter((item) => item !== undefined && item !== null)
    .map((items) => String(items))
    .join('|')
    .toLowerCase();
};

export const isEnabled = ({ $if }: IfLike) => {
  if (!$if) {
    return true;
  }

  return !!$if();
};
