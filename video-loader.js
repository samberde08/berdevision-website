// Load and display videos from videos.json into the work grid
async function loadVideos() {
  try {
    const response = await fetch('videos.json');
    const data = await response.json();
    const workGridWrap = document.querySelector('.work-grid-wrap');

    if (!workGridWrap) return;

    // Remove any existing static work pages
    workGridWrap.querySelectorAll('.work-page').forEach(function(p) { p.remove(); });

    // Group videos by category
    var categories = {};
    data.videos.forEach(function(video) {
      var cat = video.category || 'video';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(video);
    });

    var thumbClasses = ['thumb-a', 'thumb-b', 'thumb-c', 'thumb-d', 'thumb-e'];
    var pageSize = 6;
    var firstPage = null;

    // Insert pages before the prev arrow button (or append if not found)
    var prevBtn = document.getElementById('workPrev');

    Object.keys(categories).forEach(function(category) {
      var videos = categories[category];
      var totalPages = Math.ceil(videos.length / pageSize);

      for (var pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        var pageVideos = videos.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        var pageDiv = document.createElement('div');
        pageDiv.className = 'work-grid work-page' +
          (pageIndex === 0 && category === Object.keys(categories)[0] ? ' active-page' : '');
        pageDiv.dataset.filter = category;
        pageDiv.dataset.page = String(pageIndex);

        pageVideos.forEach(function(video, itemIndex) {
          var globalIndex = pageIndex * pageSize + itemIndex + 1;
          var thumbClass = thumbClasses[itemIndex % thumbClasses.length];
          var item = document.createElement('div');
          item.className = 'work-item';
          item.dataset.cat = category;
          item.dataset.vimeo = video.vimeoId || '';

          var thumbHtml = video.vimeoId
            ? '<div class="video-container">' +
                '<iframe src="https://player.vimeo.com/video/' + video.vimeoId + '?autoplay=0&background=1" ' +
                  'width="100%" height="100%" frameborder="0" ' +
                  'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>' +
                '</iframe>' +
              '</div>'
            : '<div class="thumb-placeholder ' + thumbClass + '">' +
                '<span class="thumb-num">' + String(globalIndex).padStart(2, '0') + '</span>' +
              '</div>';

          var categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
          item.innerHTML = thumbHtml +
            '<div class="work-overlay">' +
              '<p class="work-tag">' + categoryLabel + ' · ' + (video.year || '2024') + '</p>' +
              '<p class="work-name">' + video.title + '</p>' +
            '</div>';

          pageDiv.appendChild(item);
        });

        if (prevBtn) {
          workGridWrap.insertBefore(pageDiv, prevBtn);
        } else {
          workGridWrap.appendChild(pageDiv);
        }

        if (!firstPage) firstPage = pageDiv;
      }
    });

    // Update pagination counter for the active filter
    var activeFilter = (document.querySelector('.filter-btn.active') || {}).dataset
      ? document.querySelector('.filter-btn.active').dataset.filter
      : Object.keys(categories)[0];
    var visiblePages = workGridWrap.querySelectorAll('.work-page[data-filter="' + activeFilter + '"]');
    var counter = document.getElementById('workNavCounter');
    if (counter) {
      counter.textContent = '1 / ' + visiblePages.length;
    }

    // Update prev/next button state
    var nextBtn = document.getElementById('workNext');
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = visiblePages.length <= 1;

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