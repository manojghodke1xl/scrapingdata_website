/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      textColor: {
        primary: '#344054',
        secondary: '#667085',
        blue: '#175CD3',
        dark: '#101828',
        darkblue: '#0856cd',
        placeholder: '#667085',
        success: '#12B76A',
        danger: '#b32318',
        white: '#FFFFFF'
      },
      borderColor: {
        primary: '#D0D5DD',
        secondary: '#175CD3',
        fadedblue: '#84CAFF',
        blue: '#A4BCFD',
        fadered: '#FDA29B',
        danger: ' #F04438'
      },

      backgroundColor: {
        primary: '#175CD3',
        hover: '#1849A9',
        error: '#FDA29B',
        darkblue: '#175CD3',
        lightblue: '#095fe3',
        danger: ' #f04438',
        fadedblue: '#EFF8FF',
        fadedred: '#fef3f2',
        darkgray: '#D0D5DD',
        lightcyan: '#E0EAFF',
        success: '#ECFDF3',
        grey: '#F9FAFB'
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
