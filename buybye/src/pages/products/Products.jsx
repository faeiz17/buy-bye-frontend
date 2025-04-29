// // Products.jsx
// import { Box, Container, Grid, Typography, Stack, useTheme } from '@mui/material';

// const Products = () => {
//   const stores = [
//     {
//       name: 'Jalal Sons - Model Town Branch',
//       distance: '03 kms away',
//       price: '$6',
//       time: '15 - 20 mins',
//       quality: '★★★★☆'
//     },
//     {
//       name: 'AL-Fatah - Model Town Branch',
//       distance: '02 kms away',
//       price: '$6',
//       time: '10 - 17 mins',
//       quality: '★★★★★'
//     }
//   ];

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Header />
//       <Typography variant="h5" sx={{ 
//         fontWeight: 600, 
//         mt: 4, 
//         mb: 3,
//         color: 'text.primary'
//       }}>
//         Our trending shops near you
//       </Typography>
      
//       <StoresList stores={stores} />
//     </Container>
//   );
// };

// const Header = () => {
//   const theme = useTheme();

//   return (
//     <Box sx={{ 
//       backgroundColor: theme.palette.mode === 'dark' ? '#1A1A1A' : '#2D2D2D',
//       color: '#FFFFFF',
//       p: 2,
//       borderRadius: 1
//     }}>
//       <Typography variant="h4" align="center" sx={{ 
//         fontWeight: 700,
//         letterSpacing: 4,
//         mb: 0.5
//       }}>
//         G R U C E K I
//       </Typography>
//       <Typography variant="h6" align="center" sx={{ 
//         fontWeight: 500,
//         letterSpacing: 3
//       }}>
//         STORE
//       </Typography>
//     </Box>
//   );
// };

// const StoresList = ({ stores }) => (
//   <Grid container spacing={3}>
//     {stores.map((store, index) => (
//       <Grid item xs={12} sm={6} key={index}>
//         <StoreCard store={store} />
//       </Grid>
//     ))}
//   </Grid>
// );

// const StoreCard = ({ store }) => {
//   const theme = useTheme();

//   return (
//     <Box sx={{
//       p: 3,
//       border: `1px solid ${theme.palette.divider}`,
//       borderRadius: 2,
//       boxShadow: 1,
//       '&:hover': {
//         boxShadow: 3
//       }
//     }}>
//       <Typography variant="h6" sx={{ 
//         fontWeight: 600,
//         mb: 1,
//         color: 'text.primary'
//       }}>
//         {store.name}
//       </Typography>
      
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {store.distance}
//         </Typography>
//         <Typography variant="body2" sx={{ 
//           fontWeight: 500,
//           color: 'primary.main'
//         }}>
//           {store.price}
//         </Typography>
//       </Stack>
      
//       <Typography variant="body2" sx={{ 
//         color: 'text.secondary',
//         mb: 2
//       }}>
//         {store.time}
//       </Typography>
      
//       <Stack direction="row" alignItems="center" spacing={1}>
//         <Typography variant="body2" sx={{ color: 'text.primary' }}>
//           Quality:
//         </Typography>
//         <Typography variant="body2" sx={{ color: 'warning.main' }}>
//           {store.quality}
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };

// export default Products;

// Products.jsx
import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/routes/routes';

// Animating components with framer-motion
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionStack = motion(Stack);

const Products = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stores = [
    {
      id: 1,
      name: 'Jalal Sons - Model Town Branch',
      distance: '0.5 kms away',
      time: '15 - 20 mins',
      quality: 'High',
      rating: 4.8,
      image: '/images/jalalsons.jpeg'
    },
    {
      id: 2,
      name: 'Al-Fatah - Model Town Branch',
      distance: '0.7 kms away',
      time: '10 - 17 mins',
      quality: 'High',
      rating: 4.6,
      image: '/images/alfatah.png'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'rgba(250, 250, 252, 1)',
      minHeight: '100vh',
      pb: 5
    }}>
      <Header isLoaded={isLoaded} />
      
      {/* Glass morphism container */}
      <Container maxWidth="md" sx={{ 
        py: 3, 
        mt: -5, 
        position: 'relative',
        zIndex: 10
      }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          sx={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            p: 3,
            pt: 4
          }}
        >
          <MotionTypography 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            variant="h6" 
            sx={{
              fontWeight: 600,
              fontSize: '1.2rem',
              mb: 3,
              color: '#2D2D3F',
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                display: 'block',
                width: '3px',
                height: '24px',
                background: 'linear-gradient(180deg, #4D216D 0%, #7B3EB1 100%)',
                marginRight: 2,
                borderRadius: '4px'
              }
            }}
          >
            Our trending shops near you
          </MotionTypography>
          
          <MotionStack
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            spacing={3}
          >
            {stores.map((store, index) => (
              <StoreCard key={store.id} store={store} index={index} onStoreClick={() => navigate(ROUTES.SHOP_DETAILS.replace(':shopId', store.id.toString()))}/>
            ))}
          </MotionStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

