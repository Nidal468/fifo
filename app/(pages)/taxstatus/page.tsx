'use client'

import { Radio1 } from "@/components/radio/page";
import Link from "next/link";
import { useState } from "react";

export default function TaxStatus() {
    const data =
    {
        data: {}
    }

    const [delay, setDelay] = useState(false)
    const [reject, setReject] = useState(false);
    const [eligible, setEligible] = useState(true)
    const [next, setNext] = useState(0);
    const [form, setForm] = useState(data)
    const radio1 = [
        {
            name: 'Pay on receipt (pay only after the IRS has delivered the credit)',
            fee: '5$',
            receive: '2000$ plus accrued interest'
        },
        {
            name: 'Pay up front (pay now for a reduced fee)',
            fee: '5$ (save 5%)',
            receive: '2000$ plus accrued interest'
        },
        {
            name: 'Cash advance (get paid as soon as your return is submitted to the IRS)',
            fee: '5$ plus accrued interest',
            receive: '2000$'
        }
    ]
    const radio_1 = (selectedIndex: any) => {
        const formData = radio1[selectedIndex]
        setForm(prev => ({ ...prev, data: formData }))
    };

    return (
        <div className="w-full min-h-[100vh] bg-zinc-100 flex flex-col items-center justify-center gap-[30px] py-[40px]">
            <div className="w-[90%] md:w-[500px] py-[10px] md:py-[20px] flex flex-col border rounded-[4px] bg-white shadow-lg">
                {next === 0 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">TaxStatus determination of eligibility and paywall</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    {delay && <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1>It seems your data is not available yet but the process can be speed up by going to the <Link href="https://sa.www4.irs.gov/ola/" className="text-red-500 underline">IRS</Link> then navigating to the Power of Attorney and Tax Information Authorizations at <Link href="https://sa.www4.irs.gov/ola/poa_and_tia" className="text-red-500 underline">here</Link>, and accepting both</h1>
                    </div>}
                    {reject && <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1>After reviewing your tax information, unfortunately we cannot process the Sick and Family Leave credit for you because</h1>
                    </div>}
                    {eligible && <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1>Congratulations! You are eligible for a credit amount of $n,nnn from the IRS, plus interest accrued since April 15, 2021.</h1>
                        <p className="text-[12px]">fifo.com is here to streamline your credit submission from start to finish, putting together an amended tax return for 2021 and connecting you with a licensed tax professional to file the return on your behalf. Every return is separately verified by a team of reviewers who are experts in this credit, and then again reviewed and signed by your licensed tax professional.</p>
                    </div>}
                    {eligible && <div className="flex flex-col gap-[10px] p-[20px]">
                        <button className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev + 1)}>Continue</button>
                    </div>}
                </div>}
                {next === 1 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">TaxStatus determination of eligibility and paywall</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">We offer the following options:</h1>
                        <Radio1 data={radio1} onSelect={radio_1} />
                        <div className="flex flex-col gap-[10px]">
                            <p>[i] pay on receipt: Pay nothing at all until the check is received from the IRS. If the credit is not issued for any reason, you owe nothing. You keep all the remaining money from the IRS check, including accrued interest.</p>
                            <p>[ii] pay up front: Pay up front and receive an immediate discount on the fifo.com fee. If the credit is not issued for any reason, your money will be refunded. You keep all the money from the IRS check, including accrued interest.</p>
                            <p>[iii] cash advance: Receive the base amount of your credit minus the fifo.com fee as soon as the amended application is submitted to the IRS and fifo.com receives the transaction number. If the credit is not issued for any reason, you will owe the lender the entire amount advanced to you. The lender’s fee is the accrued interest from the IRS, and the lender will forfeit this fee if the IRS check is not issued.</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}