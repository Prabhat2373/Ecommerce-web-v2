import { useToast } from '../features/Toast/ToastContext';

export const GetRatings = (num: number): number[] => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push(i);
  }
  return res;
};

export const PushToast = (message: any) => {
  const toast = useToast();
  return toast.open(message);
};
