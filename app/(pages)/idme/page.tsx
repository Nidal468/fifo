'use client'

import { Button } from "@/components/button/page";
import DayPickerComponent from "@/components/DayPickerComponent/page";
import Description from "@/components/Description/page";
import Dropzone from "@/components/dropzone/page";
import { Model } from "@/components/model/page";
import Link from "next/link";
import { useState } from "react";



export default function Idme() {
    const [next, setNext] = useState(4);

    const ModelData: { data: JSX.Element, color: string }[] = [
        {
            data: <Self_Assessment_1 action={() => setNext(1)} />,
            color: ''
        },
        {
            data: <Self_Assessment_2 action={() => setNext(2)} />,
            color: ''
        },
        {
            data: <Self_Assessment_3 action={() => setNext(3)} />,
            color: ''
        },
        {
            data: <Upload action={() => setNext(0)} />,
            color: ''
        },
        {
            data: <Fail action={() => setNext(0)} />,
            color: '#F1F2F0'
        }
    ];

    const progressPercentage = ((next + 1) / ModelData.length) * 100;

    return (
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-start gap-[30px]">
            <div className="h-[2px] self-start duration-300" style={{ background: '#FF7352', width: `${progressPercentage}%` }}></div>
            <Model elements={ModelData[next].data} color={ModelData[next].color} />
        </div>
    )
}

function Self_Assessment_1({ action }: { action: () => void }) {


    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1 className="text-[20px]">Between January 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual due to one or more of the following reasons:</h1>
            <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                <li>You were ordered or advised to quarantine or self-isolate due to COVID-19.</li>
                <li>You were experiencing symptoms of COVID-19 and seeking a medical diagnosis.</li>
            </ul>
            <h1 className="text-[20px]">The following reasons for sick leave are also valid for dates between April 1, 2021 and September 30, 2021:</h1>
            <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                <li>You were waiting on a COVID-19 test or diagnosis.</li>
                <li>You were obtaining a COVID-19 immunization.</li>
                <li>You were recovering from a COVID-19 immunization injury, disability, illness, or related condition.</li>
            </ul>
            <h1>If none of these apply to you,<span className='underline' style={{ color: '#4682B4' }}>skip this section.</span></h1>
            <DayPickerComponent
                title="COVID-19 Impact Days (Period 1)"
                stepKey="sick-dates-1"
                nextPath="/onboarding/sick-dates-2"
                minDate={new Date(2021, 0, 1)}
                maxDate={new Date(2021, 2, 31)}
                maxClaimableDays={10}
                mode="multiple"
            />
            <Description title="Description" />
            <div className="flex w-full items-center justify-between">
                <div className='underline font-light' style={{ color: '#4682B4' }}>skip.</div>
                <Button text="Next" width="100px" clicked={() => action()} />
            </div>
        </div>
    )
}

function Self_Assessment_2({ action }: { action: () => void }) {

    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1 className="text-[20px]">Between January 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual because:</h1>
            <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                <li>You were caring for anyone who was quarantining.</li>
            </ul>
            <h1 className="text-[20px]">The following reasons for family leave are also valid for dates between April 1, 2021 and September 30, 2021:</h1>
            <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                <li>You were taking someone to receive a COVID-19 immunization.</li>
                <li>You were caring for anyone recovering from a COVID-19 immunization injury, disability, illness, or related condition.</li>
            </ul>
            <h1>If none of these apply to you,<span className='underline' style={{ color: '#4682B4' }}>skip this section.</span></h1>
            <div className="flex w-full p-[20px] rounded-[5px] font-medium" style={{ background: '#F1F2F0' }}>
                <p>Son or daughter: A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see <Link href="https://www.dol.gov/agencies/whd/pandemic/ffcra-questions#40" className='underline' style={{ color: '#4682B4' }}>DOL.gov/agencies/whd/pandemic/ffcra-questions#40</Link>.</p>
            </div>
            <DayPickerComponent

                title="COVID-19 Impact Days (Period 2)"
                stepKey="sick-dates-1"
                nextPath="/onboarding/sick-dates-2"
                minDate={new Date(2021, 0, 1)}
                maxDate={new Date(2021, 2, 31)}
                maxClaimableDays={10}
                mode="multiple"

            />

            <Description title="Description" />
            <div className="flex w-full items-center justify-between">
                <div className='underline font-light' style={{ color: '#4682B4' }}>skip.</div>
                <Button text="Next" width="100px" clicked={() => { }} />

            </div>
        </div>
    )
}

function Self_Assessment_3({ action }: { action: () => void }) {

    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1 className="text-[20px]">Between January 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual because:</h1>
            <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                <li>You were caring for a son or daughter whose school or place of childcare was closed due to COVID-19.</li>
            </ul>
            <h1 className="text-[20px]">The following reasons for family leave are also valid for dates between April 1, 2021 and September 30, 2021:</h1>
            <ul style={{ listStyleType: 'disc' }} className="flex flex-col gap-[10px] text-[14px] font-medium px-[40px]">
                <li>You were taking a son or daughter to receive a COVID-19 immunization.</li>
                <li>You were caring for a son or daughter who was quarantining or recovering from a COVID-19 immunization injury, disability, illness, or related condition.</li>
            </ul>
            <h1>Include days in this category even if you have already entered them in an earlier step. fifo.com will select the proper category to use to maximize your credit. No days will be duplicated on your final return.</h1>
            <h1>If none of these apply to you,<span className='underline' style={{ color: '#4682B4' }}>skip this section.</span></h1>
            <div className="flex w-full p-[20px] rounded-[5px] font-medium" style={{ background: '#F1F2F0' }}>
                <p>Son or daughter: A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see <Link href="https://www.dol.gov/agencies/whd/pandemic/ffcra-questions#40" className='underline' style={{ color: '#4682B4' }}>DOL.gov/agencies/whd/pandemic/ffcra-questions#40</Link>.</p>
            </div>
            <DayPickerComponent

                title="COVID-19 Impact Days (Period 3)"
                stepKey="sick-dates-1"
                nextPath="/onboarding/sick-dates-2"
                minDate={new Date(2021, 0, 1)}
                maxDate={new Date(2021, 2, 31)}
                maxClaimableDays={10}
                mode="multiple"

            />

            <Description title="Description" />
            <div className="flex w-full items-center justify-between">
                <div className='underline font-light' style={{ color: '#4682B4' }}>skip.</div>
                <Button text="Next" width="100px" clicked={() => { }} />

            </div>
        </div>
    )
}

function Upload({ action }: { action: () => void }) {



    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1 className="text-[20px]">If you have any documentation supporting any of the dates you have entered, select the files or drag and drop to upload.</h1>
            <Dropzone/>
            <h1>All information in this self-assessment must be true and accurate to the best of your knowledge. Any submission of data to the IRS that is known to be false or fraudulent could subject you, the taxpayer, to fines or imprisonment.</h1>
            <div className="w-full flex items-center justify-end gap-[20px]">
                <Button text="Back" clicked={() => {}} width="120px" color="#ffffff" border="2px solid #151515" textColor="#151515"/>
                <Button text="Next" clicked={() => {}} width="120px"/>
            </div>
        </div>
    )
}

function Fail({ action }: { action: () => void }) {
    return(
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1>Thank you for your submission!</h1>
            <p>Based on your answers, you do not qualify for the Sick and Family Leave credit.</p>
            <Button text='Back to fifo.com' width='200px' clicked={() => action()} />
        </div> 
    )
}