import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Custom hook to fetch an image URL from Firebase Storage
const useFirebaseImage = (imagePath) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);

      try {
        const imageUrl = await getDownloadURL(imageRef);
        setUrl(imageUrl);
      } catch (error) {
        console.error("Failed to load image from Firebase Storage", error);
      }
    };

    fetchImageUrl();
  }, [imagePath]); // Re-run the effect if imagePath changes

  return url;
};

export default useFirebaseImage;