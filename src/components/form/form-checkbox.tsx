/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from 'react-hook-form'

import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

interface FormCheckboxProps {
  name: string
  control: Control<any, any>
  label?: string
  defaultValue?: boolean
}

export default function FormCheckbox({ name, control, label, defaultValue = false }: FormCheckboxProps) {
  return (
    <Label className="flex items-center gap-2">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => <Checkbox onCheckedChange={onChange} defaultChecked={defaultValue} />}
      />
      {label}
    </Label>
  )
}
