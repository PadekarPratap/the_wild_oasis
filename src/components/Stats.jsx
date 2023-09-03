const Stats = ({ icon, title, value, bgColor, textColor }) => {
  return (
    <div className="bg-white p-5 rounded-xl flex gap-4 border border-stone-300">
      <div className="basis-1/3">
        <div
          className={` ${textColor} ${bgColor} w-[80px] h-[80px] flex items-center justify-center rounded-full`}
        >
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[100%] font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold break-words break-all">{value}</p>
      </div>
    </div>
  );
};
export default Stats;
