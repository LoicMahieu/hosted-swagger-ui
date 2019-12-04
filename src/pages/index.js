import React from "react";
import querystring from "querystring";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const App = ({ location: { search } }) => {
  const query = search ? querystring.parse(search.replace(/^\?/, "")) : {};
  const { url } = query;

  if (!url) {
    return <pre>Missing `url` parameter !</pre>;
  }

  return <SwaggerUI url={url} />;
};

export default App;
