// components/Text.tsx
import { Text as RNText, TextProps } from "react-native";

type Weight = "Regular" | "Medium" | "SemiBold" | "Bold";

interface Props extends TextProps {
  weight?: Weight;
}

export function Text({ weight = "Regular", style, ...props }: Props) {
  const fontFamily = `Geist-${weight}`;
  return <RNText {...props} style={[{ fontFamily }, style]} />;
}
