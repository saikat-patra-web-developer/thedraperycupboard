import { contact } from "../../data/contact.js";
import Heading from "../ui/SectionHeading.jsx";

export default function PolicyContent({ type }) {
  return (
    <section className="wrap min-h-[50vh] py-16">
      <Heading
        label="The Drapery Cupboard"
        title={type === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
      />
      <p className="muted mt-6 max-w-2xl">
        This website is a preview. Enquiry details are saved only on your device
        and are not transmitted to a server. Please contact <a href={contact.emailHref} className="underline">{contact.email}</a>
        for the current{" "}
        {type === "privacy"
          ? "privacy policy"
          : "terms and conditions, confirmed pricing, delivery and warranty conditions"}{" "}
        before submitting an order.
      </p>
    </section>
  );
}
