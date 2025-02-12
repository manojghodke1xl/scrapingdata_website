import { useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../../atoms/formFields/FormButtons';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import FormField from '../../../atoms/formFields/InputField';
import { addTemplateCategoryApi, getTemplateCategoryByIdApi, updateTemplateCategoryApi } from '../../../apis/templates/template-category';
import { showNotification } from '../../../utils/showNotification';

const AddWebinar = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [templateCategory, setTemplateCategory] = useState({
    name: '',
    type: '',
    link: '',
    event: '',
    site: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchTemplateCategory = async () => {
        try {
          const { data } = await getTemplateCategoryByIdApi(id);
          setTemplateCategory(data.templateCategory);
        } catch (error) {
          showNotification('error', error.message);
        }
      };
      fetchTemplateCategory();
    }
  }, [id]);

  const handleVariableChange = (index, field, value) => {
    const updatedVariables = [...templateCategory.variableMap];
    updatedVariables[index][field] = value;
    setTemplateCategory((prev) => ({ ...prev, variableMap: updatedVariables }));
  };

  const removeVariable = (index) => {
    const updatedVariables = templateCategory.variableMap.filter((_, i) => i !== index);
    setTemplateCategory((prev) => ({ ...prev, variableMap: updatedVariables }));
  };
  const addVariable = () => {
    setTemplateCategory((prev) => ({
      ...prev,
      variableMap: [...prev.variableMap, { label: '', model: 'Event', key: '', name: '' }]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!templateCategory.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = id ? await updateTemplateCategoryApi(id, templateCategory) : await addTemplateCategoryApi(templateCategory);
      if (status) {
        showNotification('success', data.message);
        navigate('/template-category/template-category-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Template Category</span>
        </div>
        <FormButtons to="/template-category/template-category-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Category Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Category Name"
                type="text"
                id="fqaCategoryName"
                name="fqaCategoryName"
                placeholder="Category Name"
                onChange={(e) => {
                  setTemplateCategory((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={templateCategory.name}
                errorMessage={errors.name}
              />
              <FormField
                divClassName={'mt-5'}
                label="Module"
                type="text"
                id="fqaModule"
                name="fqaModule"
                placeholder="Module"
                onChange={(e) => {
                  setTemplateCategory((prev) => ({ ...prev, module: e.target.value }));
                  if (errors.module) setErrors((prev) => ({ ...prev, module: '' }));
                }}
                value={templateCategory.module}
                errorMessage={errors.module}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Variable Details</span>
          </div>
          <div className="w-full">
            <div>
              {templateCategory?.variableMap?.map((variable, index) => (
                <div key={index}>
                  <FormField
                    divClassName={'mt-5'}
                    label="Variable Label"
                    type="text"
                    id="variableLabel"
                    name="variableLabel"
                    placeholder="Variable Label"
                    onChange={(e) => handleVariableChange(index, 'label', e.target.value)}
                    value={variable.label}
                  />
                  <FormField
                    divClassName={'mt-5'}
                    label="Variable Model"
                    type="text"
                    id="variableModel"
                    name="variableModel"
                    placeholder="Variable Model"
                    onChange={(e) => handleVariableChange(index, 'model', e.target.value)}
                    value={variable.model}
                  />
                  <FormField
                    divClassName={'mt-5'}
                    label="Variable Key"
                    type="text"
                    id="variableKey"
                    name="variableKey"
                    placeholder="Variable Key"
                    onChange={(e) => handleVariableChange(index, 'key', e.target.value)}
                    value={variable.key}
                  />
                  <FormField
                    divClassName={'mt-5'}
                    label="Variable Name"
                    type="text"
                    id="variableName"
                    name="variableName"
                    placeholder="Variable Name"
                    onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                    value={variable.name}
                  />

                  <FormField
                    divClassName={'mt-5'}
                    label="Variable Data Type"
                    type="text"
                    id="variableType"
                    name="variableType"
                    placeholder="Variable Data Type"
                    onChange={(e) => handleVariableChange(index, 'dataType', e.target.value)}
                    value={variable.dataType}
                  />

                  {/* <DropDown
                    mt="mt-5"
                    name={'variableDataType'}
                    label={'Variable Data Type'}
                    SummaryChild={<h5 className="text-primary p-0 m-0">Phone Number</h5>}
                    dropdownList={phoneNumbers.map((phoneNumber) => ({ id: phoneNumber.phoneNumberId, showName: phoneNumber.phoneNumber, name: phoneNumber.phoneNumberId }))}
                    selected={whatsAppTemplate.phoneNumberId}
                    search={true}
                    commonFunction={(e) => {
                      setWhatsAppTemplate((prev) => ({ ...prev, phoneNumberId: e.name }));
                      if (errors.phoneNumberId) setErrors((prev) => ({ ...prev, phoneNumberId: '' }));
                    }}
                    error={errors.phoneNumberId}
                  /> */}
                  <button type="button" onClick={() => removeVariable(index)} className="px-4 py-2 mt-5 text-white bg-red text-sm rounded-xl">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addVariable} className="px-4 py-2 mt-5 bg-primary text-white rounded-xl hover:bg-blue">
                Add Variable
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editFaqCategoryNote : addFaqCategoryNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border-t border-primary">
          <FormButtons to="/template-category/template-category-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddWebinar;
