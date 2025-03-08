import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const OrderPaymentList = () => {
  const { isDarkMode } = useColorContext();
  const [bookingPayments, setBookingPayments] = useState([]);

  const rows = bookingPayments.map((payment) => {
    const {
      _id,
      customer,
      phoneCode,
      phone,
      payment: { channel, amount, currency, status, site, coupon },
      products,
      createdAt,
      updatedAt,
      orderId,
      address
    } = payment;

    const product = products?.map((p) => p.product?.name).join(', ');
    const totalPrice = products?.reduce((sum, p) => sum + p?.product?.price?.[currency], 0);
    const totalSalePrice = products?.reduce((sum, p) => sum + p?.product?.salePrice?.[currency], 0);

    return {
      id: _id,
      exportData: payment,
      customer: <TruncatableFieldToolTip content={customer.name} />,
      orderId: <TruncatableFieldToolTip content={orderId} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      mobile: <TruncatableFieldToolTip content={`${phoneCode ? (phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phone ? phone : '-'}`} />,
      address: <TruncatableFieldToolTip content={`${address.addressLine1 + ', ' + address.city + ', ' + address.state + ', ' + address.country + ', ' + address.postalCode} `} />,
      amount: <TruncatableFieldToolTip content={amount} />,
      channel: channel === 'razorpay' ? 'Razorpay' : channel === 'stripe' ? 'Stripe' : 'PayPal',
      products: <TruncatableFieldToolTip content={product ?? '-'} />,
      quantity: <TruncatableFieldToolTip content={products.reduce((sum, p) => sum + p.quantity, 0) ?? '-'} />,
      totalPrice: <TruncatableFieldToolTip content={totalPrice ? `${totalPrice} ${currency}` : '-'} />,
      totalSalePrice: <TruncatableFieldToolTip content={totalSalePrice ? `${totalSalePrice} ${currency}` : '-'} />,
      coupon: <TruncatableFieldToolTip content={coupon?.code ?? '-'} />,
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
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`} />
          <span>{status === 'success' ? 'Success' : status === 'pending' ? 'Pending' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Customer Name', key: 'customer', dataKey: 'customer.name' },
    { id: 1, label: 'Site', key: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 2, label: 'Order ID', key: 'orderId', dataKey: 'orderId' },
    {
      id: 3,
      label: 'Mobile Number',
      key: 'mobile',
      dataKey: 'phone',
      formatForExport: (value, data) => `${data.phoneCode ? (data.phoneCode.startsWith('+') ? data.phoneCode : `+${data.phoneCode}`) : ''} ${value ? value : '-'}`
    },
    {
      id: 4,
      label: 'Address',
      key: 'address',
      dataKey: 'address',
      formatForExport: (value) => `${value.addressLine1}, ${value.city}, ${value.state}, ${value.country}, ${value.postalCode}`
    },
    { id: 5, label: 'Products', key: 'products', dataKey: 'products', formatForExport: (value) => value.map((p) => p.product.name).join(', ') },
    { id: 6, label: 'Qty', key: 'quantity', dataKey: 'products', formatForExport: (value) => value.reduce((sum, p) => sum + p.quantity, 0) },
    {
      id: 7,
      label: 'Channel',
      key: 'channel',
      dataKey: 'payment.channel',
      formatForExport: (value) => (value ? (value === 'razorpay' ? 'Razorpay' : value === 'stripe' ? 'Stripe' : 'PayPal') : '')
    },
    {
      id: 8,
      label: 'Total Price',
      key: 'totalPrice',
      dataKey: 'products',
      formatForExport: (value, data) => {
        let currency = data.payment.currency;
        let totalPrice = value?.reduce((sum, p) => sum + p?.product?.price?.[currency], 0);
        return totalPrice ? `${totalPrice} ${currency}` : '';
      }
    },
    {
      id: 9,
      label: 'Total Sale Price',
      key: 'totalSalePrice',
      dataKey: 'products',
      formatForExport: (value, data) => {
        let currency = data.payment.currency;
        let totalSalePrice = value?.reduce((sum, p) => sum + p?.product?.salePrice?.[currency], 0);
        return totalSalePrice ? `${totalSalePrice} ${data.payment.currency}` : '';
      }
    },
    { id: 10, label: 'Amount', key: 'amount', dataKey: 'payment.amount' },
    { id: 11, label: 'Coupon Code', key: 'coupon', dataKey: 'payment.coupon.code' },
    {
      id: 12,
      label: 'Status',
      key: 'status',
      dataKey: 'payment.status',
      formatForExport: (value) => (value === 'success' ? 'Success' : value === 'pending' ? 'Pending' : 'Failed')
    },
    { id: 13, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 14, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Order Payments'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'order-payments'}
                headers={columnConfig}
                tableData={(data) => setBookingPayments(data.orderPayments)}
                rows={rows}
                apiUrl={'order-payments'}
                tableCountLabel={true}
                pagination={true}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentList;
