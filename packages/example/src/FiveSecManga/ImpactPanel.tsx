import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Interactive,
	interpolate,
	random,
	useCurrentFrame,
} from 'remotion';
import './fonts';
import {PanelFrame} from './PanelFrame';

const ImpactPanelInner: React.FC<{
	readonly points: string;
}> = ({points}) => {
	const frame = useCurrentFrame();
	// Redraw the focus lines every 2 frames so they vibrate
	const vibration = Math.floor(frame / 2);

	return (
		<PanelFrame points={points}>
			{({width, height}) => (
				<>
					<svg
						width={width}
						height={height}
						style={{position: 'absolute', left: 0, top: 0}}
					>
						{/* Focus lines converging on the sound effect */}
						{new Array(140).fill(true).map((_, i) => {
							const angle =
								(i / 140) * Math.PI * 2 +
								(random(`focus-angle-${i}-${vibration}`) - 0.5) * 0.03;
							const inner = 250 + random(`focus-inner-${i}-${vibration}`) * 160;
							const halfWidth =
								3 + random(`focus-width-${i}-${vibration}`) * 10;
							const cos = Math.cos(angle);
							const sin = Math.sin(angle);
							const centerX = width / 2;
							const centerY = 300;

							return (
								<polygon
									key={i}
									points={[
										`${centerX + cos * inner},${centerY + sin * inner}`,
										`${centerX + cos * 1100 - sin * halfWidth},${centerY + sin * 1100 + cos * halfWidth}`,
										`${centerX + cos * 1100 + sin * halfWidth},${centerY + sin * 1100 - cos * halfWidth}`,
									].join(' ')}
									fill="#111"
								/>
							);
						})}
					</svg>
					<Interactive.Div
						name="Impact SFX"
						style={{
							position: 'absolute',
							left: 0,
							top: 150,
							width: '100%',
							textAlign: 'center',
							color: '#111',
							fontFamily: 'Dela Gothic One',
							fontSize: 250,
							lineHeight: 1,
							WebkitTextStroke: '28px white',
							paintOrder: 'stroke fill',
							rotate: '-8deg',
							scale: interpolate(frame, [0, 8], [2.6, 1], {
								easing: Easing.bezier(0.16, 1, 0.3, 1),
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
								output: 'perceptual-scale',
							}),
						}}
					>
						ドン!!
					</Interactive.Div>
					<Interactive.Div
						name="Title"
						style={{
							position: 'absolute',
							left: 0,
							top: 430,
							width: '100%',
							textAlign: 'center',
							color: 'white',
							fontFamily: 'Bangers',
							fontSize: 132,
							lineHeight: 1,
							letterSpacing: 4,
							WebkitTextStroke: '14px #111',
							paintOrder: 'stroke fill',
							textShadow: '10px 10px 0 #e11d48',
							opacity: interpolate(frame, [14, 20], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
							translate: interpolate(frame, [14, 26], ['0px 90px', '0px 0px'], {
								easing: Easing.bezier(0.16, 1, 0.3, 1),
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
						}}
					>
						Five Sec Manga
					</Interactive.Div>
					<Interactive.Div
						name="To be continued"
						style={{
							position: 'absolute',
							right: 34,
							bottom: 34,
							backgroundColor: '#111',
							padding: '8px 26px',
							color: 'white',
							fontFamily: 'Dela Gothic One',
							fontSize: 60,
							lineHeight: 1.2,
							rotate: '-4deg',
							opacity: interpolate(frame, [50, 54], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
							translate: interpolate(
								frame,
								[50, 60],
								['160px 0px', '0px 0px'],
								{
									easing: Easing.bezier(0.16, 1, 0.3, 1),
									extrapolateLeft: 'clamp',
									extrapolateRight: 'clamp',
								},
							),
						}}
					>
						つづく
					</Interactive.Div>
					<AbsoluteFill
						style={{
							backgroundColor: 'white',
							opacity: interpolate(frame, [0, 5], [0.9, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
						}}
					/>
				</>
			)}
		</PanelFrame>
	);
};

export const ImpactPanel = Interactive.create({
	Component: ImpactPanelInner,
	layout: 'absolute-fill',
	schema: {
		points: {
			type: 'string',
			default: '56,1178 1024,1238 1024,1864 56,1864',
			description: 'Panel corners',
		},
	},
});
