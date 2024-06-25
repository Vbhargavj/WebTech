import { Link } from "react-router-dom";
import { Tag } from "./Tag";

export function Form({ data = [] }) {
   
    if (data) {
        return (
            <div className=" flex flex-col space-y-1 p-1 ">
                {data.map(item => (
                    <Link to={`/forum/${item._id}`} key={item._id}>
                        <div key={item._id} className="bg-gray-200 flex p-2">
                            <div className="w-1/12  pb-1  flex justify-center items-center">
                                <div className="mt-1 rounded-full h-12 w-12 bg-red-400 flex items-center justify-center">
                                    <div className="text-xl text-white">{item.title.charAt(0)}</div>
                                </div>
                            </div>
                            <div className="w-8/12  ps-3  flex flex-col">
                                <div className="font-bold text-xl">{item.title}</div>
                                <div className="font-semibold text-lg w-full break-words line-clamp-2">
                                    {item.description}
                                </div>
                            </div>
                            <div className="w-3/12  ">
                                <div className="flex justify-end items-center space-x-1">
                                    <div className="pe-3">
                                        <Tag name={"FUCK"} color={"#34d399"}></Tag>
                                    </div>
                                    <img src="./comment-3-svgrepo-com.svg" alt="Comments" className="w-7 h-5" />
                                    <div>520</div>
                                    <img src="./three-dots-vertical-svgrepo-com.svg" alt="Options" className="w-7 h-5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    } else {
        return <h1>fuck you</h1>
    }
}
