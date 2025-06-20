import * as React from "react";
import { Info, FileText, CheckCircle } from "lucide-react";
import type { Page } from "@workspace/page-navigation";

export const iconMap = {
  info: <Info className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  check: <CheckCircle className="w-4 h-4" />,
};

export const initialPages: Page[] = [
  { id: "1", name: "Info", icon: iconMap.info, isActive: true },
  { id: "2", name: "Details", icon: iconMap.document },
  { id: "3", name: "Other", icon: iconMap.document },
  { id: "4", name: "Ending", icon: iconMap.check },
];
