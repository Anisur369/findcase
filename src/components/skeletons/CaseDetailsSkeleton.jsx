const CaseDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      
      {/* Back Button */}
      <div className="skeleton h-8 w-40 mb-4"></div>

      <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="skeleton h-6 w-64"></div>
          <div className="skeleton h-6 w-24 rounded-full"></div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton h-4 w-24 mb-2"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))}
        </div>

        {/* Text Areas */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton h-4 w-28 mb-2"></div>
              <div className="skeleton h-16 w-full"></div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-10 w-24"></div>
        </div>

      </div>
    </div>
  );
};

export default CaseDetailsSkeleton;