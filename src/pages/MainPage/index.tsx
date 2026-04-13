import { Header } from '../../components'
import styles from './MainPage.module.scss'
import { PostElement } from './PostElement'

interface Post {
	userId: number
	id: number
	title: string
	body: string
}

const posts: Post[] = [
	{
		userId: 1,
		id: 1,
		title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	}
]

const MainPage = () => {
	return (
		<div className={styles.container}>
			<Header />
			<h1>Posts</h1>
			<div className={styles.postsList}>
				{posts.map((post) => (
					<PostElement key={post.id} post={post} />
				))}
			</div>
			<div className={styles.pagination}>
				<span className={styles.paginationText}>1 of 10</span>
				<div className={styles.paginationButtons}>
					<button className={styles.button}>{'<'}</button>
					<button className={styles.button}>{'>'}</button>
				</div>
			</div>
		</div>
	)
}

export {MainPage}