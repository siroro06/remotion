import React from 'react';
import {
	AbsoluteFill,
	Interactive,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {EyesPanel} from './EyesPanel';
import {ImpactPanel} from './ImpactPanel';
import {LinePanel} from './LinePanel';
import {RumblePanel} from './RumblePanel';

// A one-page manga that inks itself panel by panel in five seconds
export const FiveSecManga: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<AbsoluteFill style={{backgroundColor: '#f4f1e8'}}>
			<Interactive.Div
				name="Page"
				style={{
					position: 'absolute',
					inset: 0,
					translate: interpolate(
						frame,
						[60, 62, 64, 66, 68, 70, 72],
						[
							'0px 0px',
							'-18px 12px',
							'16px -10px',
							'-12px 8px',
							'8px -6px',
							'-4px 3px',
							'0px 0px',
						],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						},
					),
				}}
			>
				<RumblePanel name="Rumble" points="56,56 1024,56 1024,470 56,530" />
				<EyesPanel
					name="Eyes"
					from={0.6 * fps}
					premountFor={fps}
					points="56,558 1024,498 1024,798 56,858"
				/>
				<LinePanel
					name="Dialogue"
					from={1.2 * fps}
					premountFor={fps}
					points="56,886 1024,826 1024,1210 56,1150"
				/>
				<ImpactPanel
					name="Impact"
					from={2 * fps}
					premountFor={fps}
					points="56,1178 1024,1238 1024,1864 56,1864"
				/>
			</Interactive.Div>
		</AbsoluteFill>
	);
};
