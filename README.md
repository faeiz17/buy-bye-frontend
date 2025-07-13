# Buy-Bye Frontend

A modern, location-based e-commerce platform built with React, Material-UI, and integrated with Google Maps API. This application provides customers with a seamless shopping experience, featuring nearby vendor discovery, real-time location services, and comprehensive product management.

## 🏗️ Project Structure

```
buy-bye-frontend/
├── buybye/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── appbar/               # Navigation components
│   │   │   │   ├── NavBar.jsx            # Main navigation bar
│   │   │   │   └── NavBar.module.scss    # Navigation styles
│   │   │   ├── cart/                 # Shopping cart components
│   │   │   │   ├── CartHeader.jsx        # Cart header component
│   │   │   │   ├── CartItem.jsx          # Individual cart item
│   │   │   │   ├── CartSummary.jsx       # Cart summary/totals
│   │   │   │   └── PaymentForm.jsx       # Payment form component
│   │   │   ├── checkout/            # Checkout flow components
│   │   │   │   ├── BackButton.jsx        # Navigation back button
│   │   │   │   ├── CardPaymentForm.jsx   # Credit card payment form
│   │   │   │   ├── OrderSummary.jsx      # Order summary display
│   │   │   │   ├── PaymentOptions.jsx    # Payment method selection
│   │   │   │   └── StoreInfo.jsx         # Store information display
│   │   │   ├── footer/              # Footer components
│   │   │   │   └── Footer.jsx            # Main footer component
│   │   │   ├── home-ad/             # Homepage advertisement
│   │   │   │   ├── HomeAd.jsx            # Advertisement component
│   │   │   │   └── HomeAd.module.scss    # Ad styling
│   │   │   ├── home-categories/     # Category display components
│   │   │   │   ├── HomeCategories.jsx    # Category grid/list
│   │   │   │   └── HomeCategories.module.scss
│   │   │   ├── home-featured/       # Featured products section
│   │   │   │   ├── HomeFeatured.jsx      # Featured products display
│   │   │   │   └── HomeFeatured.module.scss
│   │   │   ├── home-hero/           # Homepage hero section
│   │   │   │   ├── HomeHero.jsx          # Hero banner component
│   │   │   │   └── HomeHero.module.scss  # Hero styling
│   │   │   ├── product-info/        # Product information display
│   │   │   │   ├── ProductInfo.jsx       # Product details component
│   │   │   │   └── ProductInfo.module.scss
│   │   │   ├── ration-customized/   # Customized ration packs
│   │   │   │   ├── CustomizedRation.jsx  # Custom ration builder
│   │   │   │   └── CustomizedRation.module.scss
│   │   │   ├── ration-hero-new/     # Ration pack hero section
│   │   │   │   ├── RationHeroNew.jsx     # Ration hero component
│   │   │   │   └── RationHeroNew.module.scss
│   │   │   └── ration-top-selling/  # Top selling ration packs
│   │   │       ├── RationTopSelling.jsx  # Top sellers display
│   │   │       └── RationTopSelling.module.scss
│   │   ├── pages/               # Main application pages
│   │   │   ├── homepage/            # Homepage components
│   │   │   │   └── Homepage.jsx         # Main homepage
│   │   │   ├── login/               # Authentication pages
│   │   │   │   └── Login.jsx             # Login form
│   │   │   ├── signup/              # Registration pages
│   │   │   │   └── Signup.jsx            # Registration form
│   │   │   ├── verify-email/        # Email verification
│   │   │   │   └── VerifyEmail.jsx       # Email verification page
│   │   │   ├── products/            # Product-related pages
│   │   │   │   └── Shop.jsx              # Product shop page
│   │   │   ├── product details/     # Product detail pages
│   │   │   │   └── ProductDetails.jsx    # Individual product view
│   │   │   ├── shopdetail/          # Shop detail pages
│   │   │   │   └── ShopDetail.jsx        # Vendor shop view
│   │   │   ├── cart/                # Shopping cart pages
│   │   │   │   └── Cart.jsx              # Cart management
│   │   │   ├── checkout/            # Checkout flow pages
│   │   │   │   └── Checkout.jsx          # Checkout process
│   │   │   ├── orders/              # Order management pages
│   │   │   │   ├── Orders.jsx            # Order history
│   │   │   │   └── OrderDetails.jsx      # Order details view
│   │   │   ├── search/              # Search functionality
│   │   │   │   └── Search.jsx            # Search results
│   │   │   ├── ration pack/         # Ration pack pages
│   │   │   │   └── RationPackNew.jsx     # Ration pack builder
│   │   │   ├── ration-packs/        # Ration pack details
│   │   │   │   └── RationPackDetails.jsx # Ration pack details
│   │   │   ├── contact/             # Contact pages
│   │   │   │   └── Contact.jsx           # Contact form
│   │   │   ├── about/               # About pages
│   │   │   │   └── About.jsx             # About us page
│   │   │   └── theme.js             # Theme configuration
│   │   ├── context/             # React context providers
│   │   │   ├── AuthContext.jsx        # Authentication state
│   │   │   ├── LocationContext.jsx    # Location services
│   │   │   ├── CartContext.jsx        # Shopping cart state
│   │   │   └── OrderContext.jsx       # Order management
│   │   ├── services/            # API and service layer
│   │   │   ├── api.js               # Main API configuration
│   │   │   ├── apiConfig.js          # API configuration
│   │   │   ├── serviceLayer.js       # Service layer utilities
│   │   │   ├── products/             # Product-related services
│   │   │   └── user/                 # User-related services
│   │   ├── routes/              # Routing configuration
│   │   │   └── routes.js             # Route definitions
│   │   ├── layout/              # Layout components
│   │   │   └── Layout.jsx            # Main layout wrapper
│   │   ├── utils/               # Utility functions
│   │   │   └── ProtectedRoutes.jsx   # Route protection
│   │   ├── color/               # Styling variables
│   │   │   └── color.scss            # SCSS color definitions
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   ├── index.css            # Global styles
│   │   └── App.css              # App-specific styles
│   ├── public/                  # Public assets
│   │   └── images/              # Static images
│   ├── package.json             # Dependencies and scripts
│   ├── vite.config.js           # Vite configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── jsconfig.json            # JavaScript configuration
│   └── vercel.json              # Vercel deployment config
```

