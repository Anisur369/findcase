const SkeletonRow = () => (
  <tr>
    <td><div className="skeleton h-8 w-6"></div></td>
    <td><div className="skeleton h-8 w-32"></div></td>
    <td><div className="skeleton h-8 w-24"></div></td>
    <td><div className="skeleton h-8 w-40"></div></td>
    <td><div className="skeleton h-8 w-40"></div></td>
    <td><div className="skeleton h-8 w-20"></div></td>
    <td><div className="skeleton h-8 w-24"></div></td>
    <td>
      {/* <div className="skeleton h-8 w-22"></div> */}
    </td>
    <td>
      <div className="flex gap-2 justify-end">
        <div className="skeleton h-6 w-10"></div>
        <div className="skeleton h-6 w-10"></div>
      </div>
    </td>
  </tr>
);

export default SkeletonRow;