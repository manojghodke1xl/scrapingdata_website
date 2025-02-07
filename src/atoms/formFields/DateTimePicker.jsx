import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef } from 'react';

const DateTimePicker = ({ divClassName, label, id, placeholder, selectedDateTime, setSelectedDateTime, errorMessage }) => {
  const datePickerRef = useRef(null);

  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <div className={`w-full mt-2 rounded-xl border ${errorMessage ? 'border-fadered focus:border-fadered' : 'border-primary focus:border-secondary'} relative`}>
        <DatePicker
          ref={datePickerRef}
          id={id}
          selected={selectedDateTime ? new Date(selectedDateTime) : null}
          onChange={(date) => setSelectedDateTime(date.toISOString())}
          showTimeSelect
          timeFormat="hh:mm aa"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy hh:mm aa"
          minDate={new Date()}
          className={` font-normal focus:outline-none focus:ring-0 px-4 py-2.5 focus:border-none placeholder:text-gray-400 text-dark bg-transparent w-full`}
          calendarClassName="custom-datepicker"
          popperClassName="custom-datepicker-popper"
          placeholderText={placeholder}
          timeCaption="Time"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          monthsShown={1}
          fixedHeight
        />
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => {
            if (datePickerRef.current) datePickerRef.current.setFocus(); // Focus the DatePicker input, which will open the calendar
          }}
        >
          <FiCalendar className="text-secondary" size={20} />
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default DateTimePicker;
