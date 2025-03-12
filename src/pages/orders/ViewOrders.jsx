import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { getOrderDetailsByIdApi } from '../../apis/order-apis';
import { showNotification } from '../../utils/showNotification';
import { getFileIcon } from '../../constants/FileIcon';
import { formatDateTime } from '../../utils/dateFormats';
import useColorContext from '../../hooks/useColorContext';
import { CiImport } from 'react-icons/ci';

const ViewOrders = () => {
  const { id } = useParams();
  const { isDarkMode } = useColorContext();
  const { setLoading } = useGlobalContext();
  const [order, setOrder] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status, data } = await getOrderDetailsByIdApi(id);
      if (status) setOrder(data.orderDetails);
      else showNotification('error', data);
    })()
      .catch((error) => showNotification('error', error.message))
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  console.log('order', order);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Order Details</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/orders/order-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Customer Details</span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h1 className="font-semibold text-primary">Sender Name</h1>
              <p className="text-placeholder font-normal"> {order?.smtp?.senderName || 'No name available'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-primary">Receiver Email ID</h1>
              {order?.smtp?.senderEmail ? (
                <a className="text-placeholder font-normal" href={`mailto:${order?.smtp?.senderEmail}`}>
                  {order?.smtp?.senderEmail}
                </a>
              ) : (
                <p className="text-placeholder font-normal">No email available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary">Product Details</span>
          </div>
          <div className="w-full grid grid-cols-1 gap-y-5">
            {order?.products?.map((product) => (
              <div key={product.id} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5">
                <div>
                  <h1 className="font-semibold text-primary">Product Name</h1>
                  <p className="text-placeholder font-normal"> {product?.name || 'No name available'}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-primary">Product type</h1>
                  <p className="text-placeholder font-normal"> {product?.type || 'No name available'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Order Information</span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h1 className="font-semibold text-primary">Oder Number</h1>
              <p className="text-placeholder font-normal"> {order?.orderId || 'No order number available'}</p>
            </div>

            <div>
              <h1 className="font-semibold text-primary">Order Date & Time</h1>
              <p className="text-placeholder font-normal"> {formatDateTime(order?.createdAt) || 'No order date available'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Customer Information</span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h1 className="font-semibold text-primary">Phone Number</h1>
              {order?.phoneCode && order?.phone ? (
                <a
                  className="text-placeholder font-normal"
                  href={`tel:${(order.phoneCode ? (order.phoneCode.startsWith('+') ? order.phoneCode : '+' + order.phoneCode) : '') + order.phone.replace(/\s+/g, '')}`}
                >
                  {(order.phoneCode ? (order.phoneCode.startsWith('+') ? order.phoneCode : '+' + order.phoneCode) : '') + ' ' + order.phone.replace(/\s+/g, '')}
                </a>
              ) : (
                <p className="text-placeholder font-normal">No phone number available</p>
              )}
            </div>
            <div>
              <h1 className="font-semibold text-primary">Name</h1>
              <p className="text-placeholder font-normal"> {order?.customer?.name || 'No name available'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-primary">Email ID</h1>
              <p className="text-placeholder font-normal"> {order?.customer?.email || 'No email id available'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Delivery Address</span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h1 className="font-semibold text-primary">Address</h1>
              <p className="text-placeholder font-normal">
                {order?.address
                  ? `${order.address.addressLine1}, ${order.address.addressLine2}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.postalCode}`
                  : 'No order address available'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Payment Summary</span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h1 className="font-semibold text-primary">Product Cost</h1>
              <p className="text-placeholder font-normal"> {order?.payment?.productAmount || 'N/A'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-primary">Dilivery Cost</h1>
              <p className="text-placeholder font-normal"> {order?.payment?.shippingCharges || 'N/A'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-primary">Discount Applied</h1>
              <p className="text-placeholder font-normal"> {order?.payment?.discount || 'N/A'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-primary">Total Amount Paid</h1>
              <p className="text-placeholder font-normal"> {order?.payment?.amount || 'N/A'}</p>
            </div>

            <div>
              <h1 className="font-semibold text-primary">Payment Status</h1>
              <div
                className={`rounded-xl mt-2 ${
                  order?.payment?.status === 'success'
                    ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
                    : order?.payment?.status === 'pending'
                    ? `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
                    : `${isDarkMode ? 'border border-failed ' : 'bg-fadedred'} text-failed`
                } px-2 py-1 gap-2 w-fit flex items-center`}
              >
                <span className={`min-w-[8px] min-h-[8px] rounded-full ${order?.payment?.status === 'success' ? 'bg-green' : 'bg-pending'}`} />
                <span>{order?.payment?.status === 'success' ? 'Success' : order?.payment?.status === 'pending' ? 'Pending' : 'Failed'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {order?.digitalProducts?.length > 0 && (
        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary">Attachment Content</span>
            </div>
            <div className="w-full grid grid-cols-1 gap-5">
              <ul className="list-none space-y-4">
                {order?.digitalProducts?.map((product) => (
                  <li key={product?.id}>
                    <div className="flex flex-col gap-3">
                      <div className="text-primary font-medium">Product Name: {product?.productName || 'No product name available'}</div>
                      <div className="flex justify-between items-center border border-primary rounded-xl p-2">
                        <div
                          className="flex items-center gap-2 cursor-pointer hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            const previewUrl = `${product?.url}?response-content-disposition=inline`;
                            window.open(previewUrl, '_blank');
                          }}
                        >
                          {getFileIcon(product?.name)}
                          <div>
                            <p className="text-sm font-medium">{product?.name}</p>
                          </div>
                        </div>
                        <div>
                          <CiImport
                            size={20}
                            strokeWidth="1.2"
                            fill="none"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(product?.url, '_blank');
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
