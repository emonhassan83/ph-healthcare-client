import DashedLine from "@/components/UI/Doctor/DashedLine";
import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import { Doctor } from "@/types/doctor";
import { Box, Container } from "@mui/material";
import React from "react";

interface PropType {
  searchParams: { specialties: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  const res = await fetch("http://localhost:5000/api/v1/doctor");
  const { data } = await res.json();

  console.log(data);
  return (
    <Container>
      <Box
        sx={{
          borderBottom: "2px dashed",
          borderColor: "secondary",
          my: 4,
        }}
      >
        <Box
          sx={{
            mt: 2,
            p: 3,
            bgcolor: "secondary.light",
          }}
        >
          {data.map((doctor: Doctor, index: number) => (
            <Box key={doctor.id}>
               <DoctorCard doctor={doctor}/>
               {index === data.length - 1 ? null : <DashedLine />}
            </Box>
          ))}
        </Box>
      </Box>
      {/* <DashedLine />

         <ScrollCategory specialties={searchParams.specialties} />

         <Box sx={{ mt: 2, p: 3, bgcolor: 'secondary.light' }}>
            {data?.map((doctor: Doctor, index: number) => (
               <Box key={doctor.id}>
                  <DoctorCard doctor={doctor} />

                  {index === data.length - 1 ? null : <DashedLine />}
               </Box>
            ))}
         </Box> */}
    </Container>
  );
};

export default Doctors;
