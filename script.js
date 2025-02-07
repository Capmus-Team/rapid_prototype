// script.js

  // Mapping for category colors
  const categoryColors = {
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

  // Mapping for Material Icons
  const categoryIcons = {
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

  // Global variables for the modal slider
  let currentPhotos = [];
  let currentPhotoIndex = 0;

  // Keep track of the currently selected category ("" means "All")
  let selectedCategory = "";

  // Sample posts data with multiple photos
  const posts = [
    {
      id: 1,
      title: "Orange Bike for Sale",
      description: "Great condition, used for one year. Pickup on campus.",
      price: "$100",
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
      photos: [
        "https://media.istockphoto.com/id/1010132614/photo/excited-woman-receiving-a-gift-from-a-friend.jpg?s=1024x1024&w=is&k=20&c=sll2rqzjuvnMnu0Uw8d8nLRffIDD7ixL2c2ScpKOfDs=",
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "housing"
    },
    {
      id: 3,
      title: "CS Textbook",
      description: "Intro to Algorithms in excellent condition. No highlights or marks.",
      price: "$30",
      photos: [
        "https://images.unsplash.com/photo-1588912914017-923900a34710?q=80&w=3019&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=3019&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "for sale"
    },
    {
      id: 4,
      title: "Dorm Furniture",
      description: "Selling a set of dorm furniture including a bed, desk, and chair.",
      price: "$150",
      photos: [
        "https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1588854337111-0232f7283e34?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "for sale"
    },
    {
      id: 5,
      title: "Guitar Lessons",
      description: "Offering beginner guitar lessons at affordable rates. Flexible schedule.",
      price: "Starting at $20/hr",
      photos: [
        "https://plus.unsplash.com/premium_photo-1681396936891-ed738c53cb21?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "services"
    },
    {
      id: 6,
      title: "Internship Opportunity",
      description: "Exciting internship in tech. Apply now for a rewarding experience.",
      price: "Competitive",
      photos: [
        "https://plus.unsplash.com/premium_photo-1661502996011-cbd328de50f2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1581091215367-723d6a0a3b2f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "jobs"
    },
    {
      id: 7,
      title: "Community Meetup",
      description: "Join us for a community networking event. Connect with peers!",
      price: "Free",
      photos: [
        "https://plus.unsplash.com/premium_photo-1706061121025-4ea17e4d9d9a?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1516542076529-1ea3854896e4?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "community"
    },
    {
      id: 8,
      title: "Study Buddy Wanted",
      description: "Looking for a study partner to tackle challenging courses together.",
      price: "N/A",
      photos: [
        "https://images.unsplash.com/photo-1616428317393-acd93938b4fa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "personals"
    },
    {
      id: 9,
      title: "Campus Tutor Position",
      description: "On-campus tutoring job available for knowledgeable students.",
      price: "$15/hr",
      photos: [
        "https://media.istockphoto.com/id/170947812/photo/working-together.jpg?s=1024x1024&w=is&k=20&c=d4RiPJQDC1_ids2CgPfXl2pTj0qBf7OkSQSZqN_m1h8=",
        "https://images.unsplash.com/photo-1601015281167-111b5c8e67ea?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "campus jobs"
    },
    {
      id: 10,
      title: "Business Party",
      description: "Join us for a glamorous business networking event with live music, cocktails, and gourmet hors d'oeuvres.",
      price: "Tickets: $50",
      photos: [
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "events"
    },
    {
      id: 11,
      title: "CV of a Musician",
      description: "Professional resume showcasing a talented musician with years of performance and production experience. Available for gigs and collaborations.",
      price: "N/A",
      photos: [
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1551446591-142875a901a1?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "resumes"
    }
  ];

  // DOM elements
  const postsGrid = document.getElementById('postsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryBar = document.getElementById('categoryBar');
  const postModal = document.getElementById('postModal');
  const closeModalEl = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.getElementById('modalPrice');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalCategory = document.getElementById('modalCategory');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');

// Grab references to the user menu button and the dropdown
const menuButton = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

/**
 * Toggle the dropdown menu when the user clicks the button
 */
menuButton.addEventListener('click', (e) => {
  // Don’t let the click bubble up (so it doesn’t close immediately)
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

/**
 * If user clicks anywhere outside the dropdown, close it
 */
document.addEventListener('click', (e) => {
  // If the click is not inside the dropdown or the button, close it
  if (!dropdownMenu.contains(e.target) && e.target !== menuButton) {
    dropdownMenu.classList.remove('show');
  }
});

  /**
   * Updates the modal image based on the currentPhotoIndex.
   */
  function updateModalPhoto() {
    modalPhoto.src = currentPhotos[currentPhotoIndex];
  }

  /**
   * Opens the modal for a given post.
   * @param {Object} post - The post object.
   * @param {boolean} updateHistory - If true, update the URL hash.
   */
  function openModal(post, updateHistory = true) {
    if (updateHistory) {
      // Update the URL with a unique hash for the post.
      window.history.pushState({ postId: post.id }, '', `#post=${post.id}`);
    }
    // Set up the modal slider
    currentPhotos = post.photos;
    currentPhotoIndex = 0;
    updateModalPhoto();

    // Title, category, price, description
    modalTitle.innerText = post.title;
    modalCategory.innerHTML = `
      <span class="material-icons" style="vertical-align: middle; margin-right: 4px;">
        ${categoryIcons[post.category]}
      </span>${post.category}
    `;
    modalCategory.style.backgroundColor = categoryColors[post.category] || '#000';
    modalCategory.style.color = '#fff';
    modalPrice.innerText = `Price: ${post.price}`;
    modalDescription.innerText = post.description;

    postModal.classList.add("active");

    // Show or hide arrows depending on number of photos
    if (currentPhotos.length > 1) {
      leftArrow.style.display = "block";
      rightArrow.style.display = "block";
    } else {
      leftArrow.style.display = "none";
      rightArrow.style.display = "none";
    }
  }

  /**
   * Closes the modal and removes the post hash from the URL.
   */
  function closeModalFunction() {
    postModal.classList.remove("active");
    window.history.pushState({}, '', window.location.pathname + window.location.search);
  }

  /**
   * Show post details in a modal.
   * @param {number} id - The ID of the post.
   */
  function showPostDetails(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
      openModal(post, true);
    }
  }

  /**
   * Renders the posts into the grid, applying both the search filter
   * and the currently selected category.
   * @param {string} textFilter - The text to search in title and description.
   */
  function renderPosts(textFilter = "") {
    postsGrid.innerHTML = "";

    // Filter logic:
    //  1) If selectedCategory is "", we include all categories,
    //     otherwise we only include posts matching the category.
    //  2) We also filter by text (title or description).
    const filteredPosts = posts.filter(post => {
      const matchesCategory = !selectedCategory || (post.category === selectedCategory);
      const matchesText = (
        post.title.toLowerCase().includes(textFilter.toLowerCase()) ||
        post.description.toLowerCase().includes(textFilter.toLowerCase())
      );
      return matchesCategory && matchesText;
    });

    if (filteredPosts.length === 0) {
      postsGrid.innerHTML =
        "<p style='grid-column: 1 / -1; text-align: center;'>No posts found.</p>";
      return;
    }

    filteredPosts.forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      // Use the first photo for the card thumbnail
      card.innerHTML = `
        <img src="${post.photos[0]}" alt="${post.title}" />
        <h2>${post.title}</h2>
        <span class="post-category" style="background-color: ${categoryColors[post.category]};">
          <span class="material-icons" style="vertical-align: middle; margin-right: 4px;">
            ${categoryIcons[post.category]}
          </span>${post.category}
        </span>
        <p>${post.description.substring(0, 60)}...</p>
      `;
      card.addEventListener("click", () => showPostDetails(post.id));
      postsGrid.appendChild(card);
    });
  }

  // Arrow event listeners for slider
  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentPhotoIndex > 0) {
      currentPhotoIndex--;
    } else {
      currentPhotoIndex = currentPhotos.length - 1;
    }
    updateModalPhoto();
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentPhotoIndex < currentPhotos.length - 1) {
      currentPhotoIndex++;
    } else {
      currentPhotoIndex = 0;
    }
    updateModalPhoto();
  });

  // Close the modal when the close icon is clicked
  closeModalEl.addEventListener("click", closeModalFunction);

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === postModal) {
      closeModalFunction();
    }
  });

  // Filter posts as the user types
  searchInput.addEventListener("input", (e) => {
    renderPosts(e.target.value);
  });

  // Category bar click handling
  categoryBar.addEventListener("click", (e) => {
    // If the user clicked on a .category-option or inside it
    const categoryOption = e.target.closest('.category-option');
    if (!categoryOption) return;

    // Remove active class from all category-option elements
    document.querySelectorAll('.category-option').forEach(el => {
      el.classList.remove('active');
    });

    // Add active class to the clicked one
    categoryOption.classList.add('active');

    // Update selectedCategory
    selectedCategory = categoryOption.dataset.category || "";

    // Re-render the posts with the new category filter
    renderPosts(searchInput.value);
  });

  // Listen for popstate events so that back/forward navigation opens/closes the modal
  window.addEventListener("popstate", () => {
    if (window.location.hash.startsWith("#post=")) {
      const id = parseInt(window.location.hash.replace("#post=", ""), 10);
      const post = posts.find(p => p.id === id);
      if (post) {
        openModal(post, false);
      }
    } else {
      postModal.classList.remove("active");
    }
  });

  // Initial render of posts
  renderPosts();

  // On page load, check if there is a hash for a specific post
  if (window.location.hash.startsWith("#post=")) {
    const id = parseInt(window.location.hash.replace("#post=", ""), 10);
    const post = posts.find(p => p.id === id);
    if (post) {
      openModal(post, false);
    }
  }

  // Close the modal when the Esc key is pressed
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalFunction();
    }
  });

  // Handle Copy Link Button
  document.getElementById("copyLinkButton").addEventListener("click", function() {
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl).then(function() {
      alert("Link copied to clipboard!");
    }).catch(function() {
      alert("Failed to copy the link.");
    });
  });

  // Handle Facebook Share Button
  document.getElementById("facebookButton").addEventListener("click", function() {
    const postUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookUrl, "_blank");
  });

  // Handle X (Twitter) Share Button
  document.getElementById("xButton").addEventListener("click", function() {
    const postUrl = window.location.href;
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
    window.open(xUrl, "_blank");
  });
