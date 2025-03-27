import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const OrderList = () => {
  const { isDarkMode } = useColorContext();
  const [orders, setOrders] = useState([]);

  const rows = orders.map((order) => {
    const { _id, status, customer, createdAt, updatedAt } = order;

    return {
      id: _id,
      exportData: order,
      Keys: _id,
      customer: <TruncatableFieldToolTip content={customer.name} />,
      status: (
        <div
          className={`rounded-xl ${
            status === 'success'
              ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
              : status === 'pending'
              ? `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
              : `${isDarkMode ? 'border border-failed ' : 'bg-fadedred'} text-failed`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status === 'success' ? 'Success' : status === 'pending' ? 'Pending' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Customer', key: 'customer', dataKey: 'customer.name' },
    { id: 1, label: 'Status', key: 'status', dataKey: 'status', formatForExport: (value) => (value === 'success' ? 'Success' : value === 'pending' ? 'Pending' : 'Failed') },
    { id: 2, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Orders'} />
      <TableComponent
        selectable={true}
        siteModule={'orders'}
        headers={columnConfig}
        tableData={(data) => setOrders(data.orders)}
        rows={rows}
        apiUrl={'order'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 1, name: 'Sites' }]}
      />
    </div>
  );
};

export default OrderList;
