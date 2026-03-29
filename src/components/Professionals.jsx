import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Home, Zap, Camera, PenTool, Box } from 'lucide-react';

const categories = [
	{ name: 'Architects', icon: Compass },
	{ name: 'Interior Designers', icon: Home },
	{ name: 'Structural Engineers', icon: Zap },
	{ name: 'Architectural Photography', icon: Camera },
	{ name: 'Draftsman', icon: PenTool },
	{ name: '3D Visualizers', icon: Box },
];

const Professionals = () => {
	return (
		<section
			className="dm-section"
			style={{
				backgroundColor: 'var(--bg-dark)',
				borderTop: '1px solid var(--border-subtle)',
			}}
		>
			<div className="dm-container">
				{/* Header */}
				<div
					className="flex flex-col md:flex-row md:items-end justify-between gap-6"
					style={{ marginBottom: '3.5rem' }}
				>
					<div style={{ maxWidth: '36rem' }}>
						<motion.span
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="inline-block font-bold uppercase"
							style={{
								color: 'var(--accent-blue)',
								fontSize: '0.85rem',
								letterSpacing: '0.15em',
								marginBottom: '0.75rem',
							}}
						>
							The Network
						</motion.span>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', letterSpacing: '-0.02em' }}
						>
							Verified Professionals Ready to Build
						</motion.h2>
					</div>

				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-5">
					{categories.map((cat, i) => {
						const Icon = cat.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, scale: 0.85 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								whileHover={{ y: -8 }}
								className="dm-glass-card"
								style={{
									padding: '2rem 1rem',
									textAlign: 'center',
									cursor: 'default',
									transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.3s ease',
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.borderColor = 'var(--border-glow)';
									e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.borderColor = 'var(--border-subtle)';
									e.currentTarget.style.background = 'var(--bg-card)';
								}}
							>
								<div
									className="inline-flex items-center justify-center"
									style={{
										width: '3.5rem',
										height: '3.5rem',
										borderRadius: '0.75rem',
										backgroundColor: 'rgba(255, 255, 255, 0.03)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										color: '#ffffff',
										marginBottom: '1.25rem',
									}}
								>
									<Icon size={26} />
								</div>
								<h3
									style={{
										fontSize: '1rem',
										fontWeight: 600,
										fontFamily: 'var(--font-sans)',
										color: '#ffffff',
										letterSpacing: '-0.01em',
									}}
								>
									{cat.name}
								</h3>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Professionals;
