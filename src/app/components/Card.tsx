import Image from "next/image";

interface CardProps {
  icon: string; // Path to the SVG or image
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-2 flex flex-col overflow-hidden group">
      <div className="absolute inset-0 bg-zinc-800"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_70%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjgyODI4Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzRjNGM0YiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 text-center">
        <div className="mb-4 flex justify-center">
          <Image src={icon} alt={title} width={48} height={48} />
        </div>
        <h3 className="text-lg font-bold text-gray-100 mb-2 flex justify-center">{title}</h3>
        <p className="text-sm font-medium text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default Card;
