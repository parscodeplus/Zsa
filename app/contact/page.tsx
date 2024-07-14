import AddService from "@/components/services-duration-category/AddService";
import { InputNumber } from "@/components/ui/input-number";
import WorkSchedule from "@/components/working-time-company/WorkSchedule";

export default function Contact() {
    return (
      <section className="p-1">
        <div className="p-2">
        <WorkSchedule/>
          <AddService />
        </div>
      </section>
    );
  }