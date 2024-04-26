import React, { useState } from 'react';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uris = ['http://localhost:3000/files/upload', 'http://localhost:3001/files/upload'];
        const uri = uris[Math.floor(Math.random() * uris.length)];
        const response = await fetch(uri, {
          method: 'POST',
          body: formData,
        });
        const responseData = await response.json();

        console.log(responseData);

        // Mettre à jour le state pour afficher le message de succès puis l'effacer après 3 secondes
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);

        setFile(null); // Vider l'input après l'upload
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
      {uploadSuccess && <div style={{ color: 'green' }}>Fichier uploadé avec succès.</div>}
    </form>
  );
};

export default FileUploader;