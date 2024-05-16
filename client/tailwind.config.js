const colors = {
  BG_DEFAULT: "#1b1b1b",
  BG_DARK: "#222222",
  BG_DARKER: "#191A21",
  CYAN: "#8BE9FD",
  GREEN: "#50FA7B",
  ORANGE: "#FFB86C",
  PINK: "#FF79C6",
  PURPLE: "#BD93F9",
  RED: "#FF5555",
  YELLOW: "#F1FA8C",
  TEXT_PRIMARY: "#F8F8F2",
  TEXT_SECONDARY: "#BCC2CD",
  COMMENT: "#6272A4",
  SELECTION: "#44475A",
  HOVER: "#343746"
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Default
        'bg-default': colors.BG_DEFAULT,
        'bg-dark': colors.BG_DARK,
        'bg-darker': colors.BG_DARKER,
        cyan: colors.CYAN,
        green: colors.GREEN,
        orange: colors.ORANGE,
        pink: colors.PINK,
        purple: colors.PURPLE,
        red: colors.RED,
        yellow: colors.YELLOW,
        'text-primary': colors.TEXT_PRIMARY,
        'text-secondary': colors.TEXT_SECONDARY,
        comment: colors.COMMENT,
        selection: colors.SELECTION,
        hover: colors.HOVER,

        // State Colors
        'state-hover-bg': colors.HOVER,
        'state-hover-color': '#888a9d',
        'state-disabled-bg': colors.BG_DARKER,
        'state-disabled-color': colors.TEXT_SECONDARY,
        'state-error-color': colors.RED,
        'state-success-color': colors.GREEN,
        'state-warning-color': colors.YELLOW,
        'state-info-color': colors.CYAN,

        // Component Specific Colors
        'bottom-default-bg': colors.BG_DARKER,
        'bottom-connect-hover-bg': `${colors.PURPLE}16`,
        'editor-gutter-color': colors.COMMENT,
        'modal-default-bg': colors.BG_DARK,
        'sidebar-left-button-selected-bg': colors.SELECTION,
        'skeleton-bg': colors.SELECTION,
        'skeleton-highlight': colors.HOVER,
        'toast-default-bg': colors.BG_DARKER,
        'tooltip-bg': colors.BG_DARKER
      },
      borderColor: theme => ({
        'default-secondary': theme('colors.pink')
      }),
      borderWidth: {
        '2': '2px'
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      filter: ['hover'],
      invert: ['hover']
    }
  },
  plugins: [],
}