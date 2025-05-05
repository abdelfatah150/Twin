import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import Footer from '../Components/footer';
import Header from '../Components/profile_header';

interface Project {
  title: string;
  description: string;
  developer: string;
}

interface ProfileData {
  profilePic: string;
  fullName: string;
  email: string;
  nationality: string;
  languages: string;
  businessField: string;
  businessExperience: string;
  projects: Project[];
}

const dummyData: ProfileData = {
  profilePic: 'image 3.png',
  fullName: 'John Doe',
  email: 'johndoe@email.com',
  nationality: 'American',
  languages: 'English, French',
  businessField: 'Managing and coordinating software projects from idea to execution, ensuring smooth development and team collaboration.',
  businessExperience: 'Experienced in leading software projects, ensuring smooth development and timely delivery. Proficient in Agile and Scrum methodologies, optimizing workflows for efficiency. Skilled in managing teams, resources, and timelines to bring software ideas to life.',
  projects: [
    {
      title: "Management System",
      description: "A task management system that helps teams collaborate efficiently by organizing tasks, setting deadlines, and tracking progress in real-time.",
      developer: "Omar Ezz"
    },
    {
      title: "Management System",
      description: "A task management system that helps teams collaborate efficiently by organizing tasks, setting deadlines, and tracking progress in real-time.",
      developer: "Omar Ezz"
    }
  ],
};

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setProfileData(dummyData);
    }, 1000);
  }, []);

  if (!profileData) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <Header />

      <div className="content">
        <div className="profile-container">
          <aside className="sidebar">
            <img src={profileData.profilePic} alt="Profile" className="profile-pic" />
            <h1 className="compact-text">{profileData.fullName}</h1>
            <p className="compact-text">{profileData.email}</p>

            <div className="details">
              <h3><strong>Personal Details</strong></h3>
              <p><strong>Full Name:</strong> {profileData.fullName}</p>
              <p><strong>Nationality:</strong> {profileData.nationality}</p>
              <p><strong>Languages:</strong> {profileData.languages}</p>
            </div>
          </aside>

          <main className="profile-content">
            <div className="business-section">
              <h3 className="section-title">
                Business Field
                <span className="edit-icon">✎</span>
              </h3>
              <p>{profileData.businessField}</p>

              <h3 className="section-title">
                Business Experience
              </h3>
              <p>{profileData.businessExperience}</p>
            </div>
          </main>
        </div>

        <div className="projects-section">
          <h2>Projects</h2>
          {profileData.projects.length > 0 ? (
            profileData.projects.map((project, index) => (
              <div key={index} className="profile-project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <p className="developer"><strong>Developer:</strong> {project.developer}</p>
              </div>
            ))
          ) : (
            <div className="no-projects">
              <p>No Projects</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
