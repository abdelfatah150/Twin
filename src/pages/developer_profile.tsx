import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import Footer from '../Components/footer';
import Header from '../Components/profile_header';
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  review: string;
  rating: number;
  track: string;
}

interface ProfileData {
  profilePic: string;
  fullName: string;
  email: string;
  nationality: string;
  languages: string;
  track: string;
  description: string;
  skills: string[];
  tracks: string[];
  certificates: string[];
  projects: Project[];
}

const dummyData: ProfileData = {
  profilePic: 'image 3.png',
  fullName: 'John Doe',
  email: 'johndoe@email.com',
  nationality: 'American',
  languages: 'English, French',
  track: 'Back-End',
  description:
    "I'm a backend developer passionate about designing scalable and high-performance systems. I specialize in building secure APIs, managing databases, and optimizing server-side logic to create seamless applications.",
  skills: ['Dot-Net developer', 'JavaScript developer'],
  tracks: ['Back-End', 'Front-End', 'Full-Stack'],
  certificates: ['Dot-Net developer', 'JavaScript developer'],
  projects: [
    {
      title: "Taskflow",
      description: "A task management system that helps teams collaborate efficiently by organizing tasks, setting deadlines, and tracking progress in real-time",
      review: "Great experience working with this developer! The project was delivered on time, and the backend is fast and reliable. Would definitely collaborate again! - Ahmed R",
      rating: 4,
      track: "Full-Stack"
    },
    {
      title: "Taskflow",
      description: "A task management system that helps teams collaborate efficiently by organizing tasks, setting deadlines, and tracking progress in real-time",
      review: "Great experience working with this developer! The project was delivered on time, and the backend is fast and reliable. Would definitely collaborate again! - Ahmed R",
      rating: 4,
      track: "Full-Stack"
    }
  ]
};

const DeveloperProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [statusActive, setStatusActive] = useState<boolean>(true);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [statusTime, setStatusTime] = useState<string>('09:00');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');

  useEffect(() => {
    setTimeout(() => setProfileData(dummyData), 1000);
  }, []);

  if (!profileData) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <Header />

      <div className="content">
        <div className="profile-container">
          <aside className="sidebar">
            <img
              src={profileData.profilePic}
              alt="Profile"
              className="profile-pic"
            />
            <h1 className="compact-text">{profileData.fullName}</h1>
            <p className="compact-text">{profileData.email}</p>

            <div className="details">
              <h3 className="section-title">Personal details</h3>
              <p>
                <span className="label">Full Name</span>
                <span className="value">{profileData.fullName}</span>
              </p>
              <p>
                <span className="label">Nationality</span>
                <span className="value">{profileData.nationality}</span>
              </p>
              <p>
                <span className="label">Languages</span>
                <span className="value">{profileData.languages}</span>
              </p>

              <hr />

              <div className="social-links">
                <div className="social-buttons">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button"
                  >
                    <img src="git_logo.png" alt="GitHub" />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button"
                  >
                    <img src="linkedin_logo.png" alt="LinkedIn" />
                  </a>
                </div>
                <div className="share-row">
                  <button className="share-btn" onClick={() => navigate("/shared_developer_profile")}>Share</button>
                </div>
              </div>
            </div>
          </aside>

          <main className="profile-content">
            <div className="business-section">
              <h3 className="section-title">
                {profileData.track}
                <span className="edit-icon">✎</span>
              </h3>
              <p>{profileData.description}</p>
            </div>

            <div className="skills-section">
              <h3 className="section-title">Skills</h3>
              <div className="skills-list">
                {profileData.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="certificates-section">
              <h3 className="section-title">Certificates</h3>
              <div className="certificates-list">
                {profileData.certificates.map((cert, i) => (
                  <div key={i} className="certificate-item">
                    <span className="certificate-icon">📄</span>
                    <p>{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="status-section">
              <h3 className="section-title">Status</h3>
              <div className="status-row">
                <span className="status-label">{statusActive ? "Active" : "Inactive"}</span>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={statusActive}
                    onChange={() => setStatusActive(!statusActive)}
                  />
                  <span className="slider" />
                </label>

                {statusActive && (
                  <>
                    <span
                      className="clock-icon"
                      onClick={() => setShowTimePicker((v) => !v)}
                    >
                      🕒
                    </span>

                    {showTimePicker && (
                      <input
                        type="time"
                        className="time-input"
                        value={statusTime}
                        onChange={(e) => setStatusTime(e.target.value)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>

        <div className="projects-container">
          <h3 className="projects-title">Projects</h3>

          <div className="track-select">
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
            >
              <option value="All">All</option>
              {profileData.tracks.map((track, index) => (
                <option key={index} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>

          {(() => {
            const filtered = profileData.projects.filter(
              (project) =>
                selectedTrack === "All" || project.track === selectedTrack
            );

            if (filtered.length === 0) {
              return (
                <div className="no-projects">
                  <p>
                    No Projects
                  </p>
                </div>
              );
            }

            return filtered.map((project, index) => (
              <div className="project-card" key={index}>
                <h4 className="project-name">{project.title}</h4>

                <div className="project-row">
                  <div className="project-box">
                    <strong>Description</strong>
                    <p>{project.description}</p>
                  </div>

                  <div className="project-box rating-box">
                    <strong>Developer Rating</strong>
                    <div className="stars">
                      {"★".repeat(project.rating)}
                      {"☆".repeat(5 - project.rating)}
                    </div>
                    <p>{project.rating}/5</p>
                  </div>
                </div>

                <div className="project-box">
                  <strong>Client Review</strong>
                  <p>{project.review}</p>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperProfilePage;
