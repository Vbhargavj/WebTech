import  { useEffect, useState } from 'react';
import { Tag } from './Tag';

export function SimpleTag() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await fetch('http://localhost:3000/api/v1/tag/getall'); // Replace with your backend endpoint
                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        }
        fetchTags();
    }, []);

    return (
        <div className="flex flex-col space-y-3 justify-center items-center">
            {tags.map((tag) => (
                <Tag key={tag._id} name={tag.name} color={tag.color} />
            ))}
        </div>
    );
}
