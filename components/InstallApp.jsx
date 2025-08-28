"use client";

import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const isSupportedPlatform = /android|windows|macintosh/i.test(
      navigator.userAgent
    );

    const isAlreadyInstalled = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      if (isSupportedPlatform && !isAlreadyInstalled) {
        setDeferredPrompt(e);
        setShowInstallButton(true);
      }
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
    };

    if (!isAlreadyInstalled) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.addEventListener("appinstalled", handleAppInstalled);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setDeferredPrompt(null);
          setShowInstallButton(false);
        }
      } catch (error) {
        console.error("Error during app installation:", error);
      }
    }
  };

  if (!showInstallButton) return null;

  return (
    <center>
      <Button
        variant="outlined"
        onClick={handleInstall}
        color="warning"
        size="small"
      >
        Download App
      </Button>
    </center>
  );
};

export default InstallApp;
