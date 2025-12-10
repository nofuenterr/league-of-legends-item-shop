import styles from './HeaderMenu.module.css'
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import X from '../icons/X';
import ChevronRight from '../icons/ChevronRight';

export default function HeaderMenu({ menu, setMenu, children }) {
  const dialogRef = useRef(null);
  const initialFocusRef = useRef(null);

  useEffect(() => {
    if (menu) {
      document.documentElement.classList.add("lock-scroll");
      document.body.classList.add("lock-scroll");
    } else {
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");
    }
  }, [menu]);

  useEffect(() => {
    if (menu && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [menu]);

  useEffect(() => {
      document.body.style.overflow = menu ? "hidden" : "";
    }, [menu]);

  useEffect(() => {
    if (!dialogRef.current) return;

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current.querySelectorAll(
        "a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setMenu(false);
    };

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setMenu]);

  const headerMenuDialog = {
    initial: {
      x: "100%",
      display: 'none',
      visibility: 'hidden',
      ariaHidden: 'true',
      alignContent: 'start',
    },
    expanded: { 
      x: "0%",
      transition: { duration: 0.35, ease: "easeOut" },
      display: 'grid',
      visibility: 'visible',
      ariaHidden: 'false',
    },
    collapsed: {
      x: "100%",
      transition: { duration: 0.35, ease: "easeIn" },
      display: 'none',
      visibility: 'hidden',
      ariaHidden: 'true',
    }
  }

  return (
    <>
      {menu && (
        <div
          className={styles.headerMenuDialogOverlay}
          aria-hidden="true"
          onClick={() => setMenu(false)}
        />
      )}
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        variants={headerMenuDialog}
        initial={'initial'}
        animate={menu ? "expanded" : "collapsed"}
        role='dialog'
        aria-modal="true"
        aria-describedby='headerMenuButton'
        className={styles.headerMenuDialog} 
      >
        <button
          style={{position: 'absolute', opacity: 0, pointerEvents: 'none'}}
          aria-hidden
          tabIndex={0}
          ref={initialFocusRef}
        />
        <div className={styles.headerMenuDialogHeader}>
          <h2 className={styles.headerMenuDialogHeading}>Menu</h2>
          <button
            className={styles.headerMenuDialogCloseButton}
            aria-label='close menu'
            onClick={() => setMenu(prev => !prev)}
          >
            Close
            <X size={20} />
          </button>
        </div>
        <div>
          <nav>
            <ul className={styles.headerMenuDialogNavLinkList}>
              <li>
                {children}
              </li>
              <li>
                <NavLink to='/' aria-label='home' onClick={() => setMenu(false)}>
                  <h3>
                    <span>Home</span>
                    <ChevronRight size={20} />
                  </h3>
                </NavLink>
              </li>
              <li>
                <NavLink to='/shop' aria-label='shop' onClick={() => setMenu(false)}>
                  <h3>
                    <span>Shop</span>
                    <ChevronRight size={20} />
                  </h3>
                </NavLink>
              </li>
              <li>
                <NavLink to='/sale' aria-label='sale' onClick={() => setMenu(false)}>
                  <h3>
                    <span>Sale</span>
                    <ChevronRight size={20} />
                  </h3>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>
    </>
  )
}