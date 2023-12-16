import { motion } from "framer-motion";

export default function Images(props) {
  const sbst = props.download_url.substr(0, 29);
  const width = props.width
    ? props.width
    : props.height
    ? props.height
    : props.defWidth;
  const height = props.height ? `/${props.height}` : `/${width}`;
  const grayscale = props.grayscale ? "?grayscale" : "";
  const blur = props.blur ? (props.grayscale ? "&blur=2" : "/?blur=2") : "";

  const styles = {
    width: `${width}px`,
    height: height[0] === "/" ? `${height.substr(1)}px` : `${height}px`,
  };

  const url = `${sbst}${width}${height}${grayscale}${blur}`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        delay: 0.25,
      }}
      className="image--card"
      style={styles}
    >
      <div className="image--pic_container">
        <img src={url.trim()} alt="Gallery image 1" className="image--pic" />
        <h4 className="image--author">By: {props.author}</h4>
      </div>
    </motion.div>
  );
}
