import React, { useState, useEffect } from "react";
import { fetchProfileDetails, updateProfile } from "../api/auth";
import "../styles//UpdateProfilePage.css"; 

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
                setError(err.message);
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profile);
            setSuccess("Profile updated successfully!");
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    if (loading) {
        return <div className="update-profile-container">Loading profile details...</div>;
    }

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Total Income:</label>
                    <input
                        type="number"
                        name="totalIncome"
                        value={profile.totalIncome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileDetails;
