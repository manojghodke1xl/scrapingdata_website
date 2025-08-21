import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
// import { formatDateTime } from '../../utils/dateFormats';
// import { viewEnquiryNote } from './EnquiryNotes';
// import NoteComponent from '../../atoms/common/NoteComponent';
// import CountryFlag from '../../atoms/common/CountryFlag';
import { getMetaDataByIdApi } from '../../apis/metadata-apis';


const ViewMetaData = () => {
    const { id } = useParams();
    const { setLoading } = useGlobalContext();
    const [metaData, setMetaData] = useState({});
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const { status, data } = await getMetaDataByIdApi(id);
            if (status) setMetaData(data.metaData);
            else showNotification('warn', data);

            console.log(data)
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
    console.log(metaData, "metaData")

    return (
        <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
            <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
                <div>
                    <span className="text-3xl font-semibold text-dark">Meta Data Details</span>
                </div>
                <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
                    <Link to={'/metadata/metadata-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
                        Back
                    </Link>
                </div>
            </div>

            <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="sm:w-7/12 w-full flex flex-col">
                        <span className=" text-primary">Basic Details</span>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Meta Title
                            </h1>
                            <p className="text-placeholder font-normal"> {metaData?.
                                meta_title
                                || 'No page available'}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">
                                Page</h1>
                            <p className="text-placeholder font-normal"> {metaData?.
                                page
                                || 'No page available'}</p>
                        </div>
                        <div className="w-full mt-5">
                            <h1 className="font-semibold text-primary">Description</h1>
                            <p className="text-placeholder font-normal"> {metaData?.
                                meta_description || 'Not Present'}</p>
                        </div>


                    </div>
                </div>
            </div>

            <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="sm:w-7/12 w-full flex flex-col">
                        <span className=" text-primary">
                            <div className="flex items-center gap-2">SEO & Social</div>
                        </span>
                    </div>
                    <div className="w-full">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">Keywords</h1>
                                <p className="text-placeholder font-normal"> {metaData?.keywords || 'No keywords available'}</p>
                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">OG Title</h1>
                                <p className="text-placeholder font-normal"> {metaData?.og_title || 'No OG Title available'}</p>


                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">OG Description</h1>
                                <p className="text-placeholder font-normal"> {metaData?.og_description || 'No Preferred OG Description available'}</p>
                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">OG Image URL</h1>
                                <p className="text-placeholder font-normal"> {metaData?.og_image || 'No Preferred OG Image URL available'}</p>
                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">Twitter Title</h1>
                                <p className="text-placeholder font-normal"> {metaData?.twitter_title || 'No Preferred MTwitter Title available'}</p>
                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">Twitter Image URL</h1>
                                <p className="text-placeholder font-normal"> {metaData?.twitter_image || 'No Preferred Twitter Image URL available'}</p>
                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">Twitter Description</h1>
                                <p className="text-placeholder font-normal"> {metaData?.twitter_description || 'No Preferred Twitter Description available'}</p>
                            </div>

                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">Robots Tag</h1>
                                <p className="text-placeholder font-normal"> {metaData?.robots || 'No Preferred Robots Tag available'}</p>
                            </div>
                            <div className="mt-5">
                                <h1 className="font-semibold text-primary">Canonical</h1>
                                <p className="text-placeholder font-normal"> {metaData?.canonical || 'No Preferred Canonical available'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="sm:w-7/12 w-full flex flex-col">
                        <span className="block text-primary">
                            <div className="flex items-center gap-2">Request Header Details</div>
                        </span>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Request Header</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.header || 'No header available'}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">User Agent String</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.uastring || 'No User Agent String available'}</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="sm:w-7/12 w-full flex flex-col">
                        <span className="block text-primary">
                            <div className="flex items-center gap-2">Attachments</div>
                        </span>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Resume URL</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.application_url?.resume ? <a href={`${enquiry?.application_url?.resume}`} target='_blank'>View Resume</a> : 'No Resume available'}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Cover Letter URL</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.application_url?.cover_letter ? <a href={`${enquiry?.application_url?.cover_letter}`} target='_blank'>View Cover Letter</a> : 'No Cover Letter available'}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Portfolio URL</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.application_url?.portfolio ? <a href={`${enquiry?.application_url?.portfolio}`} target='_blank'>View Portfolio</a> : 'No Portfolio URL available'}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Position Applying for</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.position_applying_for ? <p>{enquiry?.position_applying_for}</p> : 'No data about position applied for available'}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="font-semibold text-primary">Linkedin</h1>
                            <p className="text-placeholder font-normal"> {enquiry?.linkedin ? <a href={`${enquiry?.linkedin}`} target='_blank'>View LinkedIn</a> : 'No Linkedin URL available'}</p>
                        </div>
                    </div>
                </div>
            </div>  */}

            {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
                <NoteComponent note={viewEnquiryNote} />
            </div> */}
            {!isScrollable && (
                <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
                    <Link to={'/metadata/metadata-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
                        Back
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ViewMetaData;
