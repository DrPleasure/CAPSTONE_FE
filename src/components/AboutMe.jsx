import { motion, easeInOut, AnimatePresence } from "framer-motion";
import "./AboutMe.css"
import avatar from "../assets/avatargithub.jpg"
import { FiPhone, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { useState } from "react";


const AboutMe = () => {
    const [gifPlayed, setGifPlayed] = useState(false);

    const customEase = [0.6, -0.05, 0.01, 0.99];

    const handleGifComplete = () => {
        setGifPlayed(true);
      };

    return (
        <>
        <div className="d-flex">
            <div className="col-4">
                <motion.img id="avatar1" src={avatar}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{
                duration: 7,
                delay: 0.8,
                ease: [0.2, 0.51, 1, 1.5],
                
            }}
           

            >
                
                </motion.img> 
            
            </div>


            <div className="col-8 ">
                <div className="d-flex flex-column">
                    <div>
            <motion.h1 className="h1 mt-5"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
             transition={{ type: "spring", stiffness: 120, delay: 0 }}
            whileHover={{ scale: 1.4, delay: 0 }}
          >
            Olaf Glad
          </motion.h1>
          </div>
        <motion.div className="div gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 3, ease: "easeInOut" }}

        >
      
          <motion.p className="p my-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
           Feel free to reach out to me with any inquiries, curiosities or questions!
          </motion.p>
          <motion.p className="p1 my-5"
             initial={{ y: -100 }}
             animate={{ y: 0 }}
            transition={{type: "spring", delay: 5 }}
          >
            I'm always looking to learn new things and improve
            my skills.
          </motion.p>
          <motion.p className="p2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 8 }}
          >
            When I'm not coding, you can find me cooking or playing board games with my friends.
           
          </motion.p>



        </motion.div>
        </div>
        </div>
        </div>


        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ delay: 11, ease: "easeInOut" }}
>
  <div className="d-flex">
    <div className="d-flex flex-column contact col-6">
      <h2 className="h2">Contact Info</h2>
    
      <div className="d-flex">
        <FiLinkedin className="icon mb-2" />
        <p className="p2">linkedin.com/in/olafglad/</p>
      </div>
      <div className="d-flex">
        <FiGithub className="icon" />
        <p className="p2">github.com/DrPleasure</p>
      </div>
      <div className="d-flex">
        <FiMail className="icon" />
        <p className="p2">Olaf.glad.dk@gmail.com</p>
      </div>
    
      <div className="d-flex">
        <FiPhone className="icon" />
        <p className="p2">(+45) 2279-5380</p>
      </div> 
    </div>
    <motion.div
      className="thankyou my-5 gradient-text2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 13, ease: "easeInOut" }}
    >
      - Thank You
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 14, ease: "easeInOut" }}
      >
        for your time
      </motion.div>
    </motion.div>
  </div>
</motion.div>
        </>
      );
    };

export default AboutMe;