"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface MicrointeractionsProps {
  children: React.ReactNode;
}

export const FadeIn = ({ children }: MicrointeractionsProps) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref]);

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn = ({ children }: MicrointeractionsProps) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref]);

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerChildren = ({ children }: MicrointeractionsProps) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref]);

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children }: MicrointeractionsProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleOnHover = ({ children }: MicrointeractionsProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInOut = ({
  children,
  isVisible = true,
}: MicrointeractionsProps & { isVisible?: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const RotateOnScroll = ({ children }: MicrointeractionsProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      style={{
        rotate: scrollY * 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

export const Reveal = ({ children }: MicrointeractionsProps) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={setRef}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        }}
      >
        <motion.div
          variants={{
            hidden: { x: 0 },
            visible: { x: "100%" },
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 bg-steel-500 z-10"
        />
        {children}
      </motion.div>
    </div>
  );
};

const Microinteractions = {
  FadeIn,
  SlideIn,
  StaggerChildren,
  StaggerItem,
  ScaleOnHover,
  FadeInOut,
  RotateOnScroll,
  Reveal,
};

export default Microinteractions;