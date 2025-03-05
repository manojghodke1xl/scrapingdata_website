import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { getSubscriberById } from '../../apis/leads/subscriber-apis';
import { formatDateTime } from '../../utils/dateFormats';
import NoteComponent from '../../atoms/common/NoteComponent';
import { viewMailingNote } from './MailingNotes';

const ViewSubscriber = () => {
  const { id } = useParams();
  const { setLoading } = useGlobalContext();
  const [mailingList, setMailingList] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getSubscriberById(id);
      if (status) setMailingList(data.list);
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
          <span className="text-3xl font-semibold text-dark">Subscriber Details</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/subscriber/subscriber-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">
              <div className="flex items-center gap-2">Customer Information</div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Name</h1>
              <p className="text-placeholder font-normal"> {mailingList?.name || 'No name available'}</p>
            </div>
            <div className="w-full mt-5">
              <h1 className="font-semibold text-primary">Email ID</h1>
              {mailingList?.email ? (
                <a className="text-placeholder font-normal" href={`mailto:${mailingList.email}`}>
                  {mailingList.email}
                </a>
              ) : (
                <p className="text-placeholder font-normal">No email available</p>
              )}
            </div>
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
              <p className="text-placeholder font-normal"> {mailingList?.header || 'No header available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">User Agent String</h1>
              <p className="text-placeholder font-normal"> {mailingList?.uastring || 'No User Agent String available'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Additional Information</span>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2">
              <div className="mt-5">
                <h1 className="font-semibold text-primary">IP Address</h1>
                <p className="text-placeholder font-normal"> {mailingList?.ipaddress || 'Not Present'}</p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Site Name</h1>
                <p className="text-placeholder font-normal"> {mailingList?.site?.name || 'No Site Name available'}</p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Date & Time</h1>
                <p className="text-placeholder font-normal"> {formatDateTime(mailingList?.createdAt) || 'No Date & Time available'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={viewMailingNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <Link to={'/subscriber/subscriber-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewSubscriber;
