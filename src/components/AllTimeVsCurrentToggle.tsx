import { ChangeEventHandler } from "react";

export function AllTimeVsCurrent(props: { setChecked: (arg0: boolean) => void; checked: boolean | undefined; }) {
  const handleCheckboxChange = () => {
    props.setChecked(!props.checked);
  };
  return (
    <div className="">
      <div className="form-control flex flex-row items-center justify-center text-gray-500 mb-4">
        <label className="cursor-pointer label">
          <span className="label-text">
            <span className="text-lg text-gray-500 mr-2">All time Favs</span>
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={props.checked}
            onChange={handleCheckboxChange}
          />
        </label>
        <span className="label-text">
          <span className="text-lg text-gray-500 mr-2">Current Favs</span>
        </span>
      </div>
    </div>
  );
}
