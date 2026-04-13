import { Header } from '../../components'
import styles from './MainPage.module.scss'
import { PostElement } from './PostElement'
import { useEffect, useState, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts } from '../../store/slices/posts/thunks'

const limitOptions: number[] = [10, 20, 30, 50, 100];

const MainPage = () => {

	const [page, setPage] = useState<number>(1)
	const [limit, setLimit] = useState<number>(10)
	const [totalPages, setTotalPages] = useState<number>(0)

	const dispatch = useAppDispatch()
	const { posts, totalCount, isLoading } = useAppSelector((state) => state.posts)
	
	useEffect(() => {
		const promise = dispatch(fetchPosts({page: page, limit: limit}))
		return () => {
			promise.abort()
		}
	}, [dispatch, page, limit])

	useEffect(() => {
		setTotalPages(Math.ceil(totalCount / limit))
	}, [totalCount, limit])

	const handlePrevPage = useCallback(() => {
		if (page > 1) {
			setPage(page - 1)
		}
	}, [page])

	const handleNextPage = useCallback(() => {
		if (page < totalPages) {
			setPage(page + 1)
		}
	}, [page, totalPages])

	return (
		<div className={styles.container}>
			<Header />
			<h1>Posts</h1>
			{isLoading ? (
				<div className={styles.loading}>Loading...</div>
			) : (
				<div className={styles.postsList}>
					{posts.map((post) => (
						<PostElement key={post.id} post={post} />
					))}
				</div>
			)}
			
			<div className={styles.paginationContainer}>
				<div className={styles.pagination}>
					<span className={styles.paginationText}>
						{totalPages > 0 ? `${page} of ${totalPages}` : '—'}
					</span>
					<div className={styles.paginationButtons}>
						<button
							type="button"
							className={styles.button}
							onClick={handlePrevPage}
							disabled={page <= 1}
						>
							{'<'}
						</button>
						<button
							type="button"
							className={styles.button}
							onClick={handleNextPage}
							disabled={page >= totalPages || totalPages === 0}
						>
							{'>'}
						</button>
					</div>
				</div>
				<div className={styles.limitControl}>
					<span className={styles.limitLabel}>
						Записей
					</span>
					<select
						className={styles.limitSelect}
						value={limit}
						onChange={(e) => {
							setLimit(Number(e.target.value))
							setPage(1)
						}}
					>
						{limitOptions.map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
				</div>
			</div>
			
		</div>
	)
}

export {MainPage}