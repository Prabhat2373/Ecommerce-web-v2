import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormDataType,
  useOrderFormContext,
} from "../../../Contexts/formContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useAddBillingDetailsMutation } from "../../../features/services/RTK/Api";
import { useToast } from "../../../features/Toast/ToastContext";
const ShippingDetails = ({
  formStep,
  nextFormStep,
}: {
  formStep: number;
  nextFormStep: () => void;
}) => {
  const { formData, setFormData } = useOrderFormContext();
  const user: any = useSelector((state: RootState) => state.user.payload);
  console.log("user", user);
  const toast = useToast();
  const [AddBilling] = useAddBillingDetailsMutation();
  const initialValues: FormDataType = {
    first_name: user?.name,
    last_name: user?.last_name ?? "",
    email: user?.email,
    address1: user?.billing_info?.billing_address_line1,
    address2: user?.billing_info?.billing_address_line2,
    city: user?.billing_info?.billing_city,
    state: user?.billing_info?.billing_state,
    country: user?.billing_info?.billing_country,
    zip: user?.billing_info?.billing_zip,
    phone: user?.billing_info?.billing_phone,
    totalAmount: 0,
  };
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, []);
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });
  const onSubmit = (data: any) => {
    setFormData(data);
    console.log("dataaaaa", data["first_name"]);
    const formData = new FormData();
    Object.keys(data).forEach((el) => {
      formData.append(el, data[el]);
      console.log("elll", el);
    });

    AddBilling({
      payload: formData,
      id: user._id,
    }).then((res: any) => {
      console.log("RESPONSE", res);
      if (res.data?.message) {
        nextFormStep();
      } else {
        toast.open(res.data?.message, "error");
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <label className="block mb-6">
            <span className="text-gray-700">Your name</span>
            <input
              type="text"
              {...register("first_name")}
              className="block w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder="Joe Bloggs"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Your Email</span>
            <input
              type="email"
              {...register("email")}
              className="block w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder="example@gmail.com"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Address line 1</span>
            <input
              {...register("address1")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Address line 2</span>
            <input
              {...register("address2")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">City</span>
            <input
              {...register("city")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">State/Province</span>
            <input
              {...register("state")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Zip/Postal code</span>
            <input
              {...register("zip")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Country</span>
            <input
              {...register("country")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Telephone</span>
            <input
              {...register("phone")}
              type="text"
              className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder=""
            />
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 rounded-lg text-white"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShippingDetails;
