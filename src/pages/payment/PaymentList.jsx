import { useState } from 'react';
import TruncatableFieldToolTip from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { AiOutlineApi } from 'react-icons/ai';
import TableHeader from '../../atoms/table/TableHeader';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  const rows = payments.map((payment) => {
    const { _id, site, event, participant, amount, currency, channel, status, createdAt, updatedAt } = payment;
    return {
      id: _id,
      exportData: payment,
      participant: <TruncatableFieldToolTip title={'Participant'} content={participant.name} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      event: <TruncatableFieldToolTip title={'Event'} content={event.name} />,
      amount: <TruncatableFieldToolTip title={'Amount'} content={amount} />,
      currency: <TruncatableFieldToolTip title={'Currency'} content={currency} />,
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading="Payments" btn1={true} href1={'/payments/payment-integration'} icon1={<AiOutlineApi size={22} />} btnLabel1={'API Integration'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'payment'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Participant', key: 'participant' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Event', key: 'event' },
                  { label: 'Amount', key: 'amount' },
                  { label: 'Currency', key: 'currency' },
                  { label: 'Channel', key: 'channel' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setPayments(data.payments)}
                rows={rows}
                apiUrl={'payments'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                view={true}
                viewPath={'/payments/payment'}
                search={true}
                filter={true}
                // deleteBtn={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                // statuses={[
                //   { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                //   { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                // ]}
                searchCategory={[{ id: 1, name: 'Channel' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