## 🛠️ Technology Stack

### Frontend Framework

- **React 18.3.1** - Modern React with hooks and functional components
- **React Router DOM 7.0.2** - Client-side routing and navigation
- **Vite 6.0.1** - Fast build tool and development server

### UI Framework

- **Material-UI (MUI) 6.4.11** - Comprehensive React UI framework
- **@mui/icons-material 6.1.10** - Material Design icons
- **@mui/x-charts 7.23.1** - Advanced charting components
- **@mui/x-data-grid 7.23.1** - Data grid components
- **@emotion/react & @emotion/styled** - CSS-in-JS styling

### Animation & Effects

- **Framer Motion 11.18.2** - Advanced animations
- **Lottie React 2.4.0** - Lottie animation support
- **React Fast Marquee 1.6.5** - Scrolling text effects
- **Typewriter Effect 2.21.0** - Typewriter animations
- **Animated Number React 0.1.2** - Number animations

### HTTP Client & Utilities

- **Axios 1.7.9** - HTTP client for API requests
- **React Secure Storage 1.3.2** - Secure storage utilities
- **React Use 17.5.1** - Useful React hooks
- **UUIDv4 6.2.13** - UUID generation
- **CLSX 2.1.1** - Conditional CSS classes

### Styling & UI

- **Sass 1.82.0** - CSS preprocessor
- **React Responsive Carousel 3.2.23** - Carousel components

### Development Tools

- **ESLint 9.15.0** - Code linting and formatting
- **TypeScript types** - Type definitions for React

