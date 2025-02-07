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
  
  // Global variables for the modal slider and selected category
  let currentPhotos = [];
  let currentPhotoIndex = 0;
  let selectedCategory = "";
  
  // Sample posts data with random createdAt values and two posts with no photos.
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
    {
      id: 3,
      title: "CS Textbook",
      description: "Intro to Algorithms in excellent condition. No highlights or marks.",
      price: "$30",
      time_ago: "5 mins",
      createdAt: "Sat, Apr 12, 2025 02:45 PM",
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
      time_ago: "4 hrs",
      createdAt: "Sun, May 04, 2025 11:05 AM",
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
      time_ago: "27 days",
      createdAt: "Mon, Jun 16, 2025 03:30 PM",
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
      time_ago: "8 months",
      createdAt: "Tue, Jul 01, 2025 07:15 PM",
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
      time_ago: "3 years",
      createdAt: "Wed, Aug 20, 2025 10:10 AM",
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
      time_ago: "10 mins",
      createdAt: "Thu, Sep 11, 2025 06:50 PM",
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
      time_ago: "45 secs",
      createdAt: "Fri, Oct 03, 2025 08:00 AM",
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
      time_ago: "3 days",
      createdAt: "Sat, Nov 22, 2025 05:45 PM",
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
      time_ago: "2 hrs",
      createdAt: "Sun, Dec 07, 2025 12:05 PM",
      photos: [
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1551446591-142875a901a1?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      category: "resumes"
    },
    // Sample posts with no photos:
    {
      id: 12,
      title: "Used Textbooks Bundle",
      description: "A bundle of used textbooks from last semester. Excellent condition and affordable.",
      price: "$50",
      time_ago: "2 days",
      createdAt: "Mon, Jan 20, 2025 04:30 PM",
      photos: [],
      category: "for sale"
    },
    {
      id: 13,
      title: "Vintage Vinyl Records",
      description: "A collection of vintage vinyl records. Great sound quality and rare finds.",
      price: "$75",
      time_ago: "5 hrs",
      createdAt: "Tue, Feb 04, 2025 10:15 AM",
      photos: [],
      category: "for sale"
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
    
  const menuButton = document.getElementById('menuButton');
  const dropdownMenu = document.getElementById('dropdownMenu');
    
  // Toggle dropdown menu
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== menuButton) {
      dropdownMenu.classList.remove('show');
    }
  });
    
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
    
    modalTitle.innerText = post.title;
    modalCategory.innerHTML = `
      <span class="material-icons" style="vertical-align: middle; margin-right: 4px;">
        ${categoryIcons[post.category]}
      </span>${post.category}
    `;
    modalCategory.style.backgroundColor = categoryColors[post.category] || '#000';
    modalCategory.style.color = '#fff';
    modalPrice.innerText = `Price: ${post.price}`;
    
    // Set the created date/time
    const modalCreatedAt = document.getElementById('modalCreatedAt');
    modalCreatedAt.innerText = `Created on: ${post.createdAt}`;
    
    modalDescription.innerText = post.description;
    postModal.classList.add("active");
    
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
    if (post) {
      openModal(post, true);
    }
  }
    
  function renderPosts(textFilter = "") {
    postsGrid.innerHTML = "";
    const filteredPosts = posts.filter(post => {
      const matchesCategory = !selectedCategory || (post.category === selectedCategory);
      const matchesText =
        post.title.toLowerCase().includes(textFilter.toLowerCase()) ||
        post.description.toLowerCase().includes(textFilter.toLowerCase());
      return matchesCategory && matchesText;
    });
    
    if (filteredPosts.length === 0) {
      postsGrid.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>No posts found.</p>";
      return;
    }
    
    filteredPosts.forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      
      // If the post has photos, display the first one; otherwise, use the post description
      let photoHtml = "";
      if (post.photos && post.photos.length > 0) {
        photoHtml = `<img src="${post.photos[0]}" alt="${post.title}" />`;
      } else {
        // Instead of a simple placeholder, display the post description text in the "photo" area
        photoHtml = `<div class="post-body-text">${post.description}</div>`;
      }
    
      card.innerHTML = `
        <div class="wishlist-icon">
          <i class="fas fa-heart"></i>
        </div>
        ${photoHtml}
        <h2>${post.title}</h2>
        <span class="post-category" style="background-color: ${categoryColors[post.category]};">
          <span class="material-icons" style="vertical-align: middle; margin-right: 4px;">
            ${categoryIcons[post.category]}
          </span>${post.category}
        </span>
        <p class="post-price">${post.price}</p>
        <p class="post-time-ago">${post.time_ago}</p>
        <p>${post.description.substring(0, 60)}...</p>
      `;
    
      const wishlistIcon = card.querySelector('.wishlist-icon');
      wishlistIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        const messageEl = document.createElement("div");
        messageEl.className = "wishlist-message";
        messageEl.innerText = "Saved post to wishlist.";
        card.appendChild(messageEl);
        setTimeout(() => {
          messageEl.style.opacity = 0;
          setTimeout(() => {
            messageEl.remove();
          }, 500);
        }, 2000);
      });
    
      card.addEventListener("click", () => showPostDetails(post.id));
      postsGrid.appendChild(card);
    });
  }
    
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
    
  closeModalEl.addEventListener("click", closeModalFunction);
    
  window.addEventListener("click", (e) => {
    if (e.target === postModal) {
      closeModalFunction();
    }
  });
    
  searchInput.addEventListener("input", (e) => {
    renderPosts(e.target.value);
  });
    
  categoryBar.addEventListener("click", (e) => {
    const categoryOption = e.target.closest('.category-option');
    if (!categoryOption) return;
    document.querySelectorAll('.category-option').forEach(el => {
      el.classList.remove('active');
    });
    categoryOption.classList.add('active');
    selectedCategory = categoryOption.dataset.category || "";
    renderPosts(searchInput.value);
  });
    
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
    
  renderPosts();
    
  if (window.location.hash.startsWith("#post=")) {
    const id = parseInt(window.location.hash.replace("#post=", ""), 10);
    const post = posts.find(p => p.id === id);
    if (post) {
      openModal(post, false);
    }
  }
    
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalFunction();
    }
  });
    
  document.getElementById("copyLinkButton").addEventListener("click", function() {
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl).then(function() {
      alert("Link copied to clipboard!");
    }).catch(function() {
      alert("Failed to copy the link.");
    });
  });
    
  document.getElementById("facebookButton").addEventListener("click", function() {
    const postUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookUrl, "_blank");
  });
    
  document.getElementById("xButton").addEventListener("click", function() {
    const postUrl = window.location.href;
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
    window.open(xUrl, "_blank");
  });
    
  const categoryBarEl = document.getElementById('categoryBar');
  const categoryScrollArrow = document.getElementById('categoryScrollArrow');
    
  function updateCategoryBarArrow() {
    if (categoryBarEl.scrollWidth > categoryBarEl.clientWidth) {
      categoryScrollArrow.classList.add('show');
    } else {
      categoryScrollArrow.classList.remove('show');
    }
  }
    
  categoryBarEl.addEventListener('scroll', () => {});
    
  categoryScrollArrow.addEventListener('click', () => {
    categoryBarEl.scrollBy({ left: 200, behavior: 'smooth' });
  });
    
  window.addEventListener('load', updateCategoryBarArrow);
  window.addEventListener('resize', updateCategoryBarArrow);