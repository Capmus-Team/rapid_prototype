// src/app/page.tsx
'use client';

import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      {/* Your main content (everything inside <body> from the old HTML) */}
      <div className="app-container">
        {/* Header */}
        <header className="site-header">
          <div className="header-top-row">
            <div className="header-left">
              <div className="logo">Capmus</div>
              <div className="selected-university" id="selectedUniversity" style={{ display: 'none' }}></div>
            </div>

            <div className="header-center">
              <div className="header-search">
                <span className="material-icons search-icon">search</span>
                <input type="text" id="searchInput" placeholder="Search posts..." />
              </div>
            </div>

            <div className="header-right">
              <a href="#" className="create-post-link">Create a post</a>
              <button className="university-toggle-button" id="universityToggleButton">
                <span className="material-icons">school</span>
                University
              </button>
              <div className="user-menu-container" id="userMenuContainer">
                <button className="menu-button" id="menuButton">
                  <span className="material-icons">menu</span>
                  <span className="material-icons">account_circle</span>
                </button>
                <div className="dropdown-menu" id="dropdownMenu">
                  <a href="#">Sign up</a>
                  <a href="#">Login</a>
                  <a href="#">Help Center</a>
                </div>
              </div>
            </div>
          </div>

          {/* University Bar Section */}
          <div className="university-bar-wrapper">
            <div className="university-bar-container" id="universityBarContainer">
              <div className="university-bar" id="universityBar">
                <button className="university-option">Santa Clara University</button>
                <button className="university-option">Stanford University</button>
                <button className="university-option">Arizona State University</button>
                <button className="university-option">UC Berkeley</button>
                <button className="university-option">Johns Hopkins University</button>
                <button className="university-option">Harvard University</button>
              </div>
              <div className="university-scroll-arrow" id="universityScrollArrow">
                <span className="material-icons">chevron_right</span>
              </div>
            </div>
          </div>

          {/* Category Bar */}
          <div className="category-bar-wrapper">
            <div className="category-bar-container">
              <div className="category-bar" id="categoryBar">
                <div className="category-option active" data-category="">
                  <span className="material-icons">apps</span>
                  <p>All</p>
                </div>
                <div className="category-option" data-category="housing">
                  <span className="material-icons">home</span>
                  <p>Housing</p>
                </div>
                <div className="category-option" data-category="for sale">
                  <span className="material-icons">local_offer</span>
                  <p>For Sale</p>
                </div>
                <div className="category-option" data-category="jobs">
                  <span className="material-icons">work</span>
                  <p>Jobs</p>
                </div>
                <div className="category-option" data-category="personals">
                  <span className="material-icons">person</span>
                  <p>Personals</p>
                </div>
                <div className="category-option" data-category="campus jobs">
                  <span className="material-icons">school</span>
                  <p>Campus Jobs</p>
                </div>
                <div className="category-option" data-category="community">
                  <span className="material-icons">group</span>
                  <p>Community</p>
                </div>
                <div className="category-option" data-category="services">
                  <span className="material-icons">build</span>
                  <p>Services</p>
                </div>
                <div className="category-option" data-category="events">
                  <span className="material-icons">events</span>
                  <p>Events</p>
                </div>
                <div className="category-option" data-category="resumes">
                  <span className="material-icons">description</span>
                  <p>Resumes</p>
                </div>
              </div>
              <div className="category-scroll-arrow" id="categoryScrollArrow">
                <span className="material-icons">chevron_right</span>
              </div>
            </div>
            <div className="filters-button" id="filtersButton">
              <span className="material-icons">filter_list</span>
              <p>Filters</p>
            </div>
          </div>
        </header>

        {/* Posts Grid */}
        <div className="posts-grid" id="postsGrid">
          {/* Post cards injected by script.js */}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-bottom-nav">
        <a href="#" className="nav-item">
          <span className="material-icons">travel_explore</span>
          <p>Explore</p>
        </a>
        <a href="#" className="nav-item">
          <span className="material-icons">favorite_border</span>
          <p>Wishlists</p>
        </a>
        <a href="#" className="nav-item">
          <span className="material-icons">person</span>
          <p>Log in</p>
        </a>
      </div>

      {/* Modal for Post Details */}
      <div className="modal" id="postModal">
        <div className="modal-content">
          <span className="close-modal" id="closeModal">&times;</span>
          <h2 id="modalTitle"></h2>
          <p className="modal-category" id="modalCategory"></p>
          <p className="price" id="modalPrice"></p>
          <p className="created-at" id="modalCreatedAt"></p>
          <p id="modalEmail"></p>
          <div className="message-box">
            <h3>Message</h3>
            <form id="messageForm">
              <textarea id="messageInput" placeholder="Write your message here..." required />
              <input type="email" id="emailInput" placeholder="Enter your email" required />
              <button type="submit">Send Message</button>
            </form>
          </div>
          <div id="modalSlider">
            <img id="modalPhoto" src="" alt="Post Photo" />
            <div className="slider-arrow left" id="leftArrow">&#10094;</div>
            <div className="slider-arrow right" id="rightArrow">&#10095;</div>
          </div>
          <p id="modalDescription"></p>
          <div className="share-buttons">
            <button id="copyLinkButton">
              <i className="fas fa-link"></i> Copy Link
            </button>
            <button id="facebookButton">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button id="xButton">
              <i className="fab fa-twitter"></i> X
            </button>
          </div>
        </div>
      </div>

      {/* Load your script.js from public folder */}
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
