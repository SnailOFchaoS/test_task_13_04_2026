import styles from './PostPage.module.scss'
import { Header } from '../../components'

const PostPage = () => {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.postLine}>
				<span className={styles.title}>User : &nbsp;</span>
				<span className={styles.text}>1</span>
			</div>
			<div className={styles.postLine}>
				<span className={styles.title}>Title : &nbsp;</span>
				<span className={styles.text}>1</span>
			</div>
			<div className={styles.postLine}>
				<span className={styles.title}>Body : &nbsp;</span>
				<span className={styles.text}>1</span>
			</div>
		</div>
	)
}

export { PostPage }