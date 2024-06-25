import { useParams } from "react-router-dom";
import { Bar } from "../components/Bar";
import {useState,useEffect} from 'react'
import axios from 'axios'
export function ForumPage() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [forum, setForum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // http://localhost:3000/api/v1/forum/getforum/666de7e9b75a1e5e32815234
        axios.get(`http://localhost:3000/api/v1/forum/getforum/${id}`)
            .then(response => {
                setForum(response.data.result);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching forum data:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading forum data</p>;
    return (
        <div>
            <Bar />
            <div className="container">
                <div className="p-5 h-20 bg-green-700 flex flex-col justify-center items-center">
                {/* here tag is used so integrate tag */}
                    <span className="px-1 text-lg bg-slate-100 rounded">vbj</span>
                    <div className="p-1 text-xl text-slate-100">{forum.title}</div>
                </div>
                <div className="mx-12 mt-5 p-2 flex border-2 border-black">
                    <div className="w-2/11 m-2">
                        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center">
                            <div className="text-xl">{forum.user.name.charAt(0) }</div>
                        </div>
                    </div>
                    <div>
                    {/* TODO integrea time */}
                        <div className="ms-2">{forum.user.name} time </div>
                        <div className="ps-4 mt-2 mb-2 text-xl font-bold">{forum.title}</div>
                        <div className="ps-4 mt-2">
                            {forum.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
