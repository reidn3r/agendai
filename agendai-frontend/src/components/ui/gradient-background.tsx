interface GradientBackgroundProps {
    children: React.ReactNode;
    className?: string;
    firstColor?: string;
    secondColor?: string;
}

function GradientBackground({ 
    children, 
    className = "",
    firstColor = "bg-purple-500",
    secondColor = "bg-cyan-500"
}: GradientBackgroundProps) {
    return (
        <div className={`relative min-h-screen w-full bg-neutral-950 ${className}`}>
            {/* Gradient Orbs */}
            <div aria-hidden="true" className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96">
                    <div className={`absolute inset-0 ${firstColor} rounded-full mix-blend-screen blur-[80px] opacity-50`} />
                </div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96">
                    <div className={`absolute inset-0 ${secondColor} rounded-full mix-blend-screen blur-[80px] opacity-50`} />
                </div>
            </div>
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default GradientBackground;