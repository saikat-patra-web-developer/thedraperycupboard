import Icon from "../ui/Icon.jsx";
import Heading from "../ui/SectionHeading.jsx";

const steps = [
  [
    "headset",
    "Consultation",
    "We listen to your needs and help you choose the perfect solution.",
  ],
  [
    "tools",
    "Measure & Quote",
    "We measure up and provide a clear, no-obligation quote.",
  ],
  [
    "grid",
    "Manufacture",
    "Your blinds are custom made to the highest standards.",
  ],
  [
    "tools",
    "Installation",
    "Our specialists install your blinds with precision and care.",
  ],
  [
    "spark",
    "Enjoy",
    "Sit back and enjoy comfort, style and complete peace of mind.",
  ],
];

function Process() {
  return (
    <section className="wrap section text-center">
      <Heading label="Our process" title="Simple. Seamless. Stress-Free." />
      <div className="mt-10 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(([icon, title, description], index) => (
          <div key={title}>
            <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-moss/30 bg-white text-moss">
              <Icon name={icon} />
            </span>
            <b className="text-sm">
              {index + 1}. {title}
            </b>
            <p className="muted mx-auto mt-2 max-w-48 !text-sm">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Process;
