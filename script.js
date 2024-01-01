async function searchImages() {
  const searchInput = document.getElementById('searchInput').value;
  const imageGallery = document.getElementById('imageGallery');
  const loader = document.getElementById('loader');

  // Show loader while fetching images
  loader.style.display = 'block';

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchInput}&client_id=YOUR_UNSPLASH_API_KEY`);
    const data = await response.json();
    imageGallery.innerHTML = '';

    // Display fetched images
    data.results.forEach(image => {
      const imageCard = document.createElement('div');
      imageCard.className = 'image-card';

      const img = document.createElement('img');
      img.src = image.urls.small;
      img.alt = image.alt_description;

      imageCard.appendChild(img);
      imageGallery.appendChild(imageCard);
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    // Hide loader when fetching is complete
    loader.style.display = 'none';
  }
}