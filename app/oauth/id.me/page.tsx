'use client'

import { useEffect } from 'react'
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

export default function Callback() {

    useEffect(() => {
        const handleSession = async () => {
            const params = new URLSearchParams(window.location.search);
            const state = params.get('state');
            const code = params.get('code');

            if (state && code) {
                try {
                    // Decode and parse the state parameter
                    const decodedState = decodeURIComponent(state);
                    const { session, redirect_uri, next } = JSON.parse(decodedState);
                    const data = {
                        session: session,
                        redirect_uri: redirect_uri,
                        next: next
                    }
                    await api.addSessionData('id.me', data);
                    window.location.href = '/self-assessment';
                } catch (error) {
                    console.error('Error processing OAuth callback:', error);

                }
            } else {
                console.error('Invalid OAuth callback URL');

            }
        }

        handleSession();
    }, []);

    return (
        <div className='w-full min-h-[100vh] flex items-center justify-center gap-[200px] bg-zinc-200'>
        </div>
    )
}
