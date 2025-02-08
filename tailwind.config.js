/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      textColor: {
        // primary: '#344054',
        // secondary: '#667085',
        // blue: '#175CD3',
        // dark: '#101828',
        // darkblue: '#0856cd',
        // placeholder: '#667085',
        // success: '#027948',
        // pending: '#B54708',
        // failed: '#f04438',
        // danger: '#b32318',
        // white: '#FFFFFF'
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        brand: 'var(--text-brand)',
        dark: 'var(--text-dark)',
        darkblue: 'var(--text-darkblue)',
        placeholder: 'var(--text-placeholder)',
        success: 'var(--text-success)',
        pending: 'var(--text-pending)',
        failed: 'var(--text-failed)',
        danger: 'var(--text-danger)',
        white: 'var(--text-white)'
      },
      borderColor: {
        // primary: '#D0D5DD',
        // secondary: '#175CD3',
        // fadedblue: '#84CAFF',
        // blue: '#A4BCFD',
        // fadered: '#FDA29B',
        // danger: ' #F04438'
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        fadedblue: 'var(--border-fadedblue)',
        blue: 'var(--border-blue)',
        fadered: 'var(--border-fadered)',
        danger: 'var(--border-danger)',
        success: 'var(--border-success)',
        pending: 'var(--border-pending)',
        failed: 'var(--border-failed)'
      },

      backgroundColor: {
        // primary: '#175CD3',
        // hover: '#1849A9',
        // error: '#FDA29B',
        // darkblue: '#175CD3',
        // lightblue: '#095fe3',
        // fadedblue: '#EFF8FF',
        // lightcyan: '#E0EAFF',
        // red: ' #f04438',
        // fadedred: '#fef3f2',
        // success: '#ECFDF3',
        // green: '#12b76a',
        // lightgreen: '#ecfdf3',
        // pending: '#F79009',
        // fadeyellow: '#FFFAEB',
        // darkgray: '#D0D5DD',
        // grey: '#F9FAFB'
        primary: 'var(--bg-primary)',
        'primary-hover': 'var(--bg-primary-hover)',
        hover: 'var(--bg-hover)',
        error: 'var(--bg-error)',
        darkblue: 'var(--bg-darkblue)',
        lightblue: 'var(--bg-lightblue)',
        'primary-faded': 'var(--bg-primary-faded)',
        lightcyan: 'var(--bg-lightcyan)',
        red: 'var(--bg-red)',
        fadedred: 'var(--bg-fadedred)',
        success: 'var(--bg-success)',
        green: 'var(--bg-green)',
        lightgreen: 'var(--bg-lightgreen)',
        pending: 'var(--bg-pending)',
        fadeyellow: 'var(--bg-fadeyellow)',
        darkgray: 'var(--bg-darkgray)',
        grey: 'var(--bg-grey)',
        main: 'var(--bg-main)'
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(#095fe3,#175CD3)',
        'custom-gradient-hover': 'radial-gradient(#175CD3,#095fe3)'
      },
      boxShadow: {
        custom: '0 0 10px rgba(0, 0, 0, 0.2)'
      },
      height: {
        'screen-minus-240': 'calc(100vh - 100px)'
      }
    }
  },
  plugins: []
};
