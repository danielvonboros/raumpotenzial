"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface CaptchaProps {
  onValidationChange: (isValid: boolean) => void;
  reset?: boolean;
}

export default function Captcha({ onValidationChange, reset }: CaptchaProps) {
  const { t } = useLanguage();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Generate new captcha numbers
  const generateCaptcha = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer("");
    setIsValid(false);
    onValidationChange(false);
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Reset captcha when reset prop changes
  useEffect(() => {
    if (reset) {
      generateCaptcha();
    }
  }, [reset]);

  // Validate answer when user input changes
  useEffect(() => {
    const correctAnswer = num1 + num2;
    const userAnswerNum = Number.parseInt(userAnswer);
    const valid = userAnswerNum === correctAnswer && userAnswer !== "";
    setIsValid(valid);
    onValidationChange(valid);
  }, [userAnswer, num1, num2, onValidationChange]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    setUserAnswer(value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("captcha.label")} {num1} + {num2}?
      </label>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
          <span>{num1}</span>
          <span>+</span>
          <span>{num2}</span>
          <span>=</span>
        </div>
        <Input
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="?"
          className={`w-20 text-center text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
            userAnswer && !isValid
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : userAnswer && isValid
              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
              : ""
          }`}
          maxLength={3}
        />
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        >
          {t("captcha.newQuestion")}
        </button>
      </div>
      {userAnswer && !isValid && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t("captcha.incorrect")}
        </p>
      )}
      {isValid && (
        <p className="text-sm text-green-600 dark:text-green-400">
          {t("captcha.correct")}
        </p>
      )}
    </div>
  );
}
