"use client"; 
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CustomizedSnackBar from "@/components/common/snackbar";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children} <CustomizedSnackBar /></Provider>;
}
