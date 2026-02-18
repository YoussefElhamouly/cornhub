// components/ui/icon.tsx
import * as LucideIcons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
  size?: number;
  stroke?: string;
}

export default function Icon({ icon, size = 16, stroke, ...props }: IconProps) {
  const LucideIcon = (LucideIcons as any)[icon];

  if (!LucideIcon) {
    console.warn(`Icon "${icon}" not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      {...props}
      stroke={stroke || "var(--icon-primary)"}
    />
  );
}
