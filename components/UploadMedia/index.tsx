import Dropzone from 'react-dropzone';

import styles from './styles.scss';

type Props = {
  setFile: (...args: any[]) => void;
  removeFile: (...args: any[]) => void;
  files: {
    preview: string;
  }[];
  uploadType: string;
};

const UploadMedia: React.FC<any> = ({ setFile, removeFile, files, uploadType }: Props) => {
  const thumbs = files.map((item, index) => (
    <div key={index}>
      <button onClick={() => removeFile()}>X</button>
      {uploadType === 'image' ? (
        <img src={item.preview} />
      ) : (
        <video style={{ margin: '0 auto' }} width="320" height="100" controls>
          <source src={item.preview} type="video/mp4" />
        </video>
      )}
    </div>
  ));

  return (
    <div className={styles['upload_wrapper']}>
      <div className={styles['label_container']}>
        <label>{uploadType}</label>
      </div>
      <div className={styles['file_uploader']}>
        <Dropzone
          onDrop={(acceptedFiles) =>
            setFile(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            )
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {files.length > 0 ? (
                  <div className={styles['thumbs_wrapper']}>{thumbs}</div>
                ) : (
                  <p>Drag n drop some files or click here...</p>
                )}
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default UploadMedia;
