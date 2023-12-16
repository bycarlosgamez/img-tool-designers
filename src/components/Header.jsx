import { motion } from "framer-motion";

export default function Header() {
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
        delay:0.25
      }}
      className="header--container"
    >
      <h1 className="header">Placeholder Image Generator</h1>
    </motion.div>
  );
}
