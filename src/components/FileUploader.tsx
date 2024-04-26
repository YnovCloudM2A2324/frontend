import React, { useState } from 'react';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:3000/files/upload', {
          method: 'POST',
          body: formData,
        });
        const responseData = await response.json();

        console.log(responseData);
        // Gérer l'état ici après l'upload du fichier 
      } catch (error) {
        console.error('Il y a eu une erreur lors du téléchargement du fichier : ', error);
      }
    }
  };

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="file" onChange={fileChangeHandler} />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default FileUploader;