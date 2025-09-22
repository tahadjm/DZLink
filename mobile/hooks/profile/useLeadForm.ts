import { LeadFormSchema, leadFormValidator } from "@/libs/helpers/leadFormValidator";
import { useForm } from "react-hook-form";

export function useLeadForm() {
  const { control, handleSubmit, reset } = useForm<LeadFormSchema>({
    defaultValues: {
      offerId: "",
      name: "",
      email: "",
      message: "",
    },
    resolver: leadFormValidator,
    mode: "onChange",
  });

  return {
    control,
    handleSubmit,
    reset,
  };
}
