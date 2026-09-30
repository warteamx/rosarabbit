import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export function getVisiblePosts(posts: PostEntry[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort((left, right) => right.data.date.getTime() - left.data.date.getTime());
}

export function getFeaturedPosts(posts: PostEntry[], limit = 6) {
  return getVisiblePosts(posts).slice(0, limit);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function getTagCounts(posts: PostEntry[]) {
  const counts = new Map<string, number>();

  for (const post of getVisiblePosts(posts)) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([tag, count]) => ({ tag, count }));
}

export function filterPostsByTag(posts: PostEntry[], tag: string) {
  return getVisiblePosts(posts).filter((post) => post.data.tags.includes(tag));
}

export function humanizeTag(tag: string) {
  return tag
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getPostUrl(post: PostEntry) {
  return `/${post.data.permalink}/`;
}

export function groupPostsBySection(posts: PostEntry[]) {
  const groups = new Map<string, PostEntry[]>();

  for (const post of getVisiblePosts(posts)) {
    const existing = groups.get(post.data.section) ?? [];
    existing.push(post);
    groups.set(post.data.section, existing);
  }

  return [...groups.entries()]
    .sort((left, right) => right[1].length - left[1].length)
    .map(([section, entries]) => ({ section, entries }));
}
