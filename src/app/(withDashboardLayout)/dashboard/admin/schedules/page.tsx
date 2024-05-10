"use client";

import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { ISchedule } from "@/types/schedule";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading } = useGetAllSchedulesQuery({});
  // console.log(data);

  //@ts-ignore
  const schedules = data?.schedules?.data;
  const meta = data?.meta;

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete">
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule) => {
      return {
        id: schedule?.id,
        startDate: dateFormatter(schedule.startDateTime),
        endDate: dateFormatter(schedule.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={allSchedule ?? []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default SchedulesPage;
