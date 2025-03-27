import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TruncatableFieldToolTip from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { AiOutlineApi } from 'react-icons/ai';
import TableHeader from '../../atoms/table/TableHeader';

const PaymentList = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  const rows = payments.map((payment) => {
    const { _id, site, event, participant, amount, currency, channel, status, createdAt, updatedAt } = payment;
    return {
      id: _id,
      exportData: payment,
      participant: <TruncatableFieldToolTip content={participant.name} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      event: <TruncatableFieldToolTip content={event.name} />,
      amount: <TruncatableFieldToolTip content={amount} />,
      currency: <TruncatableFieldToolTip content={currency} />,
      channel: channel === 'razorpay' ? 'Razorpay' : channel === 'stripe' ? 'Stripe' : 'PayPal',
      status: (
        <div
          className={`rounded-xl ${
            status === 'success' ? 'bg-lightgreen text-success' : status === 'pending' ? 'bg-fadeyellow text-pending' : 'bg-fadedred text-failed'
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
    { id: 0, label: 'Participant', key: 'participant', dataKey: 'participant.name' },
    {
      id: 1,
      label: 'Sites',
      key: 'site',
      dataKey: 'site',
      formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '')
    },
    { id: 2, label: 'Event', key: 'event', dataKey: 'event.name' },
    { id: 3, label: 'Amount', key: 'amount', dataKey: 'amount' },
    { id: 4, label: 'Currency', key: 'currency', dataKey: 'currency' },
    {
      id: 5,
      label: 'Channel',
      key: 'channel',
      dataKey: 'channel',
      formatForExport: (value) => (value ? (value === 'razorpay' ? 'Razorpay' : value === 'stripe' ? 'Stripe' : 'PayPal') : '')
    },
    {
      id: 6,
      label: 'Status',
      key: 'status',
      dataKey: 'status',
      formatForExport: (value) => (value === 'success' ? 'Success' : value === 'pending' ? 'Pending' : 'Failed')
    },
    { id: 7, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 8, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [{ id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/payments/payment/${row.id}`) }];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading="Payments" btn1={true} href1={'/payments/payment-integration'} icon1={<AiOutlineApi />} btnLabel1={'API Integration'} />
      <TableComponent
        selectable={true}
        siteModule={'payment'}
        headers={columnConfig}
        tableData={(data) => setPayments(data.payments)}
        rows={rows}
        apiUrl={'payments'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[
          { id: 1, name: 'Sites' },
          { id: 2, name: 'Status' }
        ]}
        searchCategory={[{ id: 1, name: 'Channel' }]}
        actionItems={actionItems}
      />
    </div>
  );
};

export default PaymentList;