const Header = ({ isLoaded }) => {
  return (
    <MotionBox 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        width: '100%',
        color: '#FFFFFF',
        overflow: 'hidden',
        height: '280px',
        position: 'relative'
      }}
    >
      {/* Gradient overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(77, 33, 109, 0.1) 0%, rgba(77, 33, 109, 0.8) 100%)',
        zIndex: 1
      }} />
      
      {/* Image */}
      <MotionBox
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        component="img"
        src="/images/shop-hero.png"
        alt="Grocery Store"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      
      {/* Heading */}
      <MotionTypography 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        variant="h2" 
        align="center"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 800,
          letterSpacing: 2,
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          textTransform: 'uppercase',
          zIndex: 2
        }}
      >
        GROCERY STORE
      </MotionTypography>
      
      {/* Decorative elements */}
      <MotionBox
        initial={{ width: '0%' }}
        animate={{ width: '40%' }}
        transition={{ delay: 0.7, duration: 0.8 }}
        sx={{
          position: 'absolute',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
          bottom: '35%',
          left: '10%',
          zIndex: 2
        }}
      />
      <MotionBox
        initial={{ width: '0%' }}
        animate={{ width: '40%' }}
        transition={{ delay: 0.7, duration: 0.8 }}
        sx={{
          position: 'absolute',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
          bottom: '35%',
          right: '10%',
          zIndex: 2
        }}
      />
    </MotionBox>
  );
};

const StoreCard = ({ store, index, onStoreClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    },
    hover: { 
      y: -5,
      boxShadow: '0 10px 30px rgba(77, 33, 109, 0.1)',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <MotionBox
      variants={cardVariants}
      whileHover="hover"
      onClick={onStoreClick}
      sx={{
        display: 'flex',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(232, 232, 232, 0.8)',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{
        display: 'flex',
        width: '100%',
        p: 2.5,
        pr: 3
      }}>
        {/* Store image with subtle animation */}
        <MotionBox 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: 3,
            overflow: 'hidden',
            mr: 3,
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Box
            component="img"
            src={store.image}
            alt={store.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </MotionBox>
        
        <Box sx={{ flexGrow: 1, pt: 0.5 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 700, 
              mb: 1.5, 
              fontSize: '1.15rem',
              color: '#1E1E2F',
              lineHeight: 1.3
            }}
          >
            {store.name}
          </Typography>
          
          {/* Rating display */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={0.5} 
            sx={{ mb: 1.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                sx={{ 
                  fontSize: '0.9rem',
                  color: i < Math.floor(store.rating) ? '#FFB100' : '#E0E0E0'
                }} 
              />
            ))}
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#555', 
                ml: 0.5, 
                fontWeight: 600, 
                fontSize: '0.85rem' 
              }}
            >
              {store.rating}
            </Typography>
          </Stack>
          
          <Stack spacing={1.2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnOutlinedIcon sx={{ color: '#4D216D', fontSize: '1rem' }} />
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem' }}>
                {store.distance}
              </Typography>
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeOutlinedIcon sx={{ color: '#4D216D', fontSize: '1rem' }} />
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem' }}>
                {store.time}
              </Typography>
            </Stack>
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem', fontWeight: 500 }}>
                Quality:
              </Typography>
              <MotionBox
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                sx={{ 
                  background: 'linear-gradient(135deg, #4D216D 0%, #7B3EB1 100%)',
                  color: 'white', 
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  px: 1.8,
                  py: 0.5,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(77, 33, 109, 0.2)'
                }}
              >
                {store.quality}
              </MotionBox>
            </Stack>
          </Stack>
        </Box>
      </Box>
      
      {/* Accent line with gradient */}
      <Box 
        sx={{
          width: '6px',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #4D216D, #7B3EB1)',
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12
        }}
      />
    </MotionBox>
  );
};

export default Products;

// // Products.jsx
// import { Box, Container, Typography, Stack } from '@mui/material';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

