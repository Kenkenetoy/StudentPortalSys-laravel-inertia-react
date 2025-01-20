import axios from 'axios';
import { useEffect, useState } from 'react';

const UserName = () => {
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await axios.get('/user/name'); // Endpoint to fetch name
                setName(response.data.name);
            } catch (err) {
                setError('Failed to load user name');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserName();
    }, []);

    if (loading) return <p>Loading user name...</p>;
    if (error) return <p>{error}</p>;
    if (!name) return <p>No user name available</p>;
    return <p>{name}</p>;
};

export default UserName;
