import { FormEventHandler } from 'react';

export interface IUseFormParams {
  onSubmit?: () => void;
  validator?: () => boolean;
}

export interface IUseForm {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useForm(params: IUseFormParams): IUseForm {
  const { onSubmit = () => {}, validator = () => true } = params;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (validator()) {
      onSubmit();
    }
  };

  return {
    onSubmit: handleSubmit,
  };
}
