'use client';

import { useGetMYProfileQuery } from '@/redux/api/myProfile';
import { Box, Button, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
// import AutoFileUploader from '@/components/Forms/AutoFileUploader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ProfileUpdateModal from './components/ProfileUpdateModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoctorInformation from './components/DoctorInformations';

const ProfilePage = () => {
    const { data, isLoading } = useGetMYProfileQuery(undefined);

    if (isLoading) {
        <p>Loading...</p>;
     }
    
    return (
        <>
             <Container sx={{ mt: 4 }}>
            <Grid container spacing={4}>
               <Grid xs={12} md={4}>
                  <Box
                     sx={{
                        height: 300,
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: 1,
                     }}
                  >
                     <Image
                        height={300}
                        width={400}
                        src={data?.profilePhoto}
                        alt='User Photo'
                     />
                  </Box>
                  {/* <Box my={3}>
                     {updating ? (
                        <p>Uploading...</p>
                     ) : (
                        <AutoFileUploader
                           name='file'
                           label='Choose Your Profile Photo'
                           icon={<CloudUploadIcon />}
                           onFileUpload={fileUploadHandler}
                           variant='text'
                        />
                     )}
                  </Box> */}

                  <Button
                     fullWidth
                     endIcon={<ModeEditIcon />}
                    //  onClick={() => setIsModalOpen(true)}
                  >
                     Edit Profile
                  </Button>
               </Grid>
               <Grid xs={12} md={8}>
                  <DoctorInformation data={data} />
               </Grid>
            </Grid>
         </Container>
        </>
    );
};

export default ProfilePage;