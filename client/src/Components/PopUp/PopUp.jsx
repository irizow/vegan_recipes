import styles from './popup.module.css'
import { useEffect, useState } from 'react'

export default function PopUp({message}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true);

        return () => setIsMounted(false)
    }, [])
    return (
        <div className={`${styles.popupcontainer} ${isMounted ? styles.animate : ''}`}>
            <p>{message}</p>
        </div>
    )
}