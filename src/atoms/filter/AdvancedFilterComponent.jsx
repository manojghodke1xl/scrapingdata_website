import { useState } from 'react';
import SelectionComponent from '../formFields/SelectionComponent';
import { IoMdAdd } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

const tableHeaders = [
  { id: 0, name: 'Title', type: 'text' },
  { id: 1, name: 'Description', type: 'text' },
  { id: 2, name: 'Category', type: 'select' },
  { id: 3, name: 'Status', type: 'select' },
  { id: 4, name: 'Progress', type: 'text' },
  { id: 5, name: 'Estimated Time', type: 'time' },
  { id: 6, name: 'Start Date', type: 'time' },
  { id: 7, name: 'End Date', type: 'time' },
  { id: 8, name: 'Teams', type: 'multiselect' },
  { id: 9, name: 'Project Lead', type: 'select' },
  { id: 10, name: 'Assignees', type: 'multiselect' },
  { id: 11, name: 'Deliverables', type: 'multiselect' },
  { id: 12, name: 'Stories', type: 'multiselect' },
  { id: 13, name: 'Tasks', type: 'multiselect' },
  { id: 14, name: 'Sub Tasks', type: 'multiselect' },
  { id: 15, name: 'Created Date', type: 'time' },
  { id: 16, name: 'Updated Date', type: 'time' },
  { id: 17, name: 'Last Updated By', type: 'text' }
];

const conditions = {
  text: [
    { id: 0, name: 'Is' },
    { id: 1, name: 'Is not' },
    { id: 2, name: 'Is empty' },
    { id: 3, name: 'Is not empty' }
  ],
  select_multiselect: [
    { id: 0, name: 'Contains' },
    { id: 1, name: 'Does not contain' },
    { id: 2, name: 'Starts with' },
    { id: 3, name: 'Ends with' },
    { id: 4, name: 'Equals' },
    { id: 5, name: 'Does not equal' }
  ],
  time: [
    { id: 0, name: 'Equals' },
    { id: 1, name: 'Does not equal' },
    { id: 2, name: 'Before' },
    { id: 3, name: 'After' },
    { id: 4, name: 'On or before' },
    { id: 5, name: 'On or after' },
    { id: 6, name: 'Between' },
    { id: 7, name: 'Not between' }
  ],
  number: [
    { id: 0, name: 'Equals' },
    { id: 1, name: 'Does not equal' },
    { id: 2, name: 'Greater than' },
    { id: 3, name: 'Greater than or equal to' },
    { id: 4, name: 'Less than' },
    { id: 5, name: 'Less than or equal to' }
  ]
};

const operators = [
  { id: 0, name: 'AND' },
  { id: 1, name: 'OR' }
];

const AdvancedFilterComponent = () => {
  const [filters, setFilters] = useState([{ id: 1, field: '', condition: '', value: '' }]);
  const [operator, setOperator] = useState('AND');

  const addFilter = () => setFilters([...filters, { id: Date.now(), field: '', condition: '', value: '' }]);

  const updateFilter = (id, key, value) => setFilters(filters.map((f) => (f.id === id ? { ...f, [key]: value } : f)));

  const removeFilter = (id) => {
    if (filters.length > 1) setFilters(filters.filter((f) => f.id !== id));
  };

  const clearFilters = () => {
    setFilters([{ id: Date.now(), field: '', condition: '', value: '' }]);
  };

  // Get conditions based on the selected field type
  const getConditionsForField = (field) => {
    const selectedField = tableHeaders.find((header) => header.name === field);
    if (selectedField) {
      // Check if the type is 'select' or 'multiselect'
      if (selectedField.type === 'select' || selectedField.type === 'multiselect') return conditions.select_multiselect;

      // Return the conditions based on the field type
      return conditions[selectedField.type] || [];
    }
    return Object.values(conditions).flat(); // Show all conditions if no field is selected
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={`w-full mt-5 bg-white border p-4 text-primary font-medium border-primary rounded-xl`}>
      <div className="flex items-center justify-between w-full border-b border-primary pb-2">
        <p>Advanced Filters</p>
        <button
          type="button"
          className={`font-normal text-sm ${filters.length === 1 ? 'cursor-not-allowed text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
      {filters.map((filter, index) => (
        <div key={filter.id} className="flex items-start md:items-center my-4 space-x-2">
          {index === 0 ? (
            <p className="mt-4 md:mt-2 font-semibold">Where</p>
          ) : (
            <SelectionComponent SummaryChild={operator} dropdownList={operators} commonFunction={(item) => setOperator(item.name)} />
          )}
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <SelectionComponent SummaryChild={filter.field || 'Select Key'} dropdownList={tableHeaders} commonFunction={(item) => updateFilter(filter.id, 'field', item.name)} />
            <SelectionComponent
              SummaryChild={filter.condition || 'Select Condition'}
              dropdownList={getConditionsForField(filter.field)}
              commonFunction={(item) => updateFilter(filter.id, 'condition', item.name)}
            />
            <SelectionComponent SummaryChild={filter.value || 'Select Value'} dropdownList={tableHeaders} commonFunction={(item) => updateFilter(filter.id, 'value', item.name)} />
          </div>

          {filters.length > 1 && (
            <button type="button" className="h-10 w-10 flex items-center mt-2 p-2 border border-primary rounded-lg hover:bg-red-100" onClick={() => removeFilter(filter.id)}>
              <IoCloseOutline size={22} />
            </button>
          )}
        </div>
      ))}
      <div className="flex items-center justify-start space-x-2">
        <button onClick={addFilter} className="bg border flex items-center justify-center gap-2 border-primary rounded-md px-3 py-1">
          <IoMdAdd size={22} />
          New Filter
        </button>
        <button className="bg border flex items-center justify-center gap-2 border-primary rounded-md px-3 py-1">
          <IoMdAdd size={22} />
          New Group
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilterComponent;
