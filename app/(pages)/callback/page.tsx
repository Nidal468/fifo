'use client'

import style from '@/style/components.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

export default function Callback() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const getSession = async () => {
            var session = await api.getSession();
            const data = session.dataChunks.find((i: any) => i.key === 'eligibility').value;
            const password = session.dataChunks.find((i: any) => i.key === 'password').value;
            setEmail(data.email);
            setPassword(password);
        }
        getSession()
    }, []);

    const Sign_in = async () => {
        var session = await api.getSession();
        const data = session.dataChunks.find((i: any) => i.key === 'eligibility').value;
        const password_1 = session.dataChunks.find((i: any) => i.key === 'password').value;
        if (data && email === data.email && password_1 === password) {
            window.location.href = '/self-assessment'
        }
    }
    return (
        <div className='w-full min-h-[100vh] flex items-center justify-center gap-[200px] bg-zinc-200'>
            <div className='w-[500px] p-[20px] bg-white shadow-lg flex flex-col gap-[20px] rounded-[5px]'>
                <div className='flex items-center gap-[10px]'>
                    <h1 className='text-[18px]'>Sign in to</h1>
                    <img src='/images/assets/fifo-logo.c7616db0.svg' alt="logo" className='w-[40px] h-[40px]' />
                </div>
                <div className='w-full flex flex-col gap-[20px]'>
                    <div className="w-full text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px]">
                        <h1>Enter your email here</h1>
                        <input type="email" placeholder="Enter your email" className="border rounded-[5px] p-[10px] outline-0" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="w-full text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px]">
                        <h1>Enter your password here</h1>
                        <input type="password" placeholder="Enter your password" className="border rounded-[5px] p-[10px] outline-0" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <div className='w-full flex items-center justify-between cursor-pointer text-[12px]'>
                    <div className='flex gap-[10px] items-center'><input type='checkbox' checked={true}/><h1>Remember me</h1></div>
                    <Link href='/'>forgot your password?</Link>
                </div>
                <div className="w-full text-zinc-600 text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                    <button className="px-[20px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Sign_in()}>Sign in</button>
                </div>
                <p className='text-[11px]'>Please read the Terms of Use carefully before you start to use the Website. By using the Website or by clicking to accept or agree to the Terms of Use when this option is made available to you, you accept and agree to be bound and abide by these Terms of Use and our Privacy Policy, found at <Link href="https://www.fifo.com/privacy-policy/" className='text-blue-500 font-bold'>privacy-policy</Link>, incorporated herein by reference. If you do not want to agree to these Terms of Use or the Privacy Policy, you must not access or use the Website.</p>
            </div>
        </div>
    )
}