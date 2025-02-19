import { IoMdCheckmark } from 'react-icons/io';

const Checkbox = ({ id, checked, onChange, labelText, labelProps = {}, checkboxProps = {}, className, onClick, disabled }) => {
  return (
    <div className={`inline-flex gap-3 items-center ${className}`} onClick={onClick ? onClick : null}>
      <label className={`relative flex items-center rounded-full cursor-pointer focus:outline-none ${labelProps.className || ''}`} htmlFor={id} {...labelProps}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-primary-faded checked:before:bg-gray-100  focus:outline-none ${
            checkboxProps.className || ''
          }`}
          {...checkboxProps}
        />
        <span className="absolute text-brand transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <IoMdCheckmark />
        </span>
      </label>
      {labelText && <span className="text-secondary font-normal select-none">{labelText}</span>}
    </div>
  );
};

export default Checkbox;
