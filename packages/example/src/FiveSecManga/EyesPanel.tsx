import React from 'react';
import {
	Easing,
	Interactive,
	interpolate,
	random,
	useCurrentFrame,
} from 'remotion';
import './fonts';
import {PanelFrame} from './PanelFrame';

const EyesPanelInner: React.FC<{
	readonly points: string;
}> = ({points}) => {
	const frame = useCurrentFrame();

	return (
		<PanelFrame points={points}>
			{({width, height}) => (
				<>
					<svg
						width={width}
						height={height}
						style={{position: 'absolute', left: 0, top: 0}}
					>
						{/* Speed lines streaking past above and below the eyes */}
						{new Array(36).fill(true).map((_, i) => {
							const length = 160 + random(`speed-length-${i}`) * 360;
							const span = width + length;
							const x =
								((((random(`speed-x-${i}`) * span -
									frame * (40 + random(`speed-velocity-${i}`) * 40)) %
									span) +
									span) %
									span) -
								length;
							const band = i % 2 === 0 ? 0 : 0.84;
							const y = (band + random(`speed-y-${i}`) * 0.16) * height;

							return (
								<rect
									key={i}
									x={x}
									y={y}
									width={length}
									height={1 + random(`speed-thickness-${i}`) * 4}
									fill="#111"
								/>
							);
						})}
					</svg>
					<Interactive.Svg
						name="Eyes"
						viewBox="0 0 760 200"
						style={{
							position: 'absolute',
							left: 80,
							top: 101,
							width: 640,
							height: 168,
						}}
					>
						<defs>
							<clipPath id="five-sec-manga-sclera">
								<path d="M 20 140 Q 130 66 312 118 L 302 134 Q 200 186 64 162 Z" />
							</clipPath>
						</defs>
						{[0, 1].map((side) => (
							<g
								key={side}
								transform={
									side === 0 ? undefined : 'translate(760 0) scale(-1 1)'
								}
							>
								<polygon points="0,34 316,74 306,100 14,60" fill="#111" />
								{[70, 110, 150, 190, 230, 270].map((x) => (
									<line
										key={x}
										x1={x}
										y1={68 + ((x - 14) * 40) / 292}
										x2={x - 16}
										y2={90 + ((x - 14) * 40) / 292}
										stroke="#111"
										strokeWidth={3}
									/>
								))}
								<path
									d="M 20 140 Q 130 66 312 118 L 302 134 Q 200 186 64 162 Z"
									fill="white"
								/>
								<g clipPath="url(#five-sec-manga-sclera)">
									<circle
										cx={196}
										cy={130}
										r={46}
										fill="#333"
										stroke="#111"
										strokeWidth={6}
									/>
									<circle cx={196} cy={130} r={20} fill="#000" />
									<path
										d="M 20 140 Q 130 66 312 118 L 312 134 Q 130 88 20 152 Z"
										fill="#111"
									/>
								</g>
								<path
									d="M 20 140 Q 130 66 312 118"
									fill="none"
									stroke="#111"
									strokeWidth={16}
									strokeLinecap="round"
								/>
								<path
									d="M 64 162 Q 200 186 302 134"
									fill="none"
									stroke="#111"
									strokeWidth={6}
									strokeLinecap="round"
								/>
							</g>
						))}
						{/* Highlights stay on the same side of both eyes */}
						{[196, 564].map((cx) => (
							<React.Fragment key={cx}>
								<circle cx={cx + 14} cy={114} r={11} fill="white" />
								<circle cx={cx - 16} cy={146} r={5} fill="white" />
							</React.Fragment>
						))}
						<path
							d="M 384 150 L 374 198"
							stroke="#111"
							strokeWidth={4}
							strokeLinecap="round"
						/>
					</Interactive.Svg>
					<Interactive.Svg
						name="Glint"
						viewBox="-50 -50 100 100"
						style={{
							position: 'absolute',
							left: 212,
							top: 136,
							width: 110,
							height: 110,
							scale: interpolate(frame, [8, 12, 22], [0, 1.2, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
							rotate: interpolate(frame, [8, 22], ['0deg', '90deg'], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
						}}
					>
						<path
							d="M 0 -46 L 8 -8 L 46 0 L 8 8 L 0 46 L -8 8 L -46 0 L -8 -8 Z"
							fill="white"
							stroke="#111"
							strokeWidth={3}
						/>
					</Interactive.Svg>
					<Interactive.Div
						name="Glint SFX"
						style={{
							position: 'absolute',
							left: 806,
							top: 30,
							color: '#111',
							fontFamily: 'Dela Gothic One',
							fontSize: 80,
							lineHeight: 1,
							WebkitTextStroke: '14px white',
							paintOrder: 'stroke fill',
							writingMode: 'vertical-rl',
							rotate: '-6deg',
							opacity: interpolate(frame, [8, 11], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
							scale: interpolate(frame, [8, 14], [1.6, 1], {
								easing: Easing.bezier(0.16, 1, 0.3, 1),
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
								output: 'perceptual-scale',
							}),
						}}
					>
						ギラッ
					</Interactive.Div>
				</>
			)}
		</PanelFrame>
	);
};

export const EyesPanel = Interactive.create({
	Component: EyesPanelInner,
	layout: 'absolute-fill',
	schema: {
		points: {
			type: 'string',
			default: '56,558 1024,498 1024,798 56,858',
			description: 'Panel corners',
		},
	},
});
