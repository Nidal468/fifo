import PaymentMethod from "@/components/paymentMethod/page";

export default function Review() {
    return (
        <div className="w-full min-h-[100vh] bg-zinc-100 flex flex-col items-center justify-center gap-[30px] py-[40px]">
            <div className="w-[90%] md:w-[500px] py-[10px] md:py-[20px] flex flex-col border rounded-[4px] bg-white shadow-lg">
                <div className="flex flex-col w-full p-[20px] gap-[10px]">
                    <div className="w-full flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Review</h1>
                        <p className="text-[10px] md:text-[14px]">Please review your application. If there are any errors, click the appropriate Amend button to update your information.</p>
                    </div>
                    <div className="flex flex-col w-full p-[10px] gap-[5px] bg-sky-100 text-zinc-600 text-[12px]">
                        <h1>Name: </h1>
                        <h1>Address on tax return:</h1>
                        <h1>Email:</h1>
                        <h1>ERO:</h1>
                        <h1>Sick leave dates:</h1>
                    </div>
                    <div className="flex flex-col w-full p-[10px] gap-[10px] bg-sky-100 text-zinc-600 text-[12px]">
                        <div className="flex flex-col gap-[5px]">
                            <h1>Part 1: 07/08/2021 to 14/08/2021</h1>
                            <p>I was too sick...</p>
                            <p>Documents uploaded: 3</p>
                            <div className="flex flex-col gap-[10px]">
                                <button className="w-[80px] py-[5px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Amend</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <h1>Part 2: 07/08/2021 to 14/08/2021</h1>
                            <p>I was too sick...</p>
                            <p>Documents uploaded: 3</p>
                            <div className="flex flex-col gap-[10px]">
                                <button className="w-[80px] py-[5px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Amend</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <h1>Part 3: 07/08/2021 to 14/08/2021</h1>
                            <p>I was too sick...</p>
                            <p>Documents uploaded: 3</p>
                            <div className="flex flex-col gap-[10px]">
                                <button className="w-[80px] py-[5px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Amend</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <h1>Part 4: 07/08/2021 to 14/08/2021</h1>
                            <p>I was too sick...</p>
                            <p>Documents uploaded: 3</p>
                            <div className="flex flex-col gap-[10px]">
                                <button className="w-[80px] py-[5px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Amend</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <h1>Part 5: 07/08/2021 to 14/08/2021</h1>
                            <p>I was too sick...</p>
                            <p>Documents uploaded: 3</p>
                            <div className="flex flex-col gap-[10px]">
                                <button className="w-[80px] py-[5px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Amend</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <h1>Part 6: 07/08/2021 to 14/08/2021</h1>
                            <p>I was too sick...</p>
                            <p>Documents uploaded: 3</p>
                            <div className="flex flex-col gap-[10px]">
                                <button className="w-[80px] py-[5px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Amend</button>
                            </div>
                        </div>
                    </div>
                    <PaymentMethod />
                    <h1 className="text-zinc-500 text-[12px]">By submitting your application, you are asserting to us, as well as the IRS, that the sick leave dates provided in this application are true and accurate to the best of your knowledge. Providing false information could lead to serious consequences for the taxpayer.</h1>
                    <div className="w-full text-zinc-600 text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <button className="px-[20px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}