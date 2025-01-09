import { useState } from 'react';
import type { UserSettings } from '../types';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      desktop: true,
    },
    display: {
      density: 'comfortable',
      fontSize: 'medium',
    },
  });

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    // TODO: Add API call to save settings
  };

  return {
    settings,
    updateSettings,
  };
}
