import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchPosts, fetchCategories } from '../../services/wordpress';
import './BlogPage.css';

const Thumbnail = ({ accent = '#E8781A', image = null, index = 0 }) => {
  if (image) {
    return (
      <img src={image} alt=""
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
    );
  }
  return (
    <svg viewBox="0 0 240 200" fill="none"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
      <rect width="240" height="200" fill="#071428"/>
      <g stroke="#E8781A" strokeWidth="0.3" opacity="0.07">
        {[40,80,120,160,200].map(x=><line key={x} x1={x} y1="0" x2={x} y2="200"/>)}
        {[40,80,120,160].map(y=><line key={y} x1="0" y1={y} x2="240" y2={y}/>)}
      </g>
      <rect x="50" y="30" width="140" height="120" fill="#0B1F3B" stroke={`${accent}55`} strokeWidth="1.2"/>
      <rect x="50" y="30" width="140" height="4" fill={accent} opacity="0.9"/>
      {[42,60,78,96,114,132].map((y,ri)=>
        [60,80,100,120,140,160,180].map((x,ci)=>(
          <rect key={`${ri}${ci}`} x={x} y={y} width="12" height="14" rx="1"
            fill={`${accent}${(ri+ci)%3===0?'77':'1a'}`}/>
        ))
      )}
      <rect x="0" y="172" width="240" height="28" fill="rgba(4,9,20,0.78)"/>
    </svg>
  );
};

const BlogPage = () => {
  const navigate       = useNavigate();
  const location       = useLocation();

  const [posts,      setPosts]      = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [active,     setActive]     = useState(location.state?.category || 'All');
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [filterKey,  setFilterKey]  = useState(0);

  /* Load categories once */
  useEffect(() => {
    fetchCategories()
      .then(cats => setCategories(['All', ...cats]))
      .catch(() => {/* keep default */});
  }, []);

  /* Load posts whenever active category changes */
  useEffect(() => {
    setLoading(true);
    setError('');

    fetchPosts({ per_page: 50 })
      .then(all => {
        const filtered = active === 'All'
          ? all
          : all.filter(p => p.category === active);
        setPosts(filtered);
        setFilterKey(k => k + 1);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load articles. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div className="blog-page">

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero__bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 380"
            preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="380" fill="#060D1A"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.08">
              {Array.from({length:20},(_,i)=><line key={i} x1={i*64} y1="0" x2={i*64} y2="380"/>)}
              {Array.from({length:7}, (_,i)=><line key={i} x1="0" y1={i*54} x2="1200" y2={i*54}/>)}
            </g>
            <rect x="0" y="375" width="1200" height="5" fill="#E8781A" opacity="0.4"/>
          </svg>
        </div>
        <div className="blog-hero__content">
          <nav className="blog-hero__crumb">
            <Link to="/" className="blog-hero__crumb-link">Home</Link>
            <span>→</span><span>Blog</span>
          </nav>
          <div className="blog-hero__tag">
            <span className="blog-hero__tag-line"/>
            <span className="blog-hero__tag-text">INSIGHTS & NEWS</span>
          </div>
          <h1 className="blog-hero__heading">
            Construction <em>Knowledge</em><br/>for Nigerian Property Owners
          </h1>
          <p className="blog-hero__sub">
            Practical guides, industry news, safety updates and project spotlights
            from the Masterpattern team.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="blog-main">

        {/* Filters */}
        <div className="blog-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`blog-filter${active === cat ? ' blog-filter--active' : ''}`}
              onClick={() => setActive(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="blog-grid" key="loading">
            {Array.from({length:6}).map((_, i) => (
              <div key={i} className="blog-skeleton">
                <div className="blog-skeleton__img"/>
                <div className="blog-skeleton__body">
                  <div className="blog-skeleton__line blog-skeleton__line--sm"/>
                  <div className="blog-skeleton__line"/>
                  <div className="blog-skeleton__line blog-skeleton__line--md"/>
                  <div className="blog-skeleton__line blog-skeleton__line--sm"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="blog-error">
            <p>{error}</p>
            <button onClick={() => setActive('All')} type="button">TRY AGAIN</button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="blog-grid" key={filterKey}>
            {posts.map((post, i) => (
              <article
                key={post.id}
                className={`blog-item${i === 0 && active === 'All' ? ' blog-item--featured' : ''}`}
                onClick={() => navigate(`/blog/${post.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
                aria-label={`Read: ${post.title}`}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="blog-item__img">
                  <Thumbnail accent={post.accent} image={post.image} index={i}/>
                  <div className="blog-item__overlay"/>
                  <span className="blog-item__cat">{post.category.toUpperCase()}</span>
                  <span className="blog-item__line"/>
                </div>
                <div className="blog-item__body">
                  <div className="blog-item__meta">
                    <span className="blog-item__date">{post.date}</span>
                    <span className="blog-item__sep" aria-hidden="true">·</span>
                    <span className="blog-item__read">{post.readTime}</span>
                  </div>
                  <h2 className="blog-item__title">{post.title}</h2>
                  <p className="blog-item__excerpt">{post.excerpt}</p>
                  <span className="blog-item__cta">READ ARTICLE →</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && posts.length === 0 && (
          <div className="blog-empty">
            <p>No articles in this category yet.</p>
            <button onClick={() => setActive('All')} type="button" className="blog-empty__btn">
              VIEW ALL ARTICLES
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
