import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref } from 'firebase/storage';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { LoginForm } from './LoginForm';

export function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  const [mediaList, setMediaList] = useState([]);
  
  useEffect(() => {
    if (!auth) {
      setLoadingAuth(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    const q = query(collection(db, 'gallery_media'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const media = [];
      snapshot.forEach((doc) => {
        media.push({ id: doc.id, ...doc.data() });
      });
      setMediaList(media);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !db) return;

    // Security Hardening: File type & size validation
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert("Invalid file type. Only images and videos are allowed.");
      return;
    }

    const maxSizeImage = 5 * 1024 * 1024; // 5MB
    const maxSizeVideo = 50 * 1024 * 1024; // 50MB

    if (isImage && file.size > maxSizeImage) {
      alert("Image exceeds the 5MB size limit. Please compress it before uploading.");
      return;
    }
    if (isVideo && file.size > maxSizeVideo) {
      alert("Video exceeds the 50MB size limit. Please compress it before uploading.");
      return;
    }

    setUploading(true);
    setUploadProgress(10); // Show initial progress

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary environment variables are missing.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${isVideo ? 'video' : 'image'}/upload`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload to Cloudinary failed');
      }

      const data = await response.json();
      setUploadProgress(80); // Near completion
      
      await addDoc(collection(db, 'gallery_media'), {
        url: data.secure_url,
        type: isVideo ? 'video' : 'image',
        public_id: data.public_id,
        createdAt: serverTimestamp(),
      });
      
      setFile(null);
      setUploadProgress(0);
      setUploading(false);
      // reset input
      document.getElementById('file-upload').value = '';
    } catch (err) {
      console.error('Upload error:', err);
      setUploading(false);
      alert('Failed to upload file. Check console.');
    }
  };

  const handleDelete = async (id, public_id) => {
    if (!window.confirm('Are you sure you want to remove this media from the gallery? (Note: It will only be removed from the website, not your Cloudinary account)')) return;
    try {
      await deleteDoc(doc(db, 'gallery_media', id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting media from database.');
    }
  };

  if (loadingAuth) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>Loading...</div>;
  }

  if (!user) {
    return <LoginForm onLoginSuccess={() => {}} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', fontFamily: 'var(--font-en)', paddingBottom: '60px' }}>
      {/* Admin Header */}
      <header style={{
        background: '#0f172a',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-en)' }}>Prasudharka Admin</h1>
        <button 
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          Logout
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Upload Section */}
        <section style={{
          background: 'white',
          padding: '30px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontFamily: 'var(--font-en)', color: '#0f172a', marginBottom: '20px' }}>
            Upload Media to Gallery
          </h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input 
              id="file-upload"
              type="file" 
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{
                border: '1px solid #cbd5e1',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                flexGrow: 1,
                maxWidth: '400px'
              }}
            />
            <button 
              type="submit"
              disabled={!file || uploading}
              style={{
                background: 'var(--gold-500)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontWeight: 'bold',
                cursor: (!file || uploading) ? 'not-allowed' : 'pointer',
                opacity: (!file || uploading) ? 0.7 : 1
              }}
            >
              {uploading ? `Uploading ${Math.round(uploadProgress)}%` : 'Upload to Gallery'}
            </button>
          </form>
          {uploading && (
            <div style={{ marginTop: '20px', background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${uploadProgress}%`, background: 'var(--gold-500)', height: '100%', transition: 'width 0.3s' }} />
            </div>
          )}
        </section>

        {/* Gallery Management Section */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-en)', color: '#0f172a', marginBottom: '20px' }}>
            Manage Gallery Media
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {mediaList.length === 0 && (
              <p style={{ color: '#64748b' }}>No media uploaded yet.</p>
            )}
            {mediaList.map((media) => (
              <div key={media.id} style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ position: 'relative', paddingTop: '75%', background: '#f1f5f9' }}>
                  {media.type === 'video' ? (
                    <video 
                      src={media.url} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      controls
                    />
                  ) : (
                    <img 
                      src={media.url} 
                      alt="Gallery media" 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'capitalize' }}>{media.type}</span>
                  <button 
                    onClick={() => handleDelete(media.id, media.public_id)}
                    style={{
                      background: '#fee2e2',
                      color: '#ef4444',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
