import { Bar } from "../components/Bar";
import { Form } from "../components/Form";
import { SimpleTag } from "../components/SimpleTag";
import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.withCredentials = true

export function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/forum/forums')
            .then(response => {
                setData(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Bar></Bar>
            <div className="container flex py-2 border-collapse px-20 ">
                <div className="w-1/5   border-2 border-black justify-center items-center">
                    <SimpleTag></SimpleTag>
                </div>
                <div className=" w-4/5 border-2 border-black">
                    <Form data={data}></Form>
                </div>
            </div>
        </div>
    )
}