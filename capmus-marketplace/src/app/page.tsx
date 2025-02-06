"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  description: string;
  price: string;
  photo: string;
  category: string;
};

const categoryColors: Record<string, string> = {
  housing: "#4CAF50",
  "for sale": "#FF9800",
  jobs: "#9C27B0",
  personals: "#E91E63",
  "campus job": "#009688",
  community: "#F44336",
  services: "#795548",
  event: "#283593",
  resume: "#263238",
};

const categoryIcons: Record<string, string> = {
  housing: "home",
  "for sale": "local_offer",
  jobs: "work",
  personals: "person",
  "campus job": "school",
  community: "group",
  services: "build",
  event: "event",
  resume: "description",
};

const posts: Post[] = [
  {
    id: 1,
    title: "Orange Bike for Sale",
    description: "Great condition, used for one year. Pickup on campus.",
    price: "$100",
    photo:
      "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "for sale",
  },
  {
    id: 2,
    title: "Roommate Wanted",
    description:
      "Looking for a roommate near campus. Spacious room with great amenities.",
    price: "$800/mo",
    photo:
      "https://media.istockphoto.com/id/1010132614/photo/excited-woman-receiving-a-gift-from-a-friend.jpg?s=1024x1024&w=is&k=20&c=sll2rqzjuvnMnu0Uw8d8nLRffIDD7ixL2c2ScpKOfDs=",
    category: "housing",
  },
  {
    id: 3,
    title: "CS Textbook",
    description:
      "Intro to Algorithms in excellent condition. No highlights or marks.",
    price: "$30",
    photo:
      "https://images.unsplash.com/photo-1588912914017-923900a34710?q=80&w=3019&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "for sale",
  },
  {
    id: 4,
    title: "Dorm Furniture",
    description:
      "Selling a set of dorm furniture including a bed, desk, and chair.",
    price: "$150",
    photo:
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "for sale",
  },
  {
    id: 5,
    title: "Guitar Lessons",
    description:
      "Offering beginner guitar lessons at affordable rates. Flexible schedule.",
    price: "Starting at $20/hr",
    photo:
      "https://plus.unsplash.com/premium_photo-1681396936891-ed738c53cb21?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "services",
  },
  {
    id: 6,
    title: "Internship Opportunity",
    description:
      "Exciting internship in tech. Apply now for a rewarding experience.",
    price: "Competitive",
    photo:
      "https://plus.unsplash.com/premium_photo-1661502996011-cbd328de50f2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "jobs",
  },
  {
    id: 7,
    title: "Community Meetup",
    description: "Join us for a community networking event. Connect with peers!",
    price: "Free",
    photo:
      "https://plus.unsplash.com/premium_photo-1706061121025-4ea17e4d9d9a?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "community",
  },
  {
    id: 8,
    title: "Study Buddy Wanted",
    description:
      "Looking for a study partner to tackle challenging courses together.",
    price: "N/A",
    photo:
      "https://images.unsplash.com/photo-1616428317393-acd93938b4fa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "personals",
  },
  {
    id: 9,
    title: "Campus Tutor Position",
    description:
      "On-campus tutoring job available for knowledgeable students.",
    price: "$15/hr",
    photo:
      "https://media.istockphoto.com/id/170947812/photo/working-together.jpg?s=1024x1024&w=is&k=20&c=d4RiPJQDC1_ids2CgPfXl2pTj0qBf7OkSQSZqN_m1h8=",
    category: "campus job",
  },
  {
    id: 10,
    title: "Business Party",
    description:
      "Join us for a glamorous business networking event with live music, cocktails, and gourmet hors d'oeuvres.",
    price: "Tickets: $50",
    photo:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "event",
  },
  {
    id: 11,
    title: "CV of a Musician",
    description:
      "Professional resume showcasing a talented musician with years of performance and production experience. Available for gigs and collaborations.",
    price: "N/A",
    photo:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "resume",
  },
];

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Open modal: update state and URL hash
  const openModal = (post: Post, updateHistory = true) => {
    if (updateHistory) {
      window.history.pushState({ postId: post.id }, "", `#post=${post.id}`);
    }
    setSelectedPost(post);
  };

  // Close modal: clear state and URL hash
  const closeModal = () => {
    setSelectedPost(null);
    window.history.pushState({}, "", window.location.pathname + window.location.search);
  };

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase())
  );

  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith("#post=")) {
        const id = parseInt(window.location.hash.replace("#post=", ""), 10);
        const post = posts.find((p) => p.id === id);
        if (post) {
          setSelectedPost(post);
        }
      } else {
        setSelectedPost(null);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    // Check hash on initial mount
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Head>
        <title>Capmus Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Fonts & Material Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <style jsx global>{`
          /* Reset and Base Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: "Poppins", sans-serif;
            background: linear-gradient(135deg, #1a3771, #2d5d98);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          /* App Container */
          .app-container {
            width: 100%;
            max-width: 1200px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          /* Header Styling */
          header {
            background: #1a3771;
            padding: 20px;
            text-align: center;
            color: #fff;
          }
          header h1 {
            font-size: 2rem;
            margin-bottom: 5px;
          }
          header p {
            font-size: 1rem;
            opacity: 0.9;
          }
          /* Search Bar */
          .search-bar {
            padding: 20px;
            text-align: center;
            background: #f7f7f7;
          }
          .search-bar input {
            width: 80%;
            max-width: 500px;
            padding: 10px 15px;
            border: 2px solid #ddd;
            border-radius: 30px;
            font-size: 1rem;
            outline: none;
            transition: border 0.3s;
          }
          .search-bar input:focus {
            border-color: #1a3771;
          }
          /* Posts Grid */
          .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            padding: 20px;
          }
          .post-card {
            background: #fff;
            border: 1px solid #eee;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            padding: 20px;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .post-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }
          .post-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .post-card h2 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #1a3771;
          }
          .post-card p {
            font-size: 0.95rem;
            color: #555;
          }
          .post-category,
          .modal-category {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            color: #fff;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .modal-category {
            font-size: 0.9rem;
            margin-bottom: 15px;
          }
          /* Modal Styles */
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease;
            z-index: 100;
          }
          .modal.active {
            opacity: 1;
            visibility: visible;
          }
          .modal-content {
            background: #fff;
            border-radius: 10px;
            width: 90%;
            max-width: 600px;
            padding: 30px;
            position: relative;
            animation: fadeInUp 0.5s;
          }
          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            color: #888;
            cursor: pointer;
          }
          .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          .modal-content h2 {
            margin-bottom: 15px;
            color: #1a3771;
          }
          .modal-content p {
            margin-bottom: 10px;
            color: #555;
          }
          .modal-content .price {
            font-weight: 600;
            margin-top: 15px;
            color: #000;
          }
          @media (max-width: 600px) {
            header h1 {
              font-size: 1.5rem;
            }
            .search-bar input {
              width: 100%;
            }
          }
        `}</style>
      </Head>

      <div className="app-container">
        <header>
          <h1>Capmus</h1>
          <p>Sell your stuff.</p>
        </header>
        <div className="search-bar">
          <input
            type="text"
            id="searchInput"
            placeholder="Search posts..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="posts-grid" id="postsGrid">
          {filteredPosts.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              No posts found.
            </p>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="post-card"
                onClick={() => openModal(post)}
              >
                <img src={post.photo} alt={post.title} />
                <h2>{post.title}</h2>
                <span
                  className="post-category"
                  style={{
                    backgroundColor: categoryColors[post.category] || "#000",
                  }}
                >
                  <span
                    className="material-icons"
                    style={{ verticalAlign: "middle", marginRight: "4px" }}
                  >
                    {categoryIcons[post.category]}
                  </span>
                  {post.category}
                </span>
                <p>{post.description.substring(0, 60)}...</p>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedPost && (
        <div
          className={`modal ${selectedPost ? "active" : ""}`}
          id="postModal"
          onClick={(e) => {
            if ((e.target as HTMLElement).className.includes("modal"))
              closeModal();
          }}
        >
          <div className="modal-content">
            <span className="close-modal" id="closeModal" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedPost.photo} alt={selectedPost.title} id="modalPhoto" />
            <h2 id="modalTitle">{selectedPost.title}</h2>
            <p
              className="modal-category"
              id="modalCategory"
              style={{
                backgroundColor: categoryColors[selectedPost.category] || "#000",
                color: "#fff",
              }}
            >
              <span
                className="material-icons"
                style={{ verticalAlign: "middle", marginRight: "4px" }}
              >
                {categoryIcons[selectedPost.category]}
              </span>
              {selectedPost.category}
            </p>
            <p id="modalDescription">{selectedPost.description}</p>
            <p className="price" id="modalPrice">
              Price: {selectedPost.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
}