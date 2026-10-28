import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

type PanelSize = {
	readonly width: number;
	readonly height: number;
};

// Cuts a panel out of the page along `points` ("x,y x,y ..." in page pixels),
// inks its border and lays the content out in the panel's bounding box.
export const PanelFrame: React.FC<{
	readonly points: string;
	readonly children: (size: PanelSize) => React.ReactNode;
}> = ({points, children}) => {
	const frame = useCurrentFrame();
	const {width: pageWidth, height: pageHeight} = useVideoConfig();
	const corners = points
		.trim()
		.split(/\s+/)
		.map((corner) => corner.split(',').map(Number));
	const xs = corners.map(([x]) => x);
	const ys = corners.map(([, y]) => y);
	const left = Math.min(...xs);
	const top = Math.min(...ys);
	const width = Math.round(Math.max(...xs) - left);
	const height = Math.round(Math.max(...ys) - top);

	return (
		<AbsoluteFill
			style={{
				opacity: interpolate(frame, [0, 3], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				}),
			}}
		>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
					clipPath: `polygon(${corners.map(([x, y]) => `${x}px ${y}px`).join(', ')})`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						left,
						top,
						width,
						height,
						// The camera pulls back as the panel lands
						scale: interpolate(frame, [0, 12], [1.25, 1], {
							easing: Easing.bezier(0.16, 1, 0.3, 1),
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					{children({width, height})}
				</div>
			</AbsoluteFill>
			<svg
				width={pageWidth}
				height={pageHeight}
				style={{position: 'absolute', left: 0, top: 0}}
			>
				<polygon
					points={points}
					fill="none"
					stroke="#111"
					strokeWidth={9}
					strokeLinejoin="miter"
				/>
			</svg>
		</AbsoluteFill>
	);
};
