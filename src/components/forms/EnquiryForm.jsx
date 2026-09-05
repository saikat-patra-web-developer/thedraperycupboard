import { contact } from "../../data/contact.js";
import { useState } from "react";
import Arrow from "../ui/Arrow.jsx";
import { products } from "../../data/products.js";

export default function EnquiryForm() {
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState(contact.emailHref);
  function submit(e) {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const data = {};
    for (const [k, v] of values.entries())
      if (typeof v === "string") data[k] = v;
    const body = Object.entries(data)
      .map(([k, v]) => k + ": " + v)
      .join("\n");
    setEmail(
      contact.emailHref + "?subject=" +
        encodeURIComponent("Quote request") +
        "&body=" +
        encodeURIComponent(body),
    );
    try {
      localStorage.setItem("thedraperycupboard-quote-draft", JSON.stringify(data));
      setStatus(
        "Your draft is saved on this device. Use “Send by email” to submit it to our team. Files must be attached to the email separately.",
      );
    } catch {
      setStatus(
        "Your enquiry is ready. Use “Send by email” to submit it to our team. Files must be attached separately.",
      );
    }
  }
  return (
    <form onSubmit={submit} className="card min-w-0 p-5 sm:p-7 lg:p-9">
      <h2 className="!text-3xl">Request a Quote</h2>
      <p className="mt-2 text-xs text-neutral-500">
        Fields marked * are required
      </p>
      <p className="mb-4 mt-6 text-xs font-semibold text-moss">Your Details</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          Full Name *
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="e.g. Jane Smith"
          />
        </label>
        <label>
          Email Address *
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="e.g. jane@email.com"
          />
        </label>
        <label>
          Phone Number *
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 021 123 4567"
          />
        </label>
        <label>
          Company / Business (Optional)
          <input
            name="company"
            autoComplete="organization"
            placeholder="e.g. ABC Builders"
          />
        </label>
      </div>
      <p className="mb-4 mt-7 text-xs font-semibold text-moss">Your Project</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          What are you looking for? *
          <select
            name="product"
            required
            defaultValue={
              new URLSearchParams(location.search).get("product") || ""
            }
          >
            <option value="" disabled>
              Select product type
            </option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>{p.name}</option>
            ))}
            <option>Multiple products / advice</option>
          </select>
        </label>
        <label>
          Preferred Timeframe
          <select name="timeframe">
            <option>Not sure yet</option>
            <option>As soon as possible</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>3+ months</option>
          </select>
        </label>
      </div>
      <fieldset className="my-5">
        <legend className="mb-3 text-xs">Project Type *</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {["Residential", "Commercial"].map((t) => (
            <label
              className="flex items-center justify-center gap-2 rounded border border-neutral-200 p-3"
              key={t}
            >
              <input
                className="!m-0 !w-auto accent-forest"
                type="radio"
                name="type"
                value={t}
                required
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        Tell us about your project *
        <textarea
          rows={4}
          name="message"
          required
          placeholder="Include sizes, rooms, goals or any other details."
          defaultValue={
            new URLSearchParams(location.search).get("service")
              ? "I’m interested in " +
                new URLSearchParams(location.search).get("service") +
                " services."
              : ""
          }
        />
      </label>
      <label className="mt-5">
        Upload Plans / Photos (Optional)
        <input
          type="file"
          name="attachment"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={(e) => {
            const selected = [...e.target.files];
            if (selected.some((f) => f.size > 10 * 1024 * 1024)) {
              e.target.value = "";
              setFiles(["Please choose files smaller than 10MB."]);
              return;
            }
            setFiles(selected.map((f) => f.name));
          }}
          className="border-dashed"
        />
        <span className="mt-2 block text-xs text-neutral-500">
          {files.length
            ? files.join(", ")
            : "PDF, JPG or PNG up to 10MB. Attach files separately when emailing your enquiry."}
        </span>
      </label>
      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-start gap-2 leading-5">
          <input
            name="consent"
            type="checkbox"
            required
            className="!m-0 mt-1 !w-auto accent-forest"
          />
          <span>
            I agree to the{" "}
            <a href="/privacy" className="text-moss underline">
              Privacy Policy
            </a>{" "}
            and consent to being contacted regarding my enquiry.
          </span>
        </label>
        <button className="btn btn-dark" type="submit">
          Prepare Request
          <Arrow />
        </button>
      </div>
      {status && (
        <div
          role="status"
          className="mt-5 rounded border border-lime bg-lime/15 p-4 text-sm"
        >
          {status}
          <a className="btn btn-dark mt-3" href={email}>
            Send by email <Arrow />
          </a>
        </div>
      )}
      <p className="mt-4 text-xs text-neutral-500">
        Prepare your enquiry here, then send it using your email app.
      </p>
    </form>
  );
}
