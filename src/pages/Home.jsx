import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await appwriteService.getPosts();
                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts.");
            }
        }

        fetchPosts();
    }, []);

    const handlePostClick = (postId) => {
        if (!userData || !userData.$id) {
            navigate('/login');
        } else {
            navigate(`/post/${postId}`);
        }
    };

    if (error) {
        return (
            <div className="w-full py-8 text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">{error}</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8 min-h-screen'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <div onClick={() => handlePostClick(post.$id)}>
                                    <PostCard {...post} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center">
                            <h1 className="text-lg font-semibold">No posts available</h1>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
