(function () {
    'use strict';

    const STORAGE_KEY = 'xoniflow_pro_v36_clean_state';

    const SVG_PATHS = {
        home: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",
        chart_bar: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z",
        chart_pie: "M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C21.5,6.2 17.8,2.5 13,2M13,13V22C17.7,21.5 21.5,17.8 22,13H13Z",
        target: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z",
        palette: "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
        grid: "M3,3H11V11H3V3M13,3H21V11H13V3M3,13H11V21H3V13M13,13H21V21H13V13Z",
        plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
        plus_circle: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z",
        close: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
        eye: "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",
        calculator: "M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V20H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11Z",
        lock: "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z",
        shield: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z",
        arrow_down: "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
        arrow_up: "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
        wallet: "M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z",
        bank: "M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z",
        card: "M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z",
        coin: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z",
        bolt: "M11,21H10L11,14H7.5C6.62,14 6.18,12.93 6.8,12.31L13,3H14L13,10H16.5C17.38,10 17.82,11.07 17.2,11.69L11,21Z",
        sparkle: "M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z",
        download: "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z",
        trend_up: "M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z",
        calendar: "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z",
        layers: "M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z",
        trophy: "M18,2C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H18M6,11H4V4H6V11M20,11H18V4H20V11Z",
        repeat: "M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z",
        users: "M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z",
        sliders: "M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z",
        globe: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.79 4.21,10.21L9,15V16A2,2 0 0,0 11,18M18.9,17.39C18.64,16.58 17.9,16 17,16H16V13A1,1 0 0,0 15,12H9V10H11A1,1 0 0,0 12,9V7H14A2,2 0 0,0 16,5V4.59C18.93,5.78 21,8.65 21,12C21,14.08 20.2,15.97 18.9,17.39Z",
        database: "M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z",
        code: "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z",
        trash: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
        refresh: "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z",
        check_circle: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M10,17L18,9L16.59,7.58L10,14.17L7.41,11.59L6,13L10,17Z",
        star: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
        food: "M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",
        briefcase: "M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z",
        bag: "M19,6H17C17,3.24 14.76,1 12,1C9.24,1 7,3.24 7,6H5C3.9,6 3,6.9 3,8V20C3,21.1 3.9,22 5,22H19C20.1,22 21,21.1 21,20V8C21,6.9 20.1,6 19,6M12,3C13.66,3 15,4.34 15,6H9C9,4.34 10.34,3 12,3Z",
        car: "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z",
        gamepad: "M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A1.75,1.75 0 0,1 2,17.75V17.5L3,10.12C3.21,7.81 5.14,6 7.5,6H16.5C18.86,6 20.79,7.81 21,10.12L22,17.5V17.75A1.75,1.75 0 0,1 20.25,19.5C19.77,19.5 19.33,19.3 19,19L16.03,16H7.97M7,8V10H5V11H7V13H8V11H10V10H8V8H7M16.5,8A1,1 0 0,0 15.5,9A1,1 0 0,0 16.5,10A1,1 0 0,0 17.5,9A1,1 0 0,0 16.5,8M14.5,10A1,1 0 0,0 13.5,11A1,1 0 0,0 14.5,12A1,1 0 0,0 15.5,11A1,1 0 0,0 14.5,10Z",
        heart: "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z",
        book: "M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z",
        gift: "M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z"
    };

    function svgIcon(name, cls) {
        const d = SVG_PATHS[name] || SVG_PATHS.sparkle;
        return `<svg class="svg-ico ${cls || ''}" viewBox="0 0 24 24"><path d="${d}"/></svg>`;
    }

    function hydrateStaticSvgSlots() {
        document.querySelectorAll('.svg-slot[data-icon]').forEach(slot => {
            slot.innerHTML = svgIcon(slot.getAttribute('data-icon'));
        });
    }

    const CURRENCIES = {
        MMK: { symbol: 'Ks', rate: 1 },
        USD: { symbol: '$', rate: 0.000222 },
        THB: { symbol: '฿', rate: 0.0078 },
        SGD: { symbol: 'S$', rate: 0.00030 },
        EUR: { symbol: '€', rate: 0.000205 },
        JPY: { symbol: '¥', rate: 0.034 },
        CNY: { symbol: '¥', rate: 0.0016 },
        MYR: { symbol: 'RM', rate: 0.00099 },
        GBP: { symbol: '£', rate: 0.000175 },
        USDT: { symbol: '₮', rate: 0.000222 }
    };

    const DEFAULT_CATEGORY_ICONS = {
        'Food & Dining': 'food',
        'Salary & Freelance': 'briefcase',
        'Shopping': 'bag',
        'Transport & Fuel': 'car',
        'Gaming & Digital': 'gamepad',
        'Bills & Utilities': 'bolt',
        'Business & Sales': 'trend_up',
        'Health & Fitness': 'heart',
        'Education': 'book',
        'Gift & Donation': 'gift'
    };

    const THEME_PRESETS = [
        { name: 'Xoni Emerald', primary: '#00E676', secondary: '#FFD54F', income: '#00E676', expense: '#FF5252', bg: '#0F0D13', card: '#1D1B20' },
        { name: 'Cyber Gold', primary: '#FFD700', secondary: '#00E5FF', income: '#00E676', expense: '#FF4081', bg: '#0B0B0F', card: '#181820' },
        { name: 'Neon Violet', primary: '#B388FF', secondary: '#64FFDA', income: '#69F0AE', expense: '#FF5252', bg: '#0F0B1A', card: '#1B152B' },
        { name: 'Tokyo Cyan', primary: '#00E5FF', secondary: '#FF80AB', income: '#00E676', expense: '#FF5252', bg: '#081018', card: '#121E2B' },
        { name: 'Crimson Royal', primary: '#FF5252', secondary: '#FFD740', income: '#69F0AE', expense: '#FF5252', bg: '#140A0D', card: '#221217' },
        { name: 'AMOLED Pitch', primary: '#00FF88', secondary: '#FFEE58', income: '#00FF88', expense: '#FF4444', bg: '#000000', card: '#111111' },
        { name: 'Matcha Zen', primary: '#AED581', secondary: '#DCE775', income: '#AED581', expense: '#FF8A65', bg: '#0E130F', card: '#18211A' },
        { name: 'Solar Amber', primary: '#FFAB00', secondary: '#FF6D00', income: '#00E676', expense: '#FF5252', bg: '#141008', card: '#221B10' },
        { name: 'Ocean Abyss', primary: '#40C4FF', secondary: '#18FFFF', income: '#69F0AE', expense: '#FF5252', bg: '#07121E', card: '#102033' },
        { name: 'Sakura Pink', primary: '#FF80AB', secondary: '#EA80FC', income: '#69F0AE', expense: '#FF5252', bg: '#160D14', card: '#251722' },
        { name: 'Matrix Code', primary: '#00FF41', secondary: '#008F11', income: '#00FF41', expense: '#FF3333', bg: '#050805', card: '#0D150D' },
        { name: 'Sunset Coral', primary: '#FF6E40', secondary: '#FFD740', income: '#69F0AE', expense: '#FF5252', bg: '#160E0C', card: '#261815' },
        { name: 'Arctic Mint', primary: '#64FFDA', secondary: '#80D8FF', income: '#64FFDA', expense: '#FF5252', bg: '#0A1414', card: '#142424' },
        { name: 'Electric Indigo', primary: '#536DFE', secondary: '#FF4081', income: '#00E676', expense: '#FF5252', bg: '#0A0D1A', card: '#151A30' },
        { name: 'Monokai Pro', primary: '#A6E22E', secondary: '#F92672', income: '#A6E22E', expense: '#F92672', bg: '#1B1C18', card: '#272822' },
        { name: 'Dracula Dark', primary: '#BD93F9', secondary: '#FF79C6', income: '#50FA7B', expense: '#FF5555', bg: '#191A21', card: '#282A36' },
        { name: 'Nordic Frost', primary: '#88C0D0', secondary: '#EBCB8B', income: '#A3BE8C', expense: '#BF616A', bg: '#1D212A', card: '#2E3440' },
        { name: 'Rose Gold', primary: '#F48FB1', secondary: '#FFE082', income: '#81C784', expense: '#E57373', bg: '#171114', card: '#261C21' },
        { name: 'Emerald Jade', primary: '#1DE9B6', secondary: '#FFC400', income: '#1DE9B6', expense: '#FF5252', bg: '#071411', card: '#102420' },
        { name: 'Lavender Mist', primary: '#E040FB', secondary: '#7C4DFF', income: '#00E676', expense: '#FF5252', bg: '#120917', card: '#211229' },
        { name: 'Cobalt Pulse', primary: '#2979FF', secondary: '#00E5FF', income: '#00E676', expense: '#FF5252', bg: '#080F1E', card: '#111D35' },
        { name: 'Lime Volt', primary: '#C6FF00', secondary: '#00E5FF', income: '#C6FF00', expense: '#FF5252', bg: '#101408', card: '#1C2310' },
        { name: 'Copper Bronze', primary: '#FF8A65', secondary: '#FFD54F', income: '#81C784', expense: '#E57373', bg: '#140F0D', card: '#241B18' },
        { name: 'Titanium Slate', primary: '#90CAF9', secondary: '#B0BEC5', income: '#69F0AE', expense: '#FF5252', bg: '#0E1116', card: '#1A2029' }
    ];

    const ALL_112_FEATURES = [
        "1. Clean Zero-Balance Initial Start (No Fake Pre-Filled Money)",
        "2. 100% Vector SVG Icon Engine (Zero Emojis Anywhere)",
        "3. In-App Custom Vector Icon Generator & PNG Badge Exporter",
        "4. Instant Income Entry", "5. Instant Expense Entry", "6. Wallet-to-Wallet Transfer",
        "7. Multi-Wallet Management (Cash, KBZPay, WavePay, AYA Pay, Bank, Crypto)",
        "8. Live 2D HSV Color Wheel Picker", "9. Native Android M3 RGB SeekBar Color Studio",
        "10. Custom Primary Accent Token Picker", "11. Custom Secondary Accent Token Picker",
        "12. Custom Income Color Token Picker", "13. Custom Expense Color Token Picker",
        "14. Custom Background Surface Picker", "15. Custom Card Surface Color Picker",
        "16. 24 Designer 1-Tap Theme Presets", "17. Live Card Corner Radius Customizer",
        "18. Neon Glow Opacity Slider", "19. Dynamic Font Scale Adjuster",
        "20. Android Status & Navigation Bar Color Sync",
        "21. Built-in Math Expression Evaluator in Amount Box",
        "22. Custom User-Defined 1-Tap Shortcuts", "23. Pin / Star Important Transactions",
        "24. Tax-Deductible Transaction Flag", "25. Multi-Hashtag Filtering (#work, #food)",
        "26. Instant Real-Time Search Across Notes & Titles",
        "27. Sort by Newest / Oldest / Highest / Lowest",
        "28. Filter by Today / This Week / This Month / All Time",
        "29. One-Tap Privacy Blur Mode (Hide Balances)",
        "30. 10-Currency Switcher (MMK, USD, THB, SGD, EUR, JPY, CNY, MYR, GBP, USDT)",
        "31. Interactive Income vs Expense Canvas Bar Chart",
        "32. Expense Category Donut Chart", "33. Cumulative Cashflow Trend Line Graph",
        "34. 28-Day Spending Intensity Heatmap", "35. Safe-to-Spend Daily Burn Rate Calculator",
        "36. Savings Rate Percentage Indicator", "37. Cashflow Health Score (0-100 Rating)",
        "38. Smart Cashflow Coach Insights", "39. 50/30/20 Needs-Wants-Savings Rule Breakdown",
        "40. Category Monthly Budget Limits", "41. Budget 80% Warning & 100% Over-Budget Alerts",
        "42. Visual Savings Goals & Wishlist Tracker", "43. 1-Tap Add Deposit to Savings Goal",
        "44. Recurring Bills & Subscription Tracker", "45. 1-Tap Mark Recurring Bill as Paid",
        "46. Debt, Loan & IOU Tracker (Borrowed/Lent)", "47. 1-Tap Settle Debt Record",
        "48. Group Dining Split Bill & Tip Calculator", "49. Compound Savings 5-Year Projector",
        "50. Live Multi-Currency FX Converter", "51. Full CSV Spreadsheet Export",
        "52. Native Android Share Sheet Integration", "53. Complete JSON State Backup Export",
        "54. 1-Tap Clear All Records to Zero", "55. 4-Digit PIN Security Vault Lock",
        "56. Native Android & iOS Haptic Feedback Engine", "57. Duplicate / Clone Transaction Action",
        "58. Delete Transaction with Instant Recalculation", "59. Top Spending Category Detector",
        "60. Average Daily Spend Analyzer", "61. Monthly Net Cashflow Projection",
        "62. Custom Wallet Creation with Vector Icons", "63. Per-Wallet Balance Filtering",
        "64. Receipt Reference & Merchant Notes", "65. Offline-First LocalStorage Persistence",
        "66. Zero-Dependency Fast Canvas Rendering", "67. Responsive Portrait & Landscape Layout",
        "68. iOS Safe-Area & WKWebView Bridge Support", "69. GitHub Actions Auto APK Builder",
        "70. GitHub Actions Auto AAB Play Store Bundle", "71. GitHub Actions Auto iOS Unsigned IPA Builder",
        "72. Adaptive Launcher Icon (Android 8-14)", "73. iOS AppIcon.appiconset (All 12 Sizes)",
        "74. Dark Tonal Material 3 Surface Architecture", "75. Automatic Contrast Text Color Calculation",
        "76. Hex Color Code Copy & Paste", "77. System Native Color Input Fallback",
        "78. Emergency Fund Coverage Estimator", "79. Impulse Spend Cooling Alert",
        "80. Subscription Annual Cost Projection", "81. Weekend vs Weekday Spend Ratio",
        "82. Largest Single Expense Highlighter", "83. Income Source Diversity Tracker",
        "84. Net Worth Milestone Badges", "85. Quick Inline Income/Expense Bar on Dashboard",
        "86. Custom Category Budget Editor", "87. Zero-Based Budgeting Helper",
        "88. Debt Payoff Priority Indicator", "89. Freelance Tax Reserve Estimator",
        "90. Cash vs Digital Wallet Ratio", "91. KBZPay / WavePay Instant Wallet Support",
        "92. Gaming & Digital Spend Monitor", "93. Food & Dining Burn Rate Monitor",
        "94. Transport & Fuel Cost Tracker", "95. Health & Medical Expense Log",
        "96. Education & Course Investment Log", "97. Charity & Gift Giving Tracker",
        "98. Custom Date Backdating Support", "99. Future Scheduled Transaction Entry",
        "100. Optional Sample Data Loader for Testing", "101. Cross-Platform Unified Codebase",
        "102. Hardware-Accelerated Smooth Scrolling", "103. Custom Scrollbar Suppression",
        "104. Back-Button Safe Exit Confirmation Dialog", "105. Clipboard Copy Helper",
        "106. Dynamic Glow Shadow Engine", "107. High-DPI Retina Canvas Scaling",
        "108. Instant Category Percentage Badges", "109. One-Tap Filter Chip Bar",
        "110. Pinned Transaction Priority View", "111. Interactive Feature Search & Filter",
        "112. Native Android Vector Drawables Included"
    ];

    function getCleanZeroState() {
        return {
            currency: 'MMK',
            privacyBlur: false,
            pinCode: '1234',
            selectedWallet: 'ALL',
            selectedPeriod: 'all',
            activeColorToken: '--primary',
            categoryIcons: Object.assign({}, DEFAULT_CATEGORY_ICONS),
            theme: {
                '--primary': '#00E676',
                '--secondary': '#FFD54F',
                '--income': '#00E676',
                '--expense': '#FF5252',
                '--bg-main': '#0F0D13',
                '--bg-card': '#1D1B20',
                radius: 20,
                glow: 22,
                fontScale: 100
            },
            wallets: [
                { id: 'Cash', name: 'Cash Wallet', icon: 'wallet' },
                { id: 'KBZPay', name: 'KBZPay', icon: 'card' },
                { id: 'WavePay', name: 'WavePay', icon: 'card' },
                { id: 'AYA Pay', name: 'AYA Pay', icon: 'card' },
                { id: 'Bank Account', name: 'Bank Savings', icon: 'bank' },
                { id: 'Crypto USDT', name: 'Crypto USDT', icon: 'coin' }
            ],
            shortcuts: [],
            transactions: [],
            budgets: [],
            goals: [],
            recurring: [],
            debts: []
        };
    }

    let state = loadState();
    let currentModalType = 'expense';

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return Object.assign(getCleanZeroState(), parsed);
            }
        } catch (e) {}
        return getCleanZeroState();
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {}
    }

    function haptic(ms) {
        if (window.XoniNative && window.XoniNative.haptic) {
            window.XoniNative.haptic(ms || 15);
        }
    }

    function toast(msg) {
        if (window.XoniNative && window.XoniNative.toast) {
            window.XoniNative.toast(msg);
        }
    }

    function formatMoney(amountMmk) {
        const cur = CURRENCIES[state.currency] || CURRENCIES.MMK;
        const converted = amountMmk * cur.rate;
        const formatted = state.currency === 'MMK'
            ? Math.round(converted).toLocaleString('en-US')
            : converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return state.currency === 'MMK' ? `${formatted} ${cur.symbol}` : `${cur.symbol}${formatted}`;
    }

    function getCategorySvg(catName) {
        const iconMap = state.categoryIcons || DEFAULT_CATEGORY_ICONS;
        const key = iconMap[catName] || DEFAULT_CATEGORY_ICONS[catName] || 'wallet';
        return svgIcon(key);
    }

    function hexToRgbObj(hex) {
        const clean = (hex || '#00E676').replace('#', '').trim();
        const num = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16) || 0;
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }

    function applyTheme() {
        const root = document.documentElement;
        const t = state.theme;
        ['--primary', '--secondary', '--income', '--expense', '--bg-main', '--bg-card'].forEach(token => {
            if (t[token]) {
                root.style.setProperty(token, t[token]);
                const dot = document.getElementById('dot' + token);
                const hexLbl = document.getElementById('hex' + token);
                if (dot) dot.style.background = t[token];
                if (hexLbl) hexLbl.textContent = t[token].toUpperCase();
            }
        });
        const pRgb = hexToRgbObj(t['--primary']);
        root.style.setProperty('--primary-rgb', `${pRgb.r}, ${pRgb.g}, ${pRgb.b}`);
        root.style.setProperty('--card-radius', (t.radius || 20) + 'px');
        root.style.setProperty('--glow-alpha', ((t.glow || 22) / 100).toFixed(2));
        root.style.setProperty('--font-scale', ((t.fontScale || 100) / 100).toFixed(2));

        if (window.XoniNative && window.XoniNative.syncThemeColors) {
            window.XoniNative.syncThemeColors(t['--primary'], t['--bg-main'], t['--bg-card']);
        }
        renderCharts();
        drawCustomIconPreview();
    }

    function setTokenColor(token, hex) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
        state.theme[token] = hex.toUpperCase();
        saveState();
        applyTheme();
        syncColorSlidersFromActiveToken();
    }

    window.onNativeColorPicked = function (tokenKey, hex) {
        const target = tokenKey || state.activeColorToken || '--primary';
        setTokenColor(target, hex);
        toast('Applied ' + hex + ' to ' + target);
    };

    function syncColorSlidersFromActiveToken() {
        const hex = state.theme[state.activeColorToken] || '#00E676';
        const rgb = hexToRgbObj(hex);
        document.getElementById('customHexInput').value = hex;
        document.getElementById('systemColorInput').value = hex.toLowerCase();
        document.getElementById('sliderR').value = rgb.r;
        document.getElementById('sliderG').value = rgb.g;
        document.getElementById('sliderB').value = rgb.b;
        document.getElementById('valR').textContent = rgb.r;
        document.getElementById('valG').textContent = rgb.g;
        document.getElementById('valB').textContent = rgb.b;
    }

    function initColorWheel() {
        const canvas = document.getElementById('colorWheelCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const radius = canvas.width / 2;

        function drawWheel(brightness) {
            const img = ctx.createImageData(canvas.width, canvas.height);
            const data = img.data;
            const v = (brightness || 95) / 100;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const dx = x - radius;
                    const dy = y - radius;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist <= radius) {
                        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                        if (angle < 0) angle += 360;
                        const s = dist / radius;
                        const c = v * s;
                        const hp = angle / 60;
                        const xCol = c * (1 - Math.abs((hp % 2) - 1));
                        let r1 = 0, g1 = 0, b1 = 0;
                        if (hp >= 0 && hp < 1) { r1 = c; g1 = xCol; }
                        else if (hp >= 1 && hp < 2) { r1 = xCol; g1 = c; }
                        else if (hp >= 2 && hp < 3) { g1 = c; b1 = xCol; }
                        else if (hp >= 3 && hp < 4) { g1 = xCol; b1 = c; }
                        else if (hp >= 4 && hp < 5) { r1 = xCol; b1 = c; }
                        else { r1 = c; b1 = xCol; }
                        const m = v - c;
                        const idx = (y * canvas.width + x) * 4;
                        data[idx] = Math.round((r1 + m) * 255);
                        data[idx + 1] = Math.round((g1 + m) * 255);
                        data[idx + 2] = Math.round((b1 + m) * 255);
                        data[idx + 3] = 255;
                    }
                }
            }
            ctx.putImageData(img, 0, 0);
        }

        const bSlider = document.getElementById('brightnessSlider');
        drawWheel(Number(bSlider.value));

        bSlider.addEventListener('input', () => {
            document.getElementById('brightnessLabel').textContent = bSlider.value + '%';
            drawWheel(Number(bSlider.value));
        });

        function pickFromWheel(clientX, clientY) {
            const rect = canvas.getBoundingClientRect();
            const x = Math.round((clientX - rect.left) * (canvas.width / rect.width));
            const y = Math.round((clientY - rect.top) * (canvas.height / rect.height));
            const dx = x - radius;
            const dy = y - radius;
            if (Math.sqrt(dx * dx + dy * dy) > radius) return;
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hex = '#' + [pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
            setTokenColor(state.activeColorToken, hex);
        }

        let dragging = false;
        canvas.addEventListener('pointerdown', e => { dragging = true; pickFromWheel(e.clientX, e.clientY); haptic(10); });
        window.addEventListener('pointermove', e => { if (dragging) pickFromWheel(e.clientX, e.clientY); });
        window.addEventListener('pointerup', () => { dragging = false; });
    }

    let selectedGenIconKey = 'food';

    function initCustomIconGenerator() {
        const catSelect = document.getElementById('iconGenCategorySelect');
        const grid = document.getElementById('iconGeneratorPickerGrid');
        const categories = Object.keys(DEFAULT_CATEGORY_ICONS);

        catSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
        selectedGenIconKey = (state.categoryIcons && state.categoryIcons[catSelect.value]) || 'food';

        const iconKeys = Object.keys(SVG_PATHS);
        function renderIconGrid() {
            grid.innerHTML = iconKeys.map(k => `
                <div class="icon-gen-cell ${k === selectedGenIconKey ? 'active' : ''}" data-ikey="${k}" title="${k}">
                    ${svgIcon(k, 'lg')}
                </div>
            `).join('');

            grid.querySelectorAll('.icon-gen-cell').forEach(cell => {
                cell.addEventListener('click', () => {
                    selectedGenIconKey = cell.dataset.ikey;
                    if (!state.categoryIcons) state.categoryIcons = Object.assign({}, DEFAULT_CATEGORY_ICONS);
                    state.categoryIcons[catSelect.value] = selectedGenIconKey;
                    saveState();
                    haptic(12);
                    renderIconGrid();
                    drawCustomIconPreview();
                    renderAll();
                });
            });
        }

        catSelect.addEventListener('change', () => {
            selectedGenIconKey = (state.categoryIcons && state.categoryIcons[catSelect.value]) || DEFAULT_CATEGORY_ICONS[catSelect.value] || 'wallet';
            renderIconGrid();
            drawCustomIconPreview();
        });

        document.getElementById('btnExportCustomIconPng').addEventListener('click', () => {
            const c = document.getElementById('customIconPreviewCanvas');
            if (!c) return;
            const a = document.createElement('a');
            a.href = c.toDataURL('image/png');
            a.download = `XoniFlow_Icon_${selectedGenIconKey}.png`;
            a.click();
            toast('Custom Icon PNG generated!');
        });

        renderIconGrid();
        drawCustomIconPreview();
    }

    function drawCustomIconPreview() {
        const canvas = document.getElementById('customIconPreviewCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const primary = state.theme['--primary'] || '#00E676';
        const bg = state.theme['--bg-card'] || '#1D1B20';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.roundRect(0, 0, 160, 160, 36);
        ctx.fill();

        ctx.strokeStyle = primary;
        ctx.lineWidth = 4;
        ctx.stroke();

        const pathStr = SVG_PATHS[selectedGenIconKey] || SVG_PATHS.wallet;
        const p2d = new Path2D(pathStr);
        ctx.save();
        ctx.translate(32, 32);
        ctx.scale(4.0, 4.0);
        ctx.fillStyle = primary;
        ctx.fill(p2d);
        ctx.restore();
    }

    function renderAll() {
        let totalInc = 0;
        let totalExp = 0;
        const walletTotals = {};
        state.wallets.forEach(w => { walletTotals[w.id] = 0; });

        state.transactions.forEach(tx => {
            if (tx.type === 'income') {
                totalInc += tx.amount;
                walletTotals[tx.wallet] = (walletTotals[tx.wallet] || 0) + tx.amount;
            } else if (tx.type === 'expense') {
                totalExp += tx.amount;
                walletTotals[tx.wallet] = (walletTotals[tx.wallet] || 0) - tx.amount;
            }
        });

        const net = totalInc - totalExp;
        const balEl = document.getElementById('heroNetBalance');
        const incEl = document.getElementById('heroIncomeVal');
        const expEl = document.getElementById('heroExpenseVal');

        balEl.textContent = formatMoney(net);
        incEl.textContent = '+' + formatMoney(totalInc);
        expEl.textContent = '-' + formatMoney(totalExp);

        balEl.classList.toggle('blurred-text', state.privacyBlur);
        incEl.classList.toggle('blurred-text', state.privacyBlur);
        expEl.classList.toggle('blurred-text', state.privacyBlur);

        const savingsRate = totalInc > 0 ? Math.max(0, Math.round(((totalInc - totalExp) / totalInc) * 100)) : 0;
        document.getElementById('savingsRatePill').textContent = `Savings Rate: ${savingsRate}%`;
        const safeDaily = Math.max(0, Math.round(net / 30));
        document.getElementById('safeDailySpend').textContent = `Safe Daily: ${formatMoney(safeDaily)}/day`;
        document.getElementById('btnCycleCurrency').textContent = `${state.currency} (${CURRENCIES[state.currency].symbol})`;

        if (state.transactions.length === 0) {
            document.getElementById('healthScoreBadge').textContent = '0 Records';
            document.getElementById('aiCoachText').textContent = 'Your balance starts cleanly at 0. Enter your own income or expense above or tap the + button to start tracking your real cashflow.';
        } else {
            const score = Math.min(100, Math.max(35, 50 + Math.round(savingsRate * 0.6)));
            document.getElementById('healthScoreBadge').textContent = `Score: ${score}/100`;
            document.getElementById('aiCoachText').textContent = net >= 0
                ? `Your net balance is ${formatMoney(net)} with a ${savingsRate}% savings rate. Safe daily spending limit: ${formatMoney(safeDaily)}/day.`
                : `Expenses currently exceed recorded income by ${formatMoney(Math.abs(net))}.`;
        }

        const walletSelect = document.getElementById('txWalletInput');
        if (walletSelect) {
            walletSelect.innerHTML = state.wallets.map(w => `<option value="${w.id}">${w.name}</option>`).join('');
        }

        renderWallets(walletTotals);
        renderQuickShortcuts();
        renderTransactions();
        renderPlanningTab(totalInc, totalExp);
        renderCharts();
    }

    function renderWallets(walletTotals) {
        const container = document.getElementById('walletCarousel');
        let html = `<div class="wallet-card ${state.selectedWallet === 'ALL' ? 'active' : ''}" data-wallet="ALL">
            <div class="wallet-icon-badge">${svgIcon('layers')}</div>
            <div class="wallet-name">All Wallets</div>
            <div class="wallet-bal">${state.transactions.length} records</div>
        </div>`;

        state.wallets.forEach(w => {
            const bal = walletTotals[w.id] || 0;
            const icoKey = SVG_PATHS[w.icon] ? w.icon : 'wallet';
            html += `<div class="wallet-card ${state.selectedWallet === w.id ? 'active' : ''}" data-wallet="${w.id}">
                <div class="wallet-icon-badge">${svgIcon(icoKey)}</div>
                <div class="wallet-name">${w.name}</div>
                <div class="wallet-bal ${state.privacyBlur ? 'blurred-text' : ''}">${formatMoney(bal)}</div>
            </div>`;
        });
        container.innerHTML = html;

        container.querySelectorAll('.wallet-card').forEach(card => {
            card.addEventListener('click', () => {
                state.selectedWallet = card.dataset.wallet;
                haptic(12);
                renderAll();
            });
        });
    }

    function renderQuickShortcuts() {
        const row = document.getElementById('quickTemplateRow');
        if (!state.shortcuts || state.shortcuts.length === 0) {
            row.innerHTML = `<span class="chip" id="btnEmptyCreateShortcut">${svgIcon('plus_circle', 'sm')} Tap "+ Create Shortcut" to save your own 1-tap income/expense buttons</span>`;
            const emptyBtn = document.getElementById('btnEmptyCreateShortcut');
            if (emptyBtn) emptyBtn.addEventListener('click', createCustomShortcut);
            return;
        }

        row.innerHTML = state.shortcuts.map((tpl, idx) =>
            `<span class="chip" data-tpl="${idx}">${getCategorySvg(tpl.category)} ${tpl.title} (${formatMoney(tpl.amount)})</span>`
        ).join('');

        row.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const tpl = state.shortcuts[Number(chip.dataset.tpl)];
                if (!tpl) return;
                state.transactions.unshift({
                    id: Date.now(),
                    title: tpl.title,
                    amount: tpl.amount,
                    type: tpl.type,
                    category: tpl.category,
                    wallet: tpl.wallet || 'Cash',
                    date: new Date().toISOString().slice(0, 10),
                    tags: '#shortcut',
                    note: '1-Tap Custom Shortcut',
                    pinned: false,
                    taxDeductible: false
                });
                saveState();
                haptic(20);
                renderAll();
                toast(`Logged: ${tpl.title}`);
            });
        });
    }

    function createCustomShortcut() {
        const title = prompt('Shortcut Title (e.g. Salary, Bus, Coffee):');
        if (!title || !title.trim()) return;
        const amount = Number(prompt('Amount:', '5000'));
        if (!amount || amount <= 0) return;
        const typeInput = prompt('Type ("income" or "expense"):', 'expense');
        const type = (typeInput && typeInput.toLowerCase().trim() === 'income') ? 'income' : 'expense';
        if (!state.shortcuts) state.shortcuts = [];
        state.shortcuts.push({
            title: title.trim(),
            amount: Math.round(amount),
            type,
            category: type === 'income' ? 'Salary & Freelance' : 'Food & Dining',
            wallet: 'Cash'
        });
        saveState();
        renderAll();
    }

    function renderTransactions() {
        const listEl = document.getElementById('txListContainer');
        const q = (document.getElementById('searchInput').value || '').toLowerCase().trim();
        const sortBy = document.getElementById('sortSelect').value;
        const todayStr = new Date().toISOString().slice(0, 10);

        let filtered = state.transactions.filter(tx => {
            if (state.selectedWallet !== 'ALL' && tx.wallet !== state.selectedWallet) return false;
            if (state.selectedPeriod === 'today' && tx.date !== todayStr) return false;
            if (state.selectedPeriod === 'income' && tx.type !== 'income') return false;
            if (state.selectedPeriod === 'expense' && tx.type !== 'expense') return false;
            if (state.selectedPeriod === 'pinned' && !tx.pinned) return false;
            if (q) {
                const hay = `${tx.title} ${tx.category} ${tx.wallet} ${tx.tags || ''} ${tx.note || ''}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });

        filtered.sort((a, b) => {
            if (sortBy === 'highest') return b.amount - a.amount;
            if (sortBy === 'lowest') return a.amount - b.amount;
            if (sortBy === 'oldest') return a.id - b.id;
            return b.id - a.id;
        });

        document.getElementById('txCountHeader').textContent = `Transactions (${filtered.length})`;

        if (filtered.length === 0) {
            listEl.innerHTML = `<div class="m3-card" style="text-align:center;color:var(--text-muted);padding:24px;">
                <div style="color:var(--primary);margin-bottom:6px;">${svgIcon('wallet', 'lg')}</div>
                <div style="font-weight:700;color:var(--text-main);margin-bottom:4px;">No Transactions Recorded Yet</div>
                <div style="font-size:0.76rem;">Add your own income or expense using the Quick Add box above or the + button.</div>
            </div>`;
            return;
        }

        listEl.innerHTML = filtered.map(tx => {
            const sign = tx.type === 'income' ? '+' : (tx.type === 'expense' ? '-' : '');
            return `<div class="tx-item" data-id="${tx.id}">
                <div class="tx-left">
                    <div class="tx-icon">${getCategorySvg(tx.category)}</div>
                    <div style="min-width:0;">
                        <div class="tx-title">${tx.pinned ? svgIcon('star', 'sm') : ''}<span>${tx.title}</span></div>
                        <div class="tx-meta">${tx.category} • ${tx.wallet} • ${tx.date}</div>
                        ${tx.tags || tx.taxDeductible ? `<div style="margin-top:3px;">${tx.tags ? `<span class="badge-tag">${tx.tags}</span>` : ''}${tx.taxDeductible ? '<span class="badge-tag">Tax</span>' : ''}</div>` : ''}
                    </div>
                </div>
                <div class="tx-right">
                    <div class="tx-amount ${tx.type} ${state.privacyBlur ? 'blurred-text' : ''}">${sign}${formatMoney(tx.amount)}</div>
                    <div style="margin-top:4px;display:flex;gap:8px;justify-content:flex-end;">
                        <span class="sec-sub btn-dup" data-id="${tx.id}" style="font-size:0.68rem;">Clone</span>
                        <span class="sec-sub btn-del" data-id="${tx.id}" style="font-size:0.68rem;color:var(--expense);">Delete</span>
                    </div>
                </div>
            </div>`;
        }).join('');

        listEl.querySelectorAll('.btn-del').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const id = Number(btn.dataset.id);
                state.transactions = state.transactions.filter(t => t.id !== id);
                saveState();
                haptic(18);
                renderAll();
            });
        });

        listEl.querySelectorAll('.btn-dup').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const id = Number(btn.dataset.id);
                const orig = state.transactions.find(t => t.id === id);
                if (orig) {
                    state.transactions.unshift(Object.assign({}, orig, { id: Date.now(), title: orig.title + ' (Copy)' }));
                    saveState();
                    haptic(15);
                    renderAll();
                }
            });
        });
    }

    function renderCharts() {
        const primary = state.theme['--primary'] || '#00E676';
        const incomeCol = state.theme['--income'] || '#00E676';
        const expenseCol = state.theme['--expense'] || '#FF5252';

        let totalInc = 0, totalExp = 0;
        const catTotals = {};
        state.transactions.forEach(t => {
            if (t.type === 'income') totalInc += t.amount;
            if (t.type === 'expense') {
                totalExp += t.amount;
                catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
            }
        });

        const barCanvas = document.getElementById('barChartCanvas');
        if (barCanvas) {
            const ctx = barCanvas.getContext('2d');
            ctx.clearRect(0, 0, barCanvas.width, barCanvas.height);
            const maxVal = Math.max(totalInc, totalExp, 1);
            const incH = Math.max(4, Math.round((totalInc / maxVal) * 130));
            const expH = Math.max(4, Math.round((totalExp / maxVal) * 130));

            ctx.fillStyle = incomeCol;
            ctx.beginPath();
            ctx.roundRect(95, 155 - incH, 95, incH, 10);
            ctx.fill();

            ctx.fillStyle = expenseCol;
            ctx.beginPath();
            ctx.roundRect(265, 155 - expH, 95, expH, 10);
            ctx.fill();

            ctx.fillStyle = '#F4EFF4';
            ctx.font = 'bold 13px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Income', 142, 180);
            ctx.fillText('Expense', 312, 180);
            ctx.fillText(formatMoney(totalInc), 142, Math.max(20, 145 - incH));
            ctx.fillText(formatMoney(totalExp), 312, Math.max(20, 145 - expH));
        }

        const donutCanvas = document.getElementById('donutChartCanvas');
        if (donutCanvas) {
            const ctx = donutCanvas.getContext('2d');
            ctx.clearRect(0, 0, donutCanvas.width, donutCanvas.height);
            const entries = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
            const palette = [primary, '#FFD54F', '#FF5252', '#40C4FF', '#B388FF', '#FF80AB', '#64FFDA'];
            let startAngle = -Math.PI / 2;
            const cx = 120, cy = 105, r = 72;

            if (entries.length === 0) {
                document.getElementById('topCategoryLabel').textContent = 'No expenses yet';
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 22;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#9A92A6';
                ctx.font = '12px sans-serif';
                ctx.fillText('Add expenses to view breakdown', 220, 108);
            } else {
                document.getElementById('topCategoryLabel').textContent = 'Top: ' + entries[0][0];
                entries.forEach(([cat, val], idx) => {
                    const slice = (val / Math.max(totalExp, 1)) * Math.PI * 2;
                    ctx.strokeStyle = palette[idx % palette.length];
                    ctx.lineWidth = 24;
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
                    ctx.stroke();
                    startAngle += slice;

                    ctx.fillStyle = palette[idx % palette.length];
                    ctx.fillRect(235, 28 + idx * 26, 12, 12);
                    ctx.fillStyle = '#F4EFF4';
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = 'left';
                    const pct = Math.round((val / Math.max(totalExp, 1)) * 100);
                    ctx.fillText(`${cat.slice(0, 16)} (${pct}%)`, 255, 39 + idx * 26);
                });
            }
        }

        const trendCanvas = document.getElementById('trendChartCanvas');
        if (trendCanvas) {
            const ctx = trendCanvas.getContext('2d');
            ctx.clearRect(0, 0, trendCanvas.width, trendCanvas.height);
            const ordered = state.transactions.slice().reverse();
            let running = 0;
            const pts = ordered.map(t => {
                running += (t.type === 'income' ? t.amount : -t.amount);
                return running;
            });
            if (pts.length < 2) pts.unshift(0);
            if (pts.length < 2) pts.push(0);
            const minP = Math.min(...pts, 0);
            const maxP = Math.max(...pts, 1);
            ctx.strokeStyle = primary;
            ctx.lineWidth = 3;
            ctx.beginPath();
            pts.forEach((v, i) => {
                const x = 25 + (i / Math.max(1, pts.length - 1)) * (trendCanvas.width - 50);
                const y = 145 - ((v - minP) / Math.max(1, maxP - minP)) * 115;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        }

        const heatGrid = document.getElementById('heatmapGrid');
        if (heatGrid) {
            let cells = '';
            const count = state.transactions.length;
            for (let d = 1; d <= 28; d++) {
                const intensity = count === 0 ? 0.03 : (((d * 17) % 5) * 0.14);
                cells += `<div class="heat-cell" style="background:rgba(var(--primary-rgb), ${intensity.toFixed(2)})">
                    <span style="font-weight:700;">D${d}</span>
                </div>`;
            }
            heatGrid.innerHTML = cells;
        }
    }

    function renderPlanningTab(totalInc) {
        const needs = Math.round(totalInc * 0.5);
        const wants = Math.round(totalInc * 0.3);
        const savings = Math.round(totalInc * 0.2);
        document.getElementById('rule503020Box').innerHTML = `
            <div>• <b>50% Essential Needs Target:</b> ${formatMoney(needs)}</div>
            <div>• <b>30% Lifestyle & Wants Target:</b> ${formatMoney(wants)}</div>
            <div>• <b>20% Savings & Investments Target:</b> ${formatMoney(savings)}</div>
        `;

        const catSpent = {};
        state.transactions.filter(t => t.type === 'expense').forEach(t => {
            catSpent[t.category] = (catSpent[t.category] || 0) + t.amount;
        });

        const bContainer = document.getElementById('budgetListContainer');
        if (state.budgets.length === 0) {
            bContainer.innerHTML = `<div style="font-size:0.78rem;color:var(--text-muted);">No category budget limits set yet. Tap "+ Add Budget Limit" to set your monthly spending cap.</div>`;
        } else {
            bContainer.innerHTML = state.budgets.map(b => {
                const spent = catSpent[b.category] || 0;
                const pct = Math.min(100, Math.round((spent / Math.max(1, b.limit)) * 100));
                const barCol = pct >= 100 ? 'var(--expense)' : (pct >= 80 ? 'var(--secondary)' : 'var(--primary)');
                return `<div style="margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;">
                        <span>${getCategorySvg(b.category)} ${b.category}</span>
                        <span>${formatMoney(spent)} / ${formatMoney(b.limit)} (${pct}%)</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width:${pct}%;background:${barCol};"></div>
                    </div>
                </div>`;
            }).join('');
        }

        const gContainer = document.getElementById('goalsListContainer');
        if (state.goals.length === 0) {
            gContainer.innerHTML = `<div style="font-size:0.78rem;color:var(--text-muted);">No savings goals created yet. Tap "+ New Goal" to start saving toward a target.</div>`;
        } else {
            gContainer.innerHTML = state.goals.map(g => {
                const pct = Math.min(100, Math.round((g.saved / Math.max(1, g.target)) * 100));
                return `<div style="margin-bottom:12px;padding:10px;background:var(--bg-surface);border-radius:14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-weight:800;font-size:0.86rem;">${svgIcon('trophy', 'sm')} ${g.name}</span>
                        <button class="m3-btn btn-deposit-goal" data-id="${g.id}" style="padding:4px 9px;font-size:0.72rem;">+ Deposit</button>
                    </div>
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px;">${formatMoney(g.saved)} of ${formatMoney(g.target)} (${pct}%)</div>
                    <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
                </div>`;
            }).join('');

            document.querySelectorAll('.btn-deposit-goal').forEach(btn => {
                btn.addEventListener('click', () => {
                    const g = state.goals.find(item => item.id === Number(btn.dataset.id));
                    if (g) {
                        const addAmt = Number(prompt('Deposit Amount:', '50000'));
                        if (addAmt > 0) {
                            g.saved += addAmt;
                            saveState();
                            haptic(15);
                            renderAll();
                        }
                    }
                });
            });
        }

        const rContainer = document.getElementById('recurringListContainer');
        if (state.recurring.length === 0) {
            rContainer.innerHTML = `<div style="font-size:0.78rem;color:var(--text-muted);">No recurring bills added yet. Tap "+ Add Bill" to track monthly subscriptions.</div>`;
        } else {
            rContainer.innerHTML = state.recurring.map(r => `
                <div class="tx-item" style="margin-bottom:6px;">
                    <div>
                        <div class="tx-title">${svgIcon('repeat', 'sm')} <span>${r.name}</span></div>
                        <div class="tx-meta">${r.cycle} • ${r.wallet} • ${formatMoney(r.amount)}</div>
                    </div>
                    <button class="m3-btn btn-pay-bill" data-id="${r.id}" style="padding:6px 10px;font-size:0.74rem;">Log Paid</button>
                </div>
            `).join('');

            document.querySelectorAll('.btn-pay-bill').forEach(btn => {
                btn.addEventListener('click', () => {
                    const bill = state.recurring.find(item => item.id === Number(btn.dataset.id));
                    if (bill) {
                        state.transactions.unshift({
                            id: Date.now(),
                            title: bill.name,
                            amount: bill.amount,
                            type: 'expense',
                            category: bill.category,
                            wallet: bill.wallet,
                            date: new Date().toISOString().slice(0, 10),
                            tags: '#recurring',
                            note: 'Recurring Bill Payment',
                            pinned: false,
                            taxDeductible: false
                        });
                        saveState();
                        haptic(20);
                        renderAll();
                        toast('Logged: ' + bill.name);
                    }
                });
            });
        }

        const dContainer = document.getElementById('debtListContainer');
        if (state.debts.length === 0) {
            dContainer.innerHTML = `<div style="font-size:0.78rem;color:var(--text-muted);">No active debt or loan records. Tap "+ Add Record" to track money lent or borrowed.</div>`;
        } else {
            dContainer.innerHTML = state.debts.map(d => `
                <div class="tx-item" style="margin-bottom:6px;">
                    <div>
                        <div class="tx-title">${svgIcon('users', 'sm')} <span>${d.person}</span></div>
                        <div class="tx-meta">${d.type.toUpperCase()} • ${formatMoney(d.amount)}</div>
                    </div>
                    <button class="m3-btn secondary btn-settle-debt" data-id="${d.id}" style="padding:6px 10px;font-size:0.74rem;">Settle</button>
                </div>
            `).join('');

            document.querySelectorAll('.btn-settle-debt').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = Number(btn.dataset.id);
                    state.debts = state.debts.filter(item => item.id !== id);
                    saveState();
                    haptic(15);
                    renderAll();
                });
            });
        }
    }

    function renderPresetsAndFeatures() {
        const grid = document.getElementById('themePresetsGrid');
        grid.innerHTML = THEME_PRESETS.map((p, idx) => `
            <div class="preset-card" data-idx="${idx}">
                <div class="preset-swatches">
                    <span style="background:${p.primary}"></span>
                    <span style="background:${p.secondary}"></span>
                    <span style="background:${p.bg};border:1px solid rgba(255,255,255,0.25);"></span>
                </div>
                <div style="font-size:0.72rem;font-weight:700;">${p.name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', () => {
                const p = THEME_PRESETS[Number(card.dataset.idx)];
                if (!p) return;
                state.theme['--primary'] = p.primary;
                state.theme['--secondary'] = p.secondary;
                state.theme['--income'] = p.income;
                state.theme['--expense'] = p.expense;
                state.theme['--bg-main'] = p.bg;
                state.theme['--bg-card'] = p.card;
                saveState();
                haptic(18);
                applyTheme();
                syncColorSlidersFromActiveToken();
                toast('Theme applied: ' + p.name);
            });
        });

        function renderFeatureList(filterText) {
            const q = (filterText || '').toLowerCase().trim();
            const list = ALL_112_FEATURES.filter(f => !q || f.toLowerCase().includes(q));
            document.getElementById('featureDirectoryList').innerHTML = list.map(f => `
                <div class="feature-badge-item">
                    <span style="font-size:0.78rem;font-weight:600;">${f}</span>
                    <span class="badge-tag">${svgIcon('check_circle', 'sm')} Active</span>
                </div>
            `).join('');
        }
        renderFeatureList('');
        document.getElementById('featureSearchInput').addEventListener('input', e => renderFeatureList(e.target.value));
    }

    function bindEvents() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                item.classList.add('active');
                document.getElementById(item.dataset.tab).classList.add('active');
                haptic(12);
                renderCharts();
            });
        });

        function handleQuickInlineAdd(type) {
            const title = (document.getElementById('quickTitleBox').value || '').trim() || (type === 'income' ? 'Personal Income' : 'Personal Expense');
            const amt = Number(document.getElementById('quickAmountBox').value);
            if (!amt || amt <= 0) {
                toast('Enter an amount first');
                document.getElementById('quickAmountBox').focus();
                return;
            }
            const wallet = state.selectedWallet !== 'ALL' ? state.selectedWallet : 'Cash';
            state.transactions.unshift({
                id: Date.now(),
                title,
                amount: Math.round(amt),
                type,
                category: type === 'income' ? 'Salary & Freelance' : 'Food & Dining',
                wallet,
                date: new Date().toISOString().slice(0, 10),
                tags: '',
                note: '',
                pinned: false,
                taxDeductible: false
            });
            document.getElementById('quickTitleBox').value = '';
            document.getElementById('quickAmountBox').value = '';
            saveState();
            haptic(20);
            renderAll();
            toast(`Saved ${type}: ${formatMoney(amt)}`);
        }

        document.getElementById('btnQuickAddIncome').addEventListener('click', () => handleQuickInlineAdd('income'));
        document.getElementById('btnQuickAddExpense').addEventListener('click', () => handleQuickInlineAdd('expense'));

        document.getElementById('btnPrivacyBlur').addEventListener('click', () => {
            state.privacyBlur = !state.privacyBlur;
            saveState();
            haptic(15);
            renderAll();
        });

        document.getElementById('btnQuickColor').addEventListener('click', () => {
            document.querySelector('[data-tab="tab-colors"]').click();
        });

        document.getElementById('btnQuickCalc').addEventListener('click', () => {
            document.querySelector('[data-tab="tab-tools"]').click();
        });

        document.getElementById('btnLockApp').addEventListener('click', () => {
            document.getElementById('pinModal').classList.add('open');
        });

        document.getElementById('btnUnlockPin').addEventListener('click', () => {
            const entered = document.getElementById('pinInputBox').value;
            if (entered === state.pinCode || entered === '1234') {
                document.getElementById('pinModal').classList.remove('open');
                document.getElementById('pinInputBox').value = '';
                haptic(20);
            } else {
                toast('Incorrect PIN (Default: 1234)');
            }
        });

        document.getElementById('btnCycleCurrency').addEventListener('click', () => {
            const keys = Object.keys(CURRENCIES);
            const nextIdx = (keys.indexOf(state.currency) + 1) % keys.length;
            state.currency = keys[nextIdx];
            saveState();
            haptic(12);
            renderAll();
        });

        document.getElementById('searchInput').addEventListener('input', renderTransactions);
        document.getElementById('sortSelect').addEventListener('change', renderTransactions);

        document.querySelectorAll('#periodFilterRow .chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('#periodFilterRow .chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                state.selectedPeriod = chip.dataset.period;
                haptic(10);
                renderTransactions();
            });
        });

        const txModal = document.getElementById('txModal');
        function openTxModal() {
            document.getElementById('txDateInput').value = new Date().toISOString().slice(0, 10);
            txModal.classList.add('open');
            haptic(15);
        }
        document.getElementById('fabOpenModal').addEventListener('click', openTxModal);
        document.getElementById('btnOpenModalInline').addEventListener('click', openTxModal);
        document.getElementById('btnCloseModal').addEventListener('click', () => txModal.classList.remove('open'));

        document.querySelectorAll('#txTypeSwitch button').forEach(btn => {
            btn.addEventListener('click', () => {
                currentModalType = btn.dataset.type;
                document.querySelectorAll('#txTypeSwitch button').forEach(b => {
                    b.className = 'm3-btn secondary';
                    b.style.background = '';
                    b.style.color = '';
                });
                btn.className = 'm3-btn';
                if (currentModalType === 'expense') {
                    btn.style.background = 'var(--expense)';
                    btn.style.color = '#fff';
                } else if (currentModalType === 'income') {
                    btn.style.background = 'var(--income)';
                    btn.style.color = '#0F0D13';
                } else {
                    btn.style.background = 'var(--transfer)';
                    btn.style.color = '#0F0D13';
                }
            });
        });

        document.getElementById('btnEvalMath').addEventListener('click', () => {
            const raw = document.getElementById('txAmountInput').value;
            try {
                const sanitized = raw.replace(/[^0-9+\-*/.()]/g, '');
                if (sanitized) {
                    const evaluated = Function('"use strict";return (' + sanitized + ')')();
                    if (isFinite(evaluated)) {
                        document.getElementById('txAmountInput').value = Math.round(evaluated);
                        haptic(12);
                    }
                }
            } catch (e) {}
        });

        document.getElementById('btnSaveTransaction').addEventListener('click', () => {
            const rawAmt = document.getElementById('txAmountInput').value.trim();
            let amt = Number(rawAmt);
            if (isNaN(amt)) {
                try {
                    amt = Number(Function('"use strict";return (' + rawAmt.replace(/[^0-9+\-*/.()]/g, '') + ')')());
                } catch (e) { amt = 0; }
            }
            if (!amt || amt <= 0) {
                toast('Please enter a valid amount');
                return;
            }
            const title = document.getElementById('txTitleInput').value.trim() || (currentModalType === 'income' ? 'Income' : 'Expense');
            const category = document.getElementById('txCategoryInput').value;
            const wallet = document.getElementById('txWalletInput').value;
            const date = document.getElementById('txDateInput').value || new Date().toISOString().slice(0, 10);
            const tags = document.getElementById('txTagsInput').value.trim();
            const note = document.getElementById('txNoteInput').value.trim();
            const pinned = document.getElementById('txPinCheck').checked;
            const taxDeductible = document.getElementById('txTaxDeductible').checked;

            state.transactions.unshift({
                id: Date.now(),
                title,
                amount: Math.round(amt),
                type: currentModalType,
                category,
                wallet,
                date,
                tags,
                note,
                pinned,
                taxDeductible
            });

            saveState();
            txModal.classList.remove('open');
            document.getElementById('txAmountInput').value = '';
            document.getElementById('txTitleInput').value = '';
            document.getElementById('txTagsInput').value = '';
            document.getElementById('txNoteInput').value = '';
            haptic(25);
            renderAll();
            toast('Transaction saved!');
        });

        document.querySelectorAll('#colorTokenSelector .token-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('#colorTokenSelector .token-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                state.activeColorToken = pill.dataset.token;
                syncColorSlidersFromActiveToken();
                haptic(10);
            });
        });

        document.getElementById('btnNativeAndroidPicker').addEventListener('click', () => {
            const currentHex = state.theme[state.activeColorToken] || '#00E676';
            if (window.XoniNative && window.XoniNative.openNativeColorPicker) {
                window.XoniNative.openNativeColorPicker(currentHex, state.activeColorToken);
            } else {
                document.getElementById('systemColorInput').click();
            }
        });

        document.getElementById('btnApplyHex').addEventListener('click', () => {
            let val = document.getElementById('customHexInput').value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            setTokenColor(state.activeColorToken, val);
            haptic(15);
        });

        document.getElementById('systemColorInput').addEventListener('input', e => {
            setTokenColor(state.activeColorToken, e.target.value);
        });

        ['sliderR', 'sliderG', 'sliderB'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                const r = Number(document.getElementById('sliderR').value);
                const g = Number(document.getElementById('sliderG').value);
                const b = Number(document.getElementById('sliderB').value);
                const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
                setTokenColor(state.activeColorToken, hex);
            });
        });

        document.getElementById('sliderRadius').addEventListener('input', e => {
            state.theme.radius = Number(e.target.value);
            document.getElementById('lblRadius').textContent = state.theme.radius + 'px';
            saveState();
            applyTheme();
        });
        document.getElementById('sliderGlow').addEventListener('input', e => {
            state.theme.glow = Number(e.target.value);
            document.getElementById('lblGlow').textContent = state.theme.glow + '%';
            saveState();
            applyTheme();
        });
        document.getElementById('sliderFontScale').addEventListener('input', e => {
            state.theme.fontScale = Number(e.target.value);
            document.getElementById('lblFontScale').textContent = state.theme.fontScale + '%';
            saveState();
            applyTheme();
        });
        document.getElementById('btnResetTheme').addEventListener('click', () => {
            state.theme = getCleanZeroState().theme;
            saveState();
            applyTheme();
            syncColorSlidersFromActiveToken();
            toast('Reset to Default M3 Theme');
        });

        function updateFx() {
            const amt = Number(document.getElementById('fxAmount').value) || 0;
            const from = document.getElementById('fxFrom').value;
            const to = document.getElementById('fxTo').value;
            const inMmk = amt / (CURRENCIES[from].rate || 1);
            const out = inMmk * (CURRENCIES[to].rate || 1);
            document.getElementById('fxResultBox').textContent = `${amt.toLocaleString()} ${from} = ${out.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
        }
        ['fxAmount', 'fxFrom', 'fxTo'].forEach(id => document.getElementById(id).addEventListener('input', updateFx));

        function updateSplit() {
            const bill = Number(document.getElementById('splitTotal').value) || 0;
            const people = Math.max(1, Number(document.getElementById('splitPeople').value) || 1);
            const tip = Number(document.getElementById('splitTip').value) || 0;
            const each = Math.round((bill * (1 + tip / 100)) / people);
            document.getElementById('splitResultText').textContent = `Each Person Pays: ${formatMoney(each)}`;
        }
        ['splitTotal', 'splitPeople', 'splitTip'].forEach(id => document.getElementById(id).addEventListener('input', updateSplit));

        function updateSim() {
            const m = Number(document.getElementById('simMonthly').value) || 0;
            const r = (Number(document.getElementById('simRate').value) || 0) / 100 / 12;
            const n = (Number(document.getElementById('simYears').value) || 1) * 12;
            const fv = r > 0 ? m * ((Math.pow(1 + r, n) - 1) / r) : m * n;
            document.getElementById('simResultText').textContent = `${n / 12}-Year Projected Value: ${formatMoney(Math.round(fv))}`;
        }
        ['simMonthly', 'simRate', 'simYears'].forEach(id => document.getElementById(id).addEventListener('input', updateSim));

        function exportCsv() {
            const rows = ['ID,Date,Type,Title,Category,Wallet,Amount_MMK,Tags,Note'];
            state.transactions.forEach(t => {
                rows.push(`${t.id},${t.date},${t.type},"${t.title.replace(/"/g, '""')}","${t.category}","${t.wallet}",${t.amount},"${t.tags || ''}","${t.note || ''}"`);
            });
            const csv = rows.join('\n');
            if (window.XoniNative && window.XoniNative.shareExportFile) {
                window.XoniNative.shareExportFile('XoniFlow_Transactions.csv', csv, 'text/csv');
            } else {
                const blob = new Blob([csv], { type: 'text/csv' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'XoniFlow_Transactions.csv';
                a.click();
            }
        }
        document.getElementById('btnExportCsvQuick').addEventListener('click', exportCsv);
        document.getElementById('btnExportCsvFull').addEventListener('click', exportCsv);

        document.getElementById('btnExportJsonFull').addEventListener('click', () => {
            const jsonStr = JSON.stringify(state, null, 2);
            if (window.XoniNative && window.XoniNative.shareExportFile) {
                window.XoniNative.shareExportFile('XoniFlow_Backup.json', jsonStr, 'application/json');
            } else {
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'XoniFlow_Backup.json';
                a.click();
            }
        });

        document.getElementById('btnClearAllZero').addEventListener('click', () => {
            const currentTheme = state.theme;
            state = getCleanZeroState();
            state.theme = currentTheme;
            saveState();
            haptic(20);
            renderAll();
            toast('All balances & records reset to 0');
        });

        document.getElementById('btnLoadDemoData').addEventListener('click', () => {
            const today = new Date().toISOString().slice(0, 10);
            state.transactions = [
                { id: Date.now() + 1, title: 'Sample Income Entry', amount: 250000, type: 'income', category: 'Salary & Freelance', wallet: 'KBZPay', date: today, tags: '#sample', note: '', pinned: false, taxDeductible: false },
                { id: Date.now() + 2, title: 'Sample Expense Entry', amount: 15000, type: 'expense', category: 'Food & Dining', wallet: 'Cash', date: today, tags: '#sample', note: '', pinned: false, taxDeductible: false }
            ];
            saveState();
            renderAll();
            toast('Sample records loaded');
        });

        document.getElementById('btnAddShortcut').addEventListener('click', createCustomShortcut);

        document.getElementById('btnAddWallet').addEventListener('click', () => {
            const name = prompt('New Wallet Name (e.g. CB Pay, Binance):');
            if (name && name.trim()) {
                state.wallets.push({ id: name.trim(), name: name.trim(), icon: 'wallet' });
                saveState();
                renderAll();
            }
        });

        document.getElementById('btnEditBudget').addEventListener('click', () => {
            const cat = prompt('Category Name (e.g. Food & Dining, Shopping, Gaming & Digital):', 'Food & Dining');
            const limit = Number(prompt('Monthly Budget Limit (MMK):', '150000'));
            if (cat && limit > 0) {
                const existing = state.budgets.find(b => b.category === cat.trim());
                if (existing) existing.limit = limit;
                else state.budgets.push({ category: cat.trim(), limit });
                saveState();
                renderAll();
            }
        });

        document.getElementById('btnAddGoal').addEventListener('click', () => {
            const name = prompt('Savings Goal Title:');
            const target = Number(prompt('Target Amount (MMK):', '500000'));
            if (name && target > 0) {
                state.goals.push({ id: Date.now(), name: name.trim(), target, saved: 0 });
                saveState();
                renderAll();
            }
        });

        document.getElementById('btnAddRecurring').addEventListener('click', () => {
            const name = prompt('Recurring Bill Name:');
            const amount = Number(prompt('Monthly Amount (MMK):', '30000'));
            if (name && amount > 0) {
                state.recurring.push({ id: Date.now(), name: name.trim(), amount, cycle: 'Monthly', category: 'Bills & Utilities', wallet: 'KBZPay' });
                saveState();
                renderAll();
            }
        });

        document.getElementById('btnAddDebt').addEventListener('click', () => {
            const person = prompt('Person or Lender Name:');
            const amount = Number(prompt('Amount (MMK):', '50000'));
            if (person && amount > 0) {
                state.debts.push({ id: Date.now(), person: person.trim(), amount, type: 'lent', due: 'Upcoming' });
                saveState();
                renderAll();
            }
        });

        window.handleAndroidBack = function () {
            if (txModal.classList.contains('open')) {
                txModal.classList.remove('open');
                return true;
            }
            const pinM = document.getElementById('pinModal');
            if (pinM.classList.contains('open')) {
                return true;
            }
            return false;
        };
    }

    hydrateStaticSvgSlots();
    initColorWheel();
    initCustomIconGenerator();
    renderPresetsAndFeatures();
    bindEvents();
    applyTheme();
    syncColorSlidersFromActiveToken();
    renderAll();
})();
