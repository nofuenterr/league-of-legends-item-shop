import styles from './Results.module.css'

function Results({ mainHeading, mainParagraph, children }) {
  return (
    <div className={styles.resultsWrapper}>
      <h1 className={styles.resultsHeading}>{mainHeading}</h1>
      <p>{mainParagraph}</p>
      {children}
      <div className={styles.resultsBackground}></div>
    </div>
  )
}

export default Results