import * as React from 'react';
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography fontFamily="quicksand" variant="h6" component="div" sx={{ flexGrow: 1 }}>
						pfpStack
					</Typography>
					<Stack direction="row" spacing={2}>
						<Link href="/docs">
							<a>
								<Button variant="outlined" color="inherit">API Docs</Button>
							</a>
						</Link>

						<Link href="/update">
							<a>
								<Button variant="outlined" color="inherit">Update Profile</Button>
							</a>
						</Link>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
}