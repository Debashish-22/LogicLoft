import { useEffect, useCallback } from 'react';
import platform from 'platform';
import { serialize } from 'cookie';
import axiosInstance from "@/utils/axios";
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { ToastType } from '@/context/toastContextProvider';

const SESSION_TIME = 24 * 60 * 60 * 1000;

declare global {
  interface Window {
    google: any;
  }
}

const GoogleOneTapLogin = () => {
    
    const auth = useAuth();
    const toast = useToast();

    const handleOneTapLogin = useCallback(async (credential: string) => {
        try {
            const URI = `/auth/google-one-tap`;
            const response = await axiosInstance.post(URI, { credential, platform });
            const { success } = response.data;

            if(success){
                const { token, deviceId }  = response.data.data;
                document.cookie = serialize(process.env.AUTH_TOKEN!, token, { maxAge: SESSION_TIME });
                document.cookie = serialize(process.env.DEVICE_TOKEN!, deviceId, { maxAge: SESSION_TIME });
                await auth?.fetchUser()!;
                toast.renderToast("Logged In Successfully", ToastType.Success);
            }           
        } catch (error) {          
            toast.renderToast("Something went wrong!", ToastType.Error);
        }
    }, [auth, toast]);

    useEffect(() => {
        const oneTap = () => {
            const { google } = window;
            if (google) {
                google.accounts.id.initialize({
                    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
                    callback: async (response: any) => handleOneTapLogin(response.credential),
                });
                google.accounts.id.prompt();
            }
        };

        if(!auth.authenticated){
            const timeout = setTimeout(() => oneTap(), 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [auth.authenticated, handleOneTapLogin]);
    
    return null;
};

export default GoogleOneTapLogin;
