import Icon from "../ui/Icon.jsx";
import { features } from "../../data/features.js";

function Features() {
  return (
    <div className="rounded-2xl bg-[#eeede7] py-6">
      <div className="wrap grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
        {features.map(([icon, title, text]) => (
          <div className="feature" key={title}>
            <Icon name={icon} size={34} className="text-moss" />
            <div>
              <b className="text-xs">{title}</b>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
