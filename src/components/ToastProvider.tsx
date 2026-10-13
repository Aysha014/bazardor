
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <div data-rht-toaster="true">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            border: "1px solid #E0E9E1",
            background: "#FAFCFA",
            color: "#24352A",
            fontSize: "13px",
          },
          success: {
            iconTheme: {
              primary: "#078B43",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#DC2626",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </div>
  );
}
