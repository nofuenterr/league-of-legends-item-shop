import styles from './BreadcrumbsControls.module.css'
import { Form, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import X from '../../../public/X'
import BreadcrumbsControlsContent from './BreadcrumbsControlsContent';

export default function BreadcrumbsControls({ controls, setControls }) {
  const dialogRef = useRef(null);
  const submit = useSubmit()
  const { tagFilter } = useLoaderData()

  useEffect(() => {
    if (controls && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [controls]);

  useEffect(() => {
      document.body.style.overflow = controls ? "hidden" : "";
    }, [controls]);

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
      if (e.key === "Escape") setControls(false);
    };

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setControls]);

  const controlsDialog = {
    initial: {
      x: "100%",
      width: 0,
      display: 'none',
      visibility: 'hidden',
      ariaHidden: 'true',
      alignContent: 'start',
    },
    expanded: { 
      x: "0%",
      width: '28rem',
      transition: { duration: 0.35, ease: "easeOut" },
      display: 'grid',
      visibility: 'visible',
      ariaHidden: 'false',
    },
    collapsed: {
      x: "100%",
      width: 0,
      transition: { duration: 0.35, ease: "easeIn" },
      display: 'none',
      visibility: 'hidden',
      ariaHidden: 'true',
    }
  }

  return (
    <>
      {controls && (
        <div
          className={styles.breadcrumbsControlsDialogOverlay}
          aria-hidden="true"
          onClick={() => setControls(false)}
        />
      )}
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        variants={controlsDialog}
        initial={'initial'}
        animate={controls ? "expanded" : "collapsed"}
        role='dialog'
        aria-modal="true"
        aria-describedby='breadcrumbsControlButton'
        className={styles.breadcrumbsControlsDialog} 
      >
        <div className={styles.breadcrumbsControlsDialogHeader}>
          <h2 className={styles.breadcrumbsControlsDialogHeading}>Refine</h2>
          <button
            className={styles.breadcrumbsControlsDialogCloseButton}
            aria-label='close dialog'
            onClick={() => setControls(prev => !prev)}
          >
            Close
            <X size={20} />
          </button>
        </div>

        {tagFilter.length > 0 
          ? (
            <div className={styles.filterTagsWrapper}>
              <div>
                <Form method='post'>
                  <button 
                    name='clearFilters'
                    value={true}
                    onChange={(e) => {
                      submit(e.currentTarget.form)
                    }}
                  >
                    <X size={20}/>
                    <span>Clear Filters</span>
                  </button>
                </Form>
              </div>

              {tagFilter.map(tag => {
                return (
                  <div key={tag}>
                    <Form method='post'>
                      <button 
                        name='tag'
                        value={tag}
                        onChange={(e) => {
                          submit(e.currentTarget.form)
                        }}
                      >
                      <X size={20} />
                      <span>{tag}</span>
                      </button>
                    </Form>
                  </div>
                )
              })}
            </div>
          )
          : null}
        <div className={styles.breadcrumbsControlsDialogContent}>
          <BreadcrumbsControlsContent />
        </div>
      </motion.div>
    </>
  )
}