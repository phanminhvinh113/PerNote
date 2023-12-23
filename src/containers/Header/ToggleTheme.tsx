import { useColorScheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
function ToggleThemeMode() {
  const { mode, setMode } = useColorScheme();

  const handleSelect = (e: SelectChangeEvent<"light" | "dark" | "system">) => {
    setMode(e.target.value as "light" | "dark" | "system" | null);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{mode}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={mode}
        label={mode}
        onChange={(e) => handleSelect(e)}
      >
        <MenuItem value="light">
          <LightModeIcon sx={{ marginRight: 1.5 }} fontSize="small" />
          Light
        </MenuItem>
        <MenuItem value="dark">
          <DarkModeIcon sx={{ marginRight: 1.5 }} fontSize="small" />
          Dark
        </MenuItem>
        <MenuItem value="system">
          <SettingsBrightnessOutlinedIcon sx={{ marginRight: 1.5 }} fontSize="small" />
          System
        </MenuItem>
      </Select>
    </FormControl>
  );
}
export default ToggleThemeMode;
