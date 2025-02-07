"use strict";

// =======================
// CONSTANTS
// =======================

const UNIVERSITY_LIST = [
  "Santa Clara University",
  "Stanford University",
  "Arizona State University",
  "UC Berkeley",
  "Johns Hopkins University",
  "Harvard University",
  "Massachusetts Institute of Technology",
  "University of Michigan",
  "University of Minnesota",
  "Ohio State University",
  "Virginia Tech",
  "University of Washington"
];

const CATEGORY_COLORS = {
  "housing": "#4CAF50",
  "for sale": "#FF9800",
  "jobs": "#9C27B0",
  "personals": "#E91E63",
  "campus jobs": "#009688",
  "community": "#F44336",
  "services": "#795548",
  "events": "#283593",
  "resumes": "#263238"
};

const CATEGORY_ICONS = {
  "housing": "home",
  "for sale": "local_offer",
  "jobs": "work",
  "personals": "person",
  "campus jobs": "school",
  "community": "group",
  "services": "build",
  "events": "event",
  "resumes": "description"
};

// =======================
// GLOBAL VARIABLES
// =======================

let currentPhotos = [];
let currentPhotoIndex = 0;
let selectedCategory = "";

// Sample posts data (for demonstration)
const posts = [
  {
    id: 1,
    title: "Orange Bike for Sale",
    description: "Great condition, used for one year. Pickup on campus.",
    price: "$100",
    time_ago: "5 secs",
    createdAt: "Thu, Feb 06, 2025 08:11 PM",
    photos: [
      "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611095564985-0660f731e732?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    category: "for sale"
  },
  {
    id: 2,
    title: "Roommate Wanted",
    description: "Looking for a roommate near campus. Spacious room with great amenities.",
    price: "$800/mo",
    time_ago: "1 min",
    createdAt: "Fri, Mar 14, 2025 09:23 AM",
    photos: [
      "https://media.istockphoto.com/id/1010132614/photo/excited-woman-receiving-a-gift-from-a-friend.jpg?s=1024x1024&w=is&k=20&c=sll2rqzjuvnMnu0Uw8d8nLRffIDD7ixL2c2ScpKOfDs=",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    category: "housing"
  },
  // ... (additional posts data)
];

// =======================
// DOM ELEMENTS
// =======================

const postsGrid    = document.getElementById('postsGrid');
const searchInput  = document.getElementById('searchInput');
const categoryBar  = document.getElementById('categoryBar');
const postModal    = document.getElementById('postModal');
const closeModalEl = document.getElementById('closeModal');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDescription');
const modalPrice   = document.getElementById('modalPrice');
const modalPhoto   = document.getElementById('modalPhoto');
const modalCategory= document.getElementById('modalCategory');
const leftArrow    = document.getElementById('leftArrow');
const rightArrow   = document.getElementById('rightArrow');
const menuButton   = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

const universityBar      = document.getElementById('universityBar');
const universityScrollArrow = document.getElementById('universityScrollArrow');
const categoryScrollArrow   = document.getElementById('categoryScrollArrow');

// =======================
// INITIAL SETUP
// =======================

// Populate University Bar using UNIVERSITY_LIST constant
function populateUniversityBar() {
  universityBar.innerHTML = "";
  UNIVERSITY_LIST.forEach(univ => {
    const option = document.createElement("div");
    option.className = "university-option";
    option.setAttribute("data-university", univ);
    option.innerHTML = `<p>${univ}</p>`;
    universityBar.appendChild(option);
  });
}
populateUniversityBar();

// =======================
// EVENT LISTENERS
// =======================

// Toggle user dropdown menu
menuButton.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});
document.addEventListener('click', (e) => {
  if (!dropdownMenu.contains(e.target) && e.target !== menuButton) {
    dropdownMenu.classList.remove('show');
  }
});

