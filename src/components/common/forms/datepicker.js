import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField } from "@mui/material";
import { es } from "date-fns/locale";
import { useState } from "react";

export default function DatePicker({ label, name, setFieldValue }) {
  const [value, setValue] = useState(Date.now());

  const handleChange = (value) => {
    setValue(value)
    setFieldValue("edition_date", value);
  };

  return (
    <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} name={name} size="small" />
        )}
      />
    </LocalizationProvider>
  );
}
