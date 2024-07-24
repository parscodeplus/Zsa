"use client"
import App from "@/components/test";
import * as React from "react"
// import StepperForm from "@/components/site/StepperForm";
import dynamic from 'next/dynamic'
 
const StepperForm = dynamic(() => import("@/components/site/StepperForm"), { ssr: false })
const Page = () => {
  return (
    <div>
      {/* <App /> */}
      <StepperForm />
    </div>
  );
};

export default Page;
