import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegImage } from 'react-icons/fa';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import FileUpload from '../../atoms/formFields/FileUpload';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { addEventTicketApi, getEventTicketByIdApi, updateEventTicketApi } from '../../apis/event-ticket-apis';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';

const AddEventTicket = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [eventTicket, setEventTicket] = useState({
    name: '',
    description: ''
    // image: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getEventTicketByIdApi(id);
          if (status) {
            const { image, ...rest } = data.ticket;
            setEventTicket((prev) => ({ ...prev, ...rest, image: image ? image._id : undefined, imageFile: image }));
          } else showNotification('warn', data);
        } catch (error) {
          showNotification('error', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!eventTicket.name) newErrors.name = 'Name is required';
    if (!eventTicket.image) newErrors.image = 'Ticket SVG is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateEventTicketApi(id, eventTicket) : addEventTicketApi(eventTicket));
      if (status) {
        showNotification('success', data.message);
        navigate('/tickets/ticket-list');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Ticket</span>
        </div>
        <FormButtons to="/tickets/ticket-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Ticket Details</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Ticket Name"
              type="text"
              id="name"
              name="name"
              placeholder="Ticket Name"
              required
              onChange={(e) => {
                setEventTicket((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              value={eventTicket.name}
              errorMessage={errors.name}
            />

            <TextareaComponent
              label="Description"
              placeholder="Enter a description..."
              id="description"
              name="description"
              value={eventTicket?.description}
              onChange={(e) => setEventTicket((prev) => ({ ...prev, description: e.target.value }))}
            />

            <FileUpload
              label={'Ticket Svg with {ticket_id} as variable'}
              logo={<FaRegImage className="text-primary text-2xl" />}
              error={errors.image}
              setErrors={setErrors}
              acceptedTypes={['.svg']}
              fieldName="image"
              isImage
              setDetails={setEventTicket}
              imagePreviewUrl={eventTicket?.imageFile?.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventTicket;
