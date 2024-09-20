'use client'

import InputField from "@/components/inputField/page";
import { Model } from "@/components/model/page";
import { Self_Assessment } from "@/components/Self_Assessment/page";
import { Data } from "@/data/assesments";
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import StyledDropzone from "@/components/dropzone/page";
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from "rizzui";
import { Button } from "@/components/button/page";
import Link from "next/link";
export default function Review() {


    return (
        <div className="w-full min-h-[90vh] flex flex-col items-center justify-center gap-[30px]">
            <Model elements={<Content />} color={""} />
        </div>
    )
}

function Content() {
    const files: { title: string }[] = [
        {
            title: 'file-1.pdf'
        },
        {
            title: 'file-2.pdf'
        },
        {
            title: 'file-3.pdf'
        }
    ];
    const tooltipData: { info: JSX.Element }[] = [
        {
            info: <div className="flex flex-col">
                <p>Pay nothing at all until the check is received from the IRS.</p>
                <p>If the credit is not issued for any reason, you owe nothing.</p>
                <p>You keep all the remaining money from the IRS check,</p>
                <p>including accrued interest.</p>
            </div>
        }
    ]
    return (
        <div className="flex flex-col gap-[30px] font-bold w-[800px]">
            <h1 className="text-[30px]">Please review your application. If there are any errors, click the appropriate Edit button to update your information.</h1>

            <div className="w-full flex gap-[10px]">
                <InputField
                    width={'100%'}
                    edit={false}
                    disabled={true}
                    label="Name"
                    value={'Jane Smith'}
                    type='text'
                    info={{ label: 'IRS records', information: '' }}
                    placeholder="User name" />
                <InputField
                    width={'100%'}
                    edit={false}
                    disabled={true}
                    label="Address on tax return"
                    value={'Address line 1, address line 2, address line...'}
                    type='text'
                    info={{ label: 'IRS records', information: '' }}
                    placeholder="Address line 1, address line 2, address line..." />
            </div>

            <InputField
                width="100%"
                label="Email"
                type="email"
                disabled={true}
                edit={true}
                value={'janesmith@email.com'}

            />
            <InputField
                width="100%"
                label="Phone number"
                type="tel"
                disabled={true}
                edit={true}
                value={'123-456-7890'}
                info={{ label: 'IRS records', information: '' }}
            />
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <Self_Assessment

                reasons={Data[0].reasons}
                children={Data[0].children}
                startData={Data[0].startData}
                endDate={Data[0].endDate}
                index={Data[0].index}
                final={Data[0].final}
            />
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <Self_Assessment

                reasons={Data[1].reasons}
                children={Data[1].children}
                startData={Data[1].startData}
                endDate={Data[1].endDate}
                index={Data[1].index}
                final={Data[1].final}
            />
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <Self_Assessment

                reasons={Data[2].reasons}
                children={Data[2].children}
                startData={Data[2].startData}
                endDate={Data[2].endDate}
                index={Data[2].index}
                final={Data[2].final}
            />
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <h1 className="text-[30px]">If you have any documentation supporting any of the dates you have entered, select the files or drag and drop to upload.</h1>
            <div className="w-full flex flex-col gap-[10px]">
                <h1 className="font-light">Select files or drag and drop to upload</h1>
                {files.map((i, index: number) => {
                    return <Files title={i.title} key={index} />
                })}
                <StyledDropzone />
            </div>
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <h1>Payment method</h1>
            <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px] rounded-[6px]" style={{ background: '#F1F2F0' }}>
                <div className='w-full flex items-center justify-between gap-[10px]'>
                    <div className="flex items-center gap-[10px]">
                        <h1>Pay up front (pay now for a reduced fee)</h1>
                    </div>
                    <Tooltip className="text-[15px]"
                        content={tooltipData[0].info}
                        placement="right"
                    >
                        <InfoIcon sx={{ fontSize: 20, color: '#4682B4' }} />
                    </Tooltip>
                </div>
                <p>Total fee: $n,nnn (save 5%)</p>
                <p>You receive: $n,nnn plus accrued interest</p>
            </div>
            <div className="w-full h-[100px] flex border border-zinc-100 shadow-sm items-center justify-between p-[20px] rounded-[6px]">
                <h1>This application uses Plaid to power your payments.</h1>
                <Button text="Continue with Plaid" width="40%" clicked={() => { }} color="#fff" textColor="#001239" border="1px solid #001239" height="50px" src="/images/assets/plaid.png" />
            </div>
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <div className="flex flex-col w-full items-start justify-start gap-[20px] my-[20px]">
                <h1>Please read and sign the following documents:</h1>
                <div className="flex flex-col">
                    <div className="flex items-center justify-center gap-[10px]">
                        <input type="checkbox" />
                        <h3>I have read <Link href="https://sa.www4.irs.gov/ola/" className='underline' style={{ color: '#4682B4' }}>Document 1</Link></h3>
                    </div>
                    <div className="flex items-center justify-center gap-[10px]">
                        <input type="checkbox" />
                        <h3>I have read <Link href="https://sa.www4.irs.gov/ola/" className='underline' style={{ color: '#4682B4' }}>Document 2</Link></h3>
                    </div>
                    <div className="flex items-center justify-center gap-[10px]">
                        <input type="checkbox" />
                        <h3>I have read <Link href="https://sa.www4.irs.gov/ola/" className='underline' style={{ color: '#4682B4' }}>Document 3</Link></h3>
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px]" style={{ background: '#E6E6E6' }}></div>
            <h1>By submitting your application, you are asserting to us, as well as the IRS, that the sick leave dates provided in this application are true and accurate to the best of your knowledge. Providing false information could lead to serious consequences for the taxpayer.</h1>
            <div className="w-full flex items-center justify-end gap-[20px]">
                <Button text="Back" width="100px" clicked={() => {}} color="#fff" border="1px solid #001239" textColor="#001239"/>
                <Button text="Submit" width="100px" clicked={() => {}}/>
            </div>
        </div>
    )
}

export function Files({ title }: { title: string }) {
    return (
        <div className="w-full h-[50px] flex items-center justify-between gap-[10px]">
            <div className="w-full h-full px-[10px] flex items-center justify-start rounded-[6px] font-light gap-[10px]" style={{ background: '#F1F2F0' }}>
                <AttachFileIcon />
                {title}
            </div>
            <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[6px]" style={{ background: '#FF73521A' }}>
                <CloseIcon sx={{ color: '#FF7352' }} />
            </div>
        </div>
    )
}