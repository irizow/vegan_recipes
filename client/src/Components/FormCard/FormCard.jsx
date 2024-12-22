import styles from './formcard.module.css'

export default function FormCard({children, setIndex}) {


    return (
        <div className={styles.formcard}>
            {children}
            <button onClick={()=> {setIndex(index+1)}}>Next</button>
        </div>
    )
}