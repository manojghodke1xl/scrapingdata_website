import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import { showNotification } from '../../utils/showNotification';
import { addMetaDataApi, getMetaDataByIdApi, updateMetaDataApi } from '../../apis/metadata-apis';
import { getAllSitesApi } from '../../apis/site-apis';
import DropDown from '../../atoms/formFields/DropDown';

const AddMetaData = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams(); // no default
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');
  const { setLoading, isLoading } = useGlobalContext();

  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await getAllSitesApi();
      setSiteList(res.data.sites);
    } catch (err) {
      console.error(err);
    }
  };

  const [errors, setErrors] = useState({});
  const [metaDetails, setMetaDetails] = useState({
    project_name: '',
    page: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    robots: '',
    canonical: ''
  });
  const [initialized, setInitialized] = useState(!id);

  const validate = () => {
    const newErrors = {};
    if (!metaDetails.project_name.trim()) newErrors.project_name = 'Project Name is required.';
    if (!metaDetails.page.trim()) newErrors.page = 'Page is required.';
    if (!metaDetails.meta_title.trim()) newErrors.meta_title = 'Meta Title is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    getMetaDataByIdApi(id)
      .then(({ status, data }) => {
        if (status && data.metaData) {
          const m = data.metaData;
          setMetaDetails({
            project_name: m.project_name || '',
            page: m.page || '',
            meta_title: m.meta_title || '',
            meta_description: m.meta_description || '',
            keywords: m.keywords || '',
            og_title: m.og_title || '',
            og_description: m.og_description || '',
            og_image: m.og_image || '',
            twitter_title: m.twitter_title || '',
            twitter_description: m.twitter_description || '',
            twitter_image: m.twitter_image || '',
            robots: m.robots || '',
            canonical: m.canonical || ''
          });
        } else showNotification('warn', data.message || 'Meta data missing');
      })
      .catch((err) => showNotification('error', err.message))
      .finally(() => {
        setInitialized(true);
        setLoading(false);
      });
  }, [id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...metaDetails };
    setLoading(true);

    try {
      const handler = id && !isDuplicate ? updateMetaDataApi(id, payload) : addMetaDataApi(payload);
      const { status, data } = await handler;

      if (status) {
        showNotification('success', data.message);
        navigate('/metadata/metadata-list');
      } else {
        showNotification('warn', data.message || data);
      }
    } catch (err) {
      showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) {
    return <div className="py-8 p-4 sm:p-8">Loading...</div>;
  }

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary flex flex-col gap-y-4 md:flex-row justify-between items-start md:items-end">
        <h1 className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Meta Data</h1>
        <FormButtons to="/metadata/metadata-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add Meta' : 'Save Changes') : 'Add Meta'} loading={isLoading} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="w-full border-b border-primary mt-7 pb-7">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full">
              <span className="text-primary">Basic Details</span>
            </div>
            <div className="w-full flex flex-col gap-y-5">
              <DropDown
                name="Project"
                label="Site"
                SummaryChild={<h5 className="p-0 m-0 text-primary">{siteList.find((site) => site.name === metaDetails.project_name)?.name || 'Site'}</h5>}
                dropdownList={siteList.map((site) => ({
                  id: site.name,
                  showName: site.name,
                  name: site.name
                }))}
                selected={metaDetails.project_name}
                search={true}
                commonFunction={(e) => setMetaDetails((prev) => ({ ...prev, project_name: e.id }))}
                error={errors.project_name}
              />

              <FormField
                label="Page"
                value={metaDetails.page}
                onChange={(e) => setMetaDetails((prev) => ({ ...prev, page: e.target.value }))}
                errorMessage={errors.page}
                required
              />
              <TextareaComponent
                label="Meta Description"
                value={metaDetails.meta_description}
                onChange={(e) => setMetaDetails((prev) => ({ ...prev, meta_description: e.target.value }))}
              />
              <FormField
                label="Meta Title"
                value={metaDetails.meta_title}
                onChange={(e) => setMetaDetails((prev) => ({ ...prev, meta_title: e.target.value }))}
                errorMessage={errors.meta_title}
                required
              />
            </div>
          </div>
        </div>

        {/* SEO & Social */}
        <div className="w-full border-b border-primary mt-7 pb-7">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full">
              <span className="text-primary">SEO & Social</span>
            </div>
            <div className="w-full flex flex-col gap-y-5">
              <FormField label="Keywords" value={metaDetails.keywords} onChange={(e) => setMetaDetails((prev) => ({ ...prev, keywords: e.target.value }))} />
              <FormField label="OG Title" value={metaDetails.og_title} onChange={(e) => setMetaDetails((prev) => ({ ...prev, og_title: e.target.value }))} />
              <TextareaComponent
                label="OG Description"
                value={metaDetails.og_description}
                onChange={(e) => setMetaDetails((prev) => ({ ...prev, og_description: e.target.value }))}
              />
              <FormField label="OG Image URL" type="url" value={metaDetails.og_image} onChange={(e) => setMetaDetails((prev) => ({ ...prev, og_image: e.target.value }))} />
              <FormField label="Twitter Title" value={metaDetails.twitter_title} onChange={(e) => setMetaDetails((prev) => ({ ...prev, twitter_title: e.target.value }))} />
              <TextareaComponent
                label="Twitter Description"
                value={metaDetails.twitter_description}
                onChange={(e) => setMetaDetails((prev) => ({ ...prev, twitter_description: e.target.value }))}
              />
              <FormField
                label="Twitter Image URL"
                type="url"
                value={metaDetails.twitter_image}
                onChange={(e) => setMetaDetails((prev) => ({ ...prev, twitter_image: e.target.value }))}
              />
              <FormField label="Robots Tag" value={metaDetails.robots} onChange={(e) => setMetaDetails((prev) => ({ ...prev, robots: e.target.value }))} />
              <FormField label="Canonical" value={metaDetails.canonical} onChange={(e) => setMetaDetails((prev) => ({ ...prev, canonical: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end pt-8">
          <FormButtons to="/metadata/metadata-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add Meta' : 'Save Changes') : 'Add Meta'} loading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default AddMetaData;
