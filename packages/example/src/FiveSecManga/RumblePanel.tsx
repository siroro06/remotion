import {halftoneLinearGradient} from '@remotion/effects/halftone-linear-gradient';
import React from 'react';
import {
	Easing,
	Interactive,
	interpolate,
	random,
	Solid,
	useCurrentFrame,
} from 'remotion';
import './fonts';
import {PanelFrame} from './PanelFrame';

const RumblePanelInner: React.FC<{
	readonly points: string;
}> = ({points}) => {
	const frame = useCurrentFrame();
	// New tremble offset every 2 frames so the sound effect shudders
	const shudder = Math.floor(frame / 2);

	return (
		<PanelFrame points={points}>
			{({width, height}) => (
				<>
					<Solid
						name="Night sky"
						width={width}
						height={height}
						color="white"
						effects={[
							halftoneLinearGradient({
								firstStopDotSize: 22,
								secondStopDotSize: 0,
								firstStopPosition: [0.5, 0],
								secondStopPosition: [0.5, 0.95],
								gridSize: 14,
								dotColor: '#111',
							}),
						]}
					/>
					<svg
						viewBox="0 0 400 400"
						style={{
							position: 'absolute',
							left: 400,
							top: 130,
							width: 180,
							height: 180,
						}}
					>
						<circle
							cx={200}
							cy={200}
							r={180}
							fill="white"
							stroke="#111"
							strokeWidth={14}
						/>
					</svg>
					<svg
						viewBox="0 0 968 200"
						preserveAspectRatio="none"
						style={{
							position: 'absolute',
							left: 0,
							bottom: 0,
							width: '100%',
							height: 200,
						}}
					>
						<Interactive.Path
							name="Skyline"
							d="M 0 200 L 0 120 L 60 120 L 60 80 L 110 80 L 110 130 L 150 130 L 150 50 L 175 50 L 175 30 L 190 30 L 190 50 L 215 50 L 215 110 L 270 110 L 270 70 L 330 70 L 330 140 L 370 140 L 370 90 L 400 90 L 400 20 L 420 20 L 420 90 L 450 90 L 450 120 L 510 120 L 510 60 L 570 60 L 570 100 L 600 100 L 600 40 L 640 40 L 640 130 L 690 130 L 690 85 L 740 85 L 740 115 L 780 115 L 780 55 L 800 55 L 800 35 L 820 35 L 820 55 L 840 55 L 840 125 L 890 125 L 890 95 L 940 95 L 940 140 L 968 140 L 968 200 Z"
							fill="#111"
						/>
					</svg>
					<Interactive.Div
						name="Narration"
						style={{
							position: 'absolute',
							left: 36,
							top: 36,
							backgroundColor: 'white',
							border: '5px solid #111',
							padding: '12px 26px',
							color: '#111',
							fontFamily: 'Bangers',
							fontSize: 60,
							letterSpacing: 2,
							opacity: interpolate(frame, [3, 13], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
							translate: interpolate(frame, [3, 13], ['-40px 0px', '0px 0px'], {
								easing: Easing.bezier(0.16, 1, 0.3, 1),
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
						}}
					>
						Only five seconds left...
					</Interactive.Div>
					<div
						style={{
							position: 'absolute',
							right: 70,
							top: 34,
							translate: `${(random(`rumble-x-${shudder}`) - 0.5) * 14}px ${(random(`rumble-y-${shudder}`) - 0.5) * 14}px`,
						}}
					>
						<Interactive.Div
							name="Rumble SFX"
							style={{
								color: 'white',
								fontFamily: 'Dela Gothic One',
								fontSize: 112,
								lineHeight: 1,
								WebkitTextStroke: '10px #111',
								paintOrder: 'stroke fill',
								writingMode: 'vertical-rl',
								rotate: '8deg',
								opacity: interpolate(frame, [6, 12], [0, 1], {
									extrapolateLeft: 'clamp',
									extrapolateRight: 'clamp',
								}),
							}}
						>
							ゴゴゴ
						</Interactive.Div>
					</div>
				</>
			)}
		</PanelFrame>
	);
};

export const RumblePanel = Interactive.create({
	Component: RumblePanelInner,
	layout: 'absolute-fill',
	schema: {
		points: {
			type: 'string',
			default: '56,56 1024,56 1024,470 56,530',
			description: 'Panel corners',
		},
	},
});
