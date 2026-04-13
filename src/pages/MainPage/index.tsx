import { Header } from '../../components'
import styles from './MainPage.module.scss'
import { PostElement } from './PostElement'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts } from '../../store/slices/posts/thunks'

const MainPage = () => {

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)

	const dispatch = useAppDispatch()
	const { posts } = useAppSelector((state) => state.posts)
	
	useEffect(() => {
		dispatch(fetchPosts({page: page, limit: limit}))
	}, [dispatch, page, limit])

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