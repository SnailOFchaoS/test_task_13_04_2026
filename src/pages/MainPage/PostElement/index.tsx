import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PostElement.module.scss'

interface Post {
	userId: number
	id: number
	title: string
	body: string
}

const PostElement = ({post}: {post: Post}) => {
	const navigate = useNavigate()

	const handleClick = useCallback(() => {
		navigate(`/post/${post.id}`)
	}, [post.id])

	return (
		<div className={styles.container} onClick={handleClick}>
			<span className={styles.title}>{post.title}</span>
		</div>
	)
}

export { PostElement }