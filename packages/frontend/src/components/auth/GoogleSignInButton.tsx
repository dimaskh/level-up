import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleSignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    // Load the Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: buttonRef.current.offsetWidth,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      await signInWithGoogle(response.credential);
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <div className="w-full">
      <div ref={buttonRef} className="w-full" />
      {/* Fallback button in case Google button fails to load */}
      <Button
        variant="outline"
        className="w-full hidden"
        onClick={() => window.google?.accounts.id.prompt()}
      >
        Continue with Google
      </Button>
    </div>
  );
}
