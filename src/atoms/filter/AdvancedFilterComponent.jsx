import { useState } from 'react';
import DropDown from '../formFields/DropDown';
import { IoCloseOutline } from 'react-icons/io5';

const AdvancedFilter = () => {
  const [filterGroups, setFilterGroups] = useState([
    {
      logic: 'AND',
      filters: [{ field: 'Status', operator: 'Is', value: '', logic: 'AND' }]
    }
  ]);

  // Handle adding a new filter group
  const handleAddGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        logic: 'AND',
        filters: [{ field: '', operator: '', value: '', logic: 'AND' }]
      }
    ]);
  };

  // Handle adding a new filter within a group
  const handleAddFilter = (groupIndex) => {
    const updatedGroups = [...filterGroups];
    updatedGroups[groupIndex].filters.push({ field: '', operator: '', value: '', logic: 'AND' });
    setFilterGroups(updatedGroups);
  };

  // Handle deleting a filter within a group
  const handleDeleteFilter = (groupIndex, filterIndex) => {
    const updatedGroups = [...filterGroups];
    updatedGroups[groupIndex].filters.splice(filterIndex, 1);
    if (updatedGroups[groupIndex].filters.length === 0) updatedGroups.splice(groupIndex, 1);
    setFilterGroups(updatedGroups);
  };

  // Handle changing filter values
  const handleChangeFilter = (groupIndex, filterIndex, key, value) => {
    const updatedGroups = [...filterGroups];
    updatedGroups[groupIndex].filters[filterIndex][key] = value;

    setFilterGroups(updatedGroups);
  };

  // Handle applying the filters
  const handleApply = () => {
    const query = filterGroups
      .map((group) => {
        const groupQuery = group.filters.map((filter) => `${filter.field} ${filter.operator} '${filter.value}'`).join(` ${group.logic} `);
        return `(${groupQuery})`;
      })
      .join(` AND `);

    console.log('Generated Query:', query);
    // Here, you can call your backend API with the generated query
  };

  return (
    <div className="p-4 rounded-xl border border-primary">
      <div className="flex items-center justify-between border-b border-primary pb-2">
        <h2 className="text-lg font-semibold">Advanced Filters</h2>
        <button
          className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
          onClick={() =>
            setFilterGroups([
              {
                logic: 'AND',
                filters: [{ field: 'Status', operator: 'Is', value: '', logic: 'AND' }]
              }
            ])
          }
        >
          Clear All
        </button>
      </div>

      {filterGroups.map((group, groupIndex) => (
        <>
          <div key={groupIndex} className="mb-6 flex flex-row space-x-5 items-start justify-start mt-5">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Where</span>
              {(group.filters.length > 1 || filterGroups.length > 1) && (
                <DropDown
                  name={'logic'}
                  SummaryChild="AND"
                  dropdownList={[
                    { name: 'AND', showName: 'AND' },
                    { name: 'OR', showName: 'OR' }
                  ]}
                  commonFunction={(e) => {
                    const updatedGroups = [...filterGroups];
                    updatedGroups[groupIndex].logic = e.name;
                    setFilterGroups(updatedGroups);
                  }}
                  selected={group.logic || 'AND'}
                />
              )}

              {/* Logic Dropdown (AND/OR) */}
              {group.filters.length > 1 && <span className="p-4 mt-">{group.logic}</span>}
            </div>

            <div className="flex flex-col">
              {group.filters.map((filter, filterIndex) => (
                <div key={filterIndex} className="flex flex-row space-x-5 mt-5 ">
                  {/* Field Dropdown */}
                  <DropDown
                    name={'field'}
                    SummaryChild="Status"
                    dropdownList={[
                      { name: 'Status', showName: 'Status' },
                      { name: 'Project Title', showName: 'Project Title' },
                      { name: 'Start Date', showName: 'Start Date' },
                      { name: 'Category', showName: 'Category' },
                      { name: 'Assignee', showName: 'Assignee' }
                    ]}
                    commonFunction={(e) => handleChangeFilter(groupIndex, filterIndex, 'field', e.name)}
                    selected={filter.field || 'Status'}
                  />

                  {/* Operator Dropdown */}
                  <DropDown
                    name={'operator'}
                    SummaryChild="Is"
                    dropdownList={[
                      { name: 'Is', showName: 'Is' },
                      { name: 'Contains', showName: 'Contains' },
                      { name: 'Is not', showName: 'Is not' }
                    ]}
                    commonFunction={(e) => handleChangeFilter(groupIndex, filterIndex, 'operator', e.name)}
                    selected={filter.operator || 'Is'}
                  />

                  {/* Value Input */}
                  <input
                    type="text"
                    className="p-2 border rounded-md mt-5"
                    value={filter.value}
                    onChange={(e) => handleChangeFilter(groupIndex, filterIndex, 'value', e.target.value)}
                    placeholder="Enter value"
                  />

                  {/* Delete Filter Button */}
                  {(group.filters.length > 1 || filterGroups.length > 1) && (
                    <button onClick={() => handleDeleteFilter(groupIndex, filterIndex)} className="p-1 text-secondary border border-primary rounded-xl mt-5">
                      <IoCloseOutline size={30} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleAddFilter(groupIndex)} className="px-4 py-2 border border-primary rounded-xl text-primary">
              + New Filter
            </button>
            {groupIndex === 0 && (
              <button onClick={handleAddGroup} className="px-4 py-2 border border-primary rounded-xl text-primary">
                + New Group
              </button>
            )}
          </div>
        </>
      ))}
      <div className="border border-b border-primary my-5" />
      <div className="flex justify-end">
        <button onClick={handleApply} className="flex items-end justify-end px-4 py-2 border border-primary rounded-xl text-white bg-primary">
          Apply
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilter;