## 🎨 Design System

### Color Palette

```scss
$primary-main: #4d216d; // Main brand color (Purple)
$primary-contrast-text: #ffffff; // White text on primary
$secondary-main: #ffd600; // Accent color (Yellow)
$info-main: #4d216d; // Info color
$success-main: #4a148c; // Success color
$warning-main: #ffffff; // Warning background
$divider-color: #4a148c; // Divider lines
$background-default: #ffffff; // Default background
$background-paper: #f5f5f5; // Paper/card background
```

### Theme Configuration

The application uses a comprehensive theme system with:

- **Colors**: Primary, secondary, info, warning, success, and background colors
- **Typography**: Complete typography scale (h1-h5, subtitle1-2, body1-2, button, caption)
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **Border Radius**: Rounded corner system (xs, sm, md, lg, xl, circle)
- **Shadows**: Elevation system (none, xs, sm, md, lg, xl)
- **Animation**: Timing system (fast, normal, slow)

## 🔐 Authentication System

### Authentication Flow

1. **Registration** (`Signup.jsx`)

   - Multi-step form with validation
   - Email verification token generation
   - Location-based user setup
   - Google Maps integration for address selection

2. **Login** (`Login.jsx`)

   - Email/password authentication
   - JWT token storage
   - Verification status checking
   - Automatic redirect based on account status

3. **Email Verification** (`VerifyEmail.jsx`)
   - Token-based email verification
   - Resend verification functionality
   - Account activation upon verification

### Protected Routes

- **ProtectedRoutes.jsx** - Wrapper component for authenticated routes
- Token validation on each protected route access
- Automatic redirect to login for unauthenticated users
- Loading states during authentication checks

## 📱 Core Components

### 1. Navigation System (`NavBar.jsx`)

**Features:**

- Responsive design (mobile/desktop)
- Dynamic navigation based on user authentication
- Shopping cart integration
- User profile menu
- Search functionality
- Location-based services

**Key Functions:**

```javascript
// Cart integration
const cartCount = cartItems.length;

// User authentication
const { isLoggedIn, user, logout } = useAuth();

// Location services
const { address, getCurrentLocation } = useLocation();
```

### 2. Location Services (`LocationContext.jsx`)

**Features:**

- Google Maps integration
- Geolocation API integration
- Reverse geocoding
- Address autocomplete
- Location permission management
- Server location synchronization

**Key Functions:**

```javascript
// Request location permission
const requestLocationPermission = async () => {
  const position = await navigator.geolocation.getCurrentPosition();
  const { latitude, longitude } = position.coords;
  setLocation({ latitude, longitude });
  await getAddressFromCoordinates(latitude, longitude);
};

// Reverse geocoding
const getAddressFromCoordinates = async (latitude, longitude) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  setAddress(data.results[0].formatted_address);
};
```

### 3. Shopping Cart (`CartContext.jsx`)

**Features:**

- Real-time cart management
- Server synchronization
- Discount calculation
- Quantity management
- Vendor-based organization
- Price formatting

**Key Functions:**

```javascript
// Add to cart
const addToCart = async (vendorProduct) => {
  await cartApi.addToCart(vendorProduct._id, 1);
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(
      (item) => item.id === vendorProduct._id
    );
    if (existingItem) {
      return prevItems.map((item) =>
        item.id === vendorProduct._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevItems, newItem];
    }
  });
};

// Calculate totals
const getCartTotal = () =>
  cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
```

### 4. Order Management (`OrderContext.jsx`)

**Features:**

- Order creation and management
- Order history tracking
- Status updates
- Order cancellation
- Order statistics
- Direct order creation

## 📊 Application Pages

### 1. Homepage (`Homepage.jsx`)

**Features:**

- Location-based product discovery
- Category filtering
- Email verification notification
- Vendor product filtering (BBBolt pattern)
- Real-time data loading
- Responsive design

**Email Verification Integration:**

