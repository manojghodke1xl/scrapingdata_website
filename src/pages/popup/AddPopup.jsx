import { useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import { useEffect, useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormField from '../../atoms/formFields/InputField';
import DropDown from '../../atoms/formFields/DropDown';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { showNotification } from '../../utils/showNotification';
import { addPopupApi, getPopupById, updatePopupApi } from '../../apis/popup-apis';
import FileUpload from '../../atoms/formFields/FileUpload';
import { CiImageOn } from 'react-icons/ci';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { formatDateTime } from '../../utils/dateFormats';
import { getAllGuidesApi } from '../../apis/guide-apis';
import { getAllCaseStudyApi } from '../../apis/caseStudy-apis';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addPopupNote, editPopupNote } from './PopupNotes';

const AddPopup = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading
  } = useGlobalContext();

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [popupDetails, setPopupDetails] = useState({
    name: '',
    position: '',
    onPageLoad: false,
    onPageUnload: false,
    afterPageLoad: 1,
    atPageScroll: 0,
    offOnceSubmited: false,
    againWhenCanceled: 1,
    showOnDeviceType: 'all',
    publishDate: '',
    archiveDate: '',
    contentType: 'basic',
    title: '',
    desc: '',
    allGlobalGuides: false,
    allSiteGuides: false,
    moreGuides: [],
    allGlobalCaseStudy: false,
    allSiteCaseStudy: false,
    moreCaseStudies: [],
    isActive: true,
    site: ''
  });
  const [contentDetials, setContentDetials] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getPopupById(id);
        if (status) {
          const { publishDate, archiveDate, image, ...rest } = data.popup;
          const [formattedPublishDate, formattedArchiveDate] = [new Date(publishDate), new Date(archiveDate)].map((date) => date.toISOString().slice(0, 24));
          setPopupDetails((prev) => ({
            ...prev,
            ...rest,
            image: image ? image?._id : '',
            imageFile: image,
            publishDate: formattedPublishDate,
            archiveDate: formattedArchiveDate
          }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  useEffect(() => {
    (async () => {
      const { status, data } = await (popupDetails.contentType === 'guide'
        ? getAllGuidesApi()
        : popupDetails.contentType === 'casestudy'
        ? getAllCaseStudyApi()
        : Promise.resolve({ status: false }));
      if (status) {
        popupDetails.contentType === 'guide' ? setContentDetials(data.guides) : popupDetails.contentType === 'casestudy' ? setContentDetials(data.casestudies) : '';
      } else if (data) showNotification('warn', data);
    })();
  }, [popupDetails.contentType]);
  const validate = () => {
    const newErrors = {};
    if (!popupDetails.name) newErrors.name = 'Name is required';
    if (!popupDetails.position) newErrors.position = 'Position is required';
    if (!popupDetails.site) newErrors.site = 'At least one site must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updatePopupApi(id, popupDetails) : addPopupApi(popupDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/pop-up/pop-up-list');
      } else {
        showNotification('warn', data);
      }
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSettingsChange = (selected) => {
    const newPopupDetails = { ...popupDetails };
    // First, set all possible options to false
    getOptions().forEach((option) => (newPopupDetails[option._id] = false));
    // Then set selected options to true
    selected.forEach((optionId) => (newPopupDetails[optionId] = true));
    setPopupDetails(newPopupDetails);
  };

  // Generate all the possible options based on contentType
  const getOptions = () => {
    const options = [
      { _id: 'onPageLoad', name: 'On Page Load' },
      { _id: 'onPageUnload', name: 'On Page Unload' },
      { _id: 'offOnceSubmited', name: 'Off Once Submited' }
    ];

    if (popupDetails.contentType === 'guide') options.push({ _id: 'allGlobalGuides', name: 'All Global Guides' }, { _id: 'allSiteGuides', name: 'All Site Guides' });

    if (popupDetails.contentType === 'casestudy')
      options.push({ _id: 'allGlobalCaseStudy', name: 'All Global Case Studies' }, { _id: 'allSiteCaseStudy', name: 'All Site Case Studies' });

    return options;
  };

  // Modify how we determine selected items
  const getSelectedSettings = () => {
    return Object.keys(popupDetails).filter(
      (key) =>
        popupDetails[key] === true && ['onPageLoad', 'onPageUnload', 'offOnceSubmited', 'allGlobalGuides', 'allSiteGuides', 'allGlobalCaseStudy', 'allSiteCaseStudy'].includes(key)
    );
  };

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Popup</span>
        </div>
        <FormButtons to="/pop-up/pop-up-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Popup Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Name"
                type="text"
                id="title"
                name="title"
                placeholder="Name"
                onChange={(e) => {
                  setPopupDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={popupDetails.name}
                errorMessage={errors.name}
              />
              <DropDown
                name="position"
                SummaryChild={<h5 className="p-0 m-0 text-primary">{popupDetails.positionObj ? popupDetails.positionObj.showName : 'Position'}</h5>}
                dropdownList={[
                  { id: 0, showName: 'Center-popup', name: 'center-popup' },
                  { id: 1, showName: 'Topbar-Notifications', name: 'topbar-notifications' }
                ]}
                selected={popupDetails.position}
                search={true}
                commonFunction={(e) => {
                  setPopupDetails((prev) => ({ ...prev, position: e.name, positionObj: e }));
                  if (errors.position) setErrors((prev) => ({ ...prev, position: '' }));
                }}
                error={errors.position}
              />

              <DropDown
                name="contentType"
                SummaryChild={<h5 className="p-0 m-0 text-primary">{popupDetails.contentObj ? popupDetails.contentObj.showName : 'Basic'}</h5>}
                dropdownList={[
                  { id: 0, showName: 'Basic', name: 'basic' },
                  { id: 1, showName: 'Guide', name: 'guide' },
                  { id: 2, showName: 'Case Study', name: 'casestudy' }
                ]}
                selected={popupDetails.contentType}
                search={true}
                commonFunction={(e) =>
                  setPopupDetails((prev) => ({
                    ...prev,
                    contentType: e.name,
                    contentObj: e,
                    ...(e.name === 'casestudy'
                      ? { allGlobalGuides: false, allSiteGuides: false, moreGuides: [], image: undefined, imageFile: null }
                      : e.name === 'guide'
                      ? { allGlobalCaseStudy: false, allSiteCaseStudy: false, moreCaseStudies: [], image: undefined, imageFile: null }
                      : {
                          allGlobalGuides: false,
                          allSiteGuides: false,
                          moreGuides: [],
                          allGlobalCaseStudy: false,
                          allSiteCaseStudy: false,
                          moreCaseStudies: []
                        })
                  }))
                }
              />

              {popupDetails.contentType === 'basic' && (
                <div>
                  <FormField
                    label="Title"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    onChange={(e) => {
                      setPopupDetails((prev) => ({ ...prev, title: e.target.value }));
                      if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                    }}
                    value={popupDetails.title}
                    errorMessage={errors.title}
                  />
                  <FileUpload
                    logo={<CiImageOn className="text-primary text-2xl" />}
                    error={errors.image}
                    setErrors={setErrors}
                    acceptedTypes={['.jpeg', '.png']}
                    fieldName="image"
                    isImage
                    setDetails={setPopupDetails}
                    imagePreviewUrl={popupDetails.imageFile?.url}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Trigger Conditions</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <FormField
                label="After Page Load"
                type="number"
                id="afterPageLoad "
                name="afterPageLoad "
                placeholder="After Page Load"
                onChange={(e) => setPopupDetails((prev) => ({ ...prev, afterPageLoad: e.target.value }))}
                value={popupDetails.afterPageLoad}
              />
              <FormField
                label="At Page Scroll"
                type="number"
                id="atPageScroll"
                name="atPageScroll"
                placeholder="At Page Scroll"
                onChange={(e) => setPopupDetails((prev) => ({ ...prev, atPageScroll: e.target.value }))}
                value={popupDetails.atPageScroll}
              />

              <FormField
                label="Again when Cancelled"
                type="number"
                id="againWhenCanceled"
                name="againWhenCanceled"
                placeholder="Again when Cancelled"
                onChange={(e) => setPopupDetails((prev) => ({ ...prev, againWhenCanceled: e.target.value }))}
                value={popupDetails.againWhenCanceled}
              />

              <DropDown
                name="type"
                SummaryChild={<h5 className="p-0 m-0 text-primary">{popupDetails.deviceObj ? popupDetails.deviceObj.showName : 'All'}</h5>}
                dropdownList={[
                  { id: 0, showName: 'All', name: 'all' },
                  { id: 1, showName: 'Desktop', name: 'desktop' },
                  { id: 2, showName: 'Mobile', name: 'mobile' }
                ]}
                selected={popupDetails.showOnDeviceType}
                search={true}
                commonFunction={(e) => setPopupDetails((prev) => ({ ...prev, showOnDeviceType: e.name, deviceObj: e }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Content Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <>
                <label className="block text-sm font-medium text-primary">Settings</label>
                <MultiSelectCheckbox marginTop="mt-2" options={getOptions()} label="Select Settings" onChange={handleSettingsChange} selected={getSelectedSettings()} />
              </>

              {popupDetails.contentType === 'guide' || popupDetails.contentType === 'casestudy' ? (
                <>
                  <label className="block text-sm font-medium text-primary mt-5">Additional {popupDetails.contentType === 'guide' ? 'Guides' : 'Case Studies'}</label>
                  <MultiSelectCheckbox
                    marginTop="mt-2"
                    options={contentDetials.map((content) => ({
                      _id: content._id,
                      name: content.title
                    }))}
                    label={`Select ${popupDetails.contentType === 'guide' ? 'Guides' : 'Case Studies'}`}
                    onChange={(selected) => {
                      setPopupDetails((prev) => ({
                        ...prev,
                        [popupDetails.contentType === 'guide' ? 'moreGuides' : 'moreCaseStudies']: selected
                      }));
                    }}
                    selected={popupDetails.contentType === 'guide' ? popupDetails.moreGuides : popupDetails.moreCaseStudies}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Date & Time Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <DateTimePicker
                id={'publishDate'}
                label={'Publish Date'}
                placeholder={formatDateTime(new Date())}
                selectedDateTime={popupDetails.publishDate}
                setSelectedDateTime={(e) => setPopupDetails((prev) => ({ ...prev, publishDate: e }))}
              />
              <DateTimePicker
                id={'archiveDate'}
                label={'Archive Date'}
                placeholder={formatDateTime(new Date())}
                selectedDateTime={popupDetails.archiveDate}
                setSelectedDateTime={(e) => setPopupDetails((prev) => ({ ...prev, archiveDate: e }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site & Status</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <DropDown
                name="Sites"
                dropdownList={availableSites.map((site) => ({ id: site._id, showName: site.name, name: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">{popupDetails.siteObj ? popupDetails.siteObj.showName : 'Sites'}</h5>}
                search={true}
                selected={popupDetails.site}
                commonFunction={(e) => {
                  setPopupDetails((prev) => ({ ...prev, site: e.name, siteObj: e }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />

              {popupDetails.contentType === 'basic' && (
                <TextareaComponent
                  label="Description"
                  id="description"
                  name="description"
                  placeholder="Enter a description..."
                  onChange={(e) => {
                    setPopupDetails((prev) => ({ ...prev, desc: e.target.value }));
                  }}
                  value={popupDetails.desc}
                />
              )}

              <ToggleComponent
                label={'Is Popup Active?'}
                isEnableState={popupDetails.isActive}
                setIsEnableState={(value) => setPopupDetails((prev) => ({ ...prev, isActive: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editPopupNote : addPopupNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/pop-up/pop-up-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
        </div>
      )}
    </div>
  );
};

export default AddPopup;
