import { Header } from '../../components'
import styles from './MainPage.module.scss'
import { PostElement } from './PostElement'
import { useCallback, useEffect, useState, type ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	applyListFromCache,
	makePostsListCacheKey,
} from '../../store/slices/posts'
import { fetchPosts } from '../../store/slices/posts/thunks'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const limitOptions = [10, 20, 30, 50, 100]

const readStoredPage = () => {
	const raw = sessionStorage.getItem('page')
	if (raw === null) {
		return DEFAULT_PAGE
	}
	return Math.floor(Number(raw))
}

const readStoredLimit = () => {
	const raw = sessionStorage.getItem('limit')
	if (raw === null) {
		return DEFAULT_LIMIT
	}
	return Number(raw)
}

const MainPage = () => {
	
	const [page, setPage] = useState<number>(() => readStoredPage())
	const [limit, setLimit] = useState<number>(() => readStoredLimit())
	const [totalPages, setTotalPages] = useState<number>(0)

	const dispatch = useAppDispatch()
	const { posts, totalCount, isLoading } = useAppSelector((state) => state.posts)
	const listCacheKey = makePostsListCacheKey(page, limit)
	const cachedList = useAppSelector((state) => state.posts.postsByQuery[listCacheKey])

	useEffect(() => {
		if (cachedList) {
			dispatch(applyListFromCache({ page, limit }))
			return
		}
		const promise = dispatch(fetchPosts({ page, limit }))
		return () => {
			promise.abort()
		}
	}, [dispatch, page, limit, cachedList])

	useEffect(() => {
		setTotalPages(Math.ceil(totalCount / limit))
	}, [totalCount, limit])

	useEffect(() => {
		sessionStorage.setItem('page', String(page))
		sessionStorage.setItem('limit', String(limit))
	}, [page, limit])

	useEffect(() => {
		if (totalPages > 0 && page > totalPages) {
			setPage(totalPages)
		}
	}, [totalPages, page])

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

	const handleLimitChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		const next = Number(e.target.value)
		setLimit(next)
		setPage(1)
	}, [])

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
						onChange={handleLimitChange}
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