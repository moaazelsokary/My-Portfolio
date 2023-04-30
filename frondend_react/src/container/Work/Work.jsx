import React, { useState, useEffect } from "react";
import "./Work.scss";
import { motion } from "framer-motion";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client, urlFor } from "../../client";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [animatedCard, setAnimatedCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);
  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimatedCard({ y: 100, opacity: 0 });
    setTimeout(() => {
      setAnimatedCard({ y: 0, opacity: 1 });

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((w) => w.tags.includes(item)));
      }
    }, 500);
  };
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span>
        Section
      </h2>
      <div className="app__work-filter">
        {["SQL", "Excel", "Python","Full Projects", "All"].map((item, i) => (
          <div
          key={i}
          className={`app__work-filter-item app__flex p-text ${
            activeFilter === item ? "item-active" : ""
          }`}
          onClick={() => handleWorkFilter(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animatedCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
        >
        {filterWork.map((w, i) => (
             
          <div key={i} className="app__work-item app__flex">
            <div className="app__work-img app__flex">
              <img src={urlFor(w.imgUrl)} alt={w.name}  />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={w.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={w.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{w.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {w.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{w.tags[0]}</p>
              </div>
            </div>
          </div>
    
         
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "Projects",
  "app__primarybg"
);
