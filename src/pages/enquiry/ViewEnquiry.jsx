import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { getEnquiryById } from '../../apis/enquiry-apis';
import { showNotification } from '../../utils/showNotification';
import { CiCircleInfo } from 'react-icons/ci';
import { formatDateTime } from '../../utils/dateFormats';
import { viewEnquiryNote } from './EnquiryNotes';
import NoteComponent from '../../atoms/common/NoteComponent';
import CountryFlag from '../../atoms/common/CountryFlag';

const ViewEnquiry = () => {
  const { id } = useParams();
  const { setLoading } = useGlobalContext();
  const [enquiry, setEnquiry] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getEnquiryById(id);
      if (status) setEnquiry(data.enquiry);
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
          <span className="text-3xl font-semibold text-dark">Enquiry Details</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/enquiry/enquiry-list'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
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
              <p className="text-secondary"> {enquiry?.name || 'No name available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Email ID</h1>
              {enquiry?.email ? (
                <a className="text-secondary" href={`mailto:${enquiry.email}`}>
                  {enquiry.email}
                </a>
              ) : (
                <p className="text-secondary">No email available</p>
              )}
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Country</h1>
              <p className="text-secondary flex items-center py-4 mt-2">
                <CountryFlag dialingCode={enquiry?.ccode?.startsWith('+') ? enquiry?.ccode.slice(1) : enquiry?.ccode} showName={true} />
              </p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Phone Number</h1>
              {enquiry?.mobile || enquiry?.ccode ? (
                <a
                  className="text-secondary"
                  href={`tel:${(enquiry.ccode ? (enquiry.ccode.startsWith('+') ? enquiry.ccode : '+' + enquiry.ccode) : '') + enquiry.mobile.replace(/\s+/g, '')}`}
                >
                  {(enquiry.ccode ? (enquiry.ccode.startsWith('+') ? enquiry.ccode : '+' + enquiry.ccode) : '') + ' ' + enquiry.mobile.replace(/\s+/g, '')}
                </a>
              ) : (
                <p className="text-secondary">No phone number available</p>
              )}
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Service</h1>
              <p className="text-secondary"> {enquiry?.service || 'No service available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Subject</h1>
              <p className="text-secondary"> {enquiry?.suject || 'No subject available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">IP Address</h1>
              <p className="text-secondary"> {enquiry?.ipaddress || 'Not Present'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">
              <div className="flex items-center gap-2">
                Additional Information <CiCircleInfo />
              </div>
            </span>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Site Name</h1>
                <p className="text-secondary"> {enquiry?.site?.name || 'No Site Name available'}</p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Date & Time</h1>
                <p className="text-secondary"> {formatDateTime(enquiry?.createdAt) || 'No Date & Time available'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Enquiry Message</span>
          </div>
          <div className="w-full mt-5">
            <h1 className="font-semibold text-primary">Message</h1>
            <p className="text-secondary"> {enquiry?.message || 'Not Present'}</p>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">
              <div className="flex items-center gap-2">
                Request Header Details <CiCircleInfo />
              </div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Request Header</h1>
              <p className="text-secondary"> {enquiry?.header || 'No header available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">User Agent String</h1>
              <p className="text-secondary"> {enquiry?.uastring || 'No User Agent String available'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={viewEnquiryNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <Link to={'/enquiry/enquiry-list'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewEnquiry;
