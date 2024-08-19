'use client'

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router'; // If you're using Next.js, you might use `next/router`

import { useAppContext } from '@/context/AppContext'
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

const IDMeCallback = () => {
    const { appState, updateAppState } = useAppContext();
    const history = useRouter(); // For Next.js, you might use `useRouter` from 'next/router'

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await api.post('/oauth/id.me', { code });
                    console.log('Response:', response);
                    history.push('/flow/client/personaldetails'); // Adjust the route based on your flow
                } catch (error) {
                    console.error('Error processing ID.me callback:', error);
                    // Handle error, like showing an error message
                }
            } else {
                console.error('No code received from ID.me');
                // Handle missing code, possibly with an error message
            }
        };

        handleCallback();
    }, [api, history]);

    return <div>Processing ID.me verification...</div>;
};

export default IDMeCallback;
