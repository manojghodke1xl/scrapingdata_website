import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import ImageUpload from '../../atoms/formFields/ImageUpload';
import { getSampleCSVFile, uploadCSVFile } from '../../apis/metadata-apis';
import Papa from 'papaparse';

function ImportMetaData() {
    const navigate = useNavigate();
    const { setLoading, isLoading } = useGlobalContext();

    const [csvDetails, setCsvDetails] = useState({ file: null });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedFile = csvDetails?.file?.file;

        if (!selectedFile) {
            setErrors({ file: 'Please select a CSV file to upload.' });
            showNotification('warn', 'Please select a CSV file to upload.');
            return;
        }

        if (selectedFile.type !== 'text/csv') {
            setErrors({ file: 'Only CSV files are allowed.' });
            showNotification('warn', 'Only CSV files are allowed.');
            return;
        }

        setLoading(true);

        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const parsedData = results.data;
                const parseErrors = results.errors;

                if (parseErrors.length > 0) {
                    showNotification('error', 'CSV parse error: ' + parseErrors[0].message);
                    setLoading(false);
                    return;
                }

                if (!Array.isArray(parsedData) || parsedData.length === 0) {
                    showNotification('warn', 'CSV file is empty or invalid.');
                    setLoading(false);
                    return;
                }

                // Optional: validate required headers
                const expectedHeaders = ['project_name', 'page', 'meta_title', 'meta_description', 'keywords', 'og_title', 'og_description', 'og_image_url', 'twitter_title', 'twitter_description', 'twitter_image', 'robots', 'canonical']; // Change based on your schema
                const actualHeaders = Object.keys(parsedData[0]);
                const missing = expectedHeaders.filter(h => !actualHeaders.includes(h));
                if (missing.length > 0) {
                    showNotification('warn', `Missing headers: ${missing.join(', ')}`);
                    setLoading(false);
                    return;
                }

                try {
                    // console.log(parsedData)
                    const payload = { metadata: parsedData };

                    const response = await uploadCSVFile(payload);

                    if (response.status) {
                        showNotification('success', response.data.message);
                        navigate('/metadata/metadata-list');
                    } else {
                        showNotification('warn', response.data);
                    }
                } catch (error) {
                    showNotification('error', error.message || 'Upload failed.');
                } finally {
                    setLoading(false);
                }
            },
            error: (error) => {
                showNotification('error', 'Parsing failed: ' + error.message);
                setLoading(false);
            }
        });
    };

    const handleDownloadSample = async () => {
        try {
            setLoading(true);
            const { status, data } = await getSampleCSVFile();

            if (!status) {
                showNotification('warn', 'Failed to download sample file.');
                return;
            }

            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sample-metadata.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            showNotification('error', error.message || 'Download failed.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">

            <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
                <div>
                    <span className="text-3xl font-semibold text-dark">Import Metadata (CSV)</span>
                </div>
                <FormButtons to="/metadata/metadata-list" type="submit" onClick={handleSubmit} btnLebal={'Upload CSV'} loading={isLoading} />
            </div>

            <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="sm:w-7/12 w-full flex flex-col">
                        <span className="block text-primary">CSV</span>
                    </div>
                    <div className="w-full justify-center items-center mt-7 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
                        <ImageUpload
                            label="CSV File"
                            fieldName="file"
                            details={csvDetails}
                            setDetails={setCsvDetails}
                            error={errors.file}
                            setErrors={setErrors}
                            acceptedTypes={['text/csv']}
                            isDocument={true}
                            isRemovable={true}
                            maxFileSizeInMB={5}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
                <p>To download a sample csv file to check how to provide meta data <button className="border-b border-primary b-3" onClick={handleDownloadSample}>click here</button></p>
            </div>

            <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
                <FormButtons
                    to="/metadata/metadata-list"
                    type="submit"
                    onClick={handleSubmit}
                    btnLebal={'Upload CSV'}
                    loading={isLoading}
                />
            </div>
        </div >
    );
}

export default ImportMetaData;
