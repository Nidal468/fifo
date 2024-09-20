'use client'

import style from '@/style/components.module.css'
import { Radio } from "@/components/radio/page";
import { ChangeEvent, useEffect, useState } from "react";
import { config } from "@/config/key";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoIcon from '@mui/icons-material/Info';



// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');
import { Model } from "@/components/model/page";
import { Button } from '@/components/button/page';



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
  const [next, setNext] = useState(1);

  useEffect(() => {
    const getSession = async () => {
      await api.clearSession();
      var session = await api.getSession()
      
      // const data = session.dataChunks.find((i: any) => i.key === 'eligibility')?.value;
      // if (data) {
      //   setForm(prev => ({ ...prev, value_1: data.value_1, value_2: data.value_2, email: data.email }))
      //   setNext(1);
      // }
    }
    getSession()
  }, []);

  const ModelData: { data: any, color: string }[] = [
    {
      data: <Ineligibility action={(v) => setNext(v)} />,
      color: '#F1F2F0'
    },
    {
      data: <Welcome action={(v) => setNext(v)} />,
      color: '#F1F2F0'
    },
    {
      data: <Eligibility action={(v) => setNext(v)} />,
      color: ''
    },
    {
      data: <Eligible action={(v) => setNext(v)} />,
      color: '#F1F2F0'
    },
    {
      data: <Login action={(v) => setNext(v)}/>,
      color: '#F1F2F0'
    }
  ];
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-[30px]">
      <Model elements={ModelData[next].data} color={ModelData[next].color} />
    </div>
  );
}

function Welcome({ action }: { action: (value: number) => void }) {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-[40px]">
      <img src='/images/assets/fifo_logo_png.png' className='w-[100px]' />
      <div className='flex flex-col gap-[20px] text-center'>
        <h1 className='font-bold text-[30px]'>Welcome to fifo.com!</h1>
        <p className='text-[18px]'>In order to register we have few questions to ask. If you already have an account, please use the link below.</p>
      </div>
      <Button text='Let’s get started' width='200px' clicked={() => action(2)} />
      <div className='w-full h-[2px]' style={{ background: '#E6E6E6' }}></div>
      <div className='w-full flex items-center justify-between'>
        <h1 className='underline' style={{ color: '#4682B4' }}>I already have an account</h1>
        <div className='px-[12px] py-[14px] bg-white flex rounded-[5px] gap-[4px]'>
          <h1 style={{ color: '#797B81' }}>Language:</h1>
          <h1>English</h1>
          <KeyboardArrowDownIcon sx={{ fontSize: 25 }} />
        </div>
      </div>
    </div>
  )
}

function Eligibility({ action }: { action: (value: number) => void }) {

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

  const [form, setForm] = useState<Data>(data);
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
      await api.addSessionData('eligibility', form);
      action(3);
    } else if (form.email !== '') {
      action(0);
    } else {
      setIsEmailValid(false);
    }
  };



  return (
    <div className="flex flex-col w-full gap-[20px]">
      <div className="w-full py-[20px] flex flex-col border-b text-zinc-600 gap-[10px]">
        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Initial eligibility assessment</h1>
        <p className="text-[10px] md:text-[16px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:
        </p>
      </div>
      <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px] rounded-[6px]" style={{ background: '#F1F2F0' }}>
        <div className='w-full flex items-center justify-between gap-[10px]'><h1>Were you self-employed in 2021 and did you file a Schedule C?</h1><InfoIcon sx={{ fontSize: 20, color: '#4682B4' }} /></div>
        <Radio data={radio1} onSelect={radio_1} />
      </div>
      <div className="w-full p-[10px] md:p-[20px] text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px] rounded-[6px]" style={{ background: '#F1F2F0' }}>
        <div className='w-full flex items-center justify-between gap-[10px]'><h1>Did you miss work between Jan 1, 2021 and Sept 30, 2021 due to COVID or care of people affected by COVID?</h1><InfoIcon sx={{ fontSize: 20, color: '#4682B4' }} /></div>
        <Radio data={radio1} onSelect={radio_2} />
      </div>
      <div className="w-full text-zinc-600 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
        <h1>Enter your email here</h1>
        <input type="email" placeholder="Enter your email" className="border rounded-[5px] p-[10px] outline-0" onChange={handleEmailChange} value={form.email} />
      </div>
      <Button text='Submit' width='120px' clicked={() => handleSubmit()} />
    </div>
  )
}

function Ineligibility({ action }: { action: (value: number) => void }) {

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex flex-col text-zinc-600 gap-[15px]">
        <h1 className="text-[14px] md:text-[20px] font-bold">Thank you for your submission!</h1>
        <p className="text-[14px] md:text-[18px]">Based on your answers, you do not qualify for the Sick and Family Leave credit.</p>
        <Button text='Back to fifo.com' width='200px' clicked={() => action(1)} />
      </div>
    </div>
  )
}

function Eligible({ action }: { action: (value: number) => void }) {

  function encodeWebSafe(obj: idStateObj) {
    return encodeURIComponent(JSON.stringify(obj));
  }

  function redirectToOAuth(sessionId: string, config: Config) {
    const redirectUri = `${config.apiUrl}/idme`;

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

  const handleButtonClick = async () => {
    const sessionId = await api.getSession({
      idOnly: true
    })
    redirectToOAuth(sessionId, config);
  }
  return (
    <div className="flex flex-col w-full">
      <div className="w-[600px] p-[20px] flex flex-col text-zinc-600 gap-[15px]">
        <h1 className="text-[14px] md:text-[20px] font-bold">Congratulations!</h1>
        <p className="text-[16px] text-zinc-500">As a self-employed individual who missed work due to COVID in 2021, you may be eligible for the Sick and Family Leave credit.</p>
        <p className="text-[16px] text-zinc-500">We take your security seriously. That’s why we have partnered with ID.me: the only login provider trusted by the IRS.</p>
        <p className="text-[16px] text-zinc-500">Please log in to your ID.me account, or sign up now (it’s free).</p>
        <Button text='Create account or Login with' width='300px' clicked={() => handleButtonClick()} src='/images/assets/idme.png' />
      </div>
    </div>
  )
}

function Login({ action }: { action: (value: number) => void }) {
  return (
    <div className="flex flex-col w-full gap-[10px]">
      <h1 className='text-[30px]'>Welcome back!</h1>
      <p className='text-[18px]'>Use the link below to login to your fifo account.</p>
      <Button text='Login with' width='200px' clicked={() => {}} src='/images/assets/idme.png' />
    </div>
  )
}