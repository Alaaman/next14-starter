import Image from "next/image"
import styles from "./about.module.css"

export const metadata = {
    title: 'About Page',
    description: 'About description',
  }

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.subtitle}>About Agency</h2>
                <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better.</h1>
                <p className={styles.desc}>
                    We place great importance on our team members and support them so that each individual can
                    grow and develop. We believe that trust, communication, and teamwork are the foundations of
                    a high-performing team and a real competitive advantage for our clients.
                </p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>10K+</h1>
                        <p>Year of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10K+</h1>
                        <p>Year of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10K+</h1>
                        <p>Year of experience</p>
                    </div>
                </div>
            </div>

            <div className={styles.imgContainer}>
                <Image src="/about.png" alt="" fill className={styles.img}/>
            </div>

        </div>
    )
}

export default AboutPage