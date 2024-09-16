'use client'

import { Button } from "@/components/button/page";
import Link from "next/link";
import { useState } from "react";
import { Model } from "@/components/model/page";
import InfoIcon from '@mui/icons-material/Info';



export default function Char() {
    const [next, setNext] = useState(3);

    const ModelData: { data: JSX.Element, color: string }[] = [
        {
            data: <Successful action={() => setNext(1)} />,
            color: '#F1F2F0'
        },
        {
            data: <Successful1 action={() => setNext(1)} />,
            color: '#F1F2F0'
        },
        {
            data: <Successful2 action={() => setNext(1)} />,
            color: '#F1F2F0'
        },
        {
            data: <Successful3 action={() => setNext(1)} />,
            color: ''
        }
    ];
    return (
        <div className="w-full min-h-[90vh] flex flex-col items-center justify-center gap-[30px]">
            <Model elements={ModelData[next].data} color={ModelData[next].color} />
        </div>
    )
}

function Successful({ action }: { action: () => void }) {
    return (
        <div className="flex flex-col gap-[20px] font-bold w-[500px]">
            <h1 className="text-[25px]">Results are unavailable</h1>
            <p className="font-medium">We may have a delay getting data from TaxStatus. The data is not yet available, and the process can be sped up by going to the IRS at <Link href="https://sa.www4.irs.gov/ola/" className='underline' style={{ color: '#4682B4' }}>https://sa.www4.irs.gov/ola/</Link>, navigating to the Power of Attorney and Tax Information Authorizations at <Link href="https://sa.www4.irs.gov/ola/poa_and_tia" className='underline' style={{ color: '#4682B4' }}>https://sa.www4.irs.gov/ola/poa_and_tia</Link>, and accepting both.</p>
            <p>Keep checking on this page until the results are available</p>
            <Button text="Reload page" width="150px" clicked={() => { }} color="#F1F2F0" border="1px solid #001239" textColor="#222" />
        </div>
    )
}

function Successful1({ action }: { action: () => void }) {
    return (
        <div className="flex flex-col gap-[20px] font-bold w-[500px]">
            <h1 className="text-[25px]">You are not eligible</h1>
            <p className="font-medium">After reviewing your tax information, unfortunately we cannot process the Sick and Family Leave credit for you</p>
            <ul style={{ listStyleType: "disc" }} className="pl-[20px]">
                <li>because x</li>
                <li>because y</li>
                <li>because z</li>
            </ul>
            <Button text="Reload page" width="150px" clicked={() => { }} />
        </div>
    )
}

function Successful2({ action }: { action: () => void }) {
    return (
        <div className="flex flex-col gap-[20px] font-bold w-[500px]">
            <h1 className="text-[25px]">Congratulations!</h1>
            <p className="text-[18px]">You are eligible for a credit amount of $n,nnn from the IRS, plus at least nn.n% interest accrued since April 15, 2021.</p>
            <p className="text-[14px] font-medium">fifo.com is here to streamline your credit submission from start to finish, putting together an amended tax return for 2021 and connecting you with a licensed tax professional to verify, sign, and file the return on your behalf. </p>
            <Button text="Continue" width="150px" clicked={() => { }} />
        </div>
    )
}

function Successful3({ action }: { action: () => void }) {
    return (
        <div className="flex flex-col gap-[20px] font-bold">
            <h1 className="text-[25px]">We offer the following options:</h1>
            <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px] rounded-[6px]" style={{ background: '#F1F2F0' }}>
                <div className='w-full flex items-center justify-between gap-[10px]'><input type="checkbox"/><h1>Pay on receipt (pay only after the IRS has delivered the credit)</h1><InfoIcon sx={{ fontSize: 20, color: '#4682B4' }} /></div>

                <p>Total fee: $n,nnn</p>
                <p>You receive: $n,nnn plus accrued interest</p>
            </div>
            <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px] rounded-[6px]" style={{ background: '#F1F2F0' }}>
                <div className='w-full flex items-center justify-between gap-[10px]'><input type="checkbox"/><h1>Pay on receipt (pay only after the IRS has delivered the credit)</h1><InfoIcon sx={{ fontSize: 20, color: '#4682B4' }} /></div>

                <p>Total fee: $n,nnn (save 5%)</p>
                <p>You receive: $n,nnn plus accrued interest</p>
            </div>
            <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px] rounded-[6px]" style={{ background: '#F1F2F0' }}>
                <div className='w-full flex items-center justify-between gap-[10px]'><input type="checkbox"/><h1>Cash advance (get paid as soon as your return is submitted to the IRS)</h1><InfoIcon sx={{ fontSize: 20, color: '#4682B4' }} /></div>

                <p>Total fee: $n,nnn plus accrued interest</p>
                <p>You receive: $n,nnn</p>
            </div>
            <Button text="Continue" width="150px" clicked={() => { }} />
        </div>
    )
}