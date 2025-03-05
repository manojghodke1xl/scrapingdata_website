import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { getCareerById } from '../../../apis/leads/career-apis';
import { showNotification } from '../../../utils/showNotification';
import CountryFlag from '../../../atoms/common/CountryFlag';
import { formatDateTime } from '../../../utils/dateFormats';

const ViewCareer = () => {
  const { id } = useParams();
  const { setLoading } = useGlobalContext();
  const [career, setCareer] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getCareerById(id);
      if (status) setCareer(data.career);
      else showNotification('warn', data);
    })()
      .catch((error) => showNotification('error', error.message))
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Career Details</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/career/career-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
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
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Customer Name</h1>
              <p className="text-placeholder font-normal"> {career?.name || 'No name available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Email ID</h1>
              {career?.email ? (
                <a className="text-placeholder font-normal" href={`mailto:${career.email}`}>
                  {career.email}
                </a>
              ) : (
                <p className="text-placeholder font-normal">No email available</p>
              )}
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Country</h1>
              <p className="text-placeholder font-normal flex items-center ">
                <CountryFlag dialingCode={career?.ccode?.startsWith('+') ? career?.ccode.slice(1) : career?.ccode} showName={true} />
              </p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Phone Number</h1>
              {career?.mobile || career?.ccode ? (
                <a
                  className="text-placeholder font-normal"
                  href={`tel:${(career.ccode ? (career.ccode.startsWith('+') ? career.ccode : '+' + career.ccode) : '') + career.mobile.replace(/\s+/g, '')}`}
                >
                  {(career.ccode ? (career.ccode.startsWith('+') ? career.ccode : '+' + career.ccode) : '') + ' ' + career.mobile.replace(/\s+/g, '')}
                </a>
              ) : (
                <p className="text-placeholder font-normal">No phone number available</p>
              )}
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Service</h1>
              <p className="text-placeholder font-normal"> {career?.service || 'No service available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Subject</h1>
              <p className="text-placeholder font-normal"> {career?.suject || 'No subject available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">IP Address</h1>
              <p className="text-placeholder font-normal"> {career?.ipaddress || 'Not Present'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">
              <div className="flex items-center gap-2">Additional Information</div>
            </span>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Site Name</h1>
                <p className="text-placeholder font-normal"> {career?.site?.name || 'No Site Name available'}</p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Date & Time</h1>
                <p className="text-placeholder font-normal"> {formatDateTime(career?.createdAt) || 'No Date & Time available'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Career Message</span>
          </div>
          <div className="w-full mt-5">
            <h1 className="font-semibold text-primary">Message</h1>
            <p className="text-placeholder font-normal"> {career?.careerMessage || 'Not Present'}</p>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">
              <div className="flex items-center gap-2">Request Header Details</div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Request Header</h1>
              <p className="text-placeholder font-normal"> {career?.header || 'No header available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">User Agent String</h1>
              <p className="text-placeholder font-normal"> {career?.uastring || 'No User Agent String available'}</p>
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <Link to={'/career/career-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewCareer;
