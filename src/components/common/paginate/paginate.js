import _ from "lodash";
export default function Paginate(item, pageSize, curentPage) {
  const startIndex = (curentPage - 1) * pageSize;
  return _(item)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
