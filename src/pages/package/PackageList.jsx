import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { getAllEventsApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import { deletePackageApi } from '../../apis/package-apis';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [event, setEvent] = useState([]);

  const rows = packages.map((userPackage) => {
    const { _id, title, amount, maxLimit, hasBooking, event, createdAt, updatedAt } = userPackage;
    return {
      id: _id,
      hasBooking,
      exportData: userPackage,
      title: <TruncatableFieldModal title={'Package Title'} content={title} />,
      event: <TruncatableFieldModal title={'Event'} content={`${event.name} (${event.venue})`} />,
      amount: <TruncatableFieldModal title={'Price'} content={amount} />,
      maxLimit: <TruncatableFieldModal title={'Max Limit'} content={maxLimit} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllEventsApi();
      if (status) setEvent(data.events);
      else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Package List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/packages/add-package" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Package</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'packages'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Package Title', key: 'title' },
                  { label: 'Event', key: 'event' },
                  { label: 'Price', key: 'amount' },
                  { label: 'Max Attendees', key: 'maxLimit' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setPackages(data.packages)}
                rows={rows}
                apiUrl={'packages'}
                events={event}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/packages/edit-package'}
                copy={true}
                copyPath={'/packages/duplicate-package'}
                deleteAction={true}
                search={true}
                filter={true}
                filterCategory={[{ id: 1, name: 'Event' }]}
                searchCategory={[{ id: 1, name: 'Name' }]}
                deleteBtn={true}
                deleteApi={deletePackageApi}
                deleteLabel={'Delete Package'}
                deleteMessage={'Are you sure you want to delete this package?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
