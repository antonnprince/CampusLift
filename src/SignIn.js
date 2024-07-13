import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const storePhoneNumber = async (phoneNumber) => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        phoneNumber: ph,
      });
      return res.status; // Return the status code
    } catch (error) {
      console.error("Error storing phone number:", error);
      throw error;
    }
  };

  const onOTPVerify = async () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        try {
          const status = await storePhoneNumber(ph);
          setLoading(false);
          if (status === 200) {
            navigate("/Mappage"); // Navigate to the map page
          } else if (status === 203) {
            navigate("/RolePage"); // Navigate to the user details page
          }
        } catch (error) {
          setLoading(false);
          toast.error("Error verifying OTP");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Invalid OTP");
      });
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {showOTP ? (
        <>
          <label
            htmlFor="otp"
            className="font-bold text-4xl text-black text-center mt-20"
          >
            Verification
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            autoFocus
            className="opt-container rounded-lg p-4 space-x-2"
            inputClassName="rounded-lg border border-gray-300 p-2 text-base"
          />
          <button
            onClick={onOTPVerify}
            className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
          >
            {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
            <span>Verify OTP</span>
          </button>
        </>
      ) : (
        <>
          <label className="font-sans font-semibold text-[32px] leading-[44px] text-black text-center py-4 mb-10 whitespace-pre-line">
            Enter your phone
            <br />
            number
          </label>
          <PhoneInput
            country={"in"}
            value={ph}
            onChange={setPh}
            className="w-full mb-6"
          />
          <div className="mt-6">
            <button
              onClick={onSignup}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded-full"
            >
              {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
              <span>Sign In</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;