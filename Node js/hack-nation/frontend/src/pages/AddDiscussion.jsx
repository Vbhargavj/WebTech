import { useState } from 'react';
import axios from 'axios';
import { Bar } from "../components/Bar";

axios.defaults.withCredentials = true;

export function AddDiscussion() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before making the request

        try {
            const response = await axios.post('http://localhost:3000/api/v1/forum/addForum', {
                title,
                category,
                description,
                
            },{withCredentials:true});

            console.log('Discussion added:', response.data);
            setTitle('');
            setCategory('');
            setDescription('');
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response:', error.response.data);
                setError(`Server Error: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                // Request was made but no response was received
                console.error('Error request:', error.request);
                setError('Network Error: No response received from server');
            } else {
                // Something happened in setting up the request
                console.error('Error message:', error.message);
                setError(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className='h-screen overflow-x-hidden overflow-y-auto'>
            <Bar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-4">
                <h1 className="text-5xl text-sky-200 font-bold neon-text mb-4">Add Discussion</h1>
                <p className="text-xl text-sky-200 max-w-3xl mb-4">
                    Enter details to create a forum
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-sky-50" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-left neon-text text-xl mb-1 text-sky-200" htmlFor="title">Title</label>
                        <input placeholder="Enter title" id='title' value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded-lg bg-gray-700 text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-50" type="text" name="title" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left neon-text text-xl mb-1 text-sky-200" htmlFor="category">Category</label>
                        <input placeholder="Choose Category" value={category} id='category' onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded-lg bg-gray-700 text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-50" type="text" name="category" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left neon-text text-xl mb-1 text-sky-200" htmlFor="description">Description</label>
                        <textarea placeholder="Enter description" value={description} id='description' onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded-lg bg-gray-700 text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-50" name="description" rows="4" required></textarea>
                    </div>
                    <button className="w-full p-2 rounded-lg bg-gray-500 text-sky-200 font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-50" type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}
