import RazorPay from '../../assets/images/razorpay.png';
import PayPal from '../../assets/images/paypal.png';
import Stripe from '../../assets/images/stripe.png';
import ZohoCRM from '../../assets/images/zohocrm.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdCheckmark } from 'react-icons/io';
import { useCallback, useEffect, useState } from 'react';
import { getIntegrationBySite } from '../../apis/payment-integration-apis';
import { showNotification } from '../../utils/showNotification';
import useGlobalContext from '../../hooks/useGlobalContext';

const IntegrationHub = () => {
  const { setLoading, isLoading } = useGlobalContext();
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [integrationData, setIntegrationData] = useState({});

  const getIntegration = useCallback(async () => {
    try {
      setLoading(true);
      const { status, data } = await getIntegrationBySite(id);
      if (status) {
        setIntegrationData(data);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getIntegration();
    }
  }, [getIntegration, id, setLoading]);

  const integrationList = [
    {
      img: RazorPay,
      name: 'Razorpay Integration',
      description: 'Secure online payment processing with seamless integration for transactions and financial management across your platform.',
      id: 'razorpay'
    },
    {
      img: Stripe,
      name: 'Stripe Integration',
      description: 'Powerful payment infrastructure for businesses, enabling smooth transactions and flexible payment methods globally.',
      id: 'stripe'
    },
    {
      img: PayPal,
      name: 'PayPal Integration',
      description: 'Trusted payment solution offering fast and secure transactions with global reach and buyer protection.',
      id: 'paypal'
    },
    {
      img: ZohoCRM,
      name: 'Zoho CRM',
      description: 'Streamline customer interactions, sales tracking, and data management with an all-in-one CRM integration platform.',
      id: 'zohocrm'
    }
  ];

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Integration Hub</span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/apps/app'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border border-primary rounded-xl mt-7">
        <h1 className="text-xl flex items-center gap-2 font-bold ">
          <IoMdCheckmark className="text-2xl text-success bg-success rounded-full p-0.5" /> You have selected the site: {integrationData?.site?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 mt-5">
        {integrationList.map((item) => {
          const isVerified = item.id === 'zohocrm' ? integrationData?.crm?.zoho?.isVerfied : integrationData?.payment?.[item.id]?.isVerified;
          const paymentData = integrationData?.payment?.[item.id] || null;
          return (
            <div key={item.name} className="rounded-xl border border-primary p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <img src={item.img} className="w-12" alt={item.name} />
              </div>
              <h1>{item.name}</h1>
              <div className="text-sm text-primary font-normal">{item.description}</div>
              <div className="flex gap-4 items-center ">
                <button
                  className="w-fit border border-primary p-2 rounded-xl font-normal text-primary disabled:bg-grey disabled:text-secondary "
                  onClick={() => navigate(`/apps/integration/${item.id}`, { state: { paymentData, siteId: id } })}
                  disabled={isVerified || isLoading}
                >
                  {isVerified ? 'Configured' : 'Configure'}
                </button>
                {isVerified && (
                  <button
                    className="w-fit border border-primary p-2 rounded-xl font-normal"
                    onClick={() => navigate(`/apps/integration/${item.id}`, { state: { paymentData: item.id === 'zohocrm' ? integrationData.crm : paymentData, siteId: id } })}
                    disabled={isLoading}
                  >
                    Re-configure
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationHub;
