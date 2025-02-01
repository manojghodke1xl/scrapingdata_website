import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { getAllFaqCategoriesApi } from '../../apis/faqCategory-apis';
import { showNotification } from '../../utils/showNotification';
import { addFaqApi, getFaqByIdApi, updateFaqApi } from '../../apis/faq-apis';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addFaqNote, editFaqNote } from './faqNotes';

const AddFaq = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [faqDetails, setFaqDetails] = useState({
    question: '',
    answer: '',
    sites: [],
    faqCategory: [],
    isActive: true,
    isGlobal: false
  });
  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);
  const [availableFaqCategories, setAvailableFaqCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllFaqCategoriesApi();
      if (status) setAvailableFaqCategories(data.faqCategories);
      else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getFaqByIdApi(id);
        if (status) {
          const { sites, faqCategory, ...rest } = data.faq;
          setFaqDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            faqCategory: faqCategory?.map((c) => c._id)
          }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!faqDetails.question.trim()) newErrors.question = 'Please enter question.';
    if (!faqDetails.answer.trim()) newErrors.answer = 'Please enter answer.';
    if (!faqDetails.sites.length) newErrors.sites = 'Please select at least one site.';
    if (!faqDetails.faqCategory.length) newErrors.faqCategory = 'Please select at least one faq category.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addFaqApi(faqDetails) : updateFaqApi(id, faqDetails)) : addFaqApi(faqDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/faq/faq-list');
      } else showNotification('warn', data);
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} FAQ</span>
        </div>
        <FormButtons to="/faq/faq-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">FAQ Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Question"
                type="text"
                id="question"
                name="question"
                placeholder="Question"
                onChange={(e) => {
                  setFaqDetails((prev) => ({ ...prev, question: e.target.value }));
                  if (errors.question) setErrors((prev) => ({ ...prev, question: '' }));
                }}
                value={faqDetails.question}
                errorMessage={errors.question}
              />

              <TextareaComponent
                label="Answer"
                placeholder="Answer..."
                id="answer"
                name="answer"
                value={faqDetails.answer}
                onChange={(e) => setFaqDetails((prev) => ({ ...prev, answer: e.target.value }))}
                errorMessage={errors.answer}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Category and Site Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites
                  .filter((site) => site.modules?.some((module) => module.faq === true))
                  .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
                label="Select Sites"
                onChange={(selected) => {
                  setFaqDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                selected={faqDetails.sites}
                error={errors.sites}
              />
              <MultiSelectCheckbox
                divClassName={'mt-5'}
                options={availableFaqCategories}
                label="Select Faq Categories"
                onChange={(selected) => {
                  setFaqDetails((prev) => ({ ...prev, faqCategory: selected }));
                  if (errors.faqCategory) setErrors((prev) => ({ ...prev, faqCategory: '' }));
                }}
                selected={faqDetails.faqCategory}
                error={errors.faqCategory}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">FAQ Status and Visibility</span>
          </div>
          <div className="dropdown-container relative w-full mt-2">
            <ToggleComponent
              divClassName={''}
              label={'Is FAQ Active?'}
              isEnableState={faqDetails.isActive}
              setIsEnableState={(value) => setFaqDetails((prev) => ({ ...prev, isActive: value }))}
            />
            <ToggleComponent label={'Is FAQ Global?'} isEnableState={faqDetails.isGlobal} setIsEnableState={(value) => setFaqDetails((prev) => ({ ...prev, isGlobal: value }))} />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editFaqNote : addFaqNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/faq/faq-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddFaq;
