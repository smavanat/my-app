import NavBar from '../src/navbar'
import Grid from '@material-ui/core/Grid'
import styles from '../styles/Home.module.css'

export default function Test() {
	return (
		<div>
			<NavBar/>
            <Grid container item xs={12}>
				<Grid container item xs={3} justifyContent="center">
				</Grid>

				<Grid container item xs={6} justifyContent="center">
					<h1 className={styles.title}>
                        Work Experience Project
					</h1>
				</Grid>

				<Grid container item xs={3} justifyContent="center">
				</Grid>
			</Grid>
		</div>
	)
}

