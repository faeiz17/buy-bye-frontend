import React, { useState } from 'react';
import styles from './CustomizedRation.module.scss';
import { Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const CustomizedRation = () => {
  // Mock data for customization options
  const customizationOptions = [
    { id: 1, name: 'Main Dish', options: ['Chicken', 'Beef', 'Vegetarian'] },
    { id: 2, name: 'Side Dish', options: ['Rice', 'Potatoes', 'Vegetables'] },
    { id: 3, name: 'Snack', options: ['Granola Bar', 'Trail Mix', 'Fruit'] },
    { id: 4, name: 'Beverage', options: ['Water', 'Juice', 'Sports Drink'] },
  ];

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (optionId, selectedValue) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [optionId]: selectedValue,
    }));
  };

  // Calculate the total price of the customized ration pack
  const totalPrice = Object.values(selectedOptions).reduce((acc, curr) => {
    switch (curr) {
      case 'Chicken':
      case 'Beef':
        return acc + 8.99;
      case 'Vegetarian':
        return acc + 6.99;
      default:
        return acc + 2.99;
    }
  }, 0);

  return (
    <section className={styles['customized-ration']}>
      <Typography variant="h2" className={styles['section-title']}>Customize Your Ration Pack</Typography>
      <div className={styles['customization-options']}>
        {customizationOptions.map((option) => (
          <div key={option.id} className={styles['option-card']}>
            <Typography variant="h3" className={styles['option-name']}>{option.name}</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label={option.name}
                name={`option-${option.id}`}
                value={selectedOptions[option.id]}
                onChange={(e) => handleOptionSelect(option.id, e.target.value)}
                className={styles['option-choices']}
              >
                {option.options.map((choice) => (
                  <FormControlLabel
                    key={`${option.id}-${choice}`}
                    value={choice}
                    control={<Radio />}
                    label={choice}
                    className={styles['choice-label']}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}
      </div>
      <div className={styles['customized-pack']}>
        <Typography variant="h3" className={styles['pack-title']}>Your Customized Ration Pack</Typography>
        <Typography variant="body1" className={styles['pack-contents']}>
          {Object.values(selectedOptions).map((option, index) => (
            <span key={index}>
              {index > 0 ? ', ' : ''}{option}
            </span>
          ))}
        </Typography>
        <Typography variant="body1" className={styles['pack-price']}>Total Price: PKR{totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" className={styles['add-to-cart']}>Add to Cart</Button>
      </div>
    </section>
  );
};

export default CustomizedRation;
