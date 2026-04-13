import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'


const Header = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const canGoBack = useMemo(() => {
		const state = window.history.state
		if (state != null && typeof state === 'object' && typeof state.idx === 'number') {
			return !Number.isNaN(state.idx) && state.idx > 0
		}
		return window.history.length > 1
	}, [location.key, location.pathname, location.search, location.hash])

	const handleBack = useCallback(() => {
		if (canGoBack) navigate(-1)
	}, [canGoBack, navigate])

	return (
		<header className={styles.container}>
			{canGoBack ? (
				<button
					type="button"
					className={styles.turnBackButton}
					onClick={handleBack}
					aria-label="Назад"
				>
					{'<<'}
				</button>
			) : null}
		</header>
	)
}

export { Header }