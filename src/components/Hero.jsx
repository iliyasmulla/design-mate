import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { logAnalyticsEvent } from '../utils/analytics';
import heroImg from '../assets/hero.png';

const Hero = () => {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* Background Image with Ken Burns */}
			<div className="absolute inset-0 z-0">
				<div
					style={{
						position: 'absolute',
						inset: 0,
						animation: 'kenBurns 20s ease-in-out infinite alternate',
					}}
				>
					<img
						src={heroImg}
						alt="Modern Luxury Villa"
						className="w-full h-full object-cover"
						style={{ filter: 'brightness(0.85)' }}
					/>
				</div>

				{/* Charcoal overlay wash */}
				<div
					className="absolute inset-0"
					style={{
						background: 'linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(51,65,85,0.6) 40%, rgba(30,41,59,0.5) 70%, rgba(30,41,59,0.9) 100%)',
						animation: 'gradientShift 8s ease-in-out infinite alternate',
						backgroundSize: '200% 200%',
					}}
				/>

				{/* Floating blue/cyan particles */}
				<div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							style={{
								position: 'absolute',
								width: `${6 + i * 3} px`,
								height: `${6 + i * 3} px`,
								borderRadius: '50%',
								background: `rgba(96, 165, 250, ${0.1 + i * 0.05})`,
								filter: 'blur(1px)',
								left: `${10 + i * 15}% `,
								top: `${20 + (i % 3) * 25}% `,
								animation: `float${i % 3} ${6 + i * 2}s ease -in -out infinite`,
								animationDelay: `${i * 0.8} s`,
								boxShadow: '0 0 10px rgba(96,165,250,0.5)',
							}}
						/>
					))}
				</div>

				{/* Blue glow beam */}
				<div
					className="absolute inset-0"
					style={{
						background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)',
						animation: 'lightBeam 10s ease-in-out infinite alternate',
						pointerEvents: 'none',
					}}
				/>
			</div>

			<div className="ic-container relative z-10" style={{ paddingTop: '7rem' }}>
				<div style={{ maxWidth: '52rem' }}>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					>
						<h1
							className="mb-6"
							style={{
								fontSize: 'clamp(3rem, 6vw, 5rem)',
								lineHeight: 1.05,
								fontWeight: 800,
								color: '#ffffff',
								letterSpacing: '-0.03em',
							}}
						>
							Build Your Dream.<br />
							<span
								style={{
									background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue), var(--accent-violet))',
									backgroundSize: '200% 100%',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									animation: 'textShimmer 4s ease-in-out infinite',
								}}
							>
								Find the Right Expert.
							</span>
						</h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="mb-10"
							style={{
								fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
								maxWidth: '40rem',
								lineHeight: 1.6,
								color: 'var(--text-muted)',
							}}
						>
							Post your construction project and receive competitive bids from
							verified architects, contractors, and designers — all in one place.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<a
								href="#waitlist"
								className="ic-btn ic-btn-primary"
								style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
								onClick={() => logAnalyticsEvent('click_join_waitlist')}
							>
								Join the Waitlist <ArrowRight size={20} />
							</a>
							<a href="#how-it-works" className="ic-btn ic-btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
								<Play size={18} style={{ fill: 'currentColor' }} /> How It Works
							</a>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Bottom gradient fade to next section */}
			<div
				className="absolute bottom-0 left-0 right-0 z-10"
				style={{
					height: '12rem',
					background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 100%)',
					pointerEvents: 'none',
				}}
			/>
		</section>
	);
};

export default Hero;
