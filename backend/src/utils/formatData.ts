interface DataType {
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
}

export function formatData(data: DataType[]) {
  const groups = new Map();

  for (const row of data) {
    if (!groups.has(row.group_id)) {
      groups.set(row.group_id, {
        group_id: row.group_id,
        group_name: row.group_name,
        group_color: row.group_color,
        tasks: new Map(),
      });
    }

    const group = groups.get(row.group_id);

    if (row.task_id && !group.tasks.has(row.task_id)) {
      group.tasks.set(row.task_id, {
        task_id: row.task_id,
        task_name: row.task_name,
        task_status: row.task_status,
        date: [],
      });
    }

    if (row.date_id && row.task_id) {
      group.tasks.get(row.task_id).date.push({
        date_id: row.date_id,
        task_date: row.task_date,
        start_time: row.start_time,
        end_time: row.end_time,
      });
    }
  }

  return Array.from(groups.values()).map((group) => ({
    ...group,
    tasks: Array.from(group.tasks.values()),
  }));
}
