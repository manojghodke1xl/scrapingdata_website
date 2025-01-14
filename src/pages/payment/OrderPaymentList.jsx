import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';

const OrderPaymentList = () => {
  const [bookingPayments, setBookingPayments] = useState([]);

  const rows = bookingPayments.map((payment) => {
    const {
      _id,
      customer,
      payment: { channel, amount, currency, status },
      site,
      createdAt,
      updatedAt
    } = payment;

    return {
      id: _id,
      exportData: payment.payments,
      customer: <TruncatableFieldModal title={'Participant'} content={customer.name} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      amount: <TruncatableFieldModal title={'Amount'} content={amount} />,
      currency: <TruncatableFieldModal title={'Currency'} content={currency} />,
      channel: channel === 'razorpay' ? 'Razorpay' : channel === 'stripe' ? 'Stripe' : 'PayPal',
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
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Order Payments</h4>
          </div>

          <div className="w-full flex justify-end sm:w-fit gap-2">
            {/* <Link to="/payments/payment-integration" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <AiOutlineApi size={22} />
              <span className="hidden md:block">API Integration</span>
            </Link> */}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'booking-payments'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Customer Name', key: 'customer' },
                  { label: 'Site', key: 'site' },
                  { label: 'Amount', key: 'amount' },
                  { label: 'Currency', key: 'currency' },
                  { label: 'Channel', key: 'channel' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setBookingPayments(data.orderPayments)}
                rows={rows}
                apiUrl={'order-payments'}
                tableCountLabel={true}
                pagination={true}
                // actions={true}
                // view={true}
                // viewPath={'/payments/payment'}
                search={true}
                // filter={true}
                // deleteBtn={true}
                // filterCategory={[
                //   { id: 1, name: 'Sites' },
                //   { id: 2, name: 'Status' }
                // ]}
                // statuses={[
                //   { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                //   { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                // ]}
                // searchCategory={[{ id: 1, name: 'Channel' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentList;
