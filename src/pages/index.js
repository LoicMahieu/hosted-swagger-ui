import React from "react";
import querystring from "querystring";
import "swagger-ui-react/swagger-ui.css";

const DummyComponent = () => <div />;
const SwaggerUI =
  typeof window !== "undefined"
    ? require("swagger-ui-react").default
    : DummyComponent;

const App = ({ location: { search } }) => {
  const query = search ? querystring.parse(search.replace(/^\?/, "")) : {};
  const { url } = query;

  if (typeof window === "undefined") {
    return <pre>Loading...</pre>;
  }

  if (!url) {
    return <pre>Missing `url` parameter !</pre>;
  }

  return <SwaggerUI url={url} />;
};

export default App;
