import {halftoneLinearGradient} from '@remotion/effects/halftone-linear-gradient';
import React from 'react';
import {
	Easing,
	Interactive,
	interpolate,
	Solid,
	useCurrentFrame,
} from 'remotion';
import './fonts';
import {PanelFrame} from './PanelFrame';

const LinePanelInner: React.FC<{
	readonly points: string;
}> = ({points}) => {
	const frame = useCurrentFrame();

	return (
		<PanelFrame points={points}>
			{({width, height}) => (
				<>
					<Solid
						name="Screentone"
						width={width}
						height={height}
						color="white"
						effects={[
							halftoneLinearGradient({
								firstStopDotSize: 16,
								secondStopDotSize: 0,
								firstStopPosition: [0, 1],
								secondStopPosition: [0.75, 0],
								gridSize: 12,
								dotColor: '#111',
							}),
						]}
					/>
					<Interactive.Div
						name="Smirk SFX"
						style={{
							position: 'absolute',
							left: 70,
							top: 120,
							color: 'white',
							fontFamily: 'Dela Gothic One',
							fontSize: 96,
							lineHeight: 1,
							WebkitTextStroke: '10px #111',
							paintOrder: 'stroke fill',
							rotate: '-12deg',
							opacity: interpolate(frame, [10, 14], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
						}}
					>
						ニッ
					</Interactive.Div>
					<Interactive.Div
						name="Speech bubble"
						style={{
							position: 'absolute',
							left: 300,
							top: 30,
							width: 620,
							height: 330,
							transformOrigin: '30% 80%',
							scale: interpolate(frame, [2, 10], [0.4, 1], {
								easing: Easing.bezier(0.34, 1.56, 0.64, 1),
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
								output: 'perceptual-scale',
							}),
						}}
					>
						<svg
							width={620}
							height={330}
							style={{position: 'absolute', left: 0, top: 0}}
						>
							{/* Strokes first, fills on top, so the tail merges into the balloon */}
							<g stroke="#111" strokeWidth={12} strokeLinejoin="round">
								<ellipse cx={330} cy={140} rx={280} ry={125} />
								<polygon points="150,220 240,240 40,320" />
							</g>
							<g fill="white">
								<ellipse cx={330} cy={140} rx={280} ry={125} />
								<polygon points="150,220 240,240 40,320" />
							</g>
						</svg>
						<Interactive.Div
							name="Dialogue"
							style={{
								position: 'absolute',
								left: 90,
								top: 40,
								width: 480,
								height: 200,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								color: '#111',
								fontFamily: 'Bangers',
								fontSize: 76,
								lineHeight: 1,
								letterSpacing: 2,
							}}
						>
							Five seconds is plenty.
						</Interactive.Div>
					</Interactive.Div>
				</>
			)}
		</PanelFrame>
	);
};

export const LinePanel = Interactive.create({
	Component: LinePanelInner,
	layout: 'absolute-fill',
	schema: {
		points: {
			type: 'string',
			default: '56,886 1024,826 1024,1210 56,1150',
			description: 'Panel corners',
		},
	},
});
