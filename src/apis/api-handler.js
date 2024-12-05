export const getMethodCall = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: localStorage.getItem("auth") },
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

export const postMethodCall = async (url, userData, contentType = "application/json") => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("auth"),
        "Content-Type": contentType,
      },
      body: JSON.stringify(userData),
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

export const putMethodCall = async (url, userData, contentType = "application/json") => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("auth"),
        "Content-Type": contentType,
      },
      body: JSON.stringify(userData),
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

export const deleteMethodCall = async (url, ids, contentType = "application/json") => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("auth"),
        "Content-Type": contentType,
      },
      body: JSON.stringify({ ids }),
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
