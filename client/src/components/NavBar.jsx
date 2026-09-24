// client/src/components/NavBar.jsx
//
// Base (unprefixed) classes target mobile first (Section 4.5).
// md: and lg: prefixes layer on enhancements for larger viewports —
// never the reverse.
import { NavLink } from "react-router-dom";
export function NavBar() {
    return (
        <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">✒️</span>
                <span className="font-bold text-lg">Inkwell</span>
            </div>
            <div className="flex gap-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-sm ${isActive ? "font-semibold text-indigo-600" : "text-gray-600"}`
                    }
                >
                    Feed
                </NavLink>
                <NavLink
                    to="/write"
                    className={({ isActive }) =>
                        `text-sm ${isActive ? "font-semibold text-indigo-600" : "text-gray-600"}`
                    }
                >
                    Write
                </NavLink>
            </div>
        </nav>
    );
}