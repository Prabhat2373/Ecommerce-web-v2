import { useEffect, useState } from "react";
import OrderSummary from "../OrderSummary";
import BillingInfoForm from "./BillingInfoForm";
import ShippingDetails from "./ShippingDetails";
import {
  FormContext,
  FormContextProvider,
  useOrderFormContext,
} from "../../../Contexts/formContext";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  useAddBillingDetailsMutation,
  useGetStripeKeyQuery,
} from "../../../features/services/RTK/Api";
import { useSelector } from "react-redux";
import { User } from "../../../interfaces/Payload";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useParams } from "react-router-dom";

export interface BillingData {
  first_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  delivery: string;
  email: string;
}

const OrderForm = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  

  const [formStep, setFormStep] = useState(1);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  const { data: StripeKey } = useGetStripeKeyQuery("");

  useEffect(() => {
    setStripeApiKey(StripeKey?.stripeApiKey);
  }, [StripeKey]);

  console.log("STRIPEKEY", stripeApiKey);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-lg font-medium mb-4">Step {formStep} of 3</h2>
        <div className="flex mb-4">
          <div
            className={`w-1/2 border-r border-gray-400 ${
              formStep === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 text-center cursor-pointer`}
            onClick={() => setFormStep(1)}
          >
            Shipping Details
          </div>
          <div
            className={`w-1/2 ${
              formStep === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 text-center cursor-pointer`}
            onClick={() => setFormStep(2)}
          >
            Order Details
          </div>
          <div
            className={`w-1/2 ${
              formStep === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 text-center cursor-pointer`}
            onClick={() => setFormStep(3)}
          >
            Payment Details
          </div>
        </div>
        {(formStep === 1 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Shipping Details</h3>
            <ShippingDetails formStep={formStep} nextFormStep={nextFormStep} />
          </div>
        )) ||
          (formStep === 2 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <OrderSummary
                prevFormStep={prevFormStep}
                formStep={formStep}
                nextFormStep={nextFormStep}
              />
            </div>
          )) ||
          (formStep === 3 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Payment Info</h3>
              <Elements stripe={loadStripe(stripeApiKey)}>
                <BillingInfoForm
                  formStep={formStep}
                  nextFormStep={nextFormStep}
                />
              </Elements>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderForm;
