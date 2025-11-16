"use client";

import { useEffect, useState } from "react";
import { ToastPayload, subscribeToToast } from "./use-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToast((toast) => {
      setToasts((prev) => [...prev, toast]);
      const duration = toast.duration ?? 4000;
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, duration);
    });
    return unsubscribe;
  }, []);

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "rounded-md border px-4 py-3 shadow-lg transition-opacity",
            toast.variant === "destructive"
              ? "border-red-500/40 bg-red-500/10 text-red-100"
              : "border-white/10 bg-neutral-900/90 text-white"
          )}
        >
          {toast.title ? (
            <p className="text-sm font-medium">{toast.title}</p>
          ) : null}
          {toast.description ? (
            <p className="text-xs text-neutral-300">{toast.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
