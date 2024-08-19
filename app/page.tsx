'use client'

import Image from "next/image";
import style from '@/style/components.module.css'
import { Radio } from "@/components/radio/page";
import { ChangeEvent, useEffect, useState } from "react";
import { config } from "@/config/key";
import Link from "next/link";
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

type Data = {
  value_1: string,
  value_2: string,
  email: string
}

type Config = {
  title: string;
  titleFull: string;
  apiUrl: string;
  idMeClientId: string;
  clientOnboardingSteps: string[];
};
type idStateObj = {
  session: string;
  redirect_uri: string;
  nonce: number;
  next: string;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {

  const data: Data =
  {
    value_1: '',
    value_2: '',
    email: ''
  }

  const radio1 = [
    {
      name: 'No'
    },
    {
      name: 'Yes'
    }
  ]

  const [form, setForm] = useState<Data>(data)
  const [next, setNext] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const radio_1 = (selectedIndex: number) => {
    setForm(prev => ({ ...prev, value_1: radio1[selectedIndex].name }))
  };
  const radio_2 = (selectedIndex: number) => {
    setForm(prev => ({ ...prev, value_2: radio1[selectedIndex].name }))
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setForm(prev => ({ ...prev, email }));

    if (email !== '' && emailRegex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }

  };

  const handleSubmit = async () => {
    if (isEmailValid && form.value_1 === 'Yes' && form.value_2 === 'Yes') {
      await api.addSessionData('eligibility', form)
      setNext(prev => prev + 1);

    } else if (form.email !== '') {
      setNext(prev => prev - 1);
    } else {
      setIsEmailValid(false);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      await api.clearSession();
      var session = await api.getSession()
      console.log(session)
      // const data = session.dataChunks.find((i: any) => i.key === 'eligibility')?.value;
      // if (data) {
      //   setForm(prev => ({ ...prev, value_1: data.value_1, value_2: data.value_2, email: data.email }))
      //   setNext(1);
      // }
    }
    getSession()
  }, []);

  function redirectToOAuth(sessionId: string, config: Config) {
    const redirectUri = `${config.apiUrl}/oauth/id.me`;

    const idStateObj: idStateObj = {
      session: sessionId,
      redirect_uri: redirectUri,
      nonce: Math.random(),
      next: window.location.pathname
    };

    const encodedState = encodeWebSafe(idStateObj);

    const oauthUrl = [
      "https://api.idmelabs.com/oauth/authorize?",
      `&client_id=${config.idMeClientId}`,
      `&redirect_uri=${encodeURIComponent(redirectUri)}`,
      "&response_type=code",
      "&scope=http://idmanagement.gov/ns/assurance/ial/2/aal/2",
      `&state=${encodedState}`
    ].join('');

    window.location.href = oauthUrl;
  }

  function encodeWebSafe(obj: idStateObj) {
    return encodeURIComponent(JSON.stringify(obj));
  }

  const handleButtonClick = async () => {
    const sessionId = await api.getSession({
      idOnly: true
    })
    redirectToOAuth(sessionId, config);
  }
  return (
    <div className="w-full min-h-[100vh] bg-zinc-100 flex flex-col items-center justify-center gap-[30px]">
      <div className="w-[90%] md:w-[500px] py-[10px] md:py-[20px] flex flex-col border rounded-[4px] bg-white shadow-lg">
        {next === 0 && <div className="flex flex-col w-full">
          <div className="w-full p-[20px] flex flex-col border-b text-zinc-600 gap-[10px]">
            <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Initial eligibility assessment</h1>
            <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:
            </p>
          </div>
          <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
            <h1>Were you self-employed in 2021 and did you file a Schedule C?</h1>
            <Radio data={radio1} onSelect={radio_1} />
          </div>
          <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
            <h1>Did you miss work between Jan 1, 2021 and Sept 30, 2021 due to COVID or care of people affected by COVID?</h1>
            <Radio data={radio1} onSelect={radio_2} />
          </div>
          <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
            <h1>Enter your email here</h1>
            <input type="email" placeholder="Enter your email" className="border rounded-[5px] p-[10px] outline-0" onChange={handleEmailChange} value={form.email} />
          </div>
          <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
            <button className="px-[20px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={handleSubmit}>Submit</button>
          </div>
          <div className="flex flex-col gap-[5px] text-[10px] md:text-[12px] text-zinc-500 p-[10px] lg:p-[20px]">
            <h4>(1) You must have regularly carried on a trade or business in 2021 and have self-employment income reported on Schedule 1 of your 2020 and/or 2021 taxes.</h4>
            <h4>(2) You must have been unable to perform services as a self-employed individual due to COVID-related issues for yourself or someone you were taking care of. Eligible reasons include: xyz</h4>
          </div>
        </div>}
        {next === -1 && <div className="flex flex-col w-full">
          <div className="w-full p-[20px] flex flex-col text-zinc-600 gap-[15px]">
            <h1 className="text-[14px] md:text-[16px] font-bold">ineligibility</h1>
            <p className="text-[14px] md:text-[16px]">Thank you for your submission. Based on your answers, you do not qualify for the Sick and Family Leave credit.</p>
            <div className="w-full text-zinc-600 text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
              <button className="px-[20px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev + 1)}>Go Back</button>
            </div>
          </div>
        </div>}
        {next === 1 && <div className="flex flex-col w-full">
          <div className="w-full p-[20px] flex flex-col text-zinc-600 gap-[15px]">
            <h1 className="text-[14px] md:text-[16px] font-bold">Initial ID.me login</h1>
            <p className="text-[14px] text-zinc-500">Congratulations! As a self-employed individual who missed work due to COVID in 2021, you may be eligible for the Sick and Family Leave credit.</p>
            <p className="text-[14px] text-zinc-500">We take your security seriously. Thats why we have partnered with ID.me: the only login provider trusted by the IRS.</p>
            <p className="text-[14px] text-zinc-500">Please log in to your ID.me account, or sign up now (it’s free).</p>
            <div className="w-full text-zinc-600 text-[14px] flex flex-col gap-[5px] md:gap-[15px]" onClick={() => handleButtonClick()}>
              <button className="px-[20px] py-[8px] rounded-[4px] text-zinc-200 font-bold" id={style.idme}>Verify with ID.me</button>
            </div>
            <p className="text-[10px] md:text-[12px]">By clicking Verify with ID.me, I agree to FIFOs Terms of Use, Privacy Policy and to receive electronic communication about my accounts and services per FIFOs Electronic Communications Agreement.</p>
          </div>
        </div>}
      </div>
    </div>
  );
}
