import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';

export const useResendCooldown = () => {
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState('');
  const resendVerificationLink = useStore((state) => state.resendVerificationLink);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const triggerResend = useCallback(
    async (email, type = 'signup') => {
      if (resendCooldown > 0 || resending) return;
      setResending(true);
      setResendStatus('');

      const res = await resendVerificationLink(email, type);
      setResending(false);

      if (res?.success) {
        setResendCooldown(60);
        setResendStatus(res?.message || 'A fresh verification link has been transmitted to your email.');
      } else {
        setResendStatus(res?.message || 'Failed to resend link.');
      }
      return res;
    },
    [resendCooldown, resending, resendVerificationLink]
  );

  return {
    resending,
    resendCooldown,
    setResendCooldown,
    resendStatus,
    setResendStatus,
    triggerResend,
  };
};

export default useResendCooldown;
