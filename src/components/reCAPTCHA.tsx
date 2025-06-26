import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { varifyReCAPTCHA } from "../api/ReCAPTCHA.tsx";

export const CAPTCHA = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
const [verified, setVerified] = useState(false);

  const onVarifyReCAPTCHAChange = async (token: string | null) => {
    // reCAPTCHA
    console.log("reCAPTCHA token:", token);

    if (!token) {
        alert("reCAPTCHAを確認してください");
        return;
    }

    // reCAPTCHA認証
    const res = await varifyReCAPTCHA({ token })

    if (res.success) {
      console.log("認証成功");
      setVerified(true);
    } else {
      console.log("認証失敗");
      setVerified(false);
    }
  };

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={onVarifyReCAPTCHAChange}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center"
        }}
      />
      {verified && (
        <div style={{ color: "green", marginTop: "8px" }}>
            ✅ 認証完了
        </div>
      )}
    </>
  );
};
