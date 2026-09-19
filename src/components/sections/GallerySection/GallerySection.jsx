import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export function GallerySection({ lang, t }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
      setError("Firebase not configured.");
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'gallery_media'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const media = [];
      snapshot.forEach((doc) => {
        media.push({ id: doc.id, ...doc.data() });
      });
      setMediaList(media);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching gallery:", err);
      setError("Failed to load gallery.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="gallery-section" style={{ padding: '80px 0', background: 'var(--bg-surface)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading Gallery...</p>
      </section>
    );
  }

  if (error || mediaList.length === 0) {
    // Hide section entirely if empty and no error, or just show empty state if needed.
    // We'll show nothing if empty for a cleaner UI when not configured.
    return null; 
  }

  return (
    <section className="gallery-section" style={{ padding: '80px 0', background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', margin: '0 auto 50px', maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--gold-50)',
            color: 'var(--gold-600)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            fontWeight: '700',
            fontSize: '0.85rem',
            marginBottom: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            Our Installations
          </div>
          <h2 style={{ fontFamily: 'var(--font-en)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>
            Project Gallery
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Take a look at some of our recent solar installations and green energy projects.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          {mediaList.map((media) => (
            <div 
              key={media.id} 
              style={{
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid var(--border-light)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '80%' }}>
                {media.type === 'video' ? (
                  <video 
                    src={media.url} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    controls
                    muted
                  />
                ) : (
                  <img 
                    src={media.url} 
                    alt="Solar project installation" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
