import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const ThemeContext = createContext();

export const themes = {
  pink: {
    name: 'Pink Blush',
    light: {
      background: '#ffebd4',
      cardBackground: '#ffc6c6',
      primary: '#f0a8d0',
      secondary: '#f7b5ca',
      text: '#8b5a4a',
      mutedText: '#9d6c7a',
      hover: '#f7b5ca',
      selected: '#f0a8d0',
      selectedHover: '#e89bc4',
      todayBg: '#f7b5ca',
      todayHover: '#f0a8d0',
      border: '#f7b5ca',
      focusBorder: '#f0a8d0',
      inputBg: '#ffebd4',
      disabled: '#d1a3b3',
      prevMonth: '#c49aab'
    },
    dark: {
      background: '#2d1b20',
      cardBackground: '#3d2428',
      primary: '#f0a8d0',
      secondary: '#f7b5ca',
      text: '#f5e6ea',
      mutedText: '#d1bcc1',
      hover: '#4a2d32',
      selected: '#f0a8d0',
      selectedHover: '#e89bc4',
      todayBg: '#4a2d32',
      todayHover: '#f0a8d0',
      border: '#4a2d32',
      focusBorder: '#f0a8d0',
      inputBg: '#2d1b20',
      disabled: '#6b4d52',
      prevMonth: '#8b6d72'
    }
  },
  peach: {
    name: 'Warm Peach',
    light: {
      background: '#fff2eb',
      cardBackground: '#ffdcdc',
      primary: '#ffd6ba',
      secondary: '#ffe8cd',
      text: '#8b5a3c',
      mutedText: '#a0704f',
      hover: '#ffe8cd',
      selected: '#ffd6ba',
      selectedHover: '#ffcc99',
      todayBg: '#ffe8cd',
      todayHover: '#ffd6ba',
      border: '#ffe8cd',
      focusBorder: '#ffd6ba',
      inputBg: '#fff2eb',
      disabled: '#d4b5a0',
      prevMonth: '#b8926f'
    },
    dark: {
      background: '#2d1f17',
      cardBackground: '#3d2b1f',
      primary: '#ffd6ba',
      secondary: '#ffe8cd',
      text: '#f5e9e0',
      mutedText: '#d1c4b5',
      hover: '#4a3527',
      selected: '#ffd6ba',
      selectedHover: '#ffcc99',
      todayBg: '#4a3527',
      todayHover: '#ffd6ba',
      border: '#4a3527',
      focusBorder: '#ffd6ba',
      inputBg: '#2d1f17',
      disabled: '#6b4d3f',
      prevMonth: '#8b6d5f'
    }
  },
  green: {
    name: 'Nature Green',
    light: {
      background: '#d4d4aa',
      cardBackground: '#a8c8a8',
      primary: '#6b8e6b',
      secondary: '#b8d4b8',
      text: '#3d5a3d',
      mutedText: '#4a6a4a',
      hover: '#b8d4b8',
      selected: '#6b8e6b',
      selectedHover: '#5a7a5a',
      todayBg: '#b8d4b8',
      todayHover: '#6b8e6b',
      border: '#b8d4b8',
      focusBorder: '#6b8e6b',
      inputBg: '#d4d4aa',
      disabled: '#9ab89a',
      prevMonth: '#7a9a7a'
    },
    dark: {
      background: '#1a2e1a',
      cardBackground: '#243324',
      primary: '#90c090',
      secondary: '#b8d4b8',
      text: '#e0f0e0',
      mutedText: '#bcd8bc',
      hover: '#2d4a2d',
      selected: '#90c090',
      selectedHover: '#7aaa7a',
      todayBg: '#2d4a2d',
      todayHover: '#90c090',
      border: '#2d4a2d',
      focusBorder: '#90c090',
      inputBg: '#1a2e1a',
      disabled: '#4d6a4d',
      prevMonth: '#6d8a6d'
    }
  },
  autumn: {
    name: 'Autumn Warmth',
    light: {
      background: '#f0f0c8',
      cardBackground: '#e6d7a3',
      primary: '#a85a52',
      secondary: '#d49c87',
      text: '#5d3328',
      mutedText: '#7a4a3f',
      hover: '#d49c87',
      selected: '#a85a52',
      selectedHover: '#8b453e',
      todayBg: '#d49c87',
      todayHover: '#a85a52',
      border: '#d49c87',
      focusBorder: '#a85a52',
      inputBg: '#f0f0c8',
      disabled: '#c4a89a',
      prevMonth: '#9d7d6f'
    },
    dark: {
      background: '#2d1f15',
      cardBackground: '#3d2b1d',
      primary: '#d49c87',
      secondary: '#e6b8a3',
      text: '#f5e6d8',
      mutedText: '#d1bfb0',
      hover: '#4a3525',
      selected: '#d49c87',
      selectedHover: '#c48b76',
      todayBg: '#4a3525',
      todayHover: '#d49c87',
      border: '#4a3525',
      focusBorder: '#d49c87',
      inputBg: '#2d1f15',
      disabled: '#6b4d3d',
      prevMonth: '#8b6d5d'
    }
  },
  ocean: {
    name: 'Ocean Breeze',
    light: {
      background: '#e0f7fa',
      cardBackground: '#b2dfdb',
      primary: '#00796b',
      secondary: '#4db6ac',
      text: '#004d40',
      mutedText: '#00695c',
      hover: '#80cbc4',
      selected: '#00796b',
      selectedHover: '#00695c',
      todayBg: '#80cbc4',
      todayHover: '#4db6ac',
      border: '#80cbc4',
      focusBorder: '#00796b',
      inputBg: '#e0f7fa',
      disabled: '#a7c8cc',
      prevMonth: '#78a5a3'
    },
    dark: {
      background: '#0f2027',
      cardBackground: '#1a2f36',
      primary: '#4db6ac',
      secondary: '#80cbc4',
      text: '#e0f7fa',
      mutedText: '#b2dfdb',
      hover: '#253d44',
      selected: '#4db6ac',
      selectedHover: '#26a69a',
      todayBg: '#253d44',
      todayHover: '#4db6ac',
      border: '#253d44',
      focusBorder: '#4db6ac',
      inputBg: '#0f2027',
      disabled: '#4d6a64',
      prevMonth: '#6d8a84'
    }
  },
  sunset: {
    name: 'Sunset Dreams',
    light: {
      background: '#fff9e6',
      cardBackground: '#ffc1cc',
      primary: '#9c88ff',
      secondary: '#b8a9ff',
      text: '#4a4a4a',
      mutedText: '#666666',
      hover: '#ddd6fe',
      selected: '#9c88ff',
      selectedHover: '#8b5cf6',
      todayBg: '#ddd6fe',
      todayHover: '#c4b5fd',
      border: '#ddd6fe',
      focusBorder: '#9c88ff',
      inputBg: '#fff9e6',
      disabled: '#d1c4e9',
      prevMonth: '#a5a5a5'
    },
    dark: {
      background: '#1f1a2d',
      cardBackground: '#2d243d',
      primary: '#b8a9ff',
      secondary: '#ddd6fe',
      text: '#f5f0ff',
      mutedText: '#d1c4e9',
      hover: '#3d334a',
      selected: '#b8a9ff',
      selectedHover: '#9c88ff',
      todayBg: '#3d334a',
      todayHover: '#b8a9ff',
      border: '#3d334a',
      focusBorder: '#b8a9ff',
      inputBg: '#1f1a2d',
      disabled: '#4d445d',
      prevMonth: '#6d647d'
    }
  },
  cyan: {
    name: 'Cyan Tech',
    light: {
      background: '#f0fdff',
      cardBackground: '#e0f7fa',
      primary: '#00bcd4',
      secondary: '#4dd0e1',
      text: '#006064',
      mutedText: '#00838f',
      hover: '#b2ebf2',
      selected: '#00bcd4',
      selectedHover: '#00acc1',
      todayBg: '#b2ebf2',
      todayHover: '#4dd0e1',
      border: '#b2ebf2',
      focusBorder: '#00bcd4',
      inputBg: '#f0fdff',
      disabled: '#b0bec5',
      prevMonth: '#90a4ae'
    },
    dark: {
      background: '#0d1117',
      cardBackground: '#161b22',
      primary: '#00d4ff',
      secondary: '#4dd0e1',
      text: '#f0f6fc',
      mutedText: '#8b949e',
      hover: '#21262d',
      selected: '#00d4ff',
      selectedHover: '#00bcd4',
      todayBg: '#21262d',
      todayHover: '#00d4ff',
      border: '#21262d',
      focusBorder: '#00d4ff',
      inputBg: '#0d1117',
      disabled: '#484f58',
      prevMonth: '#656c76'
    }
  },
  default: {
    name: 'Classic Blue',
    light: {
      background: '#f9fafb',
      cardBackground: '#ffffff',
      primary: '#3b82f6',
      secondary: '#60a5fa',
      text: '#374151',
      mutedText: '#6b7280',
      hover: '#e0e7ff',
      selected: '#3b82f6',
      selectedHover: '#2563eb',
      todayBg: '#dbeafe',
      todayHover: '#bfdbfe',
      border: '#d1d5db',
      focusBorder: '#3b82f6',
      inputBg: '#ffffff',
      disabled: '#d1d5db',
      prevMonth: '#9ca3af'
    },
    dark: {
      background: '#111827',
      cardBackground: '#1f2937',
      primary: '#60a5fa',
      secondary: '#93c5fd',
      text: '#f9fafb',
      mutedText: '#d1d5db',
      hover: '#374151',
      selected: '#60a5fa',
      selectedHover: '#3b82f6',
      todayBg: '#374151',
      todayHover: '#60a5fa',
      border: '#374151',
      focusBorder: '#60a5fa',
      inputBg: '#111827',
      disabled: '#6b7280',
      prevMonth: '#9ca3af'
    }
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('green');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session } = useSession();

  // Check if we're in database mode
  const isDbMode = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' || 
    process.env.APP_MODE === 'database';

  // Load theme preferences on mount
  useEffect(() => {
    const loadTheme = async () => {
      if (session && isDbMode) {
        // Load from database for authenticated users in database mode
        try {
          const response = await fetch('/api/user/preferences');
          if (response.ok) {
            const { theme, darkMode } = await response.json();
            setCurrentTheme(theme || 'green');
            setIsDarkMode(darkMode || false);
          }
        } catch (error) {
          console.error('Error loading theme preferences:', error);
          // Fallback to localStorage
          loadFromLocalStorage();
        }
      } else {
        // Load from localStorage for local mode or unauthenticated users
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
      const savedTheme = localStorage.getItem('timePortalTheme');
      const savedMode = localStorage.getItem('timePortalDarkMode');
      
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
      
      if (savedMode !== null) {
        setIsDarkMode(savedMode === 'true');
      }
    };

    loadTheme();
  }, [session, isDbMode]);

  // Save theme preferences when they change
  useEffect(() => {
    const saveTheme = async () => {
      if (session && isDbMode) {
        // Save to database for authenticated users in database mode
        try {
          await fetch('/api/user/preferences', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              theme: currentTheme,
              darkMode: isDarkMode,
            }),
          });
        } catch (error) {
          console.error('Error saving theme preferences:', error);
        }
      } else {
        // Save to localStorage for local mode or unauthenticated users
        localStorage.setItem('timePortalTheme', currentTheme);
        localStorage.setItem('timePortalDarkMode', isDarkMode.toString());
      }
    };

    // Apply CSS variables to root
    const root = document.documentElement;
    const theme = themes[currentTheme];
    const colors = isDarkMode ? theme.dark : theme.light;
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Save preferences (skip on initial load)
    if (currentTheme !== 'green' || isDarkMode !== false) {
      saveTheme();
    }
  }, [currentTheme, isDarkMode, session, isDbMode]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      isDarkMode,
      theme: themes[currentTheme],
      currentColors: isDarkMode ? themes[currentTheme].dark : themes[currentTheme].light,
      changeTheme,
      toggleDarkMode,
      availableThemes: Object.keys(themes)
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
