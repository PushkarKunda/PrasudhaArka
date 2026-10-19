import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Subscribe to admin-uploaded gallery media (Firestore `gallery_media`).
 * Returns an unsubscribe function, or null when Firebase is not configured.
 * Kept in its own module with static imports so bundler tree-shaking works
 * (a dynamic namespace import of firebase/firestore defeats it).
 */
export function subscribeToGalleryMedia(onItems, onError) {
  if (!db) return null;

  const mediaQuery = query(collection(db, 'gallery_media'), orderBy('createdAt', 'desc'));

  return onSnapshot(
    mediaQuery,
    (snapshot) => {
      const media = [];
      snapshot.forEach((document) => {
        const data = document.data();
        if (data && data.url) media.push({ id: document.id, ...data });
      });
      onItems(media);
    },
    onError,
  );
}
