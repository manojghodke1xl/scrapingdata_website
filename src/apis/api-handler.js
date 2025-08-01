export const getMethodCall = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('auth') }
    });
    const data = await response.json();
    if (response.ok) {
      return { status: true, data: data.data };
    } else {
      return { status: false, data: data.error };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const postMethodCall = async (url, userData, contentType = 'application/json') => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('auth'),
        'Content-Type': contentType
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (response.ok) {
      return { status: true, data: data };
    } else {
      return { status: false, data: data.error };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
};

// Post method api call to upload file
export const postMethodCallForFormWithFile = async (url, data, isMultipart = false) => {
  try {
    const headers = {
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
      Authorization: localStorage.getItem('auth')
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: isMultipart ? data : JSON.stringify(data)
    });

    const result = await response.json();
    return { status: response.ok, data: result };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const postMethodCallTestimonial = async (url, data, isMultipart = false) => {
  try {
    const headers = {
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
      Authorization: localStorage.getItem('auth')
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: isMultipart ? data : JSON.stringify(data)
    });

    const result = await response.json();
    return { status: response.ok, data: result };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const putMethodCall = async (url, userData, contentType = 'application/json') => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('auth'),
        'Content-Type': contentType
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (response.ok) {
      return { status: true, data: data };
    } else {
      return { status: false, data: data.error };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
};

export const putMethodCallTestimonial = async (url, data, isMultipart = false) => {
  try {
    const headers = {
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
      Authorization: localStorage.getItem('auth')
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: isMultipart ? data : JSON.stringify(data)
    });

    const result = await response.json();
    return { status: response.ok, data: result };
  } catch (error) {
    return { status: false, data: error.message };
  }
};

// Put method api call to upload file
export const putMethodCallForFormWithFile = async (url, data, isMultipart = false) => {
  try {
    const headers = {
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
      Authorization: localStorage.getItem('auth')
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: isMultipart ? data : JSON.stringify(data)
    });

    const result = await response.json();
    return { status: response.ok, data: result };
  } catch (error) {
    return { status: false, data: error.message };
  }
};
export const deleteMethodCall = async (url, body, contentType = 'application/json') => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('auth'),
        'Content-Type': contentType
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (response.ok) {
      return { status: true, data: data };
    } else {
      return { status: false, data: data.error };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
};

// utility method to download file from server:
export const downloadFile = async (url, contentType = 'text/csv') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': contentType
    }
  });

  if (!response.ok) {
    return { status: false, data: 'Failed to download file' };
  }

  const blob = await response.blob();
  console.log(blob);
  return { status: true, data: blob };
};
