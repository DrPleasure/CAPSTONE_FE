import { useState } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  };

  return [darkMode, handleDarkModeToggle];
};
