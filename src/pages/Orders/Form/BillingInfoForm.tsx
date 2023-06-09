import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useOrderFormContext } from "../../../Contexts/formContext";
import {
  useCreateOrderMutation,
  usePaymentProcessMutation,
  useRemoveAllCartMutation,
} from "../../../features/services/RTK/Api";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../../features/Toast/ToastContext";

const BillingInfoForm = ({
  formStep,
  nextFormStep,
}: {
  formStep: number;
  nextFormStep: () => void;
}) => {
  const [ProcessPayment] = usePaymentProcessMutation();
  const [CreateOrder] = useCreateOrderMutation();
  const user: any = useSelector((state: RootState) => state.user.payload);
  const { handleSubmit } = useForm();
  const { formData } = useOrderFormContext();
  const toast = useToast();
  console.log("FORMDATA", formData);
  const { search, state } = useLocation();
  const query = search.replace("?", "").split(/[&=]/).pop();
  const cartItems: any = useSelector((state: RootState) => state.cart.items);
  const methods = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const nav = useNavigate();
  const [RemoveCartItems] = useRemoveAllCartMutation();
  const singleProduct = {
    description: state.description,
    image: state?.images[0]?.url,
    name: state.name,
    price: state.price,
    quantity: 1,
    product: state._id,
    user: user._id,
  };

  const paymentData = {
    amount: Math.round(formData && formData?.totalAmount * 100),
  };
  const payBtn = useRef(null);
  const order: any = {
    shippingInfo: user?.billing_info,
    orderItems: query == "true" ? [singleProduct] : cartItems,
    itemsPrice: query == "true" ? singleProduct.price : formData.totalAmount,
    taxPrice: 20,
    shippingPrice: 20,
    totalPrice: query == "true" ? singleProduct.price : formData.totalAmount,
  };

  const onSubmit = async (data: any) => {
    const res: any = await ProcessPayment(paymentData);

    const client_secret = res?.data?.client_secret;

    if (!stripe || !elements) return;

    console.log("inside ");

    console.log("inside cardelee");

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: user?.name,
          email: user?.email,
          address: {
            line1: formData.address1,
            city: formData.city,
            state: formData.state,
            postal_code: formData?.zip,
            country: "IN",
          },
        },
      },
    });
    console.log("RESULT", result);
    console.log("NOT SUCCESS");
    if (result.error) {
      // payBtn.current.disabled = false;

      alert(result.error.message);
      console.log("NOT SUCCESS");
    } else {
      console.log("SUCCESS");

      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        CreateOrder(order)
          .then((res: any) => {
            console.log("ress", res);
            if (res.data?.success) {
              nav("/order-success");
              toast.open("Order created successfully", "success");
            } else {
              toast.open(res.error.data.message, "error");
            }

            if (query !== "true") RemoveCartItems("");
          })
          .catch((err) => {
            console.log(err?.message);
          });
      } else {
        alert("There's some issue while processing payment ");
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="flex justify-center">
        <form className="w-2/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <label htmlFor="name">Card Info</label>
            <CardElement className="paymentInput px-4 py-2 border border-gray-900" />
          </div>

          <div className="flex justify-end pt-4">
            <input
              type="submit"
              value={`Pay - ₹${formData && formData.totalAmount}`}
              ref={payBtn}
              className="paymentFormBtn bg-indigo-600 px-4 py-2 rounded-lg cursor-pointer text-white font-sans font-semibold hover:bg-indigo-400"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default BillingInfoForm;
