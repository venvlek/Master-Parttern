/* ================================================================
   WORDPRESS.JS — API service
   Set VITE_WP_URL in .env to your WordPress.com site:
   VITE_WP_URL=https://public-api.wordpress.com/wp/v2/sites/yoursite.wordpress.com
================================================================ */

const WP_BASE = import.meta.env.VITE_WP_URL || '';

/* ── Helpers ─────────────────────────────────────────────────── */

/* Strip HTML tags and decode entities */
export const stripHtml = (html = '') =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&[^;]+;/g, '')
    .trim();

/* Format ISO date to "June 12, 2025" */
export const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
};

/* Estimate read time from HTML content */
export const calcReadTime = (html = '') => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const mins  = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
};

/* Pick accent colour by category */
const ACCENT_MAP = {
  'Construction Tips':  '#E8781A',
  'Health & Safety':    '#C0272D',
  'Industry News':      '#0B1F3B',
  'Project Spotlights': '#0B1F3B',
  'Company News':       '#E8781A',
};

/* Map a raw WordPress post to the shape our components expect */
export const mapPost = (post) => {
  const terms     = post._embedded?.['wp:term']?.[0] ?? [];
  const catTerm   = terms.find(t => t.taxonomy === 'category' && t.slug !== 'uncategorized');
  const category  = catTerm?.name || 'News';
  const featImg   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return {
    id:       post.id,
    slug:     post.slug,
    title:    stripHtml(post.title.rendered),
    excerpt:  stripHtml(post.excerpt.rendered).slice(0, 200),
    content:  post.content.rendered,   /* raw HTML — rendered in BlogPost */
    date:     formatDate(post.date),
    author:   post._embedded?.author?.[0]?.name || 'Masterpattern Team',
    readTime: calcReadTime(post.content.rendered),
    category,
    image:    featImg,
    accent:   ACCENT_MAP[category] ?? '#E8781A',
  };
};

/* ── API calls ───────────────────────────────────────────────── */

/* Fetch multiple posts — pass { per_page, page, categories } etc. */
export const fetchPosts = async (params = {}) => {
  const qs = new URLSearchParams({ _embed: 1, per_page: 20, ...params }).toString();
  const res = await fetch(`${WP_BASE}/posts?${qs}`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const data = await res.json();
  return data.map(mapPost);
};

/* Fetch a single post by its slug */
export const fetchPostBySlug = async (slug) => {
  const res = await fetch(`${WP_BASE}/posts?slug=${slug}&_embed=1`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const data = await res.json();
  if (!data.length) return null;
  return mapPost(data[0]);
};

/* Fetch all categories (excluding Uncategorized) */
export const fetchCategories = async () => {
  const res = await fetch(`${WP_BASE}/categories?per_page=100&hide_empty=true`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const data = await res.json();
  return data
    .filter(c => c.slug !== 'uncategorized')
    .map(c => c.name);
};
