import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const rows = orders.map((order) => {
    const { _id, status, customer, createdAt, updatedAt } = order;

    return {
      id: _id,
      exportData: order,
      Keys: _id,
      customer: <TruncatableFieldToolTip title={'Customer Name'} content={customer.name} />,
      status: (
        <div
          className={`rounded-xl ${
            status === 'success' ? 'bg-lightgreen text-success' : status === 'pending' ? 'bg-fadeyellow text-pending' : 'bg-fadedred text-failed'
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status === 'success' ? 'Success' : status === 'pending' ? 'Pending' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Orders</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule="orders"
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Customer', key: 'customer' },
                  // { label: 'Product', key: 'product' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created At', key: 'createdAt' },
                  { label: 'Updated At', key: 'updatedAt' }
                ]}
                tableData={(data) => setOrders(data.orders)}
                rows={rows}
                apiUrl={'orders'}
                tableCountLabel={true}
                pagination={true}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <NoteComponent note={casestudyListNote} /> */}
    </div>
  );
};

export default OrderList;
