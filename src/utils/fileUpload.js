export async function uploadFile({
  file = null,
  isImage = false,
  isPdf = false,
  isVideo = false,
  alert = () => {},
  setDetails = () => {},
  fieldName = "image",
}) {
  if (!file) return;

  const { name, size, type } = file;

  const validImageTypes = ["image/jpeg", "image/png"];
  const validPdfTypes = ["application/pdf"];
  const validVideoTypes = ["video/mp4", "video/quicktime"];

  if (isImage && !validImageTypes.includes(type)) {
    alert({ type: "warning", text: "Only PNG or JPEG formats are allowed for image uploads." });
    return;
  }

  if (isPdf && !validPdfTypes.includes(type)) {
    alert({ type: "warning", text: "Only PDF files are allowed for uploads." });
    return;
  }

  if (isVideo && !validVideoTypes.includes(type)) {
    alert({ type: "warning", text: "Only MP4 or MOV formats are allowed for video uploads." });
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth"),
      },
      body: JSON.stringify({ name, size, mime: type }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Failed to get upload URL");
    }

    const { data } = await res.json();
    const fd = new FormData();
    for (const [key, val] of Object.entries(data.fields)) {
      fd.append(key, val);
    }

    fd.append("file", file);

    const uploadRes = await fetch(data.url, {
      method: "POST",
      body: fd,
    });

    if (!uploadRes.ok) {
      throw new Error("File upload failed");
    }

    const fileId = data._id;

    setDetails((prevDetail) => ({
      ...prevDetail,
      [fieldName]: fileId,
    }));
  } catch (error) {
    console.error("Upload error:", error);
    alert({ type: "danger", text: error.message });
  }
}
