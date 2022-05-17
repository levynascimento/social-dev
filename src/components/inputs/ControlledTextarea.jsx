import { useController } from "react-hook-form"

import Textarea1 from './Textarea1'

const ControlledTextarea = ({ name, control, defaultValue = '',...props }) => {
  const {
    field: { value, onChange }
  } = useController({ name, control, defaultValue })
  return (
    <Textarea1 {...props} value = {value} onChange = {onChange} />
  )
}

export default ControlledTextarea

