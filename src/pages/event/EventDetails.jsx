import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id = '' } = useParams();
  const [isScrollable, setIsScrollable] = useState(false);

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

  console.log(id);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Event Details</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/events/event-list'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Event Details</span>
          </div>
          <div className="w-full grid grid-cols-1 gap-5">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Event Name</h1>
              <p className="text-secondary"></p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Venue</h1>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Validity Period</span>
          </div>
          <div className="w-full gap-5">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Date</h1>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Site Details</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-5">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Site</h1>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">
              <div className="flex items-center gap-2">Participants & Payment Details</div>
            </span>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-2 gap-5">
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Paticipant Count</h1>
                <p className="text-secondary"> </p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Success Payment</h1>
                <p className="text-secondary"></p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Tota Amount of Event</h1>
                <p className="text-secondary"></p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-primary">Failed Payment</h1>
                <p className="text-secondary"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <NoteComponent note={viewEnquiryNote} />
        </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <Link to={'/events/event-list'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
