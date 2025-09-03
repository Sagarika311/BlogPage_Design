// script.js

// Search functionality
document.querySelector('.search-btn').addEventListener('click', () => {
  const searchInput = document.querySelector('.search-input');
  const query = searchInput.value.trim();
  if (query) {
    console.log('Searching for:', query);
    alert(`Simulating search for: "${query}". In a real app, this would fetch results.`);
    searchInput.value = '';
  }
});

// Enter key support for search input
document.querySelector('.search-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.querySelector('.search-btn').click();
  }
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nameInput = this.querySelector('input[type="text"]');
  const emailInput = this.querySelector('input[type="email"]');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name && email) {
    console.log('Newsletter Subscription Request:', { name, email });
    alert('Thank you for subscribing! Welcome to our mindful community. (Data would be sent to server)');
    this.reset();
  } else {
    alert('Please enter both your name and email to subscribe.');
  }
});

// Smooth scroll for nav and footer links
document.querySelectorAll('.nav a, .footer-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        console.log('Navigating to:', targetId);
      }
    }
  });
});

// Social sharing functionality
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const platform = Array.from(this.classList).find(cls =>
      ['facebook', 'twitter', 'linkedin', 'pinterest'].includes(cls)
    );
    if (!platform) {
      console.log('Unknown social platform clicked.');
      return;
    }
    const articleTitleEl = document.querySelector('.post-title');
    const articleTitle = articleTitleEl ? articleTitleEl.innerText : document.title || '';
    const articleUrl = window.location.href;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(articleTitle)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(articleUrl)}&description=${encodeURIComponent(articleTitle)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      console.log(`Sharing to ${platform} with URL: ${shareUrl}`);
    }
  });
});

// Animate cards and widgets on scroll using IntersectionObserver
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.post-card, .sidebar-widget').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Favorite/Save functionality with localStorage persistence
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('saved');
    const icon = this.querySelector('i');
    const articleTitleEl = this.closest('.post-card')?.querySelector('.card-title');
    const articleTitle = articleTitleEl ? articleTitleEl.innerText : '';

    if (this.classList.contains('saved')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      alert(`"${articleTitle}" saved to favorites!`);
      saveFavorite(articleTitle);
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      alert(`"${articleTitle}" removed from favorites.`);
      removeFavorite(articleTitle);
    }
  });
});

function saveFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem('mindfulLivingFavorites')) || [];
  if (!favorites.includes(title)) {
    favorites.push(title);
    localStorage.setItem('mindfulLivingFavorites', JSON.stringify(favorites));
    console.log('Current Favorites:', favorites);
  }
}

function removeFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem('mindfulLivingFavorites')) || [];
  favorites = favorites.filter(item => item !== title);
  localStorage.setItem('mindfulLivingFavorites', JSON.stringify(favorites));
  console.log('Current Favorites:', favorites);
}

document.addEventListener('DOMContentLoaded', () => {
  let favorites = JSON.parse(localStorage.getItem('mindfulLivingFavorites')) || [];
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const articleTitleEl = btn.closest('.post-card')?.querySelector('.card-title');
    const articleTitle = articleTitleEl ? articleTitleEl.innerText : '';
    if (favorites.includes(articleTitle)) {
      btn.classList.add('saved');
      const icon = btn.querySelector('i');
      icon.classList.remove('far');
      icon.classList.add('fas');
    }
  });
});

// "Read More" toggle for recent posts
document.querySelectorAll('.post-card .read-more').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const postCard = this.closest('.post-card');
    const fullContent = postCard.querySelector('.full-content');
    const excerpt = postCard.querySelector('.card-excerpt');

    const isHidden = fullContent.style.display === 'none' || fullContent.style.display === '';
    fullContent.style.display = isHidden ? 'block' : 'none';
    excerpt.style.display = isHidden ? 'none' : 'block';
    this.textContent = isHidden ? 'Read Less' : 'Read More';
  });
});

// "Read More" toggle for featured post
const featuredReadMore = document.querySelector('.featured-post .read-more');
if (featuredReadMore) {
  featuredReadMore.addEventListener('click', function (e) {
    e.preventDefault();
    const featuredPost = document.querySelector('.featured-post');
    const excerpt = featuredPost.querySelector('.post-excerpt');
    const fullContent = featuredPost.querySelector('.full-content');

    const isHidden = fullContent.style.display === 'none' || fullContent.style.display === '';
    fullContent.style.display = isHidden ? 'block' : 'none';
    excerpt.style.display = isHidden ? 'none' : 'block';
    this.innerHTML = isHidden ? 'Read Less <i class="fas fa-arrow-left"></i>' : 'Continue Reading <i class="fas fa-arrow-right"></i>';
  });
}

// Popular Posts Modal Logic
const popularPosts = document.querySelectorAll('.popular-post');
const modal = document.getElementById('popular-article-modal');
const modalTitle = document.getElementById('popular-article-title');
const modalText = document.getElementById('popular-article-text');
const closeBtn = document.getElementById('close-popular-article');

const popularArticles = {
  "Daily Rituals for Inner Peace": `Simple daily rituals, such as morning stretches, mindful tea breaks, or evening journaling, can bring structure and calm to a busy life. These small but meaningful practices help us slow down, stay grounded, and nurture inner peace amidst everyday challenges.`,
  "The Art of Mindful Consumption": `What we choose to read, watch, or listen to directly shapes our mindset and energy. Mindful consumption encourages us to engage with content that uplifts, inspires, and aligns with our values. By being intentional with what we consume, we create mental clarity and protect our emotional well-being.`,
  "Building Resilience Through Gratitude": `Gratitude is more than a fleeting feeling—it’s a practice that strengthens resilience. By regularly acknowledging the positives in our lives, we shift focus from what’s missing to what’s meaningful. This simple habit enhances optimism, fosters stronger connections, and equips us to navigate challenges with greater strength.`
};

popularPosts.forEach(post => {
  post.setAttribute('tabindex', '0'); // ensure keyboard focusable
  post.addEventListener('click', () => {
    const title = post.dataset.title || '';
    const text = popularArticles[title] || 'No description available.';
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modal.focus();
  });

  post.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      post.click();
    }
  });
});

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // restore scroll
}

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside modal content
modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// Category links simulation
document.querySelectorAll('.category-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const span = this.querySelector('span:first-child');
    const categoryName = span ? span.innerText : '';
    alert(`Simulating browsing articles in category: "${categoryName}".`);
  });
});
