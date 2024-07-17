import AddProvider from "@/components/provider-add-step/AddProvider";
import AddService from "@/components/services-duration-category/AddService";

export default function Contact() {
    return (
      <section className="p-1">
        <div className="p-2">
        <AddProvider/>
          <AddService />
        </div>
      </section>
    );
  }