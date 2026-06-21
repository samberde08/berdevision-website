// Load and display videos from videos.json
async function loadVideos() {
  try {
    const response = await fetch('videos.json');
    const data = await response.json();
    const workGrid = document.querySelector('.work-grid');
    
    if (!workGrid) return;
    
    // Clear placeholder items
    workGrid.innerHTML = '';
    
    // Create video items
    data.videos.forEach((video, index) => {
      const item = document.createElement('div');
      item.className = 'work-item';
      item.innerHTML = `
        <div class="video-container">
          ${video.vimeoId ? `
            <iframe 
              src="https://player.vimeo.com/video/${video.vimeoId}?h=&autoplay=0" 
              width="100%" 
              height="100%" 
              frameborder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowfullscreen>
            </iframe>
          ` : `
            <div class="thumb-placeholder">
              <span class="thumb-num">0${index + 1}</span>
            </div>
          `}
        </div>
        <div class="work-overlay">
          <div class="work-tag">${video.category.toUpperCase()}</div>
          <div class="work-name">${video.title}</div>
          <div style="font-size: 0.7rem; color: rgba(12,12,12,0.3); margin-top: 0.3rem;">${video.description}</div>
        </div>
      `;
      workGrid.appendChild(item);
    });
  } catch (error) {
    console.error('Error loading videos:', error);
  }
}

// Load videos when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadVideos);
} else {
  loadVideos();
}