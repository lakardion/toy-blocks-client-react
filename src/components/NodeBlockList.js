import { useEffect, useState } from "react";

const NodeBlockList = ({ node }) => {
  const [blocks, setBlocks] = useState([]);

  const fetchBlocks = async () => {
    try {
      const response = await fetch(node.url + "/api/v1/blocks");
      const jsonResponse = await response.json();
      setBlocks(jsonResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  if (node.loading) {
    return <div>Loading ...</div>;
  } else if (!blocks.length) {
    return <div> There are no blocks available for the current server</div>;
  } else
    return (
      <div className="block-list">
        {blocks.map((b, idx) => (
          <div key={`block-${b.id}`} className="block">
            <div className="block-number">
              {(idx + 1).toString().padStart(3, "0")}
            </div>
            <div>{b.attributes.data}</div>
          </div>
        ))}
      </div>
    );
};

export default NodeBlockList;
