import { ReactNode, createContext, useState, useContext } from "react";

export interface FormDataType {
  first_name: string;
  last_name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  totalAmount: number;
}
export interface AddressType {
  userName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  telephone: string;
  delivery: string;
}
interface FormContextProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setOrderItems: React.Dispatch<React.SetStateAction<any>>;
  orderItems: any;
}
export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

export const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orderItems, setOrderItems] = useState<any>({});
  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    phone: "",
    totalAmount: 0,
  });
  const [step, setStep] = useState(0);
  const value: FormContextProps = {
    formData,
    setFormData,
    setStep,
    step,
    orderItems,
    setOrderItems,
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useOrderFormContext = () => {
  return useContext(FormContext);
};
