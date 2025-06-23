import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const CAPTCHA = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue();
    console.log("reCAPTCHA token:", token);

    if (!token) {
      alert("reCAPTCHAを確認してください");
      return;
    }

    // サーバーに送るなどの処理をここで行う
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 他のフォーム項目 */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={(token) => console.log("captcha取得:", token)}
      />
      <button type="submit">登録</button>
    </form>
  );
};
