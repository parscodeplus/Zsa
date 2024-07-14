export interface Break {
    start: string;
    end: string;
  }
  
  export interface DaySchedule {
    day: string;
    isActive: boolean;
    workStart: string;
    workEnd: string;
    breaks: Break[];
  }
  