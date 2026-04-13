import { useParams, useSearchParams } from 'react-router-dom'
import { useLayoutEffect } from 'react'

import styles from './PostPage.module.scss'
import { Header } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentPostFromCache } from '../../store/slices/posts'
import { setCurrentUserFromCache } from '../../store/slices/users'
import { fetchUser } from '../../store/slices/users/thunks'
import { fetchPost } from '../../store/slices/posts/thunks'

const PostPage = () => {
	const { id } = useParams()
	const [searchParams] = useSearchParams()
	const userId = Number(searchParams.get('userId'))
	const dispatch = useAppDispatch()

	const postId = id !== undefined ? Number(id) : Number.NaN
	const cachedPost = useAppSelector((state) =>
		Number.isFinite(postId) ? state.posts.postsById[postId] : undefined,
	)
	const cachedUser = useAppSelector((state) =>
		Number.isFinite(userId) ? state.users.users[userId] : undefined,
	)

	useLayoutEffect(() => {
		if (!Number.isFinite(postId)) {
			return
		}
		if (cachedUser) {
			dispatch(setCurrentUserFromCache(userId))
			return
		}
		dispatch(fetchUser({ id: Number(userId) }))
	}, [dispatch, userId, cachedUser])

	useLayoutEffect(() => {
		if (!Number.isFinite(postId)) {
			return
		}
		if (cachedPost) {
			dispatch(setCurrentPostFromCache(postId))
			return
		}
		dispatch(fetchPost({ id: postId }))
	}, [dispatch, postId, cachedPost])

	const { currentUser, isLoading: isLoadingUser } = useAppSelector((state) => state.users)
	const { currentPost, isLoading: isLoadingPost } = useAppSelector((state) => state.posts)

	return (
		<div className={styles.container}>
			<Header />
			{isLoadingUser || isLoadingPost ? (
				<div className={styles.loading}>Loading...</div>
			) : (
				<>
					<div className={styles.postLine}>
						<span className={styles.title}>User : &nbsp;</span>
						<span className={styles.text}>{currentUser?.name}</span>
					</div>
					<div className={styles.postLine}>
						<span className={styles.title}>Title : &nbsp;</span>
						<span className={styles.text}>{currentPost?.title}</span>
					</div>
					<div className={styles.postLine}>
						<span className={styles.title}>Body : &nbsp;</span>
						<span className={styles.text}>{currentPost?.body}</span>
					</div>
				</>
			)}
		</div>
	)
}

export { PostPage }