import { useState, useEffect } from 'react';
import { VscSymbolColor } from 'react-icons/vsc';
import { GrCheckmark } from 'react-icons/gr';
import { colors } from '../../utils/themeColors';
import useGlobalContext from '../../hooks/useGlobalContext';
import useColorContext from '../../hooks/useColorContext';

const ColorPalette = ({ title = 'Color Palette', onColorChange }) => {
  const { auth } = useGlobalContext();
  const { handleColorChange, isDarkMode } = useColorContext();
  const [selectedColor, setSelectedColor] = useState(
    auth.theme?.primaryColor || {
      name: 'Blue',
      // Light mode colors
      bgColor: '#2563EB',
      fadedColor: '#eff8ff',
      textColor: '#2563EB',
      brandHoverColor: '#1E4DB7',
      borderColor: '#2563EB',
      // Dark mode colors
      bgColorDark: '#2E90FA',
      fadedColorDark: '#19418566',
      textColorDark: '#53B1FD',
      brandHoverColorDark: '#1E4DB7',
      borderColorDark: '#2E90FA'
    }
  );

  // Send default color to parent on mount
  useEffect(() => {
    if (onColorChange) onColorChange(selectedColor);
  }, [onColorChange, selectedColor]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    handleColorChange(color);
    onColorChange?.(color);
  };

  return (
    <div className="p-5 border border-primary rounded-lg flex flex-col items-center justify-center divide-y divide-primary w-full">
      <h1 className="text-primary text-lg flex gap-2 items-center justify-start w-full pb-3">
        <VscSymbolColor className="-rotate-90 text-secondary" size={22} />
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
            {selectedColor?.bgColor === color?.bgColor && (
              <GrCheckmark strokeWidth={2} size={18} className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
