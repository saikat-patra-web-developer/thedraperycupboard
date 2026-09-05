import Icon from "../ui/Icon.jsx";
import Img from "../ui/Image.jsx";
import Arrow from "../ui/Arrow.jsx";
import Heading from "../ui/SectionHeading.jsx";

function Coverage() {
  return (
    <section className="bg-[#eeefe8]">
      <div className="wrap grid gap-8 py-10 md:grid-cols-[1fr_1fr_1fr] md:items-center">
        <div>
          <Heading
            label="Proudly serving New Zealand"
            title="Local Expertise. Nationwide Service."
          >
            From Northland to Southland, our team delivers quality blinds and
            expert service across New Zealand.
          </Heading>
          <a href="/contact" className="text-link mt-5">
            View Service Areas <Arrow />
          </a>
        </div>
        <div className="flex justify-center">
          <Img
            name="map"
            alt="New Zealand service locations"
            className="h-60 w-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-white p-6 text-xs">
          {[
            "Northland",
            "Auckland",
            "Waikato",
            "Bay of Plenty",
            "Gisborne",
            "Hawke’s Bay",
            "Wellington",
            "Nelson / Tasman",
            "Canterbury",
            "Otago",
            "Southland",
          ].map((t) => (
            <div className="flex gap-2" key={t}>
              <Icon name="pin" size={14} className="text-moss" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Coverage;
