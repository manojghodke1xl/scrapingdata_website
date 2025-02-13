import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import { showNotification } from '../../utils/showNotification';
import { addUtmBuilderApi, getUtmBuilderByIdApi, updateUtmBuilderApi } from '../../apis/utm-builder-apis';

const AddUTMBuilder = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);
  const [UTMBuilderDetails, setUTMBuilderDetails] = useState({
    url: '',
    name: '',
    medium: '',
    source: '',
    content: '',
    term: '',
    campaignId: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getUtmBuilderByIdApi(id);
        if (status) setUTMBuilderDetails(data.utmBuilder);
        else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addUtmBuilderApi(UTMBuilderDetails) : updateUtmBuilderApi(id, UTMBuilderDetails)) : addUtmBuilderApi(UTMBuilderDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/utm-builder/utm-builder-list');
      } else showNotification('error', data);
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
  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} UTM Builder</span>
        </div>
        <FormButtons to="/utm-builder/utm-builder-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">UTM Builder Details</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <FormField
                label="URL"
                type="url"
                id="url"
                name="url"
                placeholder="URL"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, url: e.target.value }));
                  if (errors.url) setErrors((prev) => ({ ...prev, url: '' }));
                }}
                value={UTMBuilderDetails.url}
                errorMessage={errors.url}
              />
              <FormField
                label="Campaign Name"
                type="text"
                id="name"
                name="name"
                placeholder="Campaign Name"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={UTMBuilderDetails.name}
                errorMessage={errors.name}
              />
              <FormField
                label="Medium"
                type="text"
                id="medium"
                name="medium"
                placeholder="Medium"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, medium: e.target.value }));
                  if (errors.medium) setErrors((prev) => ({ ...prev, medium: '' }));
                }}
                value={UTMBuilderDetails.medium}
                errorMessage={errors.medium}
              />

              <FormField
                label="Source"
                type="text"
                id="source"
                name="source"
                placeholder="Source"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, source: e.target.value }));
                  if (errors.source) setErrors((prev) => ({ ...prev, source: '' }));
                }}
                value={UTMBuilderDetails.source}
                errorMessage={errors.source}
              />
              <FormField
                label="Content"
                type="text"
                id="content"
                name="content"
                placeholder="Content"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, content: e.target.value }));
                  if (errors.content) setErrors((prev) => ({ ...prev, content: '' }));
                }}
                value={UTMBuilderDetails.content}
                errorMessage={errors.content}
              />

              <FormField
                label="Term"
                type="text"
                id="term"
                name="term"
                placeholder="Term"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, term: e.target.value }));
                  if (errors.term) setErrors((prev) => ({ ...prev, term: '' }));
                }}
                value={UTMBuilderDetails.term}
                errorMessage={errors.term}
              />

              <FormField
                label="Campaign Id"
                type="text"
                id="campaignId"
                name="campaignId"
                placeholder="Campaign Id"
                onChange={(e) => {
                  setUTMBuilderDetails((prev) => ({ ...prev, campaignId: e.target.value }));
                  if (errors.campaignId) setErrors((prev) => ({ ...prev, campaignId: '' }));
                }}
                value={UTMBuilderDetails.campaignId}
                errorMessage={errors.campaignId}
              />
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/utm-builder/utm-builder-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddUTMBuilder;
