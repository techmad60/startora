// components/TextInput.tsx
import { TextInput as RNTextInput, TextInputProps } from "react-native";

type Weight = "Regular" | "Medium" | "SemiBold" | "Bold";

interface Props extends TextInputProps {
  weight?: Weight;
}

export function TextInput({ weight = "Regular", style, ...props }: Props) {
  const fontFamily = `Geist-${weight}`;
  return <RNTextInput {...props} style={[{ fontFamily }, style]} />;
}
