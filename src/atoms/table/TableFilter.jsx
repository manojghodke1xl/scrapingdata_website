import { IoCloseOutline } from 'react-icons/io5';
import SearchComponent from '../common/SearchComponent';
import FilterDropDowm from '../filter/FilterDropDown';
import Filters from '../filter/Filters';
import SearchFilter from '../filter/SearchFilter';
import StatusFilter from '../filter/StatusFilter';

const TableFilter = ({
  search,
  filterState,
  setFilterState,
  searchCategory,
  selectedCategory,
  setSelectedCategory,
  filter,
  filterCategory,
  handleCategorySelect,
  showFilter,
  setShowFilter,
  statuses,
  allSites,
  events
}) => {
  return (
    <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start items-center">
      {search && (
        <>
          <div className={`px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[210px] h-fit`}>
            <SearchComponent
              value={filterState.searchTerm}
              onChange={(e) => setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }))}
              placeholder={`Search by ${filterState.searchKey || '...'}`}
            />
          </div>
          {searchCategory.length > 0 && (
            <SearchFilter
              searchCategory={searchCategory}
              setSearchKey={(key) => setFilterState((prev) => ({ ...prev, searchKey: key }))}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </>
      )}
      {filter && (
        <>
          <div className="gap-2">
            <Filters categories={filterCategory} onCategorySelect={handleCategorySelect} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          </div>
          {showFilter.status && (
            <div className="relative">
              <div
                className="absolute -top-2 -right-2 bg-white rounded-full border border-fadedblue text-black font-bold cursor-pointer z-10 w-6 h-6 flex items-center justify-center"
                onClick={() => setShowFilter((prev) => ({ ...prev, status: false }))}
              >
                <IoCloseOutline />
              </div>
              <StatusFilter statuses={statuses} setStatusFilter={(status) => setFilterState((prev) => ({ ...prev, statusFilter: status }))} />
            </div>
          )}
          {showFilter.sites && (
            <div className="relative">
              <div
                className="absolute -top-2 -right-2 bg-white rounded-full border border-fadedblue text-black font-bold cursor-pointer z-10 w-6 h-6 flex items-center justify-center"
                onClick={() => setShowFilter((prev) => ({ ...prev, sites: false }))}
              >
                <IoCloseOutline />
              </div>
              <FilterDropDowm name={'Sites'} data={allSites} setDataId={(id) => setFilterState((prev) => ({ ...prev, siteId: id }))} />
            </div>
          )}
          {showFilter.event && (
            <div className="relative">
              <div
                className="absolute -top-2 -right-2 bg-white rounded-full border border-fadedblue text-black font-bold cursor-pointer z-10 w-6 h-6 flex items-center justify-center"
                onClick={() => setShowFilter((prev) => ({ ...prev, event: false }))}
              >
                <IoCloseOutline />
              </div>
              <FilterDropDowm name={'Event'} data={events} setDataId={(id) => setFilterState((prev) => ({ ...prev, eventId: id }))} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableFilter;
