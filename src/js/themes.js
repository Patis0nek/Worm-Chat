import React, { useState } from 'react';

import '../css/App.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkMode = () => {
    let clickedClass = "clicked";
    const body = document.body;
    const lightTheme = "light";
    const darkTheme = "dark";

    const [isActive, setIsActive] = useState(false);

    const handleClick = event => {
        setIsActive(current => !current);
    };
    let theme;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme);
    } else {
        body.classList.add(lightTheme);
    }

    const switchTheme = (e) => {
        if (theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "light");
            theme = lightTheme;
        } else {
            body.classList.replace(lightTheme, darkTheme);
            e.target.classList.add(clickedClass);
            localStorage.setItem("theme", "dark");
            theme = darkTheme;
        }
    };

    return (
        <span
            className={theme === "dark" ? clickedClass : ""}
            id="darkMode"
            onClick={(e) => switchTheme(e)}
        ><i onClick={handleClick} Class={isActive ? 'fas fa-moon' : 'fas fa-sun'}></i></span>
    );
};


export default DarkMode;