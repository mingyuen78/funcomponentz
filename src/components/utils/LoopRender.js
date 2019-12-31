import React from "react";

function LoopRender(props) {
  //Props must have items in array.
  const [data, setData] = React.useState(props.data);
  React.useEffect(() => {
    setData(props.data);
    return () => {
      setData([]);
    };
  }, [props.data]);
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item.Name}</li>
      ))}
    </ul>
  );
}

export default LoopRender;
