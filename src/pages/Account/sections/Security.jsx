import React, { useEffect, useState } from 'react'
import { enrollTOTP, genTOTPSecret, getFactors, reauthWithCredential, reauthWithPopup } from '../../../utils/firebase'
import QRCode from 'react-qr-code';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../context/AuthContext';
import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";

function Security() {
  const [totpSecretKey, setTotpSecretKey] = useState("");
  const [totpSecret, setTotpSecret] = useState(null);
  const [totpUri, setTotpUri] = useState("");
  const [hasUri, setHasUri] = useState(false);
  const [needsReauth, setNeedsReauth] = useState(false);
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const [showQrModal, setShowQrModal] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enabledTOTP, setEnabledTOTP] = useState(false);


  useEffect(() => {
    const arr = getFactors();
    const hasTotp = arr.some(f => f.factorId === 'totp');
    setEnabledTOTP(hasTotp);
  },[])


  const handleSecret = async () => {
    try {
    const res = await genTOTPSecret();
    setTotpSecret(res.totpSecret);
    setTotpSecretKey(res.totpSecret.secretKey);
    setTotpUri(res.totpUri);
    setHasUri(true);
    setShowQrModal(true);
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setNeedsReauth(true);
        setShowReauthModal(true);
      }
  }
}

const handleReauthWithPopup = async () => {
  try {
  await reauthWithPopup();
  setShowReauthModal(false);
  await handleSecret();
  setShowQrModal(true);
  } catch (err) {
    console.error(err.message)
  }
}

const handleReauthWithCredential = async (password) => {
  await reauthWithCredential(password);
}

const handleVerify = async () => {
  try {
    await enrollTOTP(totpSecret, verificationCode)
    setShowQrModal(false);
    setEnabledTOTP(true);
  } catch (err) {
    console.error(err.message);
  }
}


  return (
    <article className="shadow flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded">
      <div>Change Password here</div>
      {user.emailVerified && <button disabled={enabledTOTP}className="bg-amber-300 w-full p-2 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-90" onClick={handleSecret}>{!enabledTOTP ? "Enable MFA (TOTP)" : "Manage MFA (TOTP)"}</button>}
      {hasUri && 
      <Modal open={showQrModal} onOpenChange={setShowQrModal} title="Authentication" titleClass="text-zinc-800 font-bold" 
        desc={<span className="flex flex-col gap-10">
        <span className="text-sm">Enter your secret key, or scan the QR code</span>
        <span className="flex flex-col gap-2 items-center justify-center align-center">
          <span className="text-sm font-semibold">Secret Key:</span> 
          <span className="text-sm">{totpSecretKey}</span>
          <QRCode value={totpUri} size={98} /> 
        </span>
        <span className="flex flex-col gap-2 items-center justify-center align-center">
          <span className="font-semibold text-sm">Enter your 6-digit code</span>
          <OneTimePasswordField.Root className="flex gap-0.5 nowrap" value={verificationCode} onValueChange={setVerificationCode} autoSubmit maxLength={6} onAutoSubmit={handleVerify}>
            <OneTimePasswordField.Input className="border-1 rounded unset flex align-center justify-center text-center shadow h-[70px] w-[48px] text-2xl" />
            <OneTimePasswordField.Input className="border-1 rounded unset flex align-center justify-center text-center shadow h-[70px] w-[48px] text-2xl" />
            <OneTimePasswordField.Input className="border-1 rounded unset flex align-center justify-center text-center shadow h-[70px] w-[48px] text-2xl" />
            <OneTimePasswordField.Input className="border-1 rounded unset flex align-center justify-center text-center shadow h-[70px] w-[48px] text-2xl" />
            <OneTimePasswordField.Input className="border-1 rounded unset flex align-center justify-center text-center shadow h-[70px] w-[48px] text-2xl" />
            <OneTimePasswordField.Input className="border-1 rounded unset flex align-center justify-center text-center shadow h-[70px] w-[48px] text-2xl" />
            <OneTimePasswordField.HiddenInput />
          </OneTimePasswordField.Root>
          </span>
        </span>} 
        descClass="text-zinc-600 text-xs whitespace-pre-line">
      </Modal>}
      {needsReauth &&
        <Modal open={showReauthModal} onOpenChange={setShowReauthModal} title="Reauthenticate" titleClass="text-zinc-800 font-bold" desc={<span className="flex flex-col gap-4">Activating MFA requires reauthentication.
         <span className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200">{user.email}</span>
         <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200"
                required
              />
        {/* Login Button */}
        <button className="w-full cursor-pointer rounded bg-teal-500 px-3 py-2 text-lg font-semibold text-white hover:opacity-90 flex gap-2 items-center justify-center" onClick={() => handleReauthWithCredential(password)}>Login</button>
        {/* Google Login */}
        <button
            type="button"
            onClick={() => handleReauthWithPopup()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 cursor-pointer"
            aria-label="Sign in with Google"
          >
            <svg className="w-4" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>
        </span>}
        descClass="text-zinc-600 text-xs whitespace-pre-line"></Modal>
      }
    </article>
  )
}

export default Security