import AddService from "@/components/services/add-service";
import { InputNumber } from "@/components/ui/input-number";
import WorkingHours from "@/components/working-hours";

export default function Contact() {
    return (
      <section className="p-1">
        <div className="p-2">
        <WorkingHours/>
          <AddService />
        </div>
      </section>
    );
  }