```javascript
// Check for verification URL on mount
useEffect(() => {
  const storedVerificationUrl = localStorage.getItem("verificationUrl");
  if (storedVerificationUrl) {
    setVerificationUrl(storedVerificationUrl);
    setShowVerificationAlert(true);
    localStorage.removeItem("verificationUrl");
  }
}, []);

// Verification handlers
const handleVerifyEmail = () => {
  if (verificationUrl) {
    window.open(verificationUrl, "_blank");
  }
};
```

**BBBolt Pattern Implementation:**

```javascript
// Filter products to only show 1 product per vendor
const vendorMap = new Map();
const filteredProducts = [];

allProducts.forEach((product) => {
  const vendorId =
    typeof product.vendor === "string" ? product.vendor : product.vendor?._id;

  if (vendorId && !vendorMap.has(vendorId)) {
    vendorMap.set(vendorId, true);
    filteredProducts.push(product);
  }
});
```

### 2. Product Management

**Shop Page (`Shop.jsx`)**

- Product listing with filters
- Category-based filtering
- Price range filtering
- Vendor-based filtering
- Search functionality
- Sorting options

**Product Details (`ProductDetails.jsx`)**

- Detailed product information
- Image gallery
- Price and discount display
- Vendor information
- Add to cart functionality
- Related products

### 3. Shopping Cart (`Cart.jsx`)

**Features:**

- Cart item management
- Quantity updates
- Price calculations
- Discount applications
- Vendor grouping
- Checkout integration

### 4. Checkout Process (`Checkout.jsx`)

**Features:**

- Multi-step checkout flow
- Payment method selection
- Order summary
- Address management
- Payment processing
- Order confirmation

### 5. Order Management

**Orders Page (`Orders.jsx`)**

- Order history display
- Status tracking
- Order details
- Cancellation functionality
- Reorder capability

**Order Details (`OrderDetails.jsx`)**

- Detailed order information
- Item breakdown
- Status updates
- Tracking information
- Customer support

### 6. Ration Packs

**Ration Pack Builder (`RationPackNew.jsx`)**

- Custom ration pack creation
- Category-based selection
- Quantity management
- Price calculation
- Vendor selection

**Ration Pack Details (`RationPackDetails.jsx`)**

- Pack information display
- Item breakdown
- Nutritional information
- Purchase options

## 🔌 API Integration

### Axios Configuration (`api.js`)

```javascript
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor for authentication
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("userToken");
      window.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(error);
  }
);
```

### API Endpoints

- **Authentication:**

  - `POST /customers/register` - Customer registration
  - `POST /customers/login` - Customer login
  - `GET /customers/verify-email/:token` - Email verification
  - `POST /customers/resend-verification` - Resend verification email

- **Profile Management:**

  - `GET /customers/profile` - Get customer profile
  - `PUT /customers/profile` - Update customer profile
  - `POST /customers/update-location` - Update location

- **Product Management:**

  - `GET /products` - List all products
  - `GET /products/:id` - Get product by ID
  - `GET /products/search` - Search products
  - `GET /customers/nearby-products` - Get nearby products

- **Cart Management:**

  - `GET /cart` - Get cart items
  - `POST /cart` - Add item to cart
  - `PUT /cart/:id` - Update cart item
  - `DELETE /cart/:id` - Remove cart item

- **Order Management:**
  - `POST /orders` - Create order
  - `GET /customer/orders` - Get customer orders
  - `GET /customer/orders/:id` - Get order details
  - `PUT /customer/orders/:id/cancel` - Cancel order

## 🗺️ Location-Based Features

### Google Maps Integration

- **API Key:** Environment variable `VITE_GOOGLE_MAPS_API_KEY`
- **Libraries:** Places, Geocoding, Maps
- **Features:**
  - Address autocomplete
  - Reverse geocoding
  - Current location detection
  - Location-based product discovery
  - Vendor proximity calculation

### Location Services Implementation

