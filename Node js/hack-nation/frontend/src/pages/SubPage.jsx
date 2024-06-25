import { Bar } from "../components/Bar";
import { Form } from "../components/Form";
import { SimpleTag } from "../components/SimpleTag";
export function SubPage() {
    return (
        <div>
            <Bar></Bar>
            <div className="container ">
                <div className=" py-6 header bg-red-600">
                    <div className="text-sky-300 font-medium  text-3xl flex justify-center items-center"> Give-Away and Freebies</div>
                    <div className="text-sky-300 text-lm  flex justify-center items-center">All the giveaways and free stuff like promo coupons, serial keys, product keys ... etc</div>
                </div>
                <div className="flex justify-end items-center pe-10">
                    <span className="flex m-2 bg-green-500  text-white px-2 text-sm font-semibold rounded">
                        Add Discussion
                    </span>
                </div>
                <div className="container flex py-2 border-collapse px-20 ">
                    <div className="w-1/5 pt-10 justify-center items-center">
                        <SimpleTag></SimpleTag>
                    </div>
                    <div className=" w-4/5 ">
                        <Form></Form>
                    </div>
                </div>
            </div>
        </div>
    )
}