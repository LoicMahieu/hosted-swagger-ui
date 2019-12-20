import React, { useCallback } from "react";
import querystring from "querystring";
import "swagger-ui-react/swagger-ui.css";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const Drop = ({ onSrc }) => {
  const onDrop = useCallback(acceptedFiles => {
    const [file] = acceptedFiles;
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const binaryStr = reader.result;
      onSrc(binaryStr);
    };
    reader.readAsDataURL(file);

    console.log(file);
  }, [onSrc]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 20
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <pre>Drop the files here ...</pre>
      ) : (
        <pre>
          Please provide a `url` query parameter or drag 'n' drop a swagger file
          !
        </pre>
      )}
    </div>
  );
};

const DummyComponent = () => <div />;
const SwaggerUI =
  typeof window !== "undefined"
    ? require("swagger-ui-react").default
    : DummyComponent;

const App = ({ location: { search } }) => {
  const [src, setSrc] = useState();
  const query = search ? querystring.parse(search.replace(/^\?/, "")) : {};
  const { url } = query;

  if (typeof window === "undefined") {
    return <pre>Loading...</pre>;
  }

  if (src) {
    return <SwaggerUI url={src} />;
  } else if (url) {
    return <SwaggerUI url={url} />;
  }

  return <Drop onSrc={setSrc} />;
};

export default App;
