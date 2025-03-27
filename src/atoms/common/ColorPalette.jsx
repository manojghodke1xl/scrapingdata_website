import { useState, useEffect } from 'react';
import { VscSymbolColor } from 'react-icons/vsc';
import { GrCheckmark } from 'react-icons/gr';
import { colors } from '../../utils/themeColors';
import useGlobalContext from '../../hooks/useGlobalContext';
import useColorContext from '../../hooks/useColorContext';

/**
 * ColorPalette Component
 * Renders a color selection palette that allows users to choose theme colors
 * @param {Object} props
 * @param {string} [props.title='Color Palette'] - Title of the color palette
 * @param {Function} props.onColorChange - Callback function triggered when a color is selected
 */
const ColorPalette = ({ title = 'Color Palette', onColorChange }) => {
  const { auth } = useGlobalContext();
  const { handleColorChange, isDarkMode } = useColorContext();

  // Initialize selected color with user's theme color or default blue theme
  const [selectedColor, setSelectedColor] = useState(
    auth.theme?.primaryColor || {
      name: 'Blue',
      // Light mode theme colors
      bgColor: '#2563EB',
      fadedColor: '#eff8ff',
      textColor: '#2563EB',
      brandHoverColor: '#1E4DB7',
      borderColor: '#2563EB',
      // Dark mode theme colors
      bgColorDark: '#2E90FA',
      fadedColorDark: '#19418566',
      textColorDark: '#53B1FD',
      brandHoverColorDark: '#1E4DB7',
      borderColorDark: '#2E90FA'
    }
  );

  // Initialize parent component with the selected color on mount
  useEffect(() => {
    if (onColorChange) onColorChange(selectedColor);
  }, [onColorChange, selectedColor]);

  /**
   * Handles color selection and updates both local state and parent component
   * @param {Object} color - The selected color object containing theme colors
   */
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    handleColorChange(color);
    onColorChange?.(color);
  };

  return (
    <div className="p-5 border border-primary rounded-lg flex flex-col items-center justify-center divide-y divide-primary w-full">
      <h1 className="text-primary text-lg flex gap-2 items-center justify-start w-full pb-3">
        <VscSymbolColor className="-rotate-90 text-secondary text-2xl" />
        {title}
      </h1>
      <div className="flex flex-row items-center justify-start flex-wrap gap-3 w-full pt-3">
        {colors.map((color) => (
          <button
            key={color?.name}
            style={{
              backgroundColor: isDarkMode ? color?.bgColorDark : color?.bgColor
            }}
            className="relative w-12 h-9 rounded-lg focus:outline-none"
            onClick={() => handleColorSelect(color)}
            title={color?.name}
          >
            {selectedColor?.bgColor === color?.bgColor && <GrCheckmark className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
