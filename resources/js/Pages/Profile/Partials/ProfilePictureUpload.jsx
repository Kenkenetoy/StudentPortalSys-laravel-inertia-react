import ProfilePicture from '@/Components/ProfilePicture.jsx'; // Import the simplified component
import axios from 'axios';
import { useState } from 'react';

const ProfilePictureUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('Please select a file before submitting.');
            return; // Stop further execution
        }

        const formData = new FormData();
        formData.append('profile_picture', image);

        try {
            await axios.post('/user/profile-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.location.reload(); // Refresh the page after success
        } catch (err) {
            setError('Failed to upload profile picture');
        }
    };

    return (
        <section className="space-y-8">
            <header className="space-y-1">
                <h2 className="text-lg font-medium text-gray-900">
                    Update Profile Picture
                </h2>
                <p className="text-sm text-gray-600">
                    Upload a new image to update your profile picture.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex w-full flex-col items-center">
                    <div className="avatar">
                        <div className="w-48 rounded-full shadow-md">
                            {/* Directly use the <ProfilePicture /> component */}
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-64 w-64 object-cover shadow-lg"
                                />
                            ) : (
                                <ProfilePicture />
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <input
                        type="file"
                        accept="image/*"
                        id="profile_picture"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered file-input-ghost w-full"
                    />
                </div>

                {error && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full">
                    Update
                </button>
            </form>
        </section>
    );
};

export default ProfilePictureUpload;
