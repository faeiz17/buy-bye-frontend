// import React, { useState } from 'react';
// import styles from './CustomizedRation.module.scss';
// import { Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

// const CustomizedRation = () => {
//   // Mock data for customization options
//   const customizationOptions = [
//     { id: 1, name: 'Main Dish', options: ['Chicken', 'Beef', 'Vegetarian'] },
//     { id: 2, name: 'Side Dish', options: ['Rice', 'Potatoes', 'Vegetables'] },
//     { id: 3, name: 'Snack', options: ['Granola Bar', 'Trail Mix', 'Fruit'] },
//     { id: 4, name: 'Beverage', options: ['Water', 'Juice', 'Sports Drink'] },
//   ];

//   const [selectedOptions, setSelectedOptions] = useState({});

//   const handleOptionSelect = (optionId, selectedValue) => {
//     setSelectedOptions((prevState) => ({
//       ...prevState,
//       [optionId]: selectedValue,
//     }));
//   };

//   // Calculate the total price of the customized ration pack
//   const totalPrice = Object.values(selectedOptions).reduce((acc, curr) => {
//     switch (curr) {
//       case 'Chicken':
//       case 'Beef':
//         return acc + 8.99;
//       case 'Vegetarian':
//         return acc + 6.99;
//       default:
//         return acc + 2.99;
//     }
//   }, 0);

//   return (
//     <section className={styles['customized-ration']}>
//       <Typography variant="h2" className={styles['section-title']}>Customize Your Ration Pack</Typography>
//       <div className={styles['customization-options']}>
//         {customizationOptions.map((option) => (
//           <div key={option.id} className={styles['option-card']}>
//             <Typography variant="h3" className={styles['option-name']}>{option.name}</Typography>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 aria-label={option.name}
//                 name={`option-${option.id}`}
//                 value={selectedOptions[option.id]}
//                 onChange={(e) => handleOptionSelect(option.id, e.target.value)}
//                 className={styles['option-choices']}
//               >
//                 {option.options.map((choice) => (
//                   <FormControlLabel
//                     key={`${option.id}-${choice}`}
//                     value={choice}
//                     control={<Radio />}
//                     label={choice}
//                     className={styles['choice-label']}
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           </div>
//         ))}
//       </div>
//       <div className={styles['customized-pack']}>
//         <Typography variant="h3" className={styles['pack-title']}>Your Customized Ration Pack</Typography>
//         <Typography variant="body1" className={styles['pack-contents']}>
//           {Object.values(selectedOptions).map((option, index) => (
//             <span key={index}>
//               {index > 0 ? ', ' : ''}{option}
//             </span>
//           ))}
//         </Typography>
//         <Typography variant="body1" className={styles['pack-price']}>Total Price: PKR{totalPrice.toFixed(2)}</Typography>
//         <Button variant="contained" color="primary" className={styles['add-to-cart']}>Add to Cart</Button>
//       </div>
//     </section>
//   );
// };

// export default CustomizedRation;

import React, { useState } from 'react';
import styles from './CustomizedRation.module.scss';
import { Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

const CustomizedRation = () => {
  const essentialItems = [
    { id: 1, name: 'Atta', description: '5kg', price: 550, image: '/images/atta.png' },
    { id: 2, name: 'Rice', description: '5kg', price: 1200, image: '/images/rice.png' },
    { id: 3, name: 'Cooking Oil', description: '5L', price: 1800, image: '/images/oil.jpeg' },
    { id: 4, name: 'Ghee', description: '1kg', price: 950, image: '/images/d ghee.jpeg' },
    { id: 5, name: 'Tea', description: '250g', price: 300, image: '/images/chai.png' },
    { id: 6, name: 'Toothpaste', description: '100ml', price: 150, image: '/images/toothpaste.jpg' },
    { id: 7, name: 'Cornflour', description: '1kg', price: 250, image: '/images/cornflour.jpg' },
    { id: 8, name: 'Soap', description: 'Pack of 3', price: 200, image: '/images/pink-soap-bubble.jpg' },
    { id: 9, name: 'Tissue Paper', description: 'Pack of 6', price: 350, image: '/images/tissue.jpg' },
  ];

  const [selectedItems, setSelectedItems] = useState({});

  const handleItemSelect = (itemId, isChecked) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));
  };

  const totalPrice = essentialItems.reduce((acc, item) => {
    return selectedItems[item.id] ? acc + item.price : acc;
  }, 0);

  return (
    <section className={styles['customized-ration']}>
      <Typography variant="h2" className={styles['section-title']}>
        Build Your Essential Ration Pack
      </Typography>
      
      <div className={styles['essentials-grid']}>
        {essentialItems.map((item) => (
          <div key={item.id} className={styles['item-card']}>
            <div className={styles['image-container']}>
              <img 
                src={item.image} 
                alt={item.name} 
                className={styles['product-image']}
              />
              <Typography variant="h3" className={styles['image-overlay-text']}>
                {item.name}
              </Typography>
            </div>
            
            <div className={styles['card-footer']}>
              <div className={styles['price-section']}>
                <Typography variant="body2" className={styles['item-description']}>
                  {item.description}
                </Typography>
                <Typography variant="h6" className={styles['item-price']}>
                  PKR {item.price}
                </Typography>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!selectedItems[item.id]}
                    onChange={(e) => handleItemSelect(item.id, e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label="Add"
                className={styles['item-checkbox']}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles['customized-pack']}>
        <Typography variant="h3" className={styles['pack-title']}>
          Your Selected Essentials
        </Typography>
        
        <div className={styles['selected-items']}>
          {essentialItems
            .filter((item) => selectedItems[item.id])
            .map((item) => (
              <div key={item.id} className={styles['selected-item']}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles['selected-item-image']}
                />
                <div className={styles['selected-item-details']}>
                  <span>{item.name}</span>
                  <span>PKR {item.price}</span>
                </div>
              </div>
            ))}
        </div>

        {essentialItems.some((item) => selectedItems[item.id]) ? (
          <>
            <Typography variant="h5" className={styles['pack-price']}>
              Total Price: PKR {totalPrice}
            </Typography>
            <Button 
              variant="contained" 
              className={styles['add-to-cart']}
              size="large"
            >
              Add to Cart
            </Button>
          </>
        ) : (
          <Typography variant="body1" className={styles['empty-message']}>
            Please select items to build your ration pack
          </Typography>
        )}
      </div>
    </section>
  );
};

export default CustomizedRation;