import React, { useEffect, useState } from 'react';

const FileList: React.FC = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
      let intervalId;
  
      const fetchFiles = async () => {
        try {
          const uris = ['http://localhost:3000/files', 'http://localhost:3001/files'];
          const uri = uris[Math.floor(Math.random() * uris.length)];
          const response = await fetch(uri);
          const filesData = await response.json();
          setFiles(filesData);
        } catch (error) {
          console.error('Erreur lors de la récupération des fichiers : ', error);
        }
      };
  
      fetchFiles();
  
      intervalId = setInterval(fetchFiles, 3000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);

  return (
    <div>
      <h2>Liste des Fichiers</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;