import { useTheme, themes } from '../contexts/ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, isDarkMode, changeTheme, toggleDarkMode } = useTheme();

  return (
    <div className="theme-selector">
      <h3 className="theme-selector-title">Choose Theme</h3>
      
      {/* Dark/Light Mode Toggle */}
      <div className="mode-toggle-container">
        <span className="mode-label">Light</span>
        <button 
          className={`mode-toggle ${isDarkMode ? 'mode-toggle-dark' : 'mode-toggle-light'}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <div className="mode-toggle-slider">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </button>
        <span className="mode-label">Dark</span>
      </div>

      {/* Theme Options */}
      <div className="theme-options">
        {Object.entries(themes).map(([key, theme]) => {
          const colors = isDarkMode ? theme.dark : theme.light;
          return (
            <button
              key={key}
              onClick={() => changeTheme(key)}
              className={`theme-option ${currentTheme === key ? 'theme-option-active' : ''}`}
              title={`${theme.name} - ${isDarkMode ? 'Dark' : 'Light'} Mode`}
            >
              <div className="theme-preview">
                <div 
                  className="theme-color-swatch"
                  style={{ backgroundColor: colors.background }}
                />
                <div 
                  className="theme-color-swatch"
                  style={{ backgroundColor: colors.cardBackground }}
                />
                <div 
                  className="theme-color-swatch"
                  style={{ backgroundColor: colors.primary }}
                />
                <div 
                  className="theme-color-swatch"
                  style={{ backgroundColor: colors.secondary }}
                />
              </div>
              <span className="theme-name">{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
