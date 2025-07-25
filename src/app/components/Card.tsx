import Image from "next/image";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  gradient?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description, gradient }) => {
  return (
    <div className={`relative bg-card border border-border rounded-xl p-4 sm:p-6 flex flex-col items-center text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden ${gradient ? 'hover:shadow-2xl' : ''}`}>
      {/* Gradient Background */}
      {gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      )}
      
      {/* Animated Border */}
      {gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}></div>
      )}

      <div className="relative z-10">
        <div className="mb-3 sm:mb-4 flex justify-center">
          <div className={`p-2 sm:p-3 rounded-full ${gradient ? `bg-gradient-to-br ${gradient}` : 'bg-primary/10'} group-hover:scale-110 transition-transform duration-300`}>
            <Image src={icon} alt={title} width={36} height={36} className="text-white sm:w-12 sm:h-12 w-9 h-9" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">{description}</p>
      </div>
    </div>
  );
};

export default Card;
