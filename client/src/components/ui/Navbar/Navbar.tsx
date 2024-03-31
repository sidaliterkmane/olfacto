import { Link } from "react-router-dom"
import { IconPerfume } from '@tabler/icons-react';

import "./Navbar.css"

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="absolute z-10 w-full h-[60px] flex justify-center">
      <div className="w-[1250px] flex items-center p-5 justify-between">
        <Link to="/" className="font-bold text-xl flex gap-1 dark:text-neutral-50">olfacto.</Link>
        <div className="toggle-switch">
          <label className="switch-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode} // This toggles dark mode
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </nav>
  )
}

export default Navbar