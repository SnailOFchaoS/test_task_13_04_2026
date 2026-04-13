import { useParams, useSearchParams } from 'react-router-dom'
import { useLayoutEffect } from 'react'

import styles from './PostPage.module.scss'
import { Header } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchUser } from '../../store/slices/users/thunks'
import { fetchPost } from '../../store/slices/posts/thunks'

const PostPage = () => {
	const { id } = useParams()
	const [searchParams] = useSearchParams()
	const userId = Number(searchParams.get('userId'))
	const dispatch = useAppDispatch()

	useLayoutEffect(() => {
		dispatch(fetchUser({id: Number(userId)}))
		dispatch(fetchPost({id: Number(id)}))
	}, [dispatch, userId, id])

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