// const Products = () => {
//   const stores = [
//     {
//       id: 1,
//       name: 'Jalal Sons - Model Town Branch',
//       distance: '0.5 kms away',
//       time: '15 - 20 mins',
//       quality: 'High',
//       image: '/images/jalalsons.jpeg' // Replace with actual image path
//     },
//     {
//       id: 2,
//       name: 'Al-Fatah - Model Town Branch',
//       distance: '0.7 kms away',
//       time: '10 - 17 mins',
//       quality: 'High',
//       image: '/images/alfatah.png' // Replace with actual image path
//     }
//   ];

//   return (
//     <Box sx={{ width: '100%', bgcolor: '#FFFFFF' }}>
//       {/* Full width banner */}
//       <Header />
      
//       {/* Contained content */}
//       <Container maxWidth="md" sx={{ py: 3 }}>
//         <Typography 
//           variant="body1" 
//           sx={{
//             fontWeight: 500,
//             fontSize: '1rem',
//             mt: 2.5,
//             mb: 2,
//             color: '#333333',
//             borderBottom: '1px solid #e0e0e0',
//             pb: 1.5
//           }}
//         >
//           Our trending shops near you
//         </Typography>
        
//         <StoresList stores={stores} />
//       </Container>
//     </Box>
//   );
// };

// const Header = () => {
//   return (
//     <Box sx={{
//       width: '100%',
//       color: '#FFFFFF',
//       overflow: 'hidden',
//       height: '160px',
//       position: 'relative'
//     }}>
//       <Box
//         component="img"
//         src="/images/shop-hero.png" // Replace with actual image path
//         alt="Grocery Store"
//         sx={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           filter: 'brightness(0.85)'
//         }}
//       />
//       <Typography 
//         variant="h3" 
//         align="center"
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           fontWeight: 800,
//           letterSpacing: 1.5,
//           color: '#FFFFFF',
//           textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//           textTransform: 'uppercase'
//         }}
//       >
//         GROCERY STORE
//       </Typography>
//     </Box>
//   );
// };

// const StoresList = ({ stores }) => (
//   <Stack spacing={2.5}>
//     {stores.map((store) => (
//       <Box 
//         key={store.id}
//         sx={{
//           display: 'flex',
//           borderRadius: 2,
//           overflow: 'hidden',
//           border: '1px solid #e8e8e8',
//           backgroundColor: '#ffffff',
//           position: 'relative',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
//         }}
//       >
//         <StoreCard store={store} />
//         <Box 
//           sx={{
//             width: '8px',
//             position: 'absolute',
//             right: 0,
//             top: 0,
//             bottom: 0,
//             backgroundColor: '#4D216D', // Updated to your specified purple color
//             borderTopRightRadius: 8,
//             borderBottomRightRadius: 8
//           }}
//         />
//       </Box>
//     ))}
//   </Stack>
// );

// const StoreCard = ({ store }) => {
//   return (
//     <Box sx={{
//       display: 'flex',
//       width: '100%',
//       p: 2,
//       pr: 3
//     }}>
//       <Box 
//         sx={{
//           width: '90px',
//           height: '90px',
//           borderRadius: 2,
//           overflow: 'hidden',
//           mr: 2.5,
//           flexShrink: 0,
//           border: '1px solid #f0f0f0'
//         }}
//       >
//         <Box
//           component="img"
//           src={store.image}
//           alt={store.name}
//           sx={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover'
//           }}
//         />
//       </Box>
      
//       <Box sx={{ flexGrow: 1, pt: 0.5 }}>
//         <Typography 
//           variant="subtitle1" 
//           sx={{ 
//             fontWeight: 600, 
//             mb: 1.5, 
//             fontSize: '1.05rem',
//             color: '#333333'
//           }}
//         >
//           {store.name}
//         </Typography>
        
//         <Stack spacing={1}>
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <LocationOnOutlinedIcon sx={{ color: '#757575', fontSize: '0.9rem' }} />
//             <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.85rem' }}>
//               {store.distance}
//             </Typography>
//           </Stack>
          
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <AccessTimeOutlinedIcon sx={{ color: '#757575', fontSize: '0.9rem' }} />
//             <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.85rem' }}>
//               {store.time}
//             </Typography>
//           </Stack>
          
//           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
//             <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.85rem' }}>
//               Quality:
//             </Typography>
//             <Box sx={{ 
//               backgroundColor: '#4D216D', // Updated to your specified purple color
//               color: 'white', 
//               fontSize: '0.75rem',
//               fontWeight: 500,
//               px: 1.5,
//               py: 0.4,
//               borderRadius: '12px'
//             }}>
//               {store.quality}
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default Products;


