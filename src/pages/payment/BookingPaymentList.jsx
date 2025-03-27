import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const BookingPaymentList = () => {
  const { isDarkMode } = useColorContext();
  const [bookingPayments, setBookingPayments] = useState([]);

  const rows = bookingPayments.map((booking) => {
    const {
      _id,
      customer,
      payment: { channel, amount, currency, status },
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
      customer: <TruncatableFieldToolTip content={customer.name} />,
      email: <TruncatableFieldToolTip content={email} />,
      phoneNumber: <TruncatableFieldToolTip content={`${phoneCode ? (phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      attendee: <TruncatableFieldToolTip content={attendee ?? ''} />,
      channel: channel === 'razorpay' ? 'Razorpay' : channel === 'stripe' ? 'Stripe' : 'PayPal',
      price: <TruncatableFieldToolTip content={`${currencies?.[currency]} ${currency}`} />,
      salePrice: onSale ? <TruncatableFieldToolTip content={`${salePrice?.[currency]} ${currency}`} /> : '-',
      amount: <TruncatableFieldToolTip content={amount} />,
      coupon: <TruncatableFieldToolTip content={coupon?.code ?? ''} />,
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
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'success' ? 'bg-green' : status === 'pending' ? 'bg-pending' : 'bg-red'}`} />
          <span>{status === 'success' ? 'Success' : status === 'pending' ? 'Pending' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Customer Name', key: 'customer', dataKey: 'customer.name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
    {
      id: 2,
      label: 'Contact Number',
      key: 'phoneNumber',
      dataKey: 'phoneNumber',
      formatForExport: (value, data) => `${data.phoneCode ? (data.phoneCode.startsWith('+') ? data.phoneCode : `+${data.phoneCode}`) : ''} ${value ? value : '-'}`
    },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 4, label: 'Qty', key: 'attendee', dataKey: 'attendee' },
    {
      id: 5,
      label: 'Channel',
      key: 'channel',
      dataKey: 'channel',
      formatForExport: (value) => (value ? (value === 'razorpay' ? 'Razorpay' : value === 'stripe' ? 'Stripe' : 'PayPal') : '')
    },
    {
      id: 6,
      label: 'Price',
      key: 'price',
      dataKey: 'payment.currency',
      formatForExport: (value, data) => (data.package.currencies ? `${data.package.currencies?.[value]} ${value}` : '')
    },
    {
      id: 7,
      label: 'Discount Price',
      key: 'salePrice',
      dataKey: 'payment.currency',
      formatForExport: (value, data) => (data.package.onSale ? `${data.package.salePrice?.[value]} ${value}` : '')
    },
    { id: 8, label: 'Amount', key: 'amount', dataKey: 'payment.amount' },
    { id: 9, label: 'Coupon Code', key: 'coupon', dataKey: 'coupon.code' },
    {
      id: 10,
      label: 'Status',
      key: 'status',
      dataKey: 'payment.status',
      formatForExport: (value) => (value === 'success' ? 'Success' : value === 'pending' ? 'Pending' : 'Failed')
    },
    { id: 11, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 12, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Booking Payments'} />
      <TableComponent
        selectable={true}
        siteModule={'booking-payments'}
        headers={columnConfig}
        tableData={(data) => setBookingPayments(data.bookingPayments)}
        rows={rows}
        apiUrl={'booking-payments'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 1, name: 'Sites' }]}
      />
    </div>
  );
};

export default BookingPaymentList;
