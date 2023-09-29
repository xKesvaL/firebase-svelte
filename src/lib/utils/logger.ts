type LogType = 'info' | 'warn' | 'error' | 'debug';

export const logger = (type: LogType, message: string, data?: unknown): void => {
	switch (type) {
		case 'info':
			console.info(
				`%c[FIREBASE-SV] %c${message}`,
				'color: #1f3d99; font-weight: bold;',
				'color: initial;'
			);
			break;

		case 'warn':
			console.warn(
				`%c[FIREBASE-SV] %c${message}`,
				'color: #ff3e00; font-weight: bold;',
				'color: initial;'
			);
			break;

		case 'error':
			console.error(
				`%c[FIREBASE-SV] %c${message}`,
				'color: #cc0000; font-weight: bold;',
				'color: initial;'
			);
			break;

		case 'debug':
			console.debug(
				`%c[FIREBASE-SV] %c${message}`,
				'color: #520052; font-weight: bold;',
				'color: initial;'
			);
			break;
	}

	return;
};
