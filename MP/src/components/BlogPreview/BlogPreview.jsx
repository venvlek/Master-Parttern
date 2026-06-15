import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../services/wordpress';
import './BlogPreview.css';

const Thumbnail = ({ accent = '#E8781A', image = null, index = 0 }) => {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
      />
    );
  }

  const patterns = [
    <g key="a">
      <rect x="60" y="30" width="120" height="140" fill="#0B1F3B" stroke={`${accent}66`} strokeWidth="1.5"/>
      <rect x="60" y="30" width="120" height="4" fill={accent} opacity="0.9"/>
      {[46,64,82,100,118,136,154].map((y,ri)=>
        [72,90,108,126,144,162].map((x,ci)=>(
          <rect key={`${ri}${ci}`} x={x} y={y} width="10" height="12" rx="1"
            fill={`${accent}${(ri+ci)%3===0?'88':'2a'}`}/>
        ))
      )}
    </g>,
    <g key="b">
      <g stroke={accent} strokeWidth="0.5" opacity="0.2">
        {[40,80,120,160,200].map(x=><line key={x} x1={x} y1="0" x2={x} y2="180"/>)}
        {[36,72,108,144].map(y=><line key={y} x1="0" y1={y} x2="240" y2={y}/>)}
      </g>
      <rect x="30" y="30" width="180" height="120" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="6,3"/>
      <circle cx="120" cy="90" r="35" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7"/>
      <circle cx="120" cy="90" r="5" fill={accent} opacity="0.8"/>
    </g>,
    <g key="c">
      <path d="M60 95 C60 66 78 47 120 47 C162 47 180 66 180 95"
        fill="#0B1F3B" stroke={accent} strokeWidth="2"/>
      <rect x="46" y="93" width="148" height="18" rx="3" fill="#0D2444" stroke={accent} strokeWidth="1.2"/>
      <rect x="108" y="60" width="24" height="14" rx="2" fill={accent} opacity="0.7"/>
    </g>,
  ];

  return (
    <svg viewBox="0 0 240 180" fill="none"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
      <rect width="240" height="180" fill="#071428"/>
      <g stroke="#E8781A" strokeWidth="0.3" opacity="0.07">
        {[40,80,120,160,200].map(x=><line key={x} x1={x} y1="0" x2={x} y2="180"/>)}
        {[36,72,108,144].map(y=><line key={y} x1="0" y1={y} x2="240" y2={y}/>)}
      </g>
      {patterns[index % patterns.length]}
      <rect x="0" y="155" width="240" height="25" fill="rgba(4,9,20,0.8)"/>
    </svg>
  );
};

const BlogPreview = () => {
  const navigate = useNavigate();
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetchPosts({ per_page: 3 })
      .then(setPosts)
      .catch(err => {
        console.error(err);
        setError('Could not load articles.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="blog-preview">
      <div className="blog-preview__header">
        <div>
          <div className="blog-preview__tag">
            <span className="blog-preview__tag-line"/>
            <span className="blog-preview__tag-text">LATEST INSIGHTS</span>
          </div>
          <h2 className="blog-preview__heading">
            News &amp; <span>Articles</span>
          </h2>
        </div>
        <button
          className="blog-preview__all"
          onClick={() => navigate('/blog')}
          type="button"
        >
          VIEW ALL ARTICLES
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="blog-preview__loading">
          {[1,2,3].map(i => (
            <div key={i} className="blog-preview__skeleton">
              <div className="blog-preview__skeleton-img"/>
              <div className="blog-preview__skeleton-body">
                <div className="blog-preview__skeleton-line blog-preview__skeleton-line--sm"/>
                <div className="blog-preview__skeleton-line"/>
                <div className="blog-preview__skeleton-line blog-preview__skeleton-line--md"/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="blog-preview__error">{error}</p>
      )}

      {/* Posts */}
      {!loading && !error && (
        <div className="blog-preview__grid">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="blog-card"
              onClick={() => navigate(`/blog/${post.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
              aria-label={`Read: ${post.title}`}
            >
              <div className="blog-card__img">
                <Thumbnail accent={post.accent} image={post.image} index={i}/>
                <div className="blog-card__overlay"/>
                <span className="blog-card__cat">{post.category.toUpperCase()}</span>
                <span className="blog-card__line"/>
              </div>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className="blog-card__date">{post.date}</span>
                  <span className="blog-card__dot" aria-hidden="true"/>
                  <span className="blog-card__read">{post.readTime}</span>
                </div>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <span className="blog-card__cta">READ ARTICLE →</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogPreview;
