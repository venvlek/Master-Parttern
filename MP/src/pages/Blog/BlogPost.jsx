import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchPostBySlug, fetchPosts } from '../../services/wordpress';
import './BlogPost.css';

const BlogPost = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  const [post,    setPost]    = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setPost(null);

    fetchPostBySlug(slug)
      .then(p => {
        if (!p) { setError('not-found'); return; }
        setPost(p);

        /* Fetch related posts in same category */
        return fetchPosts({ per_page: 50 }).then(all => {
          const rel = all
            .filter(r => r.slug !== slug && r.category === p.category)
            .slice(0, 3);
          setRelated(rel);
        });
      })
      .catch(err => {
        console.error(err);
        setError('fetch-failed');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="bpost-page">
        <div className="bpost-loading">
          <div className="bpost-loading__hero"/>
          <div className="bpost-loading__body">
            {[100,70,90,60,85,75].map((w,i)=>(
              <div key={i} className="bpost-loading__line" style={{ width:`${w}%` }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (error === 'not-found' || (!post && !loading)) {
    return (
      <div className="bpost-404">
        <h1>Article Not Found</h1>
        <p>This article does not exist or may have been removed.</p>
        <button onClick={() => navigate('/blog')} type="button">← BACK TO BLOG</button>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="bpost-404">
        <h1>Something Went Wrong</h1>
        <p>Could not load this article. Please try again.</p>
        <button onClick={() => navigate('/blog')} type="button">← BACK TO BLOG</button>
      </div>
    );
  }

  return (
    <div className="bpost-page">

      {/* Hero */}
      <section className="bpost-hero">
        <div className="bpost-hero__bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 420"
            preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="420" fill="#060D1A"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.07">
              {Array.from({length:20},(_,i)=><line key={i} x1={i*64} y1="0" x2={i*64} y2="420"/>)}
              {Array.from({length:8}, (_,i)=><line key={i} x1="0" y1={i*54} x2="1200" y2={i*54}/>)}
            </g>
            {/* Featured image as background if available */}
            {post.image && (
              <>
                <image href={post.image} x="0" y="0" width="1200" height="420"
                  preserveAspectRatio="xMidYMid slice" opacity="0.18"/>
                <rect width="1200" height="420" fill="rgba(6,13,26,0.72)"/>
              </>
            )}
          </svg>
        </div>

        <div className="bpost-hero__content">
          <nav className="bpost-breadcrumb">
            <Link to="/"     className="bpost-breadcrumb__link">Home</Link><span>→</span>
            <Link to="/blog" className="bpost-breadcrumb__link">Blog</Link><span>→</span>
            <span>{post.category}</span>
          </nav>

          <span className="bpost-hero__cat">{post.category.toUpperCase()}</span>
          <h1 className="bpost-hero__title">{post.title}</h1>
          <p className="bpost-hero__excerpt">{post.excerpt}</p>

          <div className="bpost-hero__meta">
            <span className="bpost-hero__author">
              <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {post.author}
            </span>
            <span className="bpost-hero__sep">·</span>
            <span className="bpost-hero__date">{post.date}</span>
            <span className="bpost-hero__sep">·</span>
            <span className="bpost-hero__read">{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Layout */}
      <div className="bpost-layout">

        {/* Article — renders WordPress HTML */}
        <article className="bpost-article">
          <div
            className="bpost-wp-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="bpost-footer">
            <div className="bpost-footer__tag">
              <span className="bpost-footer__tag-line"/>
              <span className="bpost-footer__cat">{post.category}</span>
            </div>
            <Link to="/blog" className="bpost-footer__back">
              ← BACK TO ALL ARTICLES
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="bpost-sidebar">

          {/* Quote CTA */}
          <div className="bpost-sidebar__cta">
            <h3 className="bpost-sidebar__cta-title">Have a Project in Mind?</h3>
            <p className="bpost-sidebar__cta-body">
              Get a free, no-obligation quote from Masterpattern Nig. Ltd.
            </p>
            <Link to="/quote" className="bpost-sidebar__cta-btn">GET A FREE QUOTE</Link>
            <a href="tel:08038159214" className="bpost-sidebar__cta-call">
              or call 08038159214
            </a>
          </div>

          {/* Related in same category */}
          {related.length > 0 && (
            <div className="bpost-sidebar__related">
              <h4 className="bpost-sidebar__related-title">
                MORE IN {post.category.toUpperCase()}
              </h4>
              {related.map(r => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="bpost-sidebar__related-item"
                >
                  <span className="bpost-sidebar__related-cat">{r.category}</span>
                  <span className="bpost-sidebar__related-name">{r.title}</span>
                  <span className="bpost-sidebar__related-date">{r.date}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="bpost-sidebar__contact">
            <h4 className="bpost-sidebar__contact-title">CONTACT US</h4>
            <a href="tel:08038159214" className="bpost-sidebar__contact-phone">
              08038159214
            </a>
            <a href="mailto:masterpatternltd@gmail.com"
              className="bpost-sidebar__contact-email">
              masterpatternltd@gmail.com
            </a>
          </div>
        </aside>
      </div>

      {/* Related articles bottom strip */}
      {related.length > 0 && (
        <section className="bpost-more">
          <h2 className="bpost-more__heading">Related <span>Articles</span></h2>
          <div className="bpost-more__grid">
            {related.map(r => (
              <article
                key={r.slug}
                className="bpost-more__card"
                onClick={() => navigate(`/blog/${r.slug}`)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${r.slug}`)}
              >
                <div className="bpost-more__card-img">
                  {r.image
                    ? <img src={r.image} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    : <svg viewBox="0 0 240 140" fill="none"
                        style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
                        <rect width="240" height="140" fill="#071428"/>
                        <rect x="50" y="20" width="140" height="90" fill="#0B1F3B"
                          stroke={`${r.accent}55`} strokeWidth="1"/>
                        <rect x="50" y="20" width="140" height="3" fill={r.accent} opacity="0.9"/>
                      </svg>
                  }
                </div>
                <div className="bpost-more__card-body">
                  <span className="bpost-more__card-cat">{r.category}</span>
                  <h3 className="bpost-more__card-title">{r.title}</h3>
                  <span className="bpost-more__card-cta">READ →</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
