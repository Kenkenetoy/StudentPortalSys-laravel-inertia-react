import axios from 'axios';
import { useEffect, useState } from 'react';

const ProfilePicture = ({ style, alt = 'Profile Picture' }) => {
    const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('/user/profile-picture'); // Adjust endpoint as needed
                if (response.data.profile_picture_url) {
                    setCurrentProfilePicture(response.data.profile_picture_url);
                } else {
                    setCurrentProfilePicture(null);
                }
            } catch (err) {
                setError('Failed to load profile picture');
                console.error('Error fetching profile picture:', err); // Log the actual error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchProfilePicture();
    }, []);

    if (loading) return <p>Loading profile picture...</p>;
    if (error) return <p>{error}</p>;
    if (!currentProfilePicture)
        return (
            <img
                src="/path/to/default-profile.png"
                alt="Default Profile Picture"
                className="h-full w-full"
            />
        );

    return (
        <img
            src={currentProfilePicture}
            alt={alt}
            className="h-full w-full"
            style={style} // Apply the passed style
        />
    );
};

export default ProfilePicture;
