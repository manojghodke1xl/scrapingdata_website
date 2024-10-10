import React, { useState } from "react";

const FileUploadComponent = () => {
  const [files, setFiles] = useState([]);  // Store selected files
  const [proofs, setProofs] = useState([]);  // Store uploaded file IDs
  const [previews, setPreviews] = useState([]);  // Store file preview URLs

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);  // Save the selected files in state

    // Generate preview URLs for image files
    const filePreviews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(filePreviews);  // Set preview URLs in state
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) return;  // Ensure files are selected

    const filesArray = Object.values(files);

    filesArray.forEach(async (file) => {
      const { name, size, type: mime } = file;  // `mime` extracted from `type`
      try {
        // First, post file metadata to the API
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/upload`,
          {
            method: "POST",
            headers: {
              "Authorization": localStorage.getItem("auth"),
              "Content-Type": "application/json",  // Ensure JSON content type
            },
            body: JSON.stringify({ name, size, mime }),  // Ensure `mime` is sent
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to upload metadata: ${res.statusText}`);
        }

        const responseData = await res.json();  // Parse the JSON response

        // Validate that the URL is present in the response
        if (!responseData.data || !responseData.data.url) {
          throw new Error("Missing upload URL in the API response.");
        }

        console.log("Received upload metadata:", responseData);

        // Prepare FormData for the actual file upload
        const fd = new FormData();
        for (const [key, val] of Object.entries(responseData.data.fields)) {
          fd.append(key, val);
        }
        fd.append("file", file);

        // Update proofs state with the new file ID
        setProofs((prevProofs) => [...prevProofs, responseData.data._id]);

        // Send the file to the signed URL provided by the API
        const uploadRes = await fetch(responseData.data.url, {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          throw new Error(`Error uploading file ${name}: ${uploadRes.statusText}`);
        }

        console.log(`File ${name} uploaded successfully!`);
      } catch (error) {
        console.error("Error during file upload:", error.message || error);
      }
    });
  };

  return (
    <div>
      <h3>File Upload</h3>
      {/* File input */}
      <input type="file" onChange={handleFileChange} multiple />

      {/* Image previews */}
      <div>
        {previews.map((preview, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <img
              src={preview}
              alt={`preview-${index}`}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>

      {/* Display uploaded file IDs */}
      <div>
        <h4>Uploaded File IDs:</h4>
        <ul>
          {proofs.map((proof, index) => (
            <li key={index}>{proof}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadComponent;
