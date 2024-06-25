import { Tag } from "./Tag";

export function Form2() {
    return (
        <div className="bg-gray-200 flex  p-2">
            <div className="w-1/12 border-2 pb-1 border-black flex justify-center items-center ">
                <div className="mt-1 rounded-full h-12 w-12 bg-red-400 flex items-center justify-center">
                    <div className="text-xl text-white">B</div>
                </div>
            </div>
            <div className="w-8/12 border-2 ps-3 border-black  flex flex-col">
                <div className="font-bold text-xl ">title</div>
                <div className="font-semibold text-lg w-full break-words line-clamp-2">
                    description
                </div>
            </div>
            <div className="w-3/12 border-2 border-black">
                <div className="flex justify-end items-center space-x-1">
                    <div className="pe-3">
                        <Tag name={"vbj"} color={"#34d399"} ></Tag>
                    </div>
                    <img src="./comment-3-svgrepo-com.svg" alt="Comments" className="w-7 h-5" />
                    <div>520</div>
                    <img src="./three-dots-vertical-svgrepo-com.svg" alt="Options" className="w-7 h-5" />
                </div>
            </div>
        </div>
    );
}
