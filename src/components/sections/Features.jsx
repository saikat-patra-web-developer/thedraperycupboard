import Icon from "../ui/Icon.jsx";
import { features } from "../../data/features.js";

function Features() {
  return (
    <div className="rounded-2xl bg-[#eeede7] py-8 md:py-10">
      <div className="wrap grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5">
        {features.map(([icon, title, text]) => (
          <div className="feature" key={title}>
            <Icon name={icon} size={34} className="text-moss" />
            <div>
              <b className="text-sm">{title}</b>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
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
