'use client'

import Link from "next/link";
import DayPickerComponent from "../DayPickerComponent/page";
import Description from "../Description/page";
import { Button } from "@/components/button/page";
import { useEffect, useState } from "react";
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

export type List = {
    title: string
}

export type Reasons = {
    title: string,
    list: List[]
}

export type Assessment = {
    reasons: Reasons[],
    action?: () => void,
    children: boolean,
    startData: Date,
    endDate: Date,
    index: number,
    final: boolean
}

export function Self_Assessment({
    reasons,
    action,
    children,
    startData,
    endDate,
    index,
    final
}: Assessment) {

    const [description, setDescription] = useState('');
    const [dates, setDates] = useState([]);

    const form = {
        date: dates,
        description: description
    }

    useEffect(() => {
        const getSession = async () => {
            var session = await api.getSession()
            

        }
        getSession()
    }, []);
    

    const onSubmit = async () => {
        console.log(1)
        // console.log(form)
        // await api.addSessionData(`Self_Assessment-${index}`, form);
        if (action) {
            action();
        }
    }
    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            {reasons.map((i, index: number) => {
                return (
                    <div className="flex flex-col gap-[20px] w-full" key={index}>
                        <h1 className="text-[20px]">{i.title}</h1>
                        <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                            {i.list.map((a, index: number) => {
                                return (
                                    <li key={index}>{a.title}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
            {final && <h1>Include days in this category even if you have already entered them in an earlier step. fifo.com will select the proper category to use to maximize your credit. No days will be duplicated on your final return.</h1>}
            <h1>If none of these apply to you,<span className='underline' style={{ color: '#4682B4' }}>skip this section.</span></h1>
            {children &&
                <div className="flex w-full p-[20px] rounded-[5px] font-medium" style={{ background: '#F1F2F0' }}>
                    <p>Son or daughter: A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see <Link href="https://www.dol.gov/agencies/whd/pandemic/ffcra-questions#40" className='underline' style={{ color: '#4682B4' }}>DOL.gov/agencies/whd/pandemic/ffcra-questions#40</Link>.</p>
                </div>
            }
            <DayPickerComponent

                title={`COVID-19 Impact Days (Period ${index})`}
                stepKey={`sick-dates-${index}`}
                minDate={startData}
                maxDate={endDate}
                mode="multiple"
                dates={(e: any) => setDates(e)}
            />

            <Description title="Description" change={(e) => setDescription(e)} value={description} />
            {action && <div className="flex w-full items-center justify-between">
                <div className='underline font-light' style={{ color: '#4682B4' }} onClick={action}>skip.</div>
                <Button text="Next" width="100px" clicked={() => onSubmit()} />
            </div>}
        </div>
    )
}