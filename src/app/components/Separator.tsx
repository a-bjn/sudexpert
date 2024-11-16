export default function Separator() {
    return (
      <div className="relative flex items-center justify-center z-20">
        <div className="absolute w-full h-[3px] bg-white"></div>
        <div className="absolute w-2 h-2 bg-teal-400 rounded-full"></div>
      </div>
    );
  }
  