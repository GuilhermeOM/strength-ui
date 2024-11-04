import type { UseFormRegisterReturn } from 'react-hook-form'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface FormInputProps {
  register: UseFormRegisterReturn<string>
  label?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>
  error?: string
}

export default function FormInput({ label, register, inputProps, error }: FormInputProps) {
  return (
    <Label className="flex flex-col gap-2">
      {label}
      <Input {...register} {...inputProps} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </Label>
  )
}
