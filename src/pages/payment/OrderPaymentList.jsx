import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { useColor } from '../../contexts/contexts/ColorContext';

const OrderPaymentList = () => {
  const { isDarkMode } = useColor();
  const [bookingPayments, setBookingPayments] = useState([]);

  const rows = bookingPayments.map((payment) => {
    const {
      _id,
      customer,
      payment: { channel, amount, currency, status, site, coupon },
      products,
      createdAt,
      updatedAt
    } = payment;

    const product = products?.map((p) => p.product?.name).join(', ');
    const totalPrice = products?.reduce((sum, p) => sum + p?.product?.price?.[currency], 0);
    const totalSalePrice = products?.reduce((sum, p) => sum + p?.product?.salePrice?.[currency], 0);

    return {
      id: _id,
      exportData: payment,
      customer: <TruncatableFieldToolTip content={customer.name} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
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
        <TableHeader heading={'Order Payments'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'order-payments'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Customer Name', key: 'customer' },
                  { label: 'Site', key: 'site' },
                  { label: 'Products', key: 'products' },
                  { label: 'Qty', key: 'quantity' },
                  { label: 'Channel', key: 'channel' },
                  { label: 'Total Price', key: 'totalPrice' },
                  { label: 'Total Sale Price', key: 'totalSalePrice' },
                  { label: 'Amount', key: 'amount' },
                  { label: 'Coupon', key: 'coupon' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setBookingPayments(data.orderPayments)}
                rows={rows}
                apiUrl={'order-payments'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                // filter={true}
                // filterCategory={[{ id: 1, name: 'Sites' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentList;
