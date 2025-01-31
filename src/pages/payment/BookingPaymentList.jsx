import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const BookingPaymentList = () => {
  const [bookingPayments, setBookingPayments] = useState([]);

  const rows = bookingPayments.map((booking) => {
    const {
      _id,
      customer,
      payment: { channel, amount, currency, status, },
      package: { currencies, onSale, salePrice },
      site,
      attendee,
      createdAt,
      updatedAt,
      phoneNumber,
      phoneCode,
      email,
      coupon
    } = booking;

    return {
      id: _id,
      exportData: booking,
      customer: <TruncatableFieldToolTip title={'Participant'} content={customer.name} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email} />,
      phoneNumber: (
        <TruncatableFieldToolTip
          title={'Mobile Number'}
          content={`${phoneCode ? (phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`}
        />
      ),
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      attendee: <TruncatableFieldToolTip title={'Attendee'} content={attendee ?? ''} />,
      channel: channel === 'razorpay' ? 'Razorpay' : channel === 'stripe' ? 'Stripe' : 'PayPal',
      price: <TruncatableFieldToolTip title={'Price'} content={`${currencies?.[currency]} ${currency}`} />,
      salePrice: onSale ? <TruncatableFieldToolTip title={'Discount Price'} content={`${salePrice?.[currency]} ${currency}`} /> : '-',
      amount: <TruncatableFieldToolTip title={'Paid Amount'} content={amount} />,
      coupon: <TruncatableFieldToolTip title={'Coupon'} content={coupon?.code ?? ''} />,
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
        <TableHeader heading={'Booking Payments'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'booking-payments'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Customer Name', key: 'customer' },
                  { label: 'Email', key: 'email' },
                  { label: 'Mobile Number', key: 'phoneNumber' },
                  { label: 'Site', key: 'site' },
                  { label: 'Qty', key: 'attendee' },
                  { label: 'Channel', key: 'channel' },
                  { label: 'Price', key: 'price' },
                  { label: 'Discount Price', key: 'salePrice' },
                  { label: 'Amount', key: 'amount' },
                  { label: 'Coupon Code', key: 'coupon' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setBookingPayments(data.bookingPayments)}
                rows={rows}
                apiUrl={'booking-payments'}
                tableCountLabel={true}
                pagination={true}
                // actions={true}
                // view={true}
                // viewPath={'/payments/payment'}
                search={true}
                filter={true}
                deleteBtn={true}
                filterCategory={[{ id: 1, name: 'Sites' }]}
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

export default BookingPaymentList;
