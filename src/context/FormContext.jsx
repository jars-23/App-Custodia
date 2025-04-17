import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event, callback) => {
    event.preventDefault();
    setLoading(true);
    await callback();
    setLoading(false);
  };

  return (
    <FormContext.Provider value={{ loading, handleSubmit }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
