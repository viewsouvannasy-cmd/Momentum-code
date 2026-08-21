export interface TaskDateType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  task_status: string;
  date_id: number;
  task_date: string;
  start_time: string;
  end_time: string;
  date_status: "wait" | "completed" | "miss";
}
