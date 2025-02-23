import React, { useState, useEffect } from "react";
import { fetchProfileDetails, updateProfile } from "../api/auth";
import "../styles/UpdateProfile.css";

const ProfileDetails = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    dateOfBirth: "",
    totalIncome: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfileDetails();
        setProfile({
          fullName: profileData.fullName,
          dateOfBirth: profileData.dateOfBirth.split("T")[0],
          totalIncome: profileData.totalIncome,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. " + err.message);
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setSuccess("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to update profile. " + err.message);
      setSuccess(null);
    }
  };

  if (loading) {
    return <div className="update-profile-container">Loading profile details...</div>;
  }

  return (
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>
      <p className="profile-description">
        Keep your profile information up-to-date to ensure you receive the most accurate financial insights.
      </p>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalIncome">Total Income:</label>
          <input
            id="totalIncome"
            type="number"
            name="totalIncome"
            value={profile.totalIncome}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
