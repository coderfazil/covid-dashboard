const StatCard = ({ title, value, percent, bg }) => {
  return (
    <div className={`flex flex-col justify-between ${bg} text-white rounded-lg shadow p-4`}>
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xl font-bold">{value}</span>
      <span className="text-xs text-white/80 mt-1">{percent}% of population</span>
    </div>
  );
};

export default StatCard;
