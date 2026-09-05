import { contact } from "../../data/contact.js";
import Heading from "../ui/SectionHeading.jsx";

const terms = [
  ["Payment Terms", ["All invoices are due upon presentation.", "Ownership of goods remains with The Drapery Cupboard (TDC) until full payment is received.", "A 50% deposit is required at the time of order, with the remaining 50% due on the installation date."]],
  ["Late Payments", ["Overdue payments, defined as payments not received within three days of the due date, will incur interest at a rate of 19.95% per annum, calculated pro rata.", "An administration fee of $35 will be added to all overdue accounts.", "Warranty is only valid once goods are fully paid for."]],
  ["Additional Charges", ["Items not quoted but installed later will be charged accordingly.", "Unless specified, prices do not include the removal or disposal of old window furnishings.", "Prices assume installation is completed in one visit. Additional call-outs for split installations not quoted will incur extra charges.", "Requests to relocate installed blinds will be charged."]],
  ["Installation Conditions", ["Reasonable and clear access must be provided for installation.", "TDC aims to work tidily and damage-free; however, we take no responsibility if required to move furniture or ornaments. A $50 fee applies.", "By law, our team must wear shoes during installation.", "Interference or distractions during the installation process may result in delays and additional charges of $35 per hour."]],
  ["Timing", ["Installation times are approximate as every project is unique. While we endeavour to arrive on time, unforeseen circumstances may arise."]],
  ["Warranty", ["TDC offers warranties based on the type of window furnishing. A warranty certificate will be emailed on the installation date.", "Roller Blinds: 5–10 years", "Vertical Blinds: 3–10 years", "Zebra Blinds: 3–5 years", "Venetian Blinds: 3–5 years", "Outdoor Blinds: 5–10 years", "Shutters: 8–10 years", "Curtains: 2–5 years", "Honeycomb Blinds: 3–5 years", "Verishade Blinds: 3–5 years"]],
  ["Repairs and Warranty Claims", ["Customers are responsible for returning blinds to our factory for warranty assessments and repairs.", "In certain cases, TDC may collect blinds for installed jobs at its discretion.", "Manufacturing defects, including faulty components, fabric or workmanship, will be repaired or replaced at TDC’s expense.", "Repairs resulting from damage, misuse or external factors, such as wind, are the customer’s responsibility."]],
  ["Warranty Exclusions", ["Collection and return of blinds unless deemed a manufacturing fault.", "Blinds wider than 3 metres or narrower than 400 millimetres.", "General wear and tear, improper use, accidents or wind damage.", "Batteries for motors or remotes, or connectivity issues with Wi-Fi hubs.", "Damage due to lack of maintenance or improper cleaning.", "Issues arising from excessive moisture in damp areas, including wooden venetians.", "Fraying caused by rubbing the chain against the blind.", "Warranty is non-transferable."]],
  ["Supply-Only Orders", ["For supply-only orders, blinds will be couriered within approximately five working days of manufacturing.", "TDC provides tracking details but is not liable for any loss or damage during transit. Assistance will be provided to resolve such issues if they arise."]],
  ["Fabric Conditions", ["Climate conditions may cause fabric to expand or contract, leading to puckering. This is not covered under warranty."]],
  ["Customer Responsibility", ["Customers will be shown the proper use of their blinds during installation. Issues arising from misuse will not be covered under warranty."]],
  ["Cooperation", ["Help us keep costs low by ensuring a smooth installation process. We strive for excellence and appreciate your support in achieving the best results."]],
];

const privacy = [
  ["Information You Provide", ["We may receive your name, email address, phone number, company details and information about your project when you contact us or send a quote request.", "Plans or photos selected through the enquiry form are not uploaded by this website. They are shared only if you attach and send them using your own email application."]],
  ["How the Website Handles Enquiries", ["The website prepares your enquiry and saves a draft in your browser on your device. It does not automatically transmit your personal enquiry details to TDC.", "When you choose “Send by email”, your email application handles the message and sends it to TDC only when you decide to send it."]],
  ["How We Use Your Information", ["We use information you send to respond to enquiries, prepare quotes, arrange measurements or installation, provide products and services, and support warranty or repair requests.", "We may also use it for normal business administration, record keeping and to meet our legal obligations."]],
  ["Sharing and Storage", ["We do not sell your personal information. We may share it with service providers where reasonably necessary to deliver your order, arrange installation, process business records or comply with the law.", "Information is kept only for as long as reasonably required for the purpose for which it was collected, including legal, accounting and warranty requirements."]],
  ["Your Choices and Rights", ["You may ask to access or correct personal information held by TDC. You can also remove a saved enquiry draft by clearing this website’s data in your browser.", "To make a privacy request or ask a question about this policy, contact us using the details below."]],
];

export default function PolicyContent({ type }) {
  const isPrivacy = type === "privacy";
  const sections = isPrivacy ? privacy : terms;
  return (
    <section className="wrap pt-14 md:pt-18 lg:pt-20">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-[#deded8] pt-4 pb-8 md:pt-5 md:pb-10">
          <Heading label="The Drapery Cupboard" title={isPrivacy ? "Privacy Policy" : "Terms & Conditions"} />
          <p className="muted mt-5 max-w-3xl">{isPrivacy ? "This policy explains how The Drapery Cupboard (TDC) handles personal information provided through this website and in your communications with us." : "Please read these terms carefully, as they form the contract between you and The Drapery Cupboard (TDC)."}</p>
        </header>
        <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
          {sections.map(([title, items], index) => (
            <article className="rounded-xl border border-[#e4e3df] bg-white p-5 shadow-[0_5px_20px_rgba(16,42,35,0.04)] sm:p-7 md:p-8" key={title}>
              <h2 className="!text-2xl text-forest">{index + 1}. {title}</h2>
              <ul className="mt-4 space-y-3 pl-5 text-[15px] leading-7 text-[#535751] marker:text-moss">
                {items.map((item) => <li className="list-disc pl-1" key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-t-2xl bg-forest px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-11">
        <h2 className="!text-2xl">Contact The Drapery Cupboard</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/75">Questions about these {isPrivacy ? "privacy practices" : "terms"} can be sent to <a href={contact.emailHref} className="text-lime underline underline-offset-4">{contact.email}</a> or discussed by calling <a href={contact.phones[0].href} className="text-lime underline underline-offset-4">{contact.phones[0].label}</a>.</p>
      </div>
    </section>
  );
}
