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
  statuses,
  allSites,
  events
}) => {
  return (
    <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start items-center">
      {search && (
        <>
          <div className={`px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[210px] h-fit ${!filterState.searchKey ? 'bg-grey cursor-not-allowed' : ''}`}>
            <SearchComponent
              value={filterState.searchTerm}
              onChange={(e) => setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }))}
              disabled={!filterState.searchKey}
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
          {showFilter.status && <StatusFilter statuses={statuses} setStatusFilter={(status) => setFilterState((prev) => ({ ...prev, statusFilter: status }))} />}
          {showFilter.sites && <FilterDropDowm name={'Sites'} data={allSites} setDataId={(id) => setFilterState((prev) => ({ ...prev, siteId: id }))} />}
          {showFilter.event && <FilterDropDowm name={'Event'} data={events} setDataId={(id) => setFilterState((prev) => ({ ...prev, eventId: id }))} />}
        </>
      )}
    </div>
  );
};

export default TableFilter;
