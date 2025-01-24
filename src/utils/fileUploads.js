import { showNotification } from './showNotification';

export const uploadFile = async ({ file = null, isImage = false, isPdf = false, isVideo = false, setDetails = () => {}, fieldName = 'image' }) => {
  if (!file) return;

  const { name, size, type } = file;

  const validImageTypes = ['image/jpeg', 'image/png'];
  const validPdfTypes = ['application/pdf'];
  const validVideoTypes = ['video/mp4', 'video/quicktime'];

  if (isImage && !validImageTypes.includes(type)) {
    showNotification('warn', 'Only PNG or JPEG formats are allowed for image uploads.');
    return;
  }

  if (isPdf && !validPdfTypes.includes(type)) {
    showNotification('warn', 'Only PDF files are allowed for uploads.');
    return;
  }

  if (isVideo && !validVideoTypes.includes(type)) {
    showNotification('warn', 'Only MP4 or MOV formats are allowed for video uploads.');
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('auth')
      },
      body: JSON.stringify({ name, size, mime: type })
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Failed to get upload URL');
    }

    const { data } = await res.json();
    const fd = new FormData();
    for (const [key, val] of Object.entries(data.fields)) fd.append(key, val);

    fd.append('file', file);

    const uploadRes = await fetch(data.url, { method: 'POST', body: fd });

    if (!uploadRes.ok) throw new Error('File upload failed');

    const fileId = data._id;

    setDetails((prevDetail) => ({ ...prevDetail, [fieldName]: fileId }));
  } catch (error) {
    console.error('Upload error:', error);
    showNotification('error', error.message);
  }
};

export const uploadMultipleFiles = async (files = []) => {
  if (!files.length) return;

  const fileIds = [];

  for (const file of files) {
    const { name, size, type } = file;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('auth')
      },
      body: JSON.stringify({ name, size, mime: type })
    });

    const { data, error } = await res.json();

    if (!res.ok) throw new Error(error || 'Failed to get upload details');

    const fd = new FormData();
    for (const [key, val] of Object.entries(data.fields)) fd.append(key, val);
    fd.append('file', file);

    const uploadRes = await fetch(data.url, { method: 'POST', body: fd });

    if (!uploadRes.ok) throw new Error('File upload failed');

    fileIds.push(data._id);
  }

  return fileIds;
};

export const uploadMultipleCustomFiles = async (files = []) => {
  if (!files.length) return;

  const fileIds = [];

  for (const userFile of files) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('auth')
      },
      body: JSON.stringify({ name: userFile.customName, size: userFile.file.size, mime: userFile.file.type })
    });

    const { data, error } = await res.json();

    if (!res.ok) throw new Error(error || 'Failed to get upload details');

    const fd = new FormData();
    for (const [key, val] of Object.entries(data.fields)) fd.append(key, val);
    fd.append('file', userFile.file);

    const uploadRes = await fetch(data.url, { method: 'POST', body: fd });

    if (!uploadRes.ok) throw new Error('File upload failed');

    fileIds.push(data._id);
  }

  return fileIds;
};