```javascript
// Location context initialization
const requestLocationPermission = async () => {
  const position = await navigator.geolocation.getCurrentPosition();
  const { latitude, longitude } = position.coords;
  setLocation({ latitude, longitude });
  await getAddressFromCoordinates(latitude, longitude);
};

// Reverse geocoding
const getAddressFromCoordinates = async (latitude, longitude) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  setAddress(data.results[0].formatted_address);
};
```

## 🔒 Security Features

### Authentication Security

- JWT token-based authentication
- Token expiration handling
- Secure token storage in localStorage
- Automatic token injection in API requests
- Protected route implementation

### Data Validation

- Form validation on client-side
- API response validation
- Error handling and user feedback
- Input sanitization
- XSS protection

## 📱 Responsive Design

### Breakpoint System

- **Mobile:** `< 600px` - Single column layout, mobile navigation
- **Tablet:** `600px - 960px` - Adaptive layout
- **Desktop:** `> 960px` - Full layout with sidebar navigation

### Responsive Components

- Mobile-first design approach
- Responsive tables with horizontal scroll
- Adaptive card layouts
- Touch-friendly interface elements
- Flexible grid systems

## 🚀 Deployment

### Vercel Configuration (`vercel.json`)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Maps API key

### Installation

```bash
cd buy-bye-frontend/buybye
npm install
npm run dev
```

### Environment Variables

- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `VITE_API_BASE_URL` - Backend API URL

### JavaScript Configuration (`jsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/context/*": ["src/context/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"]
    }
  }
}
```

## 📈 Performance Optimizations

### Code Splitting

- Route-based code splitting with React Router
- Lazy loading of components
- Dynamic imports for heavy components
- Component-level optimization

### Caching Strategy

- API response caching
- Local storage for user preferences
- Token persistence
- Image optimization

### Bundle Optimization

- Tree shaking for unused code
- Image optimization
- CSS minification
- Gzip compression

## 🧪 Testing Strategy

### Component Testing

- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for API calls
- User interaction testing

### E2E Testing

- User flow testing
- Authentication testing
- Form validation testing
- Payment flow testing

## 🔄 State Management

### Local State

- React hooks for component state
- useState for simple state management
- useEffect for side effects
- useCallback for performance optimization

### Global State

- React Context for authentication
- React Context for location services
- React Context for shopping cart
- React Context for order management
- Local storage for persistence

## 📋 Key Features

### 1. Location-Based Shopping

- Automatic location detection
- Nearby vendor discovery
- Distance-based product filtering
- Address-based search

### 2. Email Verification System

- Token-based verification
- Notification system
- Resend functionality
- Account activation

### 3. Shopping Cart Management

- Real-time updates
- Server synchronization
- Discount calculations
- Vendor grouping

### 4. Order Management

- Order creation and tracking
- Status updates
- Cancellation support
- Order history

### 5. Ration Pack System

- Custom pack creation
- Category-based selection
- Nutritional information
- Bulk ordering

### 6. Search and Filtering

- Global search functionality
- Category-based filtering
- Price range filtering
- Vendor-based filtering

## 📋 Future Enhancements

### Planned Features

- Real-time notifications
- Advanced search filters
- Wishlist functionality
- Product reviews and ratings
- Social sharing
- Multi-language support
- Dark mode theme
- PWA capabilities
- Push notifications
- Offline support

### Technical Improvements

- TypeScript migration
- Unit test coverage
- Performance monitoring
- Error tracking
- Analytics integration
- SEO optimization
- Accessibility improvements

## 🤝 Contributing

### Code Standards

- ESLint configuration
- Prettier formatting
- Component documentation
- API documentation
- Git commit conventions

### Development Workflow

1. Feature branch creation
2. Code review process
3. Testing requirements
4. Documentation updates
5. Performance testing

## 📞 Support

For technical support or questions about the frontend:

- Check the documentation
- Review the API endpoints
- Contact the development team
- Check GitHub issues

---

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Maintainer:** Buy-Bye Development Team