// Modal navigation
leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  currentPhotoIndex = (currentPhotoIndex > 0) ? currentPhotoIndex - 1 : currentPhotos.length - 1;
  updateModalPhoto();
});
rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  currentPhotoIndex = (currentPhotoIndex < currentPhotos.length - 1) ? currentPhotoIndex + 1 : 0;
  updateModalPhoto();
});
closeModalEl.addEventListener("click", closeModalFunction);
window.addEventListener("click", (e) => {
  if (e.target === postModal) {
    closeModalFunction();
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalFunction();
});

// Search input
searchInput.addEventListener("input", (e) => {
  renderPosts(e.target.value);
});

// Category bar click handler
categoryBar.addEventListener("click", (e) => {
  const option = e.target.closest('.category-option');
  if (!option) return;
  document.querySelectorAll('.category-option').forEach(el => el.classList.remove('active'));
  option.classList.add('active');
  selectedCategory = option.dataset.category || "";
  renderPosts(searchInput.value);
});

// Scroll arrow for Category Bar
categoryScrollArrow.addEventListener('click', () => {
  categoryBar.scrollBy({ left: 200, behavior: 'smooth' });
});
function updateCategoryBarArrow() {
  if (categoryBar.scrollWidth > categoryBar.clientWidth) {
    categoryScrollArrow.classList.add('show');
  } else {
    categoryScrollArrow.classList.remove('show');
  }
}
window.addEventListener('load', updateCategoryBarArrow);
window.addEventListener('resize', updateCategoryBarArrow);

// Scroll arrow for University Bar
universityScrollArrow.addEventListener('click', () => {
  universityBar.scrollBy({ left: 200, behavior: 'smooth' });
});
function updateUniversityBarArrow() {
  if (universityBar.scrollWidth > universityBar.clientWidth) {
    universityScrollArrow.classList.add('show');
  } else {
    universityScrollArrow.classList.remove('show');
  }
}
window.addEventListener('load', updateUniversityBarArrow);
window.addEventListener('resize', updateUniversityBarArrow);

// =======================
// FUNCTIONS
// =======================

function updateModalPhoto() {
  modalPhoto.src = currentPhotos[currentPhotoIndex];
}

function openModal(post, updateHistory = true) {
  if (updateHistory) {
    window.history.pushState({ postId: post.id }, '', `#post=${post.id}`);
  }
  currentPhotos = post.photos;
  currentPhotoIndex = 0;
  updateModalPhoto();

  modalTitle.textContent = post.title;
  modalCategory.innerHTML = `<span class="material-icons" style="vertical-align: middle; margin-right: 4px;">${CATEGORY_ICONS[post.category] || "apps"}</span>${post.category}`;
  modalCategory.style.backgroundColor = CATEGORY_COLORS[post.category] || "#000";
  modalCategory.style.color = "#fff";
  modalPrice.textContent = `Price: ${post.price}`;

  const modalCreatedAt = document.getElementById('modalCreatedAt');
  modalCreatedAt.textContent = `Created on: ${post.createdAt}`;

  modalDesc.textContent = post.description;
  postModal.classList.add("active");

  // Show slider arrows if multiple photos available
  if (currentPhotos.length > 1) {
    leftArrow.style.display = "block";
    rightArrow.style.display = "block";
  } else {
    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
  }
}

function closeModalFunction() {
  postModal.classList.remove("active");
  window.history.pushState({}, '', window.location.pathname + window.location.search);
}

function showPostDetails(id) {
  const post = posts.find(p => p.id === id);
  if (post) openModal(post, true);
}

function renderPosts(textFilter = "") {
  postsGrid.innerHTML = "";
  const filtered = posts.filter(post => {
    const matchCategory = !selectedCategory || post.category === selectedCategory;
    const matchText = post.title.toLowerCase().includes(textFilter.toLowerCase()) ||
                      post.description.toLowerCase().includes(textFilter.toLowerCase());
    return matchCategory && matchText;
  });

  if (filtered.length === 0) {
    postsGrid.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>No posts found.</p>";
    return;
  }

  filtered.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    let photoHtml = "";
    let previewText = "";
    if (post.photos && post.photos.length > 0) {
      photoHtml = `<img src="${post.photos[0]}" alt="${post.title}" />`;
      previewText = post.description.substring(0, 60) + "...";
    } else {
      photoHtml = `<div class="post-body-text">${post.description}</div>`;
    }

    card.innerHTML = `
      <div class="wishlist-icon">
        <i class="fas fa-heart"></i>
      </div>
      ${photoHtml}
      <h2>${post.title}</h2>
      <span class="post-category" style="background-color: ${CATEGORY_COLORS[post.category]};">
        <span class="material-icons" style="vertical-align: middle; margin-right: 4px;">${CATEGORY_ICONS[post.category] || "apps"}</span>${post.category}
      </span>
      <p class="post-price">${post.price}</p>
      <p class="post-time-ago">${post.time_ago}</p>
      <p class="post-preview">${post.photos && post.photos.length > 0 ? post.description.substring(0, 60) + "..." : ""}</p>
    `;

    const wishlistIcon = card.querySelector('.wishlist-icon');
    wishlistIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const messageEl = document.createElement("div");
      messageEl.className = "wishlist-message";
      messageEl.textContent = "Saved post to wishlist.";
      card.appendChild(messageEl);
      setTimeout(() => {
        messageEl.style.opacity = 0;
        setTimeout(() => messageEl.remove(), 500);
      }, 2000);
    });

    card.addEventListener("click", () => showPostDetails(post.id));
    postsGrid.appendChild(card);
  });
}

// Handle browser navigation
window.addEventListener("popstate", () => {
  if (window.location.hash.startsWith("#post=")) {
    const id = parseInt(window.location.hash.replace("#post=", ""), 10);
    const post = posts.find(p => p.id === id);
    if (post) openModal(post, false);
  } else {
    postModal.classList.remove("active");
  }
});

// Initial rendering of posts
renderPosts();

// Open modal if URL contains a post hash
if (window.location.hash.startsWith("#post=")) {
  const id = parseInt(window.location.hash.replace("#post=", ""), 10);
  const post = posts.find(p => p.id === id);
  if (post) openModal(post, false);
}

// Share and Copy Link buttons
document.getElementById("copyLinkButton").addEventListener("click", () => {
  const postUrl = window.location.href;
  navigator.clipboard.writeText(postUrl)
    .then(() => alert("Link copied to clipboard!"))
    .catch(() => alert("Failed to copy the link."));
});
document.getElementById("facebookButton").addEventListener("click", () => {
  const postUrl = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
  window.open(facebookUrl, "_blank");
});
document.getElementById("xButton").addEventListener("click", () => {
  const postUrl = window.location.href;
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
  window.open(xUrl, "_blank");
});