import styles from './Results.module.css'

function Results({ mainHeading, mainParagraph, bottomText, children }) {
  return (
    <div>
      <div className={styles.resultsMain}>
        <h1 className={styles.resultsMainHeading}>{mainHeading}</h1>
        <p>{mainParagraph}</p>
        {children}
        <div className={styles.resultsMainBackground}></div>
      </div>
      <div className={styles.resultsBottom}>
        <p>{bottomText}</p>
      </div>
    </div>
  )
}

export default Results