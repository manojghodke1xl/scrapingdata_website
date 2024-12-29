import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addFaqCategoryApi, getFaqCategoryByIdApi, updateFaqCategoryApi } from '../../apis/faqCategory-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addFaqCategoryNote, editFaqCategoryNote } from './FaqCategoryNotes';

const AddFaqCategory = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [fqaCategoryName, setFqaCategoryName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fqaCategoryName) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getFaqCategoryByIdApi(id);
          if (status) {
            const { name } = data.faqCategory;
            setFqaCategoryName(name);
          } else showNotification('warn', data);
        } catch (error) {
          showNotification('error', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const name = { name: fqaCategoryName };
      const { status, data } = await (id ? updateFaqCategoryApi(id, name) : addFaqCategoryApi(name));
      if (status) {
        showNotification('success', data.message);
        navigate('/faq-category/faq-category-list');
      } else showNotification('warn', data.message);
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} FAQ Category</span>
        </div>
        <FormButtons to="/faq-category/faq-category-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Category Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Faq Category Name"
                type="text"
                id="fqaCategoryName"
                name="fqaCategoryName"
                placeholder="Faq Category Name"
                onChange={(e) => {
                  setFqaCategoryName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={fqaCategoryName}
                errorMessage={errors.name}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editFaqCategoryNote : addFaqCategoryNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/faq-category/faq-category-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
        </div>
      )}
    </div>
  );
};

export default AddFaqCategory